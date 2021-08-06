SYSROOT = $(PWD)/deps/.install
export PKG_CONFIG_PATH = $(SYSROOT)/lib/pkgconfig

export CPPFLAGS += -I$(SYSROOT)/include
export LDFLAGS += -L$(SYSROOT)/lib -s DYNAMIC_EXECUTION=0 -s AUTO_JS_LIBRARIES=0 -s AUTO_NATIVE_LIBRARIES=0 -s ALLOW_UNIMPLEMENTED_SYSCALLS=0

COMMON_FLAGS = -Os -flto
export CFLAGS += $(COMMON_FLAGS)
export CXXFLAGS += $(COMMON_FLAGS)
export LDFLAGS += $(COMMON_FLAGS)

libapi.mjs: api.o $(SYSROOT)/lib/libltdl.la $(SYSROOT)/lib/libgphoto2.la
	deps/libgphoto2/libtool --verbose --mode=link $(LD) $(LDFLAGS) -o $@ $+ \
		--bind -s ASYNCIFY -s ALLOW_MEMORY_GROWTH \
		-dlpreopen $(SYSROOT)/lib/libgphoto2/2.5.27.1/ptp2.la \
		-dlpreopen $(SYSROOT)/lib/libgphoto2_port/0.12.0/usb1.la

api.o: deps/libgphoto2/configure.ac
api.o: CPPFLAGS += -Ideps/libgphoto2 -Ideps/libgphoto2/libgphoto2_port
api.o: CXXFLAGS += -std=c++17 -fexceptions

$(SYSROOT)/.exists:
	mkdir -p $(@D)
	touch $@

deps/libtool/configure:
	mkdir -p deps/libtool
	curl -L https://ftpmirror.gnu.org/libtool/libtool-2.4.6.tar.gz | tar zx --strip 1 -C deps/libtool

deps/libgphoto2/configure.ac deps/libusb/configure.ac &:
	git submodule update --init

$(SYSROOT)/lib/libltdl.la: $(SYSROOT)/.exists deps/libtool/configure
	cd deps/libtool && \
	./configure --prefix=$(SYSROOT) --disable-shared && \
	$(MAKE) install

$(SYSROOT)/lib/libusb-1.0.la: $(SYSROOT)/.exists deps/libusb/configure.ac
	cd deps/libusb && \
	autoreconf -fiv && \
	./configure --prefix=$(SYSROOT) --disable-shared --host=wasm32 && \
	$(MAKE) install

$(SYSROOT)/lib/libgphoto2.la: deps/libgphoto2/configure.ac $(SYSROOT)/lib/libltdl.la $(SYSROOT)/lib/libusb-1.0.la
	cd deps/libgphoto2 && \
	autoreconf -fiv && \
	./configure --prefix=$(SYSROOT) --disable-shared --host=wasm32 \
		 --without-libxml-2.0 --disable-nls --disable-ptpip --disable-disk \
		 --with-camlibs=ptp2 && \
	$(MAKE) install
