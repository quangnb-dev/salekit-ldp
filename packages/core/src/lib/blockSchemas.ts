import { createAbsoluteBpConfigs } from "../configs";
import type {
  SK_BlockData,
  SK_BlockDevice,
  SK_BlockType,
  SK_Layout,
} from "../types";

export interface SK_BlockSchema<T = Record<string, unknown>> {
  type: SK_BlockType;
  cname: SK_BlockType;
  label: string;
  layout: SK_Layout;
  allowedChildren: SK_BlockType[];
  bpConfigs: Record<SK_BlockDevice, T>;
  configs: Record<string, unknown>;
}

const cloneValue = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

const nestedContentBlockTypes: SK_BlockType[] = [
  "text",
  "button",
  "image",
  "group",
  "box",
  "line",
  "overlay",
  "video",
  "form",
  "countdown",
];

export const DEFAULT_PAGE_SETTINGS = {
  backgroundType: "color",
  backgroundColor:
    "linear-gradient(90deg, rgba(15,118,110,1) 0%, rgba(59,130,246,1) 100%)",
  backgroundImageUrl: "",
  backgroundVideoUrl: "",
  fontFamily: "Roboto",
  desktopSize: "1200px",
  mobileSize: "390px",
  mobileOnly: false,
  requireLogin: false,
  captcha: false,
  language: "Tieng Viet",
  pageType: "Landing page",
  effect: "Fade in",
  dynamicContent: false,
  showGrid: true,
  snapToGrid: true,
  seoTitle: "SaleKit Landing Page",
  seoDescription: "Landing page builder preview.",
  seoKeywords: "landing page, salekit",
  shareImageUrl: "",
  faviconUrl: "",
  canonicalUrl: "",
  useLazyload: false,
  googlebotOnly: true,
  facebookPixelId: "",
  googleAnalyticsId: "",
  googleAdsId: "",
  tiktokPixelId: "",
  gtmId: "",
  thankYouPage: false,
  javascriptCode: "",
  cssCode: "",
} as const satisfies Record<string, unknown>;

const createResponsiveAbsoluteConfigs = (sizes: {
  desktop: { offset: number; width: string; height: string };
  tablet: { offset: number; width: string; height: string };
  mobile: { offset: number; width: string; height: string };
}) => ({
  desktop: {
    ...createAbsoluteBpConfigs(sizes.desktop.offset).desktop,
    width: { val: sizes.desktop.width, unit: "px" as const },
    height: { val: sizes.desktop.height, unit: "px" as const },
  },
  tablet: {
    ...createAbsoluteBpConfigs(sizes.tablet.offset).tablet,
    width: { val: sizes.tablet.width, unit: "px" as const },
    height: { val: sizes.tablet.height, unit: "px" as const },
  },
  mobile: {
    ...createAbsoluteBpConfigs(sizes.mobile.offset).mobile,
    width: { val: sizes.mobile.width, unit: "px" as const },
    height: { val: sizes.mobile.height, unit: "px" as const },
  },
});

const createSectionBpConfigs = (sizes: {
  desktop: { innerWidth: string; height: string };
  tablet: { innerWidth: string; height: string };
  mobile: { innerWidth: string; height: string };
}) => ({
  desktop: {
    position: "relative",
    innerWidth: { val: sizes.desktop.innerWidth, unit: "px" as const },
    height: { val: sizes.desktop.height, unit: "px" as const },
  },
  tablet: {
    position: "relative",
    innerWidth: { val: sizes.tablet.innerWidth, unit: "px" as const },
    height: { val: sizes.tablet.height, unit: "px" as const },
  },
  mobile: {
    position: "relative",
    innerWidth: { val: sizes.mobile.innerWidth, unit: "px" as const },
    height: { val: sizes.mobile.height, unit: "px" as const },
  },
});

const createSchema = (
  type: SK_BlockType,
  label: string,
  allowedChildren: SK_BlockType[],
  options?: Partial<Pick<SK_BlockSchema, "bpConfigs" | "configs">>,
): SK_BlockSchema => ({
  type,
  cname: type,
  label,
  layout: "absolute",
  allowedChildren,
  bpConfigs: cloneValue(options?.bpConfigs ?? createAbsoluteBpConfigs()),
  configs: cloneValue(options?.configs ?? {}),
});

