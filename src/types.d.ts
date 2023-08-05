// Import types Context and SupportedOps ./libapi.mjs.d.ts
import type { Config, Context, SupportedOps } from './libapi.mjs.d.ts';

export declare class Camera {
    constructor();

    showCameraPicker(): Promise<void>;
    connect(): Promise<void>;
    disconnect(): Promise<void>;

    getConfig(): Promise<Config>;

    getSupportedOps(): SupportedOps;

    setConfigValue(name: string, value: number | string | boolean): Promise<void>;

    capturePreviewAsBlob(): Promise<Blob>;
    captureImageAsFile(): Promise<File>;
    consumeEvents(): Promise<boolean>;

    private rethrowIfCritical(err: any): void;  // any error type can be replaced by more specific if available
    private schedule<T>(op: (ctx: any) => Promise<T>): Promise<T>;  // ctx and T types can be replaced by more specific if available
}

export type { Config, Context, SupportedOps };
