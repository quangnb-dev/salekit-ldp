import type { Draft } from "immer";

import { isParentChildRelationValid } from "../../../constraints";
import {
  getActiveData,
  isPlainObject,
  setNestedValue,
  updateProperties,
} from "../helpers";
import type { BlockActions, BlockStore } from "../types";

type BlockStoreSetter = (recipe: (state: Draft<BlockStore>) => void) => void;

type UpdateActions = Pick<
  BlockActions,
  | "updateBlock"
  | "updateHierarchy"
  | "updateBlockProperty"
  | "updateBlockConfigsProperty"
  | "updateBlockMultipleProperty"
>;

export const createUpdateActions = (set: BlockStoreSetter): UpdateActions => ({
  updateBlock: (blockId, blockData, isPopupEditMode) =>
    set((state) => {
      const { blocksData } = getActiveData(state, isPopupEditMode);

      if (!blocksData[blockId]) {
        return;
      }

      blocksData[blockId] = {
        ...blocksData[blockId],
        ...blockData,
      };
    }),
  updateHierarchy: (parentId, childIds, isPopupEditMode) =>
    set((state) => {
      const { blocksData, hierarchyData } = getActiveData(
        state,
        isPopupEditMode,
      );

      const parentBlockData = blocksData[parentId];
      const hasInvalidRelation = childIds.some((childId) => {
        const childBlockData = blocksData[childId];
        return !isParentChildRelationValid(parentBlockData, childBlockData);
      });

      if (hasInvalidRelation) {
        return;
      }

      hierarchyData[parentId] = childIds;
    }),
  updateBlockProperty: (blockId, device, path, value, isPopupEditMode) =>
    set((state) => {
      const { blocksData } = getActiveData(state, isPopupEditMode);

      const blockData = blocksData[blockId];
      if (!blockData) {
        return;
      }

      if (!isPlainObject(blockData.bpConfigs[device])) {
        blockData.bpConfigs[device] = {} as never;
      }

      setNestedValue(blockData.bpConfigs[device], path, value);
    }),
  updateBlockConfigsProperty: (blockId, path, value, isPopupEditMode) =>
    set((state) => {
      const { blocksData } = getActiveData(state, isPopupEditMode);

      const blockData = blocksData[blockId];
      if (!blockData) {
        return;
      }

      if (!isPlainObject(blockData.configs)) {
        blockData.configs = {};
      }

      setNestedValue(blockData.configs, path, value);
    }),
  updateBlockMultipleProperty: (
    blockId,
    device,
    path,
    value,
    options,
    isPopupEditMode,
  ) =>
    set((state) => {
      const { blocksData, hierarchyData } = getActiveData(
        state,
        isPopupEditMode,
      );

      const blockData = blocksData[blockId];
      if (!blockData) {
        return;
      }

      if (options?.parentId) {
        const targetParentId = options.parentId;
        const parentBlockData = blocksData[targetParentId];
        if (!isParentChildRelationValid(parentBlockData, blockData)) {
          return;
        }

        const targetChildren = hierarchyData[targetParentId] ?? [];
        if (!hierarchyData[targetParentId]) {
          hierarchyData[targetParentId] = targetChildren;
        }
        if (!targetChildren.includes(blockId)) {
          let currentParentId: string | null = null;

          for (const parentId of Object.keys(hierarchyData)) {
            if (parentId === targetParentId) {
              continue;
            }

            const siblings = hierarchyData[parentId] ?? [];
            if (siblings.includes(blockId)) {
              currentParentId = parentId;
              break;
            }
          }

          if (currentParentId) {
            const siblings = hierarchyData[currentParentId] ?? [];
            const currentIndex = siblings.indexOf(blockId);
            if (currentIndex !== -1) {
              siblings.splice(currentIndex, 1);
              hierarchyData[currentParentId] = siblings;
            }
          }

          targetChildren.push(blockId);
        }
      }

      const shouldUpdateConfigs =
        options?.target === "configs" ||
        options?.target === "both" ||
        (!options?.target && device === null);
      const shouldUpdateBpConfigs =
        options?.target === "bpConfigs" ||
        options?.target === "both" ||
        (!options?.target && device !== null);

      if (shouldUpdateConfigs) {
        if (!isPlainObject(blockData.configs)) {
          blockData.configs = {};
        }

        updateProperties(blockData.configs, path, value);
      }

      if (shouldUpdateBpConfigs) {
        if (!device) {
          return;
        }

        if (!isPlainObject(blockData.bpConfigs[device])) {
          blockData.bpConfigs[device] = {} as never;
        }

        updateProperties(blockData.bpConfigs[device], path, value);
      }
    }),
});
