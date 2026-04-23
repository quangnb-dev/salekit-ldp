import { type RefObject, useEffect, useLayoutEffect, useState } from "react";

import { PAGE_BLOCK_ID } from "../lib";
import { useBuilderStore } from "../stores/builderStore";

const TOOLBAR_GAP = 12;
const HEADER_SELECTOR = "header.sticky.top-0";

export interface SelectedBlockToolbarPosition {
  top: number;
  left: number;
  placement: "top" | "bottom";
}

interface UseSelectedBlockToolbarProps {
  browserWrapperRef: RefObject<HTMLDivElement | null>;
  toolbarRef: RefObject<HTMLDivElement | null>;
  rootId: string;
}

const getHeaderSafeTop = () => {
  const header = document.querySelector(HEADER_SELECTOR);

  if (!(header instanceof HTMLElement)) {
    return TOOLBAR_GAP;
  }

  return header.getBoundingClientRect().bottom + TOOLBAR_GAP;
};

const getViewportPosition = (
  selectedRect: DOMRect,
  toolbarRect: DOMRect,
): SelectedBlockToolbarPosition => {
  const centeredLeft =
    selectedRect.left + selectedRect.width / 2 - toolbarRect.width / 2;
  const maxLeft = Math.max(
    window.innerWidth - toolbarRect.width - TOOLBAR_GAP,
    TOOLBAR_GAP,
  );
  const left = Math.min(Math.max(centeredLeft, TOOLBAR_GAP), maxLeft);
  const safeTop = getHeaderSafeTop();
  const topPlacement = selectedRect.top - toolbarRect.height - TOOLBAR_GAP;
  const canRenderAbove = topPlacement >= safeTop;

  if (canRenderAbove) {
    return {
      top: topPlacement,
      left,
      placement: "top",
    };
  }

  const maxTop = Math.max(
    window.innerHeight - toolbarRect.height - TOOLBAR_GAP,
    safeTop,
  );

  return {
    top: Math.min(Math.max(selectedRect.bottom + TOOLBAR_GAP, safeTop), maxTop),
    left,
    placement: "bottom",
  };
};

export const useSelectedBlockToolbar = ({
  browserWrapperRef,
  toolbarRef,
  rootId,
}: UseSelectedBlockToolbarProps): SelectedBlockToolbarPosition | null => {
  const selectedBlockId = useBuilderStore((state) => state.selectedBlockId);
  const isBlockDragging = useBuilderStore((state) => state.isBlockDragging);
  const [position, setPosition] = useState<SelectedBlockToolbarPosition | null>(
    null,
  );

  useLayoutEffect(() => {
    if (
      !selectedBlockId ||
      selectedBlockId === rootId ||
      selectedBlockId === PAGE_BLOCK_ID ||
      isBlockDragging
    ) {
      setPosition(null);
      return;
    }

    const browserWrapper = browserWrapperRef.current;
    const toolbarEl = toolbarRef.current;

    if (!browserWrapper || !toolbarEl) {
      setPosition(null);
      return;
    }

    const updatePosition = () => {
      const selectedElement = browserWrapper.querySelector(
        `[data-sk-id="${selectedBlockId}"]`,
      ) as HTMLElement | null;

      if (!selectedElement) {
        setPosition(null);
        return;
      }

      const selectedRect = selectedElement.getBoundingClientRect();
      const toolbarRect = toolbarEl.getBoundingClientRect();
      setPosition(getViewportPosition(selectedRect, toolbarRect));
    };

    updatePosition();

    const animationFrame = window.requestAnimationFrame(updatePosition);
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [browserWrapperRef, isBlockDragging, rootId, selectedBlockId, toolbarRef]);

  useEffect(() => {
    if (
      !selectedBlockId ||
      selectedBlockId === rootId ||
      selectedBlockId === PAGE_BLOCK_ID
    ) {
      return;
    }

    const browserWrapper = browserWrapperRef.current;
    if (!browserWrapper || typeof ResizeObserver === "undefined") {
      return;
    }

    const selectedElement = browserWrapper.querySelector(
      `[data-sk-id="${selectedBlockId}"]`,
    ) as HTMLElement | null;

    if (!selectedElement) {
      return;
    }

    const toolbarEl = toolbarRef.current;
    const updatePosition = () => {
      if (!toolbarEl || isBlockDragging) {
        return;
      }

      const selectedRect = selectedElement.getBoundingClientRect();
      const toolbarRect = toolbarEl.getBoundingClientRect();
      setPosition(getViewportPosition(selectedRect, toolbarRect));
    };

    const resizeObserver = new ResizeObserver(() => {
      updatePosition();
    });

    resizeObserver.observe(selectedElement);
    if (toolbarEl) {
      resizeObserver.observe(toolbarEl);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [browserWrapperRef, isBlockDragging, rootId, selectedBlockId, toolbarRef]);

  return position;
};
