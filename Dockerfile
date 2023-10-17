FROM emscripten/emsdk:3.1.47
RUN apt-get update && apt-get install -qqy autoconf autopoint pkg-config libtool libtool-bin
WORKDIR /src
CMD ["sh", "-c", "emmake make -j`nproc`"]
