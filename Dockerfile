FROM emscripten/emsdk:3.0.0
RUN apt-get update && apt-get install -qqy autoconf autopoint pkg-config
WORKDIR /src
ENV EM_CACHE /src/deps/.emcache
CMD ["sh", "-c", "emmake make -j`nproc`"]
