import type { SK_BlockDevice } from "../../types";

export interface BuilderState {
  currentDevice: SK_BlockDevice;
  selectedBlockId: string | null;
  isBlockDragging: boolean;
}

export interface BuilderActions {
  setCurrentDevice: (device: SK_BlockDevice) => void;
  selectBlockId: (blockId: string | null) => void;
  setIsBlockDragging: (isDragging: boolean) => void;
}
