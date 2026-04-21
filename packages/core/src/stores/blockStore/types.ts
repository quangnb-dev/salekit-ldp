import type {
  SK_BlockData,
  SK_BlockDevice,
  SK_BlockStructure,
} from "../../types";

export interface BlockOptionData {
  firstChildIds: string[];
  childIds: Record<string, string[]>;
  childData: Record<string, SK_BlockData>;
}

export interface BlockState {
  blocks: Record<string, SK_BlockData>;
  hierarchy: Record<string, string[]>;
  popupBlocks: Record<string, SK_BlockData>;
  popupHierarchy: Record<string, string[]>;
}

export interface BlockActions {
  setBlocks: (
    blocks: Record<string, SK_BlockData>,
    isPopupEditMode?: boolean,
  ) => void;
  setHierarchy: (
    hierarchy: Record<string, string[]>,
    isPopupEditMode?: boolean,
  ) => void;
  addBlock: (
    draggableId: string,
    dropzoneId: string,
    blockData: SK_BlockData,
    selectedBlockId?: string,
    optionData?: BlockOptionData,
    isPopupEditMode?: boolean,
    index?: number,
  ) => void;
  addBlockSection: (
    newSectionId: string,
    selectedIndex: number,
    addToAfter: boolean,
    structure?: SK_BlockStructure,
  ) => void;
  addBlockPopup: (newPopupId: string, structure?: SK_BlockStructure) => void;
  removeBlock: (blockId: string, isPopupEditMode?: boolean) => void;
  updateBlock: (
    blockId: string,
    blockData: Partial<SK_BlockData>,
    isPopupEditMode?: boolean,
  ) => void;
  updateHierarchy: (
    parentId: string,
    childIds: string[],
    isPopupEditMode?: boolean,
  ) => void;
  updateBlockProperty: <
    T extends string | number | boolean | Record<string, unknown>,
  >(
    blockId: string,
    device: SK_BlockDevice,
    path: string,
    value: T,
    isPopupEditMode?: boolean,
  ) => void;
  updateBlockConfigsProperty: <
    T extends string | number | boolean | Record<string, unknown>,
  >(
    blockId: string,
    path: string,
    value: T,
    isPopupEditMode?: boolean,
  ) => void;
  updateBlockMultipleProperty: <
    T extends string | number | boolean | Record<string, unknown>,
  >(
    blockId: string,
    device: SK_BlockDevice | null,
    path: string,
    value: T,
    options?: { parentId?: string; target?: "bpConfigs" | "configs" | "both" },
    isPopupEditMode?: boolean,
  ) => void;
  duplicateBlock: (
    blockId: string,
    newBlockId: string,
    isPopupEditMode?: boolean,
  ) => void;
}

export type BlockStore = BlockState & BlockActions;
