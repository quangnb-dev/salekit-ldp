import interact from "interactjs";
import { type RefObject, useEffect } from "react";

import {
  SK_CUSTOM_EVENTS,
  SK_DATA_SET_ATTRS,
  SK_INTERACT_TARGET,
} from "../configs/constants";
import { useBuilderStore } from "../stores/builderStore";

interface UseBlockDragToolbarProps {
  browserWrapperRef: RefObject<HTMLDivElement | null>;
  overlayRef: RefObject<HTMLDivElement | null>;
}

export const useBlockDragToolbar = ({
  browserWrapperRef,
  overlayRef,
}: UseBlockDragToolbarProps): void => {
  useEffect(() => {
    const browserWrapper = browserWrapperRef.current;
    if (!browserWrapper) return;

    // Use document.body as context so BlockToolbar items rendered outside
    // the browserWrapper (e.g. in sidebar panels) are still detected.
    const interactDragToolbar = interact(SK_INTERACT_TARGET.DRAG_TOOLBAR, {
      context: document.body,
    }).draggable({
      inertia: false,
      autoScroll: false,
      listeners: {
        start: (event) => {
          const target = event.target as HTMLElement;
          const overlayEl = overlayRef.current;
          if (!overlayEl) return;

          const currentDevice = useBuilderStore.getState().currentDevice;
          const overlayData = JSON.parse(
            target.getAttribute(SK_DATA_SET_ATTRS.TOOLBAR_OVERLAY) ?? "{}",
          ) as Record<string, { width: number; height: number }>;

          const deviceOverlay = overlayData[currentDevice] ?? {
            width: 200,
            height: 60,
          };

          overlayEl.style.display = "block";
          overlayEl.style.width = `${deviceOverlay.width}px`;
          overlayEl.style.height = `${deviceOverlay.height}px`;
          overlayEl.style.left = `${event.client.x - deviceOverlay.width / 2}px`;
          overlayEl.style.top = `${event.client.y - deviceOverlay.height / 2}px`;

          // Record starting client position on the dragged element for tracking.
          target.setAttribute(
            SK_DATA_SET_ATTRS.VIEWER_X,
            String(event.client.x),
          );
          target.setAttribute(
            SK_DATA_SET_ATTRS.VIEWER_Y,
            String(event.client.y),
          );

          useBuilderStore.getState().setIsBlockDragging(true);
          document.dispatchEvent(
            new CustomEvent(SK_CUSTOM_EVENTS.TOOLBAR_DRAG_START),
          );
          document.dispatchEvent(
            new CustomEvent(SK_CUSTOM_EVENTS.BLOCK_DRAG_START),
          );
        },
        move: (event) => {
          const target = event.target as HTMLElement;
          const overlayEl = overlayRef.current;
          if (!overlayEl) return;

          const currentDevice = useBuilderStore.getState().currentDevice;
          const overlayData = JSON.parse(
            target.getAttribute(SK_DATA_SET_ATTRS.TOOLBAR_OVERLAY) ?? "{}",
          ) as Record<string, { width: number; height: number }>;

          const deviceOverlay = overlayData[currentDevice] ?? {
            width: 200,
            height: 60,
          };

          // Move overlay centered on cursor.
          overlayEl.style.left = `${event.client.x - deviceOverlay.width / 2}px`;
          overlayEl.style.top = `${event.client.y - deviceOverlay.height / 2}px`;

          const x =
            parseFloat(target.getAttribute(SK_DATA_SET_ATTRS.VIEWER_X) ?? "0") +
            event.dx;
          const y =
            parseFloat(target.getAttribute(SK_DATA_SET_ATTRS.VIEWER_Y) ?? "0") +
            event.dy;

          target.setAttribute(SK_DATA_SET_ATTRS.VIEWER_X, String(x));
          target.setAttribute(SK_DATA_SET_ATTRS.VIEWER_Y, String(y));
        },
        end: (event) => {
          const target = event.target as HTMLElement;
          const overlayEl = overlayRef.current;

          if (overlayEl) {
            overlayEl.style.display = "none";
            overlayEl.style.width = "";
            overlayEl.style.height = "";
            overlayEl.style.left = "";
            overlayEl.style.top = "";
          }

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
      interactDragToolbar.unset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [browserWrapperRef, overlayRef]);
};
