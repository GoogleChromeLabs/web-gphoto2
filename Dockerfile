FROM emscripten/emsdk:2.0.26
# Update to tot to include EM_ASYNC_JS; remove once 2.0.27 is out:
RUN emsdk install tot
RUN apt-get update && apt-get install -qqy autoconf autopoint pkg-config
WORKDIR /src
ENV EM_CACHE /src/deps/.emcache
CMD ["sh", "-c", "emmake make -j`nproc`"]
