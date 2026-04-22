import type { SK_BlockData, SK_BlockDevice } from "@salekit/core";

export type EditorPageSettings = {
  backgroundType: "color" | "image" | "video";
  backgroundColor: string;
  backgroundImageUrl: string;
  backgroundVideoUrl: string;
  fontFamily: string;
  desktopSize: string;
  mobileSize: string;
  mobileOnly: boolean;
  requireLogin: boolean;
  captcha: boolean;
  language: string;
  pageType: string;
  effect: string;
  dynamicContent: boolean;
  showGrid: boolean;
  snapToGrid: boolean;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  shareImageUrl: string;
  faviconUrl: string;
  canonicalUrl: string;
  useLazyload: boolean;
  googlebotOnly: boolean;
  facebookPixelId: string;
  googleAnalyticsId: string;
  googleAdsId: string;
  tiktokPixelId: string;
  gtmId: string;
  thankYouPage: boolean;
  javascriptCode: string;
  cssCode: string;
};

export type EditorSnapshot = {
  blocks: Record<string, SK_BlockData>;
  hierarchy: Record<string, string[]>;
  popupBlocks: Record<string, SK_BlockData>;
  popupHierarchy: Record<string, string[]>;
  currentDevice: SK_BlockDevice;
  selectedBlockId: string | null;
};

export type DropPosition = {
  top: number;
  left: number;
};

export type EditorContextValue = {
  hydrated: boolean;
  lastSavedAt: number | null;
  setSelectedBlockId: (blockId: string | null) => void;
  undo: () => void;
  redo: () => void;
  saveDocument: () => void;
  restoreDocument: () => void;
};