export const BLOCK_SCHEMAS: Record<SK_BlockType, SK_BlockSchema> = {
  page: createSchema("page", "Page", ["section", "popup"], {
    configs: {
      pageSettings: DEFAULT_PAGE_SETTINGS,
    },
  }),
  section: createSchema("section", "Section", nestedContentBlockTypes, {
    bpConfigs: createSectionBpConfigs({
      desktop: { innerWidth: "1200", height: "320" },
      tablet: { innerWidth: "768", height: "320" },
      mobile: { innerWidth: "390", height: "360" },
    }),
  }),
  text: createSchema("text", "Text", [], {
    bpConfigs: createResponsiveAbsoluteConfigs({
      desktop: { offset: 40, width: "300", height: "60" },
      tablet: { offset: 40, width: "260", height: "60" },
      mobile: { offset: 40, width: "220", height: "60" },
    }),
    configs: {
      content: "<p>Text block</p>",
      contentType: "html",
    },
  }),
  button: createSchema("button", "Button", [], {
    bpConfigs: createResponsiveAbsoluteConfigs({
      desktop: { offset: 40, width: "120", height: "40" },
      tablet: { offset: 40, width: "120", height: "40" },
      mobile: { offset: 40, width: "100", height: "36" },
    }),
    configs: {
      content: { text: "Click Me" },
    },
  }),
  image: createSchema("image", "Image", [], {
    bpConfigs: createResponsiveAbsoluteConfigs({
      desktop: { offset: 40, width: "300", height: "180" },
      tablet: { offset: 40, width: "260", height: "160" },
      mobile: { offset: 40, width: "200", height: "120" },
    }),
    configs: {
      url: "",
      alt: "Image",
    },
  }),
  group: createSchema("group", "Group", nestedContentBlockTypes, {
    bpConfigs: createResponsiveAbsoluteConfigs({
      desktop: { offset: 40, width: "320", height: "240" },
      tablet: { offset: 40, width: "280", height: "220" },
      mobile: { offset: 40, width: "220", height: "200" },
    }),
  }),
  box: createSchema("box", "Box", nestedContentBlockTypes, {
    bpConfigs: createResponsiveAbsoluteConfigs({
      desktop: { offset: 40, width: "320", height: "240" },
      tablet: { offset: 40, width: "280", height: "220" },
      mobile: { offset: 40, width: "220", height: "200" },
    }),
  }),
  line: createSchema("line", "Line", []),
  overlay: createSchema("overlay", "Overlay", nestedContentBlockTypes, {
    bpConfigs: createResponsiveAbsoluteConfigs({
      desktop: { offset: 40, width: "320", height: "240" },
      tablet: { offset: 40, width: "280", height: "220" },
      mobile: { offset: 40, width: "220", height: "200" },
    }),
  }),
  video: createSchema("video", "Video", []),
  form: createSchema("form", "Form", []),
  countdown: createSchema("countdown", "Countdown", []),
  popup: createSchema("popup", "Popup", nestedContentBlockTypes, {
    bpConfigs: createResponsiveAbsoluteConfigs({
      desktop: { offset: 40, width: "640", height: "360" },
      tablet: { offset: 32, width: "560", height: "320" },
      mobile: { offset: 24, width: "320", height: "280" },
    }),
  }),
};

export const getBlockSchema = (type: SK_BlockType): SK_BlockSchema =>
  BLOCK_SCHEMAS[type];

export const hasBlockSchema = (type: string): type is SK_BlockType =>
  type in BLOCK_SCHEMAS;

export const isBlockLeafSchema = (type: SK_BlockType): boolean =>
  BLOCK_SCHEMAS[type].allowedChildren.length === 0;

export const getBlockSchemaDefaults = (
  type: SK_BlockType,
): Pick<SK_BlockData, "bpConfigs" | "configs" | "cname"> => {
  const schema = getBlockSchema(type);

  return {
    bpConfigs: cloneValue(schema.bpConfigs),
    configs: cloneValue(schema.configs),
    cname: schema.cname,
  };
};
