import { createAbsoluteBpConfigs, type SK_BlockToolbar } from "@salekit/core";

const basePreset = createAbsoluteBpConfigs(40);

export const buttonToolbarPresets: SK_BlockToolbar[] = [
  {
    id: "button-default",
    type: "button",
    cname: "button",
    label: "Nut bam",
    bpConfigs: {
      desktop: {
        ...basePreset.desktop,
        width: { val: "120", unit: "px" as const },
        height: { val: "40", unit: "px" as const },
      },
      tablet: {
        ...basePreset.tablet,
        width: { val: "120", unit: "px" as const },
        height: { val: "40", unit: "px" as const },
      },
      mobile: {
        ...basePreset.mobile,
        width: { val: "100", unit: "px" as const },
        height: { val: "36", unit: "px" as const },
      },
    },
    configs: {
      content: { text: "Click Me" },
    },
    overlay: {
      desktop: { width: 120, height: 40 },
      tablet: { width: 120, height: 40 },
      mobile: { width: 100, height: 36 },
    },
  },
];
