import type { SK_BlockData } from "../../../types";
import { getResponsiveValue } from "../helpers";
import type { Breakpoint, CSSProperties } from "../types";

/**
 * Generate text CSS for blocks
 */
export function generateTextCss(
  blockData: SK_BlockData,
  breakpoint: Breakpoint,
): CSSProperties {
  const bpConfig = getResponsiveValue<Record<string, unknown>>(
    blockData.bpConfigs,
    breakpoint,
  );

  const css: CSSProperties = {};

  // Font family
  if (bpConfig.fontFamily) {
    css.fontFamily = bpConfig.fontFamily;
  }

  // Font size
  if (bpConfig.fontSize !== undefined) {
    if (
      typeof bpConfig.fontSize === "object" &&
      bpConfig.fontSize.val !== undefined
    ) {
      const unit = bpConfig.fontSize.unit || "px";
      css.fontSize = `${bpConfig.fontSize.val}${unit}`;
    } else {
      css.fontSize = String(bpConfig.fontSize);
    }
  }

  // Font weight
  if (bpConfig.fontWeight) {
    css.fontWeight = bpConfig.fontWeight;
  }

  // Line height
  if (bpConfig.lineHeight !== undefined) {
    if (
      typeof bpConfig.lineHeight === "object" &&
      bpConfig.lineHeight.val !== undefined
    ) {
      const unit = bpConfig.lineHeight.unit || "";
      css.lineHeight = `${bpConfig.lineHeight.val}${unit}`;
    } else {
      css.lineHeight = String(bpConfig.lineHeight);
    }
  }

  // Color
  if (bpConfig.color) {
    css.color = bpConfig.color;
  }

  // Text align
  if (bpConfig.textAlign) {
    css.textAlign = bpConfig.textAlign;
  }

  return css;
}
