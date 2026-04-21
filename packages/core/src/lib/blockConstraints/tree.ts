import type { BlockOptionData } from "../../stores/blockStore";
import type { SK_BlockData } from "../../types";

type BlocksMap = Record<string, SK_BlockData>;
type HierarchyMap = Record<string, string[]>;

const resolveCandidateBlockData = (
  blockId: string,
  rootId: string,
  rootData: SK_BlockData,
  optionData: BlockOptionData | undefined,
  blocksData: BlocksMap,
): SK_BlockData | undefined => {
  if (blockId === rootId) {
    return rootData;
  }
  if (optionData?.childData?.[blockId]) {
    return optionData.childData[blockId];
  }
  return blocksData[blockId];
};

export const isParentChildRelationValid = (
  parentData: SK_BlockData | null | undefined,
  childData: SK_BlockData | null | undefined,
): boolean => {
  if (!parentData || !childData) {
    return true;
  }
  if (parentData.id === childData.id) {
    return false;
  }
  return true;
};

export const isOptionDataPlacementValid = (
  rootId: string,
  rootData: SK_BlockData,
  optionData: BlockOptionData | undefined,
  blocksData: BlocksMap,
): boolean => {
  if (!optionData) {
    return true;
  }

  for (const childId of optionData.firstChildIds || []) {
    const childData = resolveCandidateBlockData(
      childId,
      rootId,
      rootData,
      optionData,
      blocksData,
    );
    if (!isParentChildRelationValid(rootData, childData)) {
      return false;
    }
  }

  for (const [parentId, childIds] of Object.entries(
    optionData.childIds || {},
  )) {
    const parentData = resolveCandidateBlockData(
      parentId,
      rootId,
      rootData,
      optionData,
      blocksData,
    );
    for (const childId of childIds || []) {
      const childData = resolveCandidateBlockData(
        childId,
        rootId,
        rootData,
        optionData,
        blocksData,
      );
      if (!isParentChildRelationValid(parentData, childData)) {
        return false;
      }
    }
  }

  return true;
};

export const isSubtreePlacementValid = (
  rootId: string,
  blocksData: BlocksMap,
  hierarchyData: HierarchyMap,
  visited: Set<string> = new Set(),
): boolean => {
  const pending: string[] = [rootId];

  while (pending.length > 0) {
    const currentId = pending.pop();
    if (!currentId) {
      continue;
    }

    if (visited.has(currentId)) {
      return false;
    }
    visited.add(currentId);

    const parentData = blocksData[currentId];
    if (!parentData) {
      continue;
    }

    for (const childId of hierarchyData[currentId] || []) {
      const childData = blocksData[childId];
      if (!isParentChildRelationValid(parentData, childData)) {
        return false;
      }

      pending.push(childId);
    }
  }

  return true;
};
