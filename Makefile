export CONFIG_SITE := $(CURDIR)/config.site

# Common linking flags for all targets.
export LDFLAGS += -s DYNAMIC_EXECUTION=0 -s AUTO_JS_LIBRARIES=0 -s AUTO_NATIVE_LIBRARIES=0
# Temporary workaround for https://github.com/emscripten-core/emscripten/issues/16836.
export LDFLAGS += -Wl,-u,ntohs

# Common compilation & linking flags for all langs and targets.
COMMON_FLAGS = -Os -flto
export CFLAGS += $(COMMON_FLAGS)
export CXXFLAGS += $(COMMON_FLAGS)
export LDFLAGS += $(COMMON_FLAGS)

## Main API module

build/libapi.mjs: src/api.o deps/libgphoto2/.installed
	libtool --tag=CC --verbose --mode=link --precious-files-regex '.*' $(LD) $(CFLAGS) $(LDFLAGS) -o $@ $< \
		 -lltdl -lgphoto2 \
		-fexceptions --bind -s ASYNCIFY -s ALLOW_MEMORY_GROWTH -s ENVIRONMENT=web,worker \
		-dlpreopen $(PWD)/deps/libgphoto2/camlibs/ptp2.la \
		-dlpreopen $(PWD)/deps/libgphoto2/libgphoto2_port/usb1.la

src/api.o: CXXFLAGS += -std=c++17 -fexceptions

## Generic rules for deps

deps/.submodules:
	git submodule update --init
	touch $@

# Make sure to regenerate all `configure` scripts with latest autotools,
# as those generated with older versions didn't support wasm32 targets.
deps/%/configure: deps/.submodules
	cd $(@D) && autoreconf -fiv

CONFIGURE_ARGS=

deps/%/Makefile: deps/%/configure
	cd $(@D) && emconfigure ./configure $(CONFIGURE_ARGS)

deps/%/.installed: deps/%/Makefile
	$(MAKE) -C $(@D) install
	touch $@

## Overrides for specific deps

deps/libtool/libltdl/Makefile: CONFIGURE_ARGS=--enable-ltdl-install

deps/libgphoto2/Makefile: deps/libgphoto2/configure deps/libtool/libltdl/.installed deps/libusb/.installed
deps/libgphoto2/Makefile: CONFIGURE_ARGS=--without-libxml-2.0 --disable-nls --disable-ptpip --disable-disk --with-camlibs=ptp2
