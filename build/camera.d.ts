export type { Config, SupportedOps } from '../build/libapi.mjs';
export declare function rethrowIfCritical(err: any): void;
export declare class Camera {
    #private;
    static showPicker(): Promise<void>;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    getConfig(): Promise<{
        name: string;
        info: string;
        label: string;
        readonly: boolean;
    } & {
        type: "window";
        children: Record<string, import("../build/libapi.mjs").Config>;
    } & {
        type: "window";
    }>;
    getSupportedOps(): Promise<import("../build/libapi.mjs").SupportedOps>;
    setConfigValue(name: string, value: string | number | boolean): Promise<void>;
    capturePreviewAsBlob(): Promise<Blob>;
    captureImageAsFile(): Promise<File>;
    consumeEvents(): Promise<boolean>;
}
