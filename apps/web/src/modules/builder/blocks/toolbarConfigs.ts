import { getBlockSchemaDefaults, type SK_BlockToolbar } from "@salekit/core";
import { buttonToolbarPresets } from "./button/configs";
import { imageToolbarPresets } from "./image/configs";
import {
  isSupportedLibraryBlockType,
  type SupportedLibraryBlockType,
} from "./supportedBlockTypes";
import { textToolbarPresets } from "./text/configs";

const cloneValue = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

export const TOOLBAR_PRESETS: Record<
  SupportedLibraryBlockType,
  SK_BlockToolbar[]
> = {
  button: buttonToolbarPresets,
  image: imageToolbarPresets,
  text: textToolbarPresets,
  section: [
    {
      id: "section-default",
      type: "section",
      label: "Section",
      overlay: {
        desktop: { width: 320, height: 120 },
        tablet: { width: 280, height: 110 },
        mobile: { width: 220, height: 96 },
      },
      ...getBlockSchemaDefaults("section"),
    },
  ],
};

export function getToolbarPresets(type: string): SK_BlockToolbar[] {
  if (!isSupportedLibraryBlockType(type)) {
    return [];
  }

  return TOOLBAR_PRESETS[type].map((preset) => cloneValue(preset));
}

export function getToolbarConfig(type: string): SK_BlockToolbar | null {
  return getToolbarPresets(type)[0] ?? null;
}
