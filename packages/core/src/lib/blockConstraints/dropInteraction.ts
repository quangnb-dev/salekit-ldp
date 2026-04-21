import type { SK_BlockData } from "../../types";
import type { BlockOptionData } from "../../stores/blockStore";

const resolveCandidateBlockData = (
  blockId: string,
  rootId: string,
  rootData: SK_BlockData,
  optionData: BlockOptionData | undefined,
  blocksData: Record<string, SK_BlockData>,
): SK_BlockData | undefined => {
  if (blockId === rootId) return rootData;
  if (optionData?.childData?.[blockId]) return optionData.childData[blockId];
  return blocksData[blockId];
};

export const isOptionDataPlacementValid = (
  rootId: string,
  rootData: SK_BlockData,
  optionData: BlockOptionData | undefined,
  blocksData: Record<string, SK_BlockData>,
): boolean => {
  if (!optionData) return true;

  for (const childId of optionData.firstChildIds ?? []) {
    const childData = resolveCandidateBlockData(childId, rootId, rootData, optionData, blocksData);
    if (childData && childData.id === rootData.id) return false;
  }

  for (const [parentId, childIds] of Object.entries(optionData.childIds ?? {})) {
    const parentData = resolveCandidateBlockData(parentId, rootId, rootData, optionData, blocksData);
    for (const childId of childIds ?? []) {
      const childData = resolveCandidateBlockData(childId, rootId, rootData, optionData, blocksData);
      if (parentData && childData && parentData.id === childData.id) return false;
    }
  }

  return true;
};
