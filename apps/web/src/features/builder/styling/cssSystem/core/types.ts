import type { SK_BlockData, SK_BlockDevice, SK_BlockType } from "@salekit/core";

export type Breakpoint = SK_BlockDevice;

export type CSSProperties = Record<string, string | number>;

export interface Generator {
  selector: string;
  generator: (blockData: SK_BlockData, breakpoint: Breakpoint) => CSSProperties;
  applyTo?: Breakpoint[];
}

export type GeneratorSelectorContext = {
  block: SK_BlockData;
  templateId?: string | null;
};

export type GeneratorSelector = (
  context: GeneratorSelectorContext,
) => Generator[] | undefined;

export type GeneratorRegistry = Map<SK_BlockType, Generator[]>;

export interface DeviceConfig {
  mediaQuery: string;
  fallback: Breakpoint | null;
}

export type CssRuleStore = Record<Breakpoint, Map<string, string>>;

export type StylesheetStore = Record<Breakpoint, CSSStyleSheet>;
