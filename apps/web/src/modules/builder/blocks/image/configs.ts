import { createAbsoluteBpConfigs, type SK_BlockToolbar } from "@salekit/core";

const basePreset = createAbsoluteBpConfigs(40);

export const imageToolbarPresets: SK_BlockToolbar[] = [
  {
    id: "image-default",
    type: "image",
    cname: "image",
    label: "Anh",
    bpConfigs: {
      desktop: {
        ...basePreset.desktop,
        width: { val: "300", unit: "px" as const },
        height: { val: "180", unit: "px" as const },
      },
      tablet: {
        ...basePreset.tablet,
        width: { val: "260", unit: "px" as const },
        height: { val: "160", unit: "px" as const },
      },
      mobile: {
        ...basePreset.mobile,
        width: { val: "200", unit: "px" as const },
        height: { val: "120", unit: "px" as const },
      },
    },
    configs: {
      url: "",
      alt: "Image",
    },
    overlay: {
      desktop: { width: 300, height: 180 },
      tablet: { width: 260, height: 160 },
      mobile: { width: 200, height: 120 },
    },
  },
];
