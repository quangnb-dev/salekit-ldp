import type { SK_BlockData } from "../../../types";
import { getResponsiveValue } from "../helpers";
import type { Breakpoint, CSSProperties } from "../types";

/**
 * Generate border CSS for blocks
 */
export function generateBorderCss(
  blockData: SK_BlockData,
  breakpoint: Breakpoint,
): CSSProperties {
  const bpConfig = getResponsiveValue<Record<string, unknown>>(
    blockData.bpConfigs,
    breakpoint,
  );

  const css: CSSProperties = {};

  // Border width
  if (bpConfig.borderWidth !== undefined) {
    if (
      typeof bpConfig.borderWidth === "object" &&
      bpConfig.borderWidth.val !== undefined
    ) {
      const unit = bpConfig.borderWidth.unit || "px";
      css.borderWidth = `${bpConfig.borderWidth.val}${unit}`;
    } else {
      css.borderWidth = String(bpConfig.borderWidth);
    }
  }

  // Border style
  if (bpConfig.borderStyle) {
    css.borderStyle = bpConfig.borderStyle;
  }

  // Border color
  if (bpConfig.borderColor) {
    css.borderColor = bpConfig.borderColor;
  }

  // Border radius
  if (bpConfig.borderRadius !== undefined) {
    if (
      typeof bpConfig.borderRadius === "object" &&
      bpConfig.borderRadius.val !== undefined
    ) {
      const unit = bpConfig.borderRadius.unit || "px";
      css.borderRadius = `${bpConfig.borderRadius.val}${unit}`;
    } else {
      css.borderRadius = String(bpConfig.borderRadius);
    }
  }

  // Individual border sides
  if (bpConfig.borderTop) {
    css.borderTop = bpConfig.borderTop;
  }

  if (bpConfig.borderRight) {
    css.borderRight = bpConfig.borderRight;
  }

  if (bpConfig.borderBottom) {
    css.borderBottom = bpConfig.borderBottom;
  }

  if (bpConfig.borderLeft) {
    css.borderLeft = bpConfig.borderLeft;
  }

  // Border shorthand
  if (bpConfig.border) {
    css.border = bpConfig.border;
  }

  return css;
}
