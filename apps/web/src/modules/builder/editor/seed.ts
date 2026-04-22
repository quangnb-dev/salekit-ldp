import {
  createAbsoluteBpConfigs,
  createBlockData,
  type SK_BlockData,
  type SK_BlockStructure,
} from "@salekit/core";
import type { EditorPageSettings, EditorSnapshot } from "./types";

export const PAGE_BLOCK_ID = "page";
export const DEFAULT_PAGE_WIDTH = 1200;
export const DEFAULT_PAGE_SETTINGS: EditorPageSettings = {
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
  language: "Tiếng Việt",
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
};

const createTextBlock = (
  id: string,
  label: string,
  _top: number,
  _left: number,
  content: string,
): SK_BlockData =>
  createBlockData("text", id, {
    label,
    bpConfigs: createAbsoluteBpConfigs(),
    configs: {
      content,
    },
  });

const createButtonBlock = (
  id: string,
  label: string,
  _top: number,
  _left: number,
): SK_BlockData =>
  createBlockData("button", id, {
    label,
    bpConfigs: createAbsoluteBpConfigs(),
    configs: {
      text: label,
      variant: "primary",
    },
  });

export const createSeedSnapshot = (): EditorSnapshot => {
  const page = createBlockData("page", PAGE_BLOCK_ID, {
    configs: {
      pageSettings: DEFAULT_PAGE_SETTINGS,
    },
  });
  const hero = createBlockData("section", "section-hero", {
    label: "Hero section",
    bpConfigs: {
      desktop: {
        ...createAbsoluteBpConfigs(80).desktop,
        width: { val: 1120, unit: "px" },
        height: { val: 420, unit: "px" },
      },
      tablet: {
        ...createAbsoluteBpConfigs(56).tablet,
        width: { val: 720, unit: "px" },
        height: { val: 420, unit: "px" },
      },
      mobile: {
        ...createAbsoluteBpConfigs(24).mobile,
        width: { val: 360, unit: "px" },
        height: { val: 460, unit: "px" },
      },
    },
    configs: {
      tone: "hero",
    },
  });
  const headline = createTextBlock(
    "headline-1",
    "Headline",
    72,
    56,
    "Sáng tạo landing page nhanh hơn",
  );
  const description = createTextBlock(
    "description-1",
    "Description",
    132,
    56,
    "Kéo thả block theo absolute top/left ngay trên canvas web.",
  );
  const cta = createButtonBlock("cta-1", "Bắt đầu thiết kế", 220, 56);

  const blocks = {
    [page.id]: page,
    [hero.id]: hero,
    [headline.id]: headline,
    [description.id]: description,
    [cta.id]: cta,
  };

  const hierarchy: SK_BlockStructure["hierarchy"] = {
    [page.id]: [hero.id],
    [hero.id]: [headline.id, description.id, cta.id],
    [headline.id]: [],
    [description.id]: [],
    [cta.id]: [],
  };

  return {
    blocks,
    hierarchy,
    popupBlocks: {},
    popupHierarchy: {},
    currentDevice: "desktop",
    selectedBlockId: hero.id,
  };
};
