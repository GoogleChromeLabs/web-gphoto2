export CONFIG_SITE=$(CURDIR)/config.site
export ACLOCAL_PATH := $(SYSROOT)/share/aclocal:$(ACLOCAL_PATH)

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
	libtool --verbose --mode=link $(LD) $(LDFLAGS) -o $@ $+ \
		-fexceptions --bind -s ASYNCIFY -s ALLOW_MEMORY_GROWTH -s ENVIRONMENT=web,worker \
		-dlpreopen $(SYSROOT)/lib/libgphoto2/2.5.28.1/ptp2.la \
		-dlpreopen $(SYSROOT)/lib/libgphoto2_port/0.12.0/usb1.la

src/api.o: CXXFLAGS += -std=c++17 -fexceptions -pthread

## Generic rules for deps

$(SYSROOT):
	mkdir -p $(@D)

deps/%/configure.ac:
	git submodule update --init $(@D)

deps/%/configure: deps/%/configure.ac
	cd $(@D) && autoreconf -fiv

deps/%/Makefile: deps/%/configure
	cd $(@D) && emconfigure ./configure

deps/%/.installed: deps/%/Makefile
	$(MAKE) -C $(@D) install
	touch $@

## libtool

deps/libtool/configure:
	mkdir -p $(@D)
	curl -L https://ftpmirror.gnu.org/libtool/libtool-2.4.6.tar.gz | tar zx --strip 1 -C $(@D)

## libgphoto2

deps/libgphoto2/Makefile: deps/libtool/.installed deps/libusb/.installed
	cd $(@D) && emconfigure ./configure --without-libxml-2.0 --disable-nls --disable-ptpip --disable-disk --with-camlibs=ptp2
