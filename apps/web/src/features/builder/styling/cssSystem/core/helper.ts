import type { SK_BlockData } from "@salekit/core";

import type { Breakpoint, CSSProperties, DeviceConfig } from "./types";

export const DEVICE_CONFIGS: Record<Breakpoint, DeviceConfig> = {
  desktop: {
    mediaQuery: "",
    fallback: null,
  },
  tablet: {
    mediaQuery: "@media (max-width: 1024px)",
    fallback: "desktop",
  },
  mobile: {
    mediaQuery: "@media (max-width: 768px)",
    fallback: "desktop",
  },
};

type ConfigValue = {
  val?: string | number;
  unit?: string;
};

export function getResponsiveValue<T = Record<string, unknown>>(
  bpConfigs: SK_BlockData["bpConfigs"],
  breakpoint: Breakpoint,
): T {
  const config = DEVICE_CONFIGS[breakpoint];
  const baseConfig = config.fallback ? bpConfigs[config.fallback] : {};
  const targetConfig = bpConfigs[breakpoint] || {};

  return deepMerge(baseConfig, targetConfig) as T;
}

function deepMerge<T>(
  target: Record<string, unknown>,
  source: Record<string, unknown>,
): T {
  const output = { ...target };

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(
            target[key] as Record<string, unknown>,
            source[key] as Record<string, unknown>,
          );
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }

  return output as T;
}

function isObject(item: unknown): boolean {
  return item !== null && typeof item === "object" && !Array.isArray(item);
}

export function cssObjectToString(cssObj: CSSProperties): string {
  return Object.entries(cssObj)
    .map(([key, value]) => {
      const kebabKey = key.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
      return `${kebabKey}: ${value};`;
    })
    .join(" ");
}

type BaseCssConfig = Record<string, unknown> & {
  position?: string | ConfigValue;
  top?: ConfigValue;
  left?: ConfigValue;
  width?: ConfigValue;
  height?: ConfigValue;
  zIndex?: string | number;
  display?: string | number;
};

export function generateAbsoluteBaseCss(
  blockData: SK_BlockData,
  breakpoint: Breakpoint,
): CSSProperties {
  const bpConfig = getResponsiveValue<BaseCssConfig>(
    blockData.bpConfigs,
    breakpoint,
  );

  const css: CSSProperties = {};

  if (
    typeof bpConfig.position === "object" &&
    bpConfig.position?.val !== undefined
  ) {
    css.position = bpConfig.position.val;
  } else if (typeof bpConfig.position === "string") {
    css.position = bpConfig.position;
  } else {
    css.position = "absolute";
  }

  if (bpConfig.top?.val !== undefined) {
    const unit = bpConfig.top.unit || "px";
    css.top = `${bpConfig.top.val}${unit}`;
  } else {
    css.top = "0px";
  }

  if (bpConfig.left?.val !== undefined) {
    const unit = bpConfig.left.unit || "px";
    css.left = `${bpConfig.left.val}${unit}`;
  } else {
    css.left = "0px";
  }

  if (bpConfig.width?.val !== undefined) {
    const unit = bpConfig.width.unit || "px";
    css.width = `${bpConfig.width.val}${unit}`;
  } else {
    css.width = "100%";
  }

  if (bpConfig.height?.val !== undefined) {
    const unit = bpConfig.height.unit || "px";
    css.height = `${bpConfig.height.val}${unit}`;
  } else {
    css.height = "100%";
  }

  css.zIndex = bpConfig.zIndex ?? 1;
  css.display = bpConfig.display ?? "block";

  return css;
}

type BackgroundCssConfig = Record<string, unknown> & {
  backgroundColor?: string | number;
  backgroundImage?: string | number;
  backgroundSize?: string | number;
  backgroundPosition?: string | number;
  backgroundRepeat?: string | number;
  backgroundGradient?: string | number;
  background?: string | number;
};

export function generateBackgroundCss(
  blockData: SK_BlockData,
  breakpoint: Breakpoint,
): CSSProperties {
  const bpConfig = getResponsiveValue<BackgroundCssConfig>(
    blockData.bpConfigs,
    breakpoint,
  );

  const css: CSSProperties = {};

  if (bpConfig.backgroundColor) {
    css.backgroundColor = bpConfig.backgroundColor;
  }

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

  if (bpConfig.backgroundGradient) {
    css.backgroundImage = bpConfig.backgroundGradient;
  }

  if (bpConfig.background) {
    css.background = bpConfig.background;
  }

  return css;
}

type BorderCssConfig = Record<string, unknown> & {
  borderWidth?: string | number | ConfigValue;
  borderStyle?: string | number;
  borderColor?: string | number;
  borderRadius?: string | number | ConfigValue;
  borderTop?: string | number;
  borderRight?: string | number;
  borderBottom?: string | number;
  borderLeft?: string | number;
  border?: string | number;
};

export function generateBorderCss(
  blockData: SK_BlockData,
  breakpoint: Breakpoint,
): CSSProperties {
  const bpConfig = getResponsiveValue<BorderCssConfig>(
    blockData.bpConfigs,
    breakpoint,
  );

  const css: CSSProperties = {};

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

  if (bpConfig.borderStyle) {
    css.borderStyle = bpConfig.borderStyle;
  }

  if (bpConfig.borderColor) {
    css.borderColor = bpConfig.borderColor;
  }

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

  if (bpConfig.border) {
    css.border = bpConfig.border;
  }

  return css;
}

type TextCssConfig = Record<string, unknown> & {
  fontFamily?: string | number;
  fontSize?: string | number | ConfigValue;
  fontWeight?: string | number;
  lineHeight?: string | number | ConfigValue;
  color?: string | number;
  textAlign?: string | number;
};

export function generateTextCss(
  blockData: SK_BlockData,
  breakpoint: Breakpoint,
): CSSProperties {
  const bpConfig = getResponsiveValue<TextCssConfig>(
    blockData.bpConfigs,
    breakpoint,
  );

  const css: CSSProperties = {};

  if (bpConfig.fontFamily) {
    css.fontFamily = bpConfig.fontFamily;
  }

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

  if (bpConfig.fontWeight) {
    css.fontWeight = bpConfig.fontWeight;
  }

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

  if (bpConfig.color) {
    css.color = bpConfig.color;
  }

  if (bpConfig.textAlign) {
    css.textAlign = bpConfig.textAlign;
  }

  return css;
}
