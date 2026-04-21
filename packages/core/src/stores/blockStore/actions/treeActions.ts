import type { Draft } from "immer";

import {
  isParentChildRelationValid,
  isSubtreePlacementValid,
} from "../../../constraints";
import {
  applyPositionOffset,
  cloneBlockWithId,
  createUniqueBlockId,
  getActiveData,
} from "../helpers";
import type { BlockActions, BlockStore } from "../types";

type BlockStoreSetter = (recipe: (state: Draft<BlockStore>) => void) => void;

type TreeActions = Pick<BlockActions, "removeBlock" | "duplicateBlock">;

export const createTreeActions = (set: BlockStoreSetter): TreeActions => ({
  removeBlock: (blockId, isPopupEditMode) =>
    set((state) => {
      const { blocksData, hierarchyData } = getActiveData(
        state,
        isPopupEditMode,
      );

      const idsToRemove = new Set<string>();
      const pending: string[] = [blockId];

      while (pending.length > 0) {
        const targetId = pending.pop();
        if (!targetId || idsToRemove.has(targetId)) {
          continue;
        }

        idsToRemove.add(targetId);
        const children = hierarchyData[targetId] || [];
        for (const childId of children) {
          pending.push(childId);
        }
      }

      Object.keys(hierarchyData).forEach((parentId) => {
        const currentChildren = hierarchyData[parentId] ?? [];
        hierarchyData[parentId] = currentChildren.filter(
          (childId) => !idsToRemove.has(childId),
        );
      });

      idsToRemove.forEach((id) => {
        delete blocksData[id];
        delete hierarchyData[id];
      });
    }),
  duplicateBlock: (blockId, newBlockId, isPopupEditMode) =>
    set((state) => {
      const { blocksData, hierarchyData } = getActiveData(
        state,
        isPopupEditMode,
      );

      const sourceBlockData = blocksData[blockId];
      if (!sourceBlockData) {
        return;
      }

      const parentId = Object.keys(hierarchyData).find((id) =>
        (hierarchyData[id] ?? []).includes(blockId),
      );
      if (!parentId) {
        return;
      }

      const parentBlockData = blocksData[parentId];
      if (!isParentChildRelationValid(parentBlockData, sourceBlockData)) {
        return;
      }

      if (!isSubtreePlacementValid(blockId, blocksData, hierarchyData)) {
        return;
      }

      const newMainId =
        newBlockId && !blocksData[newBlockId]
          ? newBlockId
          : createUniqueBlockId(blocksData);
      type DuplicateFrame = {
        originalId: string;
        nextId: string;
        isRoot: boolean;
        parentNextId: string | null;
        initialized: boolean;
        childIds: string[];
        childIndex: number;
      };

      const stack: DuplicateFrame[] = [
        {
          originalId: blockId,
          nextId: newMainId,
          isRoot: true,
          parentNextId: null,
          initialized: false,
          childIds: [],
          childIndex: 0,
        },
      ];

      while (stack.length > 0) {
        const currentFrame = stack[stack.length - 1];
        if (!currentFrame) {
          break;
        }

        if (!currentFrame.initialized) {
          const originalBlockData = blocksData[currentFrame.originalId];
          if (!originalBlockData) {
            stack.pop();
            continue;
          }

          const clonedBlockData = cloneBlockWithId(
            originalBlockData,
            currentFrame.nextId,
          );
          if (
            currentFrame.isRoot &&
            clonedBlockData.type !== "section" &&
            clonedBlockData.cname !== "section"
          ) {
            applyPositionOffset(clonedBlockData);
          }

          blocksData[currentFrame.nextId] = clonedBlockData;
          hierarchyData[currentFrame.nextId] = [];

          if (currentFrame.parentNextId) {
            const duplicatedChildren =
              hierarchyData[currentFrame.parentNextId] ?? [];
            duplicatedChildren.push(currentFrame.nextId);
            hierarchyData[currentFrame.parentNextId] = duplicatedChildren;
          }

          currentFrame.childIds = hierarchyData[currentFrame.originalId] || [];
          currentFrame.initialized = true;
          continue;
        }

        if (currentFrame.childIndex >= currentFrame.childIds.length) {
          stack.pop();
          continue;
        }

        const childId = currentFrame.childIds[currentFrame.childIndex];
        currentFrame.childIndex += 1;
        if (!childId) {
          continue;
        }

        const duplicatedChildId = createUniqueBlockId(blocksData);
        stack.push({
          originalId: childId,
          nextId: duplicatedChildId,
          isRoot: false,
          parentNextId: currentFrame.nextId,
          initialized: false,
          childIds: [],
          childIndex: 0,
        });
      }

      const siblings = hierarchyData[parentId] || [];
      const sourceIndex = siblings.indexOf(blockId);
      if (sourceIndex === -1) {
        siblings.push(newMainId);
      } else {
        siblings.splice(sourceIndex + 1, 0, newMainId);
      }
    }),
});
