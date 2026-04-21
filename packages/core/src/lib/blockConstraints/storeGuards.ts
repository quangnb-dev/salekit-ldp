import type { SK_BlockData } from "../../types";

export const isParentChildRelationValid = (
  parentBlockData: SK_BlockData | null | undefined,
  childBlockData: SK_BlockData | null | undefined,
): boolean => {
  if (!parentBlockData || !childBlockData) {
    return true;
  }

  return parentBlockData.id !== childBlockData.id;
};

export const isSubtreePlacementValid = (
  blockId: string,
  blocks: Record<string, SK_BlockData>,
  hierarchy: Record<string, string[]>,
  visited: Set<string> = new Set(),
): boolean => {
  const pending = [blockId];

  while (pending.length > 0) {
    const currentId = pending.pop();
    if (!currentId) continue;
    if (visited.has(currentId)) return false;

    visited.add(currentId);
    const parent = blocks[currentId];
    if (!parent) continue;

    for (const childId of hierarchy[currentId] ?? []) {
      const child = blocks[childId];
      if (!isParentChildRelationValid(parent, child)) {
        return false;
      }
      pending.push(childId);
    }
  }

  return true;
};
