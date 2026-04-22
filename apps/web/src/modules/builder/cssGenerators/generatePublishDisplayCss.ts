import type { Breakpoint, CSSProperties, SK_BlockData } from "@salekit/core";
import { getResponsiveValue } from "@salekit/core";

/**
 * Generate CSS for hiding blocks in editor but showing in publish mode
 */
export function generatePublishDisplayCss(
  blockData: SK_BlockData,
  breakpoint: Breakpoint,
): CSSProperties {
  const bpConfig = getResponsiveValue<Record<string, unknown>>(
    blockData.bpConfigs,
    breakpoint,
  );

  const css: CSSProperties = {};

  // If publishDisplay is false, hide in editor
  if (bpConfig.publishDisplay === false) {
    css.display = "none";
  }

  return css;
}
