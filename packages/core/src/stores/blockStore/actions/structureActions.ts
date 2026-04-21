import type { Draft } from "immer";

import {
  isOptionDataPlacementValid,
  isParentChildRelationValid,
} from "../../../constraints";
import {
  createDefaultPopupBlock,
  createDefaultSectionBlock,
  getActiveData,
  mergeStructure,
} from "../helpers";
import type { BlockActions, BlockStore } from "../types";

type BlockStoreSetter = (recipe: (state: Draft<BlockStore>) => void) => void;

type StructureActions = Pick<
  BlockActions,
  | "setBlocks"
  | "setHierarchy"
  | "addBlock"
  | "addBlockSection"
  | "addBlockPopup"
>;

export const createStructureActions = (
  set: BlockStoreSetter,
): StructureActions => ({
  setBlocks: (blocks, isPopupEditMode) =>
    set((state) => {
      if (isPopupEditMode) {
        state.popupBlocks = blocks;
      } else {
        state.blocks = blocks;
      }
    }),
  setHierarchy: (hierarchy, isPopupEditMode) =>
    set((state) => {
      if (isPopupEditMode) {
        state.popupHierarchy = hierarchy;
      } else {
        state.hierarchy = hierarchy;
      }
    }),
  addBlock: (
    draggableId,
    dropzoneId,
    blockData,
    selectedBlockId,
    optionData,
    isPopupEditMode,
    index,
  ) =>
    set((state) => {
      const { blocksData, hierarchyData } = getActiveData(
        state,
        isPopupEditMode,
      );

      const parentBlockData = blocksData[dropzoneId];
      if (!isParentChildRelationValid(parentBlockData, blockData)) {
        return;
      }

      if (
        !isOptionDataPlacementValid(
          draggableId,
          blockData,
          optionData,
          blocksData,
        )
      ) {
        return;
      }

      blocksData[draggableId] = blockData;
      hierarchyData[draggableId] = [];

      if (!hierarchyData[dropzoneId]) {
        hierarchyData[dropzoneId] = [];
      }

      if (index !== undefined) {
        hierarchyData[dropzoneId].splice(index, 0, draggableId);
      } else if (selectedBlockId) {
        const selectedIndex =
          hierarchyData[dropzoneId].indexOf(selectedBlockId);
        if (selectedIndex === -1) {
          hierarchyData[dropzoneId].push(draggableId);
        } else {
          hierarchyData[dropzoneId].splice(selectedIndex + 1, 0, draggableId);
        }
      } else {
        hierarchyData[dropzoneId].push(draggableId);
      }

      if (optionData) {
        if (optionData.firstChildIds) {
          hierarchyData[draggableId] = optionData.firstChildIds;
        }

        if (optionData.childIds) {
          Object.entries(optionData.childIds).forEach(
            ([parentId, childIds]) => {
              hierarchyData[parentId] = childIds;
            },
          );
        }

        if (optionData.childData) {
          Object.entries(optionData.childData).forEach(
            ([childId, childData]) => {
              blocksData[childId] = childData;
            },
          );
        }
      }
    }),
  addBlockSection: (
    newSectionId,
    selectedIndex,
    addToAfter = true,
    structure,
  ) =>
    set((state) => {
      if (!state.hierarchy.page) {
        state.hierarchy.page = [];
      }

      const insertAt = addToAfter ? selectedIndex + 1 : selectedIndex;
      state.hierarchy.page.splice(insertAt, 0, newSectionId);

      if (structure && Object.keys(structure.blocks).length > 0) {
        mergeStructure(state.blocks, state.hierarchy, structure);
        return;
      }

      if (!state.blocks[newSectionId]) {
        state.blocks[newSectionId] = createDefaultSectionBlock(newSectionId);
      }
      if (!state.hierarchy[newSectionId]) {
        state.hierarchy[newSectionId] = [];
      }
    }),
  addBlockPopup: (newPopupId, structure) =>
    set((state) => {
      const containerId = "popup-container";
      if (!state.popupHierarchy[containerId]) {
        state.popupHierarchy[containerId] = [];
      }

      if (!state.popupHierarchy[containerId].includes(newPopupId)) {
        state.popupHierarchy[containerId].push(newPopupId);
      }

      if (structure && Object.keys(structure.blocks).length > 0) {
        mergeStructure(state.popupBlocks, state.popupHierarchy, structure);
        return;
      }

      if (!state.popupBlocks[newPopupId]) {
        state.popupBlocks[newPopupId] = createDefaultPopupBlock(newPopupId);
      }
      if (!state.popupHierarchy[newPopupId]) {
        state.popupHierarchy[newPopupId] = [];
      }
    }),
});
