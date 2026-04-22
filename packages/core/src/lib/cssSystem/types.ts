import type { SK_BlockData, SK_BlockDevice } from "../../types";

export type Breakpoint = SK_BlockDevice;

export type CSSProperties = Record<string, string | number>;

export interface Generator {
  selector: string;
  generator: (blockData: SK_BlockData, breakpoint: Breakpoint) => CSSProperties;
  applyTo?: Breakpoint[];
}

export interface DeviceConfig {
  mediaQuery: string;
  fallback: Breakpoint | null;
  editorSelector: string;
}
