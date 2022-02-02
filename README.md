This is a [demo app](https://web.dev/porting-libusb-to-webusb/) running gPhoto2 on the Web:

![A picture of DSLR camera connected via a USB cable to a laptop. The laptop is running the Web demo mentioned in the article, which mirrors a live video feed from the camera as well as allows to tweak its settings via form controls.](https://web-dev.imgix.net/image/9oK23mr86lhFOwKaoYZ4EySNFp02/MR4YGRvl0Z9AWT6vv3sQ.jpg?auto=format&w=1600)

Powered by a [custom fork](https://github.com/RReverser/libgphoto2) of [libgphoto2](https://github.com/gphoto/libgphoto2), a [custom fork](https://github.com/RReverser/libusb) of [libusb](https://github.com/libusb/libusb), WebAssembly via [Emscripten](https://emscripten.org/), and [WebUSB](https://github.com/WICG/webusb).

For the detailed technical write-up, see [the official blog post](https://web.dev/porting-libusb-to-webusb/). To see the demo in action, visit the hosted version [here](https://web-gphoto2.rreverser.com/) (but make sure to read the [cross-platform compatibility notes](https://web.dev/porting-libusb-to-webusb/#important-cross-platform-compatibility-notes) first).

If you don't have a DSLR, you can check out a recording of the demo below:

https://user-images.githubusercontent.com/557590/152155035-a1664656-a7d9-411f-8cb3-5f04320f1391.mp4

## Building

To build, you'll need Docker. Then:

```bash
./build.sh # runs build in Docker
npx serve ui # starts a local server with COOP/COEP
```

Then, navigate to http://localhost:5000/ in Chrome.

## License

Like the dependencies, this demo is licensed under [LGPL v2.1](https://github.com/GoogleChromeLabs/web-gphoto2/blob/main/LICENSE).
