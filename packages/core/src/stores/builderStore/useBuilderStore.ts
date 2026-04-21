import { create } from "zustand";

import type { BuilderActions, BuilderState } from "./types";

export const useBuilderStore = create<BuilderState & BuilderActions>((set) => ({
  currentDevice: "desktop",
  selectedBlockId: null,

  setCurrentDevice: (device) => set({ currentDevice: device }),

  selectBlockId: (blockId) => set({ selectedBlockId: blockId }),
}));
