import { CssSystem, useBlockStore } from "@salekit/core";
import { useEffect, useRef } from "react";
import { generatorRegistry } from "../../cssGenerators";

/**
 * Hook to initialize CSS system and subscribe to block store changes
 * Manages CSS generation and updates for all blocks in the editor
 */
export function usePageStyles() {
  const cssSystemRef = useRef<CssSystem | null>(null);
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pendingUpdatesRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    // Initialize CSS system
    const cssSystem = CssSystem.getInstance();
    cssSystemRef.current = cssSystem;

    // Register generator registry
    cssSystem.registerGenerators(generatorRegistry);

    // Register blocks getter
    cssSystem.registerBlocksGetter(() => {
      return useBlockStore.getState().blocks;
    });

    // Initial rebuild
    cssSystem.rebuild();

    // Subscribe to block store changes
    const unsubscribe = useBlockStore.subscribe(
      (state) => state.blocks,
      (blocks, prevBlocks) => {
        // Collect changed block IDs
        const changedIds = new Set<string>();

        // Check for added or updated blocks
        Object.keys(blocks).forEach((blockId) => {
          if (!prevBlocks[blockId] || blocks[blockId] !== prevBlocks[blockId]) {
            changedIds.add(blockId);
          }
        });

        // Check for removed blocks
        Object.keys(prevBlocks).forEach((blockId) => {
          if (!blocks[blockId]) {
            cssSystem.removeBlockRules(blockId);
          }
        });

        // Add to pending updates
        for (const id of changedIds) {
          pendingUpdatesRef.current.add(id);
        }

        // Debounce CSS updates
        if (updateTimeoutRef.current) {
          clearTimeout(updateTimeoutRef.current);
        }

        updateTimeoutRef.current = setTimeout(() => {
          // Update CSS for all pending blocks
          pendingUpdatesRef.current.forEach((blockId) => {
            cssSystem.updateCssRules(blockId);
          });

          // Apply CSS
          cssSystem.applyCss();

          // Clear pending updates
          pendingUpdatesRef.current.clear();
        }, 50); // 50ms debounce
      },
      {
        equalityFn: (a, b) => a === b,
      },
    );

    // Cleanup
    return () => {
      unsubscribe();
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, []);
}
