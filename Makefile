CPPFLAGS += -I $(GPHOTO2PREFIX)/include

libapi.mjs: api.cpp
	libtool --verbose --mode=link --tag=CXX $(CC) -std=c++17 $+ --bind -s ASYNCIFY -fexceptions -g -s INITIAL_MEMORY=280231936 -s ALLOW_MEMORY_GROWTH -s ASYNCIFY_STACK_SIZE=1048576 -s DYNAMIC_EXECUTION=0 -o $@ \
	  $(GPHOTO2PREFIX)/lib/libltdl.la \
	  $(GPHOTO2PREFIX)/lib/libgphoto2.la \
	  -dlpreopen $(GPHOTO2PREFIX)/lib/libgphoto2/2.5.27.1/ptp2.la \
	  -dlpreopen $(GPHOTO2PREFIX)/lib/libgphoto2_port/0.12.0/usb1.la \
	  $(CPPFLAGS)
