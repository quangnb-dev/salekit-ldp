import { createAbsoluteBpConfigs } from "@salekit/core";

/**
 * Default bpConfigs preset for a new text block.
 * All devices start at top:40, left:40 with width:300, height:auto.
 */
export const blockPreset = {
  desktop: {
    ...createAbsoluteBpConfigs(40).desktop,
    width: { val: "300", unit: "px" as const },
    height: { val: "auto", unit: "px" as const },
  },
  tablet: {
    ...createAbsoluteBpConfigs(40).tablet,
    width: { val: "260", unit: "px" as const },
    height: { val: "auto", unit: "px" as const },
  },
  mobile: {
    ...createAbsoluteBpConfigs(40).mobile,
    width: { val: "220", unit: "px" as const },
    height: { val: "auto", unit: "px" as const },
  },
};

/**
 * Overlay dimensions used by BlockToolbar during drag.
 */
export const overlayConfig = {
  desktop: { width: 250, height: 60 },
  tablet: { width: 220, height: 60 },
  mobile: { width: 180, height: 60 },
};

/**
 * Default configs field for a newly created text block.
 */
export const blockDefaults = {
  content: "<p>Text block</p>",
  contentType: "html" as const,
};
