import type { Draft } from "immer";

import { createStructureActions } from "./actions/structureActions";
import { createTreeActions } from "./actions/treeActions";
import { createUpdateActions } from "./actions/updateActions";
import type { BlockStore } from "./types";

type BlockStoreSetter = (recipe: (state: Draft<BlockStore>) => void) => void;

export const createBlockStoreState = (set: BlockStoreSetter): BlockStore => ({
  blocks: {},
  hierarchy: {},
  popupBlocks: {},
  popupHierarchy: {},
  ...createStructureActions(set),
  ...createUpdateActions(set),
  ...createTreeActions(set),
});
