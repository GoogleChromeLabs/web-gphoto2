FROM emscripten/emsdk:3.1.47
RUN apt-get update && apt-get install -qqy autoconf autopoint pkg-config libtool libtool-bin
# Include fix from https://github.com/emscripten-core/emscripten/pull/20452.
# Also https://github.com/emscripten-core/emscripten/pull/20464.
# Remove when 3.1.48 is released.
RUN emsdk install releases-7be9544422d236195a5104ee6994acee17ee7f66-64bit
WORKDIR /src
CMD ["sh", "-c", "emmake make"]
