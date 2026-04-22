import { createAbsoluteBpConfigs } from "@salekit/core";
import {
  blockDefaults as buttonDefaults,
  overlayConfig as buttonOverlay,
  blockPreset as buttonPreset,
} from "./button/configs";
import {
  blockDefaults as imageDefaults,
  overlayConfig as imageOverlay,
  blockPreset as imagePreset,
} from "./image/configs";
import {
  blockDefaults as textDefaults,
  overlayConfig as textOverlay,
  blockPreset as textPreset,
} from "./text/configs";

type OverlaySizes = {
  desktop: { width: number; height: number };
  tablet: { width: number; height: number };
  mobile: { width: number; height: number };
};

type ToolbarConfig = {
  type: string;
  cname: string;
  bpConfigs: Record<string, unknown>;
  configs?: Record<string, unknown>;
  overlay: OverlaySizes;
  label: string;
};

/** Generic fallback preset for block types without dedicated configs. */
const genericPreset = createAbsoluteBpConfigs(40);
const genericOverlay: OverlaySizes = {
  desktop: { width: 200, height: 60 },
  tablet: { width: 180, height: 60 },
  mobile: { width: 160, height: 50 },
};

/**
 * Maps sidebar item types to their BlockToolbar blockData and overlay config.
 * Used by BlockMenuList to wrap items in BlockToolbar for interactjs drag-to-drop.
 */
export const TOOLBAR_CONFIGS: Record<string, ToolbarConfig> = {
  text: {
    type: "text",
    cname: "text",
    bpConfigs: textPreset,
    configs: textDefaults,
    overlay: textOverlay,
    label: "Văn bản",
  },
  image: {
    type: "image",
    cname: "image",
    bpConfigs: imagePreset,
    configs: imageDefaults,
    overlay: imageOverlay,
    label: "Ảnh",
  },
  button: {
    type: "button",
    cname: "button",
    bpConfigs: buttonPreset,
    configs: buttonDefaults,
    overlay: buttonOverlay,
    label: "Nút bấm",
  },
};

/** Get toolbar config for a given item type, falling back to a generic preset. */
export function getToolbarConfig(type: string): ToolbarConfig {
  return (
    TOOLBAR_CONFIGS[type] ?? {
      type,
      cname: type,
      bpConfigs: genericPreset,
      overlay: genericOverlay,
      label: type,
    }
  );
}
