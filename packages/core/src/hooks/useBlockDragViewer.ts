import interact from "interactjs";
import { type RefObject, useEffect } from "react";

import {
  SK_CUSTOM_EVENTS,
  SK_DATA_SET_ATTRS,
  SK_INTERACT_TARGET,
} from "../configs/constants";
import { useBlockStore } from "../stores/blockStore";
import { useBuilderStore } from "../stores/builderStore";

interface UseBlockDragViewerProps {
  pageWrapperRef: RefObject<HTMLDivElement | null>;
}

export const useBlockDragViewer = ({
  pageWrapperRef,
}: UseBlockDragViewerProps): void => {
  useEffect(() => {
    const pageWrapper = pageWrapperRef.current;
    if (!pageWrapper) return;

    const interactDragViewer = interact(SK_INTERACT_TARGET.DRAG_VIEWER, {
      context: pageWrapper,
    }).draggable({
      inertia: false,
      autoScroll: false,
      ignoreFrom: `[${SK_DATA_SET_ATTRS.RESIZE_HANDLE_DOT}="true"]`,
      listeners: {
        start: (event) => {
          const target = event.target as HTMLElement;

          // Record starting position from current offsetTop/offsetLeft so we
          // accumulate deltas correctly without flash.
          const startTop = target.offsetTop;
          const startLeft = target.offsetLeft;

          target.setAttribute(SK_DATA_SET_ATTRS.VIEWER_X, String(startLeft));
          target.setAttribute(SK_DATA_SET_ATTRS.VIEWER_Y, String(startTop));

          target.style.zIndex = "9999";
          target.style.userSelect = "none";
          useBuilderStore.getState().setIsBlockDragging(true);
          document.dispatchEvent(
            new CustomEvent(SK_CUSTOM_EVENTS.BLOCK_DRAG_START),
          );
        },
        move: (event) => {
          const target = event.target as HTMLElement;

          const accLeft =
            parseFloat(target.getAttribute(SK_DATA_SET_ATTRS.VIEWER_X) ?? "0") +
            event.dx;
          const accTop =
            parseFloat(target.getAttribute(SK_DATA_SET_ATTRS.VIEWER_Y) ?? "0") +
            event.dy;

          // Apply position directly — no React state involved.
          target.style.top = `${accTop}px`;
          target.style.left = `${accLeft}px`;

          target.setAttribute(SK_DATA_SET_ATTRS.VIEWER_X, String(accLeft));
          target.setAttribute(SK_DATA_SET_ATTRS.VIEWER_Y, String(accTop));
        },
        end: (event) => {
          const target = event.target as HTMLElement;

          const finalLeft = parseFloat(
            target.getAttribute(SK_DATA_SET_ATTRS.VIEWER_X) ?? "0",
          );
          const finalTop = parseFloat(
            target.getAttribute(SK_DATA_SET_ATTRS.VIEWER_Y) ?? "0",
          );

          const blockId = target.getAttribute(SK_DATA_SET_ATTRS.AUTO_ID);
          const builderStore = useBuilderStore.getState();
          const currentDevice = builderStore.currentDevice;

          if (blockId) {
            // Commit the final position to the store.
            useBlockStore
              .getState()
              .updateBlockMultipleProperty(
                blockId,
                currentDevice,
                "_multiple_",
                {
                  "top.val": String(Math.round(finalTop)),
                  "left.val": String(Math.round(finalLeft)),
                } as unknown as Record<string, unknown>,
              );

            pageWrapper
              .querySelectorAll(`[${SK_DATA_SET_ATTRS.SELECTED_BLOCK}="true"]`)
              .forEach((element) => {
                if (element !== target) {
                  element.removeAttribute(SK_DATA_SET_ATTRS.SELECTED_BLOCK);
                }
              });

            target.setAttribute(SK_DATA_SET_ATTRS.SELECTED_BLOCK, "true");
            builderStore.selectBlockId(blockId);
          }

          // Clear inline overrides so the store-driven CSS takes over.
          target.style.top = "";
          target.style.left = "";
          target.style.zIndex = "";
          target.style.userSelect = "";

          target.removeAttribute(SK_DATA_SET_ATTRS.VIEWER_X);
          target.removeAttribute(SK_DATA_SET_ATTRS.VIEWER_Y);

          window.requestAnimationFrame(() => {
            useBuilderStore.getState().setIsBlockDragging(false);
            document.dispatchEvent(
              new CustomEvent(SK_CUSTOM_EVENTS.BLOCK_DRAG_END),
            );
          });
        },
      },
    });

    return () => {
      interactDragViewer.unset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageWrapperRef]);
};
