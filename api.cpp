#include <emscripten.h>
#include <emscripten/bind.h>
#include <emscripten/val.h>
#include <gphoto2/gphoto2.h>

#include <cstring>
#include <iostream>

using emscripten::val;

template <typename T, auto Deleter>
using gpp_unique_ptr =
    std::unique_ptr<T, std::integral_constant<decltype(Deleter), Deleter>>;

using GPPWidget = gpp_unique_ptr<CameraWidget, gp_widget_unref>;

void gpp_try(int status) {
  if (status != GP_OK) {
    throw std::runtime_error(gp_result_as_string(status));
  }
}

void gpp_log_error(GPContext *context, const char *text, void *data) {
  std::cerr << text << std::endl;
}

#define GPP_CALL(RET, EXPR) \
  ({                        \
    RET OUT;                \
    RET *_ = &OUT;          \
    gpp_try(EXPR);          \
    OUT;                    \
  })

EM_JS([[noreturn]] void, throw_msg, (const char *msg),
      { throw new Error(UTF8ToString(msg)); });

// This is workaround for Emscripten throwing C++ exceptions as meaningless
// numbers (pointers) instead of actual messages.
// To rethrow actual message, we manually wrap all Embind exports into
// callbacks, those callbacks are passed to this function,
// it ensures that all destructors are executed correctly, catches C++ exception
// if any, extracts the message and rethrows it as a JS one. Easy-peasy...
template <typename Func>
auto gpp_rethrow(Func func) {
  try {
    return func();
  } catch (std::exception &e) {
    throw_msg(e.what());
  }
}

const thread_local val Uint8Array = val::global("Uint8Array");
const thread_local val Blob = val::global("Blob");
const thread_local val File = val::global("File");
const thread_local val arrayOf = val::global("Array")["of"];

class Context {
 public:
  Context() : camera(nullptr), context(nullptr) {
    gpp_rethrow([=]() {
      camera.reset(GPP_CALL(Camera *, gp_camera_new(_)));
      context.reset(gp_context_new());
      gp_context_set_error_func(context.get(), gpp_log_error, nullptr);
      gpp_try(gp_camera_init(camera.get(), context.get()));
    });
  }

  val supportedOps() {
    return gpp_rethrow([=]() {
      auto ops =
          GPP_CALL(CameraAbilities, gp_camera_get_abilities(camera.get(), _))
              .operations;

      val result = val::object();
      result.set("captureImage", (ops & GP_OPERATION_CAPTURE_IMAGE) != 0);
      result.set("captureVideo", (ops & GP_OPERATION_CAPTURE_VIDEO) != 0);
      result.set("captureAudio", (ops & GP_OPERATION_CAPTURE_AUDIO) != 0);
      result.set("capturePreview", (ops & GP_OPERATION_CAPTURE_PREVIEW) != 0);
      result.set("config", (ops & GP_OPERATION_CONFIG) != 0);
      result.set("triggerCapture", (ops & GP_OPERATION_TRIGGER_CAPTURE) != 0);
      return result;
    });
  }

  bool consumeEvents() {
    return gpp_rethrow([=]() {
      bool had_events = false;
      for (;;) {
        CameraEventType event_type = GP_EVENT_UNKNOWN;
        gpp_unique_ptr<void, free> event_data(GPP_CALL(
            void *, gp_camera_wait_for_event(camera.get(), 0, &event_type, _,
                                             context.get())));
        if (event_type == GP_EVENT_TIMEOUT) {
          break;
        }
        if (event_type == GP_EVENT_UNKNOWN) {
          EM_ASM({ console.log(UTF8ToString($0)); }, event_data.get());
        }
        had_events = true;
      }
      return had_events;
    });
  }

  val configToJS() {
    return gpp_rethrow([=]() {
      GPPWidget config(
          GPP_CALL(CameraWidget *,
                   gp_camera_get_config(camera.get(), _, context.get())));
      return walk_config(config.get()).second;
    });
  }

  void setConfigValue(std::string name, val value) {
    gpp_rethrow([=]() {
      GPPWidget widget(GPP_CALL(
          CameraWidget *, gp_camera_get_single_config(
                              camera.get(), name.c_str(), _, context.get())));
      auto type =
          GPP_CALL(CameraWidgetType, gp_widget_get_type(widget.get(), _));
      switch (type) {
        case GP_WIDGET_RANGE: {
          float number = value.as<float>();
          gpp_try(gp_widget_set_value(widget.get(), &number));
          break;
        }
        case GP_WIDGET_MENU:
        case GP_WIDGET_RADIO:
        case GP_WIDGET_TEXT: {
          auto str = value.as<std::string>();
          gpp_try(gp_widget_set_value(widget.get(), str.c_str()));
          break;
        }
        case GP_WIDGET_TOGGLE: {
          int on = value.as<bool>() ? 1 : 0;
          gpp_try(gp_widget_set_value(widget.get(), &on));
          break;
        }
        case GP_WIDGET_DATE: {
          auto seconds = static_cast<int>(value.as<double>() / 1000);
          gpp_try(gp_widget_set_value(widget.get(), &seconds));
          break;
        }
        default: {
          throw std::logic_error("unimplemented");
        }
      }
      gpp_try(gp_camera_set_single_config(camera.get(), name.c_str(),
                                          widget.get(), context.get()));
    });
  }

  val capturePreviewAsBlob() {
    return gpp_rethrow([=]() {
      auto &file = get_file();

      gpp_try(gp_camera_capture_preview(camera.get(), &file, context.get()));

      auto params = blob_chunks_and_opts(file);
      return Blob.new_(std::move(params.first), std::move(params.second));
    });
  }

