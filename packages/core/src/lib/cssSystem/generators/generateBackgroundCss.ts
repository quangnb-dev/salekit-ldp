import type { SK_BlockData } from "../../../types";
import { getResponsiveValue } from "../helpers";
import type { Breakpoint, CSSProperties } from "../types";

/**
 * Generate background CSS for blocks
 */
export function generateBackgroundCss(
  blockData: SK_BlockData,
  breakpoint: Breakpoint,
): CSSProperties {
  const bpConfig = getResponsiveValue<Record<string, unknown>>(
    blockData.bpConfigs,
    breakpoint,
  );

  const css: CSSProperties = {};

  // Background color
  if (bpConfig.backgroundColor) {
    css.backgroundColor = bpConfig.backgroundColor;
  }

  // Background image
  if (bpConfig.backgroundImage) {
    css.backgroundImage = `url(${bpConfig.backgroundImage})`;

    if (bpConfig.backgroundSize) {
      css.backgroundSize = bpConfig.backgroundSize;
    }

    if (bpConfig.backgroundPosition) {
      css.backgroundPosition = bpConfig.backgroundPosition;
    }

    if (bpConfig.backgroundRepeat) {
      css.backgroundRepeat = bpConfig.backgroundRepeat;
    }
  }

  // Background gradient
  if (bpConfig.backgroundGradient) {
    css.backgroundImage = bpConfig.backgroundGradient;
  }

  // Background (shorthand)
  if (bpConfig.background) {
    css.background = bpConfig.background;
  }

  return css;
}
