FROM emscripten/emsdk:3.1.47
RUN apt-get update && apt-get install -qqy autoconf autopoint pkg-config libtool libtool-bin
# Include fix from https://github.com/emscripten-core/emscripten/pull/20452.
# Remove when 3.1.48 is released.
RUN emsdk install releases-e7f0e42ac993b2a9e0416cd35e6f4bc57519a0db-64bit
WORKDIR /src
CMD ["sh", "-c", "emmake make -j`nproc`"]
