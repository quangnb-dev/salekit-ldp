import { createAbsoluteBpConfigs, type SK_BlockToolbar } from "@salekit/core";

const basePreset = createAbsoluteBpConfigs(40);

export const textToolbarPresets: SK_BlockToolbar[] = [
  {
    id: "text-default",
    type: "text",
    cname: "text",
    label: "Văn bản",
    bpConfigs: {
      desktop: {
        ...basePreset.desktop,
        width: { val: "300", unit: "px" as const },
        height: { val: "auto", unit: "px" as const },
      },
      tablet: {
        ...basePreset.tablet,
        width: { val: "260", unit: "px" as const },
        height: { val: "auto", unit: "px" as const },
      },
      mobile: {
        ...basePreset.mobile,
        width: { val: "220", unit: "px" as const },
        height: { val: "auto", unit: "px" as const },
      },
    },
    configs: {
      content: "<p>Khối văn bản</p>",
      contentType: "html" as const,
    },
    overlay: {
      desktop: { width: 250, height: 60 },
      tablet: { width: 220, height: 60 },
      mobile: { width: 180, height: 60 },
    },
  },
];
