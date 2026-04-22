import type { Breakpoint, CSSProperties, SK_BlockData } from "@salekit/core";
import { getResponsiveValue } from "@salekit/core";

/**
 * Generate CSS for section inner div width
 */
export function generateSectionInnerCss(
  blockData: SK_BlockData,
  breakpoint: Breakpoint,
): CSSProperties {
  const bpConfig = getResponsiveValue<Record<string, unknown>>(
    blockData.bpConfigs,
    breakpoint,
  );

  const css: CSSProperties = {};

  // Inner width
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
    css.width = "100%";
  }

  return css;
}
