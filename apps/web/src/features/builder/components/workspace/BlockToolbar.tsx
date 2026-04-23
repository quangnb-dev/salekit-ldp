import {
  PAGE_BLOCK_ID,
  useBlockStore,
  useBuilderStore,
  useEditorContext,
  useSelectedBlockToolbar,
} from "@salekit/core";
import type { FC } from "react";
import { useMemo, useRef } from "react";

import { resolveBlockToolbarActions } from "../../toolbar/resolveActions";

export const BlockToolbar: FC = () => {
  const toolbarRef = useRef<HTMLDivElement | null>(null);
  const selectedBlockId = useBuilderStore((state) => state.selectedBlockId);
  const selectedBlock = useBlockStore((state) =>
    selectedBlockId ? (state.blocks[selectedBlockId] ?? null) : null,
  );
  const { browserWrapperRef, rootId } = useEditorContext();
  const position = useSelectedBlockToolbar({
    browserWrapperRef,
    toolbarRef,
    rootId,
  });

  const actions = useMemo(() => {
    if (!selectedBlockId || !selectedBlock) {
      return [];
    }

    return resolveBlockToolbarActions({
      blockId: selectedBlockId,
      blockType: selectedBlock.type,
      selectedBlock,
    });
  }, [selectedBlock, selectedBlockId]);

  if (
    !selectedBlockId ||
    !selectedBlock ||
    selectedBlockId === rootId ||
    selectedBlockId === PAGE_BLOCK_ID ||
    actions.length === 0
  ) {
    return null;
  }

  return (
    <div
      ref={toolbarRef}
      className="fixed z-30 flex items-center gap-1 rounded-sm  border-slate-200 bg-white/95 p-1 shadow-[0_16px_36px_rgba(15,23,42,0.16)] backdrop-blur-sm"
      style={{
        top: position?.top ?? 0,
        left: position?.left ?? 0,
        visibility: position ? "visible" : "hidden",
        pointerEvents: position ? "auto" : "none",
      }}
      data-sk-selected-block-toolbar="true"
      data-sk-toolbar-placement={position?.placement ?? "top"}
    >
      {actions.map(({ id, label, icon: Icon, onClick, isDisabled }) => {
        const isActionDisabled =
          isDisabled?.({
            blockId: selectedBlockId,
            blockType: selectedBlock.type,
            selectedBlock,
          }) ?? false;

        return (
          <button
            key={id}
            type="button"
            disabled={isActionDisabled}
            aria-label={`${label} (coming soon)`}
            title={`${label} (coming soon)`}
            className="flex h-7 w-7 items-center justify-center rounded-sm border border-transparent text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 disabled:pointer-events-none disabled:opacity-40"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onClick({
                blockId: selectedBlockId,
                blockType: selectedBlock.type,
                selectedBlock,
              });
            }}
          >
            <Icon className="h-4 w-4" />
          </button>
        );
      })}
    </div>
  );
};
