export type Config = {
  name: string;
  info: string;
  label: string;
  readonly: boolean;
} & (
  | { type: 'range'; value: number; min: number; max: number; step: number }
  | { type: 'menu' | 'radio'; value: string; choices: string[] }
  | { type: 'toggle'; value: boolean }
  | { type: 'text'; value: string }
  | { type: 'window'; children: Record<string, Config> }
  | { type: 'section'; children: Record<string, Config> }
  | { type: 'datetime'; value: number }
);

declare interface SupportedOps {
  captureImage: boolean;
  captureVideo: boolean;
  captureAudio: boolean;
  capturePreview: boolean;
  config: boolean;
  triggerCapture: boolean;
}

declare class Context {
  configToJS(): Promise<Config & { type: 'window' }>;
  setConfigValue(
    name: string,
    value: number | string | boolean
  ): Promise<undefined>;
  capturePreviewAsBlob(): Promise<Blob>;
  captureImageAsFile(): Promise<File>;
  consumeEvents(): Promise<boolean>;
  supportedOps(): SupportedOps;

  delete(): void;
  isDeleted(): boolean;
}

export interface Module extends EmscriptenModule {
  Context: typeof Context;
}

export type { Context };

declare const initModule: EmscriptenModuleFactory<Module>;
export default initModule;
