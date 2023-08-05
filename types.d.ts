type AppState =
  | { type: 'CameraPicker' }
  | { type: 'Status'; message: string }
  | {
      type: 'Config';
      config: import('web-gphoto2').Config;
      capturePreview: (() => Promise<Blob>) | undefined;
      triggerCapture: (() => Promise<File>) | undefined;
    };
