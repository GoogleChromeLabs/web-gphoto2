# Web-gPhoto2

A gPhoto2 implementation using WebAssembly to control DSLR cameras from the browser.

Powered by a [custom fork](https://github.com/RReverser/libgphoto2) of [libgphoto2](https://github.com/gphoto/libgphoto2), the [WebUSB](https://github.com/WICG/webusb) backend of [libusb](https://github.com/libusb/libusb), and WebAssembly via [Emscripten](https://emscripten.org/).

## Installation

```bash
npm install web-gphoto2
```

## Usage

A short example on how to use this package:

```js
import { Camera } from "web-gphoto2";

let camera = new Camera();

// Triggers the browser's native USB picker listing all connected cameras.
await Camera.showPicker();

// Connects to the camera exposed in the previous step.
// In the future we might allow to connect to multiple cameras by passing a specific instance.
await camera.connect();

console.log("Operations supported by the camera:", await camera.getSupportedOps());

console.log("Current configuration tree:", await camera.getConfig());

// Update camera configuration by the setting's name.
await camera.setConfigValue("iso", "800");

// Capture a lower-quality preview frame, useful for high-FPS live view stream.
// Returns a Blob with image mime type and contents.
const blob = await camera.capturePreviewAsBlob();
// Use `URL.createObjectURL` to create an image URL from the blob or `createImageBitmap` to decode it directly.
const img = new Image();
img.src = URL.createObjectURL(blob);

// Capture a full-resolution image in format currently selected on the camera (JPEG or RAW).
// This can be used in the same way as Blob above, but also has extra information such as filename useful for download.
const file = await camera.captureImageAsFile();
const a = document.createElement("a");
a.href = URL.createObjectURL(file);
a.download = file.name;
```

## Demo

This repository also contains a [demo app](https://web.dev/porting-libusb-to-webusb/) running gPhoto2 on the Web:
![A picture of DSLR camera connected via a USB cable to a laptop. The laptop is running the Web demo mentioned in the article, which mirrors a live video feed from the camera as well as allows to tweak its settings via form controls.](https://web-dev.imgix.net/image/9oK23mr86lhFOwKaoYZ4EySNFp02/MR4YGRvl0Z9AWT6vv3sQ.jpg?auto=format&w=1600)

For the detailed technical write-up, see [the official blog post](https://web.dev/porting-libusb-to-webusb/). To see the demo in action, visit the hosted version [here](https://web-gphoto2.rreverser.com/) (but make sure to read the [cross-platform compatibility notes](https://web.dev/porting-libusb-to-webusb/#important-cross-platform-compatibility-notes) first).

If you don't have a DSLR, you can check out a recording of the demo below:

<https://user-images.githubusercontent.com/557590/152155035-a1664656-a7d9-411f-8cb3-5f04320f1391.mp4>

## Building

To build the WebAssembly part of the repo, you'll need Docker on Linux (WSL works too) or macOS machine. Then:

```bash
npm run build:wasm # runs build in Docker
```

If you are just updating the JS library (`src/camera.ts`), then it's enough to do

```bash
npm run build:ts
```

on any system as Wasm parts are committed to this repo.

To serve the demo, run:

```bash
npx serve examples/preact # starts a local server with COOP/COEP
```

Then, navigate to <http://localhost:3000/> in Chrome.

## Common Issues

<details>
<summary>
SharedArrayBuffer can not be found
</summary>
SharedArrayBuffer has been disabled across all browsers due to the Spectre vulnerability. This package uses SharedArrayBuffer to communicate with the WebAssembly module. To work around this issue, you need to set two response headers for your document:

```http
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

Information from [Stackoverflow](https://stackoverflow.com/questions/64650119/react-error-sharedarraybuffer-is-not-defined-in-firefox)
</details>

<details>
<summary>
 Error: Not found: /node_modules/.vite/deps/libapi.wasm
 </summary>
Vite tries to optimize the dependencies by default. This causes the WebAssembly module to be moved to a different location. To prevent this, you need to exclude the web-gphoto2 package from the optimization.

In vite, both of the above mentioned issues are solved by adding the following to your vite.config.js:

```js
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

</details>

## See also

[RReverser/eos-remote-web](https://github.com/RReverser/eos-remote-web) - my other project for controlling Canon cameras over Web Bluetooth.

## License

Like the dependencies, this demo is licensed under [LGPL v2.1](https://github.com/GoogleChromeLabs/web-gphoto2/blob/main/LICENSE).
