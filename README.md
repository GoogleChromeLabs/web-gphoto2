# Web-gPhoto2

A gPhoto2 implementation using WebAssembly to control DSLR cameras from the browser.

Powered by a [custom fork](https://github.com/RReverser/libgphoto2) of [libgphoto2](https://github.com/gphoto/libgphoto2), the [WebUSB](https://github.com/WICG/webusb) backend of [libusb](https://github.com/libusb/libusb), and WebAssembly via [Emscripten](https://emscripten.org/).

# NPM

## Installation

```bash
npm install web-gphoto2
// or
yarn add web-gphoto2
```

## Usage

A short example on how to use this package:

```ts
import Camera from "web-gphoto2";

let camera = new Camera();

async function connectCamera() {
  await camera.showCameraPicker();
  await camera.connect();
}

async function getSupportedOps() {
  const ops = await camera.getSupportedOps();
  console.log("Supported Ops:", ops);
}

async function getCameraConfig() {
  const config = await camera.getConfig();
  console.log("Config:", config);
}

async function updateConfig() {
  await camera.setConfigValue("iso", "800");
}

async function capturePreviewAsBlob() {
  const blob = await camera.capturePreviewAsBlob();
  console.log("Blob:", blob);
}

async function captureImageAsFile() {
  const file = await camera.captureImageAsFile();
  console.log("File:", file);
}
```

## Common Issues

### SharedArrayBuffer can not be found

SharedArrayBuffer has been disabled across all browsers due to the Spectre vulnerability. This package uses SharedArrayBuffer to communicate with the WebAssembly module. To work around this issue, you need to set two response headers for your document:

```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

Information from [Stackoverflow](https://stackoverflow.com/questions/64650119/react-error-sharedarraybuffer-is-not-defined-in-firefox)

### Error: Not found: /node_modules/.vite/deps/libapi.wasm

Vite tries to optimize the dependencies by default. This causes the WebAssembly module to be moved to a different location. To prevent this, you need to exclude the web-gphoto2 package from the optimization.

In vite, both of the above mentioned issues are solved by adding the following to your vite.config.js:

```ts
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

/** @type {import('vite').Plugin} */
const viteServerConfig = {
  name: "add headers",
  configureServer: (server) => {
    server.middlewares.use((req, res, next) => {
      res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
      res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
      next();
    });
  },
};

export default defineConfig({
  plugins: [sveltekit(), viteServerConfig],
  optimizeDeps: {
    exclude: ["web-gphoto2"],
  },
});
```

# Demo

This repository also contains a [demo app](https://web.dev/porting-libusb-to-webusb/) running gPhoto2 on the Web:
![A picture of DSLR camera connected via a USB cable to a laptop. The laptop is running the Web demo mentioned in the article, which mirrors a live video feed from the camera as well as allows to tweak its settings via form controls.](https://web-dev.imgix.net/image/9oK23mr86lhFOwKaoYZ4EySNFp02/MR4YGRvl0Z9AWT6vv3sQ.jpg?auto=format&w=1600)

For the detailed technical write-up, see [the official blog post](https://web.dev/porting-libusb-to-webusb/). To see the demo in action, visit the hosted version [here](https://web-gphoto2.rreverser.com/) (but make sure to read the [cross-platform compatibility notes](https://web.dev/porting-libusb-to-webusb/#important-cross-platform-compatibility-notes) first).

If you don't have a DSLR, you can check out a recording of the demo below:

https://user-images.githubusercontent.com/557590/152155035-a1664656-a7d9-411f-8cb3-5f04320f1391.mp4

## Building

To build, you'll need Docker. Then:

```bash
./build.sh # runs build in Docker
npx serve examples/preact # starts a local server with COOP/COEP
```

Then, navigate to http://localhost:3000/ in Chrome.

## See also

[RReverser/eos-remote-web](https://github.com/RReverser/eos-remote-web) - my other project for controlling Canon cameras over Web Bluetooth.

## License

Like the dependencies, this demo is licensed under [LGPL v2.1](https://github.com/GoogleChromeLabs/web-gphoto2/blob/main/LICENSE).
