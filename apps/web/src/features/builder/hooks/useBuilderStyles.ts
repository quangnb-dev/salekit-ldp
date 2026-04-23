import { useBlockStore } from "@salekit/core";
import { useEffect } from "react";

import { selectBlockGenerators } from "../styling/cssGenerators";
import { CssSystem } from "../styling/cssSystem";

export const useBuilderStyles = () => {
  useEffect(() => {
    const cssSystem = CssSystem.getInstance();
    cssSystem.configure({
      generatorSelector: selectBlockGenerators,
    });
    cssSystem.rebuild();

    let previousBlocks = useBlockStore.getState().blocks;

    const unsubscribe = useBlockStore.subscribe(
      (state) => state.blocks,
      (blocks) => {
        const cssRuntime = CssSystem.getInstance();

        Object.keys(previousBlocks).forEach((blockId) => {
          if (!blocks[blockId]) {
            cssRuntime.removeBlockRules(blockId);
          }
        });

        Object.entries(blocks).forEach(([blockId, block]) => {
          cssRuntime.updateCssRules(blockId, block);
        });

        cssRuntime.applyCss();
        previousBlocks = blocks;
      },
    );

    return () => unsubscribe();
  }, []);
};
