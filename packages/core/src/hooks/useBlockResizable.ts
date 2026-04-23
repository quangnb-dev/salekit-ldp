import interact from "interactjs";
import { useEffect, useRef } from "react";

import { useBlockStore } from "../stores";
import { useBuilderStore } from "../stores/builderStore";
import type { SK_BlockDevice } from "../types";

export interface UseBlockResizableOptions {
  selector?: string;
  device?: SK_BlockDevice;
  blockId?: string;
  enabled?: boolean;
  minHeight?: number;
}

interface UseBlockResizableResult {
  blockRef: ReturnType<typeof useRef<HTMLElement | null>>;
}

export const useBlockResizable = ({
  selector = ".section-resize-handle",
  device,
  blockId,
  enabled = true,
  minHeight = 20,
}: UseBlockResizableOptions = {}): UseBlockResizableResult => {
  const blockRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!enabled || !blockId || !blockRef.current) {
      return;
    }

    const handleElement = blockRef.current.querySelector(
      selector,
    ) as HTMLElement | null;
    if (!handleElement) {
      return;
    }

    const blockElement = blockRef.current;
    const currentDevice = device ?? useBuilderStore.getState().currentDevice;
    const updateBlockProperty = useBlockStore.getState().updateBlockProperty;

    const getMinHeight = () => {
      const innerElement = blockElement.querySelector("[data-sk-id-inner]");
      if (!(innerElement instanceof HTMLElement)) {
        return minHeight;
      }

      const blockRect = blockElement.getBoundingClientRect();
      let maxBottom = 0;

      Array.from(innerElement.children).forEach((child) => {
        if (!(child instanceof HTMLElement)) {
          return;
        }

        if (child.classList.contains("sk-section-inner__outline")) {
          return;
        }

        const childRect = child.getBoundingClientRect();
        const bottomPosition = childRect.bottom - blockRect.top;
        maxBottom = Math.max(maxBottom, bottomPosition);
      });

      return Math.max(minHeight, maxBottom);
    };

    const interactable = interact(handleElement).draggable({
      listeners: {
        start: (event) => {
          const currentHeight = blockElement.getBoundingClientRect().height;
          event.target.setAttribute(
            "data-resize-height",
            String(currentHeight),
          );
          event.interactable.minHeight = getMinHeight();
        },
        move: (event) => {
          const height =
            (Number.parseFloat(
              event.target.getAttribute("data-resize-height") || "0",
            ) || 0) + event.dy;
          const nextHeight = Math.max(
            event.interactable.minHeight ?? minHeight,
            height,
          );

          blockElement.style.setProperty("height", `${nextHeight}px`);
          event.target.setAttribute("data-resize-height", String(nextHeight));
        },
        end: (event) => {
          const finalHeight = event.target.getAttribute("data-resize-height");

          blockElement.style.removeProperty("height");
          event.target.removeAttribute("data-resize-height");

          if (!finalHeight) {
            return;
          }

          updateBlockProperty(
            blockId,
            currentDevice,
            "height.val",
            finalHeight,
          );
        },
      },
      cursorChecker: () => "ns-resize" as Interact.Options["cursorChecker"],
      autoScroll: {
        container: "#page-wrapper-scroll-container",
      },
    });

    return () => {
      blockElement.style.removeProperty("height");
      handleElement.removeAttribute("data-resize-height");
      interactable.unset();
    };
  }, [blockId, device, enabled, minHeight, selector]);

  return { blockRef };
};
