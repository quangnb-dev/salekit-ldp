import interact from "interactjs";
import { type RefObject, useEffect } from "react";

import { SK_DATA_SET_ATTRS, SK_INTERACT_TARGET } from "../configs/constants";
import { useBuilderStore } from "../stores/builderStore";

type InteractTapEvent = {
  stopPropagation: () => void;
  currentTarget: EventTarget | null;
};

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

    let selectedElement: HTMLElement | null = null;

    const selectBlockId = useBuilderStore.getState().selectBlockId;

    const handleTap = (event: InteractTapEvent) => {
      event.stopPropagation();
      const target = event.currentTarget as HTMLElement;
      const blockId = target.getAttribute(SK_DATA_SET_ATTRS.AUTO_ID);

      if (selectedElement && selectedElement !== target) {
        selectedElement.removeAttribute(SK_DATA_SET_ATTRS.SELECTED_BLOCK);
      }

      target.setAttribute(SK_DATA_SET_ATTRS.SELECTED_BLOCK, "true");
      selectedElement = target;

      if (blockId) {
        selectBlockId(blockId);
      }
    };

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
  }, [browserWrapperRef, pageWrapperRef]);
};
