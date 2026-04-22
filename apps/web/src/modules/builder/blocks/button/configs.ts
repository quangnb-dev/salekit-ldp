import { createAbsoluteBpConfigs } from "@salekit/core";

/**
 * Default bpConfigs preset for a new button block.
 */
export const blockPreset = {
  desktop: {
    ...createAbsoluteBpConfigs(40).desktop,
    width: { val: "120", unit: "px" as const },
    height: { val: "40", unit: "px" as const },
  },
  tablet: {
    ...createAbsoluteBpConfigs(40).tablet,
    width: { val: "120", unit: "px" as const },
    height: { val: "40", unit: "px" as const },
  },
  mobile: {
    ...createAbsoluteBpConfigs(40).mobile,
    width: { val: "100", unit: "px" as const },
    height: { val: "36", unit: "px" as const },
  },
};

/**
 * Overlay dimensions used by BlockToolbar during drag.
 */
export const overlayConfig = {
  desktop: { width: 120, height: 40 },
  tablet: { width: 120, height: 40 },
  mobile: { width: 100, height: 36 },
};

/**
 * Default configs field for a newly created button block.
 */
export const blockDefaults = {
  content: { text: "Click Me" },
};
