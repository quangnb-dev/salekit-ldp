import interact from "interactjs";
import { type RefObject, useEffect } from "react";

import { SK_DATA_SET_ATTRS, SK_INTERACT_TARGET } from "../configs/constants";
import { useBuilderStore } from "../stores/builderStore";

interface UseBlockClickableProps {
  browserWrapperRef: RefObject<HTMLDivElement | null>;
  pageWrapperRef: RefObject<HTMLDivElement | null>;
}

export const useBlockClickable = ({
  browserWrapperRef,
  pageWrapperRef,
}: UseBlockClickableProps): void => {
  useEffect(() => {
    const browserWrapper = browserWrapperRef.current;
    const pageWrapper = pageWrapperRef.current;
    if (!browserWrapper || !pageWrapper) return;

    // Track the currently selected element so we can clear its attr on deselection.
    let selectedElement: HTMLElement | null = null;

    const selectBlockId = useBuilderStore.getState().selectBlockId;

    const handleTap = (event: interact.InteractEvent) => {
      event.stopPropagation();
      const target = event.currentTarget as HTMLElement;
      const blockId = target.getAttribute(SK_DATA_SET_ATTRS.AUTO_ID);

      // Clear previous selection attribute.
      if (selectedElement && selectedElement !== target) {
        selectedElement.removeAttribute(SK_DATA_SET_ATTRS.SELECTED_BLOCK);
      }

      // Set new selection.
      target.setAttribute(SK_DATA_SET_ATTRS.SELECTED_BLOCK, "true");
      selectedElement = target;

      if (blockId) {
        selectBlockId(blockId);
      }
    };

    // Deselect when clicking the page wrapper background directly.
    const handlePageClick = (event: MouseEvent) => {
      if (event.target === pageWrapper) {
        if (selectedElement) {
          selectedElement.removeAttribute(SK_DATA_SET_ATTRS.SELECTED_BLOCK);
          selectedElement = null;
        }
        selectBlockId(null);
      }
    };

    const interactClickable = interact(SK_INTERACT_TARGET.CLICKABLE, {
      context: browserWrapper,
    }).on("tap", handleTap);

    pageWrapper.addEventListener("click", handlePageClick);

    return () => {
      interactClickable.unset();
      pageWrapper.removeEventListener("click", handlePageClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [browserWrapperRef, pageWrapperRef]);
};
