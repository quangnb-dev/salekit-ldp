import { type SK_BlockData, useBlockStore } from "@salekit/core";
import { useCallback, useEffect } from "react";
import { blankPage } from "@/data/blankPage";

export const usePageBuilder = () => {
  const blocks = useBlockStore((s) => s.blocks);
  const hierarchy = useBlockStore((s) => s.hierarchy);
  const setBlocks = useBlockStore((s) => s.setBlocks);
  const setHierarchy = useBlockStore((s) => s.setHierarchy);
  const { pause, resume } = useBlockStore.temporal.getState();

  const initializeBlankStructure = useCallback(
    (
      currentBlocks: Record<string, SK_BlockData>,
      currentHierarchy: Record<string, string[]>,
      structureBlocks: Record<string, SK_BlockData>,
      structureHierarchy: Record<string, string[]>,
      isEditPopupMode: boolean,
    ) => {
      pause();
      if (
        !Object.keys(currentBlocks || {}).length &&
        !Object.keys(currentHierarchy || {}).length
      ) {
        setBlocks(structureBlocks, isEditPopupMode);
        setHierarchy(structureHierarchy, isEditPopupMode);
      }
      resume();
    },
    [setBlocks, setHierarchy, pause, resume],
  );

  const initializeBlankPage = useCallback(() => {
    initializeBlankStructure(
      blocks,
      hierarchy,
      blankPage.blocks,
      blankPage.hierarchy,
      false,
    );
  }, [blocks, hierarchy, initializeBlankStructure]);

  useEffect(() => {
    initializeBlankPage();
  }, [initializeBlankPage]);
};