  val captureImageAsFile() {
    return gpp_rethrow([=]() {
      auto &file = get_file();

      {
        struct TempCameraFile {
          Camera &camera;
          GPContext &context;
          CameraFilePath path;

          ~TempCameraFile() {
            gp_camera_file_delete(&camera, path.folder, path.name, &context);
          }
        };

        TempCameraFile camera_file{
            .camera = *camera,
            .context = *context,
        };

        strcpy(camera_file.path.folder, "/");
        strcpy(camera_file.path.name, "web-gphoto2");

        gpp_try(gp_camera_capture(camera.get(), GP_CAPTURE_IMAGE,
                                  &camera_file.path, context.get()));

        gpp_try(gp_camera_file_get(camera.get(), camera_file.path.folder,
                                   camera_file.path.name, GP_FILE_TYPE_NORMAL,
                                   &file, context.get()));
      }

      gpp_try(gp_file_set_name(&file, "image."));
      gpp_try(gp_file_adjust_name_for_mime_type(&file));
      auto name = val(GPP_CALL(const char *, gp_file_get_name(&file, _)));

      auto params = blob_chunks_and_opts(file);
      return File.new_(std::move(params.first), std::move(name),
                       std::move(params.second));
    });
  }

 private:
  gpp_unique_ptr<Camera, gp_camera_unref> camera;
  gpp_unique_ptr<GPContext, gp_context_unref> context;
  gpp_unique_ptr<CameraFile, gp_file_unref> file;

  static std::pair<val, val> walk_config(CameraWidget *widget) {
    val result = val::object();

    val name(GPP_CALL(const char *, gp_widget_get_name(widget, _)));
    result.set("name", name);
    result.set("info", GPP_CALL(const char *, gp_widget_get_info(widget, _)));
    result.set("label", GPP_CALL(const char *, gp_widget_get_label(widget, _)));
    result.set("readonly",
               GPP_CALL(int, gp_widget_get_readonly(widget, _)) != 0);

    auto type = GPP_CALL(CameraWidgetType, gp_widget_get_type(widget, _));

    switch (type) {
      case GP_WIDGET_RANGE: {
        result.set("type", "range");
        result.set("value", GPP_CALL(float, gp_widget_get_value(widget, _)));

        float min, max, step;
        gpp_try(gp_widget_get_range(widget, &min, &max, &step));
        result.set("min", min);
        result.set("max", max);
        result.set("step", step);

        break;
      }
      case GP_WIDGET_MENU:
      case GP_WIDGET_RADIO: {
        result.set("type", type == GP_WIDGET_MENU ? "menu" : "radio");
        result.set("value",
                   GPP_CALL(const char *, gp_widget_get_value(widget, _)));

        val choices = val::array();
        for (int i = 0, n = gp_widget_count_choices(widget); i < n; i++) {
          choices.call<void>(
              "push",
              val(GPP_CALL(const char *, gp_widget_get_choice(widget, i, _))));
        }
        result.set("choices", choices);

        break;
      }
      case GP_WIDGET_TOGGLE: {
        result.set("type", "toggle");
        int value = GPP_CALL(int, gp_widget_get_value(widget, _));
        // Note: explicitly not adding `value` for any other values
        // (e.g. camera actions often would return 2 here...)
        switch (value) {
          case 0:
            result.set("value", false);
            break;
          case 1:
            result.set("value", true);
            break;
        }

        break;
      }
      case GP_WIDGET_TEXT: {
        result.set("type", "text");
        result.set("value",
                   GPP_CALL(const char *, gp_widget_get_value(widget, _)));

        break;
      }
      case GP_WIDGET_WINDOW:
      case GP_WIDGET_SECTION: {
        result.set("type", type == GP_WIDGET_WINDOW ? "window" : "section");

        val children = val::object();
        for (int i = 0, n = gp_widget_count_children(widget); i < n; i++) {
          auto child =
              GPP_CALL(CameraWidget *, gp_widget_get_child(widget, i, _));
          auto kv = walk_config(child);
          children.set(kv.first, kv.second);
        }
        result.set("children", children);

        break;
      }
      case GP_WIDGET_DATE: {
        auto seconds = GPP_CALL(int, gp_widget_get_value(widget, _));
        result.set("type", "datetime");
        result.set("value", static_cast<double>(seconds) * 1000);

        break;
      }
      default: {
        throw std::logic_error("unimplemented");
      }
    }

    return {name, result};
  }

  CameraFile &get_file() {
    if (file.get() == nullptr) {
      file.reset(GPP_CALL(CameraFile *, gp_file_new(_)));
    }
    return *file;
  }

  std::pair<val, val> blob_chunks_and_opts(CameraFile &file) {
    auto mime_type = GPP_CALL(const char *, gp_file_get_mime_type(&file, _));

    const char *data;
    unsigned long size;
    gpp_try(gp_file_get_data_and_size(&file, &data, &size));

    val blob_opts = val::object();
    blob_opts.set("type", mime_type);

    return {arrayOf(Uint8Array.new_(emscripten::typed_memory_view(size, data))),
            std::move(blob_opts)};
  }
};

EMSCRIPTEN_BINDINGS(gphoto2_js_api) {
  emscripten::class_<Context>("Context")
      .constructor<>()
      .function("configToJS", &Context::configToJS)
      .function("setConfigValue", &Context::setConfigValue)
      .function("capturePreviewAsBlob", &Context::capturePreviewAsBlob)
      .function("captureImageAsFile", &Context::captureImageAsFile)
      .function("consumeEvents", &Context::consumeEvents)
      .function("supportedOps", &Context::supportedOps);
}
