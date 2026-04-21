import { temporal } from "zundo";
import { subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";

import { createBlockStoreState } from "./createBlockStoreState";
import type { BlockStore } from "./types";

export const useBlockStore = createWithEqualityFn<BlockStore>()(
  temporal(subscribeWithSelector(immer((set) => createBlockStoreState(set))), {
    partialize(state) {
      const { blocks, hierarchy, popupBlocks, popupHierarchy } = state;
      return { blocks, hierarchy, popupBlocks, popupHierarchy };
    },
  }),
  shallow,
);
