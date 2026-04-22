import { createAbsoluteBpConfigs } from "@salekit/core";

/**
 * Default bpConfigs preset for a new image block.
 */
export const blockPreset = {
  desktop: {
    ...createAbsoluteBpConfigs(40).desktop,
    width: { val: "300", unit: "px" as const },
    height: { val: "180", unit: "px" as const },
  },
  tablet: {
    ...createAbsoluteBpConfigs(40).tablet,
    width: { val: "260", unit: "px" as const },
    height: { val: "160", unit: "px" as const },
  },
  mobile: {
    ...createAbsoluteBpConfigs(40).mobile,
    width: { val: "200", unit: "px" as const },
    height: { val: "120", unit: "px" as const },
  },
};

/**
 * Overlay dimensions used by BlockToolbar during drag.
 */
export const overlayConfig = {
  desktop: { width: 300, height: 180 },
  tablet: { width: 260, height: 160 },
  mobile: { width: 200, height: 120 },
};

/**
 * Default configs field for a newly created image block.
 */
export const blockDefaults = {
  url: "",
  alt: "Image",
};
