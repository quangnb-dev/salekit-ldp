import type { SK_BlockData } from "@salekit/core";

import type { Breakpoint, CSSProperties } from "../cssSystem";
import { getResponsiveValue } from "../cssSystem";

type ConfigValue = {
  val?: string | number;
  unit?: string;
};

type SectionInnerCssConfig = Record<string, unknown> & {
  innerWidth?: string | number | ConfigValue;
  height?: ConfigValue;
};

export function generateSectionInnerCss(
  blockData: SK_BlockData,
  breakpoint: Breakpoint,
): CSSProperties {
  const bpConfig = getResponsiveValue<SectionInnerCssConfig>(
    blockData.bpConfigs,
    breakpoint,
  );

  const css: CSSProperties = {};

  // min-height so empty sections are visible
  if (bpConfig.height?.val !== undefined) {
    const unit = bpConfig.height.unit || "px";
    css.minHeight = `${bpConfig.height.val}${unit}`;
  } else {
    css.minHeight = "320px";
  }

  // Fixed inner width, centered via margin: 0 auto (set in SectionViewer inline style)
  if (bpConfig.innerWidth !== undefined) {
    if (
      typeof bpConfig.innerWidth === "object" &&
      bpConfig.innerWidth.val !== undefined
    ) {
      const unit = bpConfig.innerWidth.unit || "px";
      css.width = `${bpConfig.innerWidth.val}${unit}`;
    } else {
      css.width = String(bpConfig.innerWidth);
    }
  } else {
    css.width = "1200px";
  }

  return css;
}
