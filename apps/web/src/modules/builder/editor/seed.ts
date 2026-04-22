import {
  createBlankPageStructure,
  DEFAULT_SECTION_BLOCK_ID,
} from "@salekit/core";
import type { EditorSnapshot } from "./types";

export const createBlankEditorSnapshot = (): EditorSnapshot => {
  const structure = createBlankPageStructure();

  return {
    blocks: structure.blocks,
    hierarchy: structure.hierarchy,
    popupBlocks: {},
    popupHierarchy: {},
    currentDevice: "desktop",
    selectedBlockId: DEFAULT_SECTION_BLOCK_ID,
  };
};
