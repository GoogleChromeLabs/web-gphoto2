#include <emscripten.h>
#include <emscripten/bind.h>
#include <emscripten/val.h>
#include <gphoto2/gphoto2.h>

#include <iostream>

using emscripten::val;

void gpp_try(int status) {
  if (status != GP_OK) {
    throw std::runtime_error(gp_result_as_string(status));
  }
}

void gpp_error(GPContext *context, const char *text, void *data) {
  throw std::runtime_error(text);
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

class Context {
 public:
  Context()
      : camera(nullptr, gp_camera_unref),
        context(nullptr, gp_context_unref),
        config(nullptr, gp_widget_unref) {
    gpp_rethrow([=]() {
      camera.reset(GPP_CALL(Camera *, gp_camera_new(_)));
      context.reset(gp_context_new());
      gp_context_set_error_func(context.get(), gpp_error, nullptr);
      gpp_try(gp_camera_init(camera.get(), context.get()));
    });
  }

  Context(int foo): Context() {}

  val configToJS() {
    return gpp_rethrow([=]() {
      if (config.get() == nullptr) {
        config.reset(
            GPP_CALL(CameraWidget *,
                     gp_camera_get_config(camera.get(), _, context.get())));
      }

      return walk_config(config.get());
    });
  }

  void setConfigValue(int id, val value) {
    gpp_rethrow([=]() {
      auto widget = GPP_CALL(CameraWidget *,
                             gp_widget_get_child_by_id(config.get(), id, _));
      auto type = GPP_CALL(CameraWidgetType, gp_widget_get_type(widget, _));
      switch (type) {
        case GP_WIDGET_RANGE: {
          float number = value.as<float>();
          gpp_try(gp_widget_set_value(widget, &number));
          break;
        }
        case GP_WIDGET_MENU:
        case GP_WIDGET_RADIO:
        case GP_WIDGET_TEXT: {
          auto str = value.as<std::string>();
          gpp_try(gp_widget_set_value(widget, str.c_str()));
          break;
        }
        case GP_WIDGET_TOGGLE: {
          int on = value.as<bool>() ? 1 : 0;
          gpp_try(gp_widget_set_value(widget, &on));
          break;
        }
        default: {
          throw std::logic_error("unimplemented");
        }
      }
      gpp_try(gp_camera_set_config(camera.get(), config.get(), context.get()));
    });
  }

  val capturePreviewAsBlob() {
    return gpp_rethrow([=]() {
      class Output {
       public:
        Output() : totalSize(0), chunks(val::array()) {}

        void push(const uint8_t *data, unsigned long size) {
          chunks.call<void>(
              "push",
              Uint8Array.new_(emscripten::typed_memory_view(size, data)));
          totalSize += size;
        }

        uint64_t getTotalSize() { return totalSize; }

        val getChunks() { return chunks; }

       private:
        uint64_t totalSize;
        val chunks;
      };

      static CameraFileHandler handler = {
          .size =
              [](void *priv, uint64_t *size) {
                *size = static_cast<Output *>(priv)->getTotalSize();
                return GP_OK;
              },
          .read = [](void *priv, unsigned char *data,
                     uint64_t *len) { return GP_ERROR_NOT_SUPPORTED; },
          .write =
              [](void *priv, unsigned char *data, uint64_t *len) {
                static_cast<Output *>(priv)->push(data, *len);
                return GP_OK;
              }};

      Output output;

      std::unique_ptr<CameraFile, decltype(&gp_file_unref)> file(
          GPP_CALL(CameraFile *,
                   gp_file_new_from_handler(_, &handler, &output)),
          gp_file_unref);

      gpp_try(
          gp_camera_capture_preview(camera.get(), file.get(), context.get()));

      auto mime_type =
          GPP_CALL(const char *, gp_file_get_mime_type(file.get(), _));

      val blob_opts = val::object();
      blob_opts.set("type", mime_type);

      return Blob.new_(output.getChunks(), std::move(blob_opts));
    });
  }

 private:
  std::unique_ptr<Camera, decltype(&gp_camera_unref)> camera;
  std::unique_ptr<GPContext, decltype(&gp_context_unref)> context;
  std::unique_ptr<CameraWidget, decltype(&gp_widget_unref)> config;

  static val walk_config(CameraWidget *widget) {
    val result = val::object();

    result.set("id", GPP_CALL(int, gp_widget_get_id(widget, _)));
    result.set("name", GPP_CALL(const char *, gp_widget_get_name(widget, _)));
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
        result.set("value", GPP_CALL(int, gp_widget_get_value(widget, _)) != 0);

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

        val children = val::array();
        for (int i = 0, n = gp_widget_count_children(widget); i < n; i++) {
          auto child =
              GPP_CALL(CameraWidget *, gp_widget_get_child(widget, i, _));
          children.call<void>("push", walk_config(child));
        }
        result.set("children", children);

        break;
      }
      default: {
        throw std::logic_error("unimplemented");
      }
    }

    return result;
  }
};

EMSCRIPTEN_BINDINGS(gphoto2_js_api) {
  emscripten::class_<Context>("Context")
      .constructor<>()
      .function("configToJS", &Context::configToJS)
      .function("setConfigValue", &Context::setConfigValue)
      .function("capturePreviewAsBlob", &Context::capturePreviewAsBlob);
}
