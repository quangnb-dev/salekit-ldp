import type { SK_BlockData } from "../../../types";
import { getResponsiveValue } from "../helpers";
import type { Breakpoint, CSSProperties } from "../types";

/**
 * Generate absolute positioning CSS for blocks
 * This is specific to salekit-ldp which uses absolute positioning
 * (NOT grid-based like shopone)
 */
export function generateAbsoluteBaseCss(
  blockData: SK_BlockData,
  breakpoint: Breakpoint,
): CSSProperties {
  const bpConfig = getResponsiveValue<Record<string, unknown>>(
    blockData.bpConfigs,
    breakpoint,
  );

  const css: CSSProperties = {};

  // Position
  if (bpConfig.position?.val !== undefined) {
    css.position = bpConfig.position.val;
  } else {
    css.position = "absolute";
  }

  // Top
  if (bpConfig.top?.val !== undefined) {
    const unit = bpConfig.top.unit || "px";
    css.top = `${bpConfig.top.val}${unit}`;
  } else {
    css.top = "0px";
  }

  // Left
  if (bpConfig.left?.val !== undefined) {
    const unit = bpConfig.left.unit || "px";
    css.left = `${bpConfig.left.val}${unit}`;
  } else {
    css.left = "0px";
  }

  // Width
  if (bpConfig.width?.val !== undefined) {
    const unit = bpConfig.width.unit || "px";
    css.width = `${bpConfig.width.val}${unit}`;
  } else {
    css.width = "100px";
  }

  // Height
  if (bpConfig.height?.val !== undefined) {
    const unit = bpConfig.height.unit || "px";
    css.height = `${bpConfig.height.val}${unit}`;
  } else {
    css.height = "100px";
  }

  // Z-index
  if (bpConfig.zIndex !== undefined) {
    css.zIndex = bpConfig.zIndex;
  } else {
    css.zIndex = 1;
  }

  // Display
  if (bpConfig.display !== undefined) {
    css.display = bpConfig.display;
  } else {
    css.display = "block";
  }

  return css;
}
