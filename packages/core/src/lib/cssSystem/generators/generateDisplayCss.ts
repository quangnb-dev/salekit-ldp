import type { SK_BlockData } from "../../../types";
import { getResponsiveValue } from "../helpers";
import type { Breakpoint, CSSProperties } from "../types";

/**
 * Generate display CSS for blocks
 */
export function generateDisplayCss(
  blockData: SK_BlockData,
  breakpoint: Breakpoint,
): CSSProperties {
  const bpConfig = getResponsiveValue<Record<string, unknown>>(
    blockData.bpConfigs,
    breakpoint,
  );

  const css: CSSProperties = {};

  // Display property
  if (bpConfig.display !== undefined) {
    css.display = bpConfig.display;
  }

  return css;
}
