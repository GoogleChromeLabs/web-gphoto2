/*
 * Copyright 2021 Google LLC
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA
 */

type Config = {
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
  context(): Promise<any> {
    throw new Error('Method not implemented.');
  }
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

export type { Config, Context, SupportedOps };

declare const initModule: EmscriptenModuleFactory<Module>;
export default initModule;
