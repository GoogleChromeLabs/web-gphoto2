import { writable, get, type Writable } from 'svelte/store';
import { Camera, type Config } from 'web-gphoto2';


export const imageURL: Writable<string | null> = writable(null);
export const connected: Writable<boolean> = writable(false);
export const config: Writable<Config> = writable();
export const camera = new Camera();

export async function connectCamera() {
    try {
        await Camera.showPicker();
        await camera.connect();
        connected.set(true);
        await getConfig();
        await handleEvents();
    } catch (err) {
        console.error('Could not connect to camera:', err);
        await disconnectCamera();
    }
}

export async function disconnectCamera() {
    try {
        await camera.disconnect();
    } catch (err) { }
    connected.set(false);
    console.log("Disconnected camera")
}

/**
 * Handles camera events to update the config.
 * Whenever changes to the camera occur (e.g. connecting flash, manually changing aperture, etc.), 
 * the changes are reflected in the browser.
 */
async function handleEvents() {
    while (true) {
        await new Promise((resolve) => requestIdleCallback(resolve, { timeout: 500 }));
        try {
            if (await camera.consumeEvents()) {
                await getConfig();
            }
        } catch (err) {
            console.error('Could not consume events:', err);
            await disconnectCamera();
            break;
        }
    }
}

export async function getConfig() {
    if (!get(connected)) return;
    config.set(await camera.getConfig())
}

export async function updateConfig(name: string, value: string) {
    if (!get(connected)) return;
    await camera.setConfigValue(name, value);
}

export async function captureImage() {
    if (!get(connected)) return;
    const blob = await camera.captureImageAsFile();
    const url = URL.createObjectURL(blob)
    imageURL.set(url);
}

export async function capturePreview() {
    if (!get(connected)) return;
    return await camera.capturePreviewAsBlob();
}