import interact from "interactjs";
import { type RefObject, useEffect } from "react";

import { SK_DATA_SET_ATTRS, SK_INTERACT_TARGET } from "../configs/constants";
import { useBlockStore } from "../stores/blockStore";
import { useBuilderStore } from "../stores/builderStore";
import type { SK_BlockData, SK_BlockDevice } from "../types";
import { generateId } from "../utils";

interface UseBlockDropProps {
  pageWrapperRef: RefObject<HTMLDivElement | null>;
  overlayRef: RefObject<HTMLDivElement | null>;
}

type OverlayDeviceConfig = {
  width: number;
  height: number;
};

const buildDropBpConfigs = (
  existingBpConfigs: SK_BlockData["bpConfigs"],
  overlay: Record<string, OverlayDeviceConfig>,
  topPx: number,
  leftPx: number,
  currentDevice: SK_BlockDevice,
): SK_BlockData["bpConfigs"] => {
  const devices: SK_BlockDevice[] = ["desktop", "tablet", "mobile"];

  return devices.reduce(
    (acc, device) => {
      const deviceOverlay = overlay[device] ??
        overlay[currentDevice] ?? { width: 200, height: 60 };
      const existingDevice =
        (existingBpConfigs as Record<string, unknown>)[device] ?? {};

      // For non-current devices, use the same pixel positions but the device overlay size
      const deviceTop = topPx;
      const deviceLeft = leftPx;

      return {
        ...acc,
        [device]: {
          ...(existingDevice as object),
          position: { val: "absolute" },
          top: { val: String(Math.floor(deviceTop)), unit: "px" },
          left: { val: String(Math.floor(deviceLeft)), unit: "px" },
          width: { val: String(deviceOverlay.width), unit: "px" },
          height: { val: String(deviceOverlay.height), unit: "px" },
        },
      };
    },
    {} as SK_BlockData["bpConfigs"],
  );
};

export const useBlockDrop = ({
  pageWrapperRef,
  overlayRef: _overlayRef,
}: UseBlockDropProps): void => {
  useEffect(() => {
    const pageWrapper = pageWrapperRef.current;
    if (!pageWrapper) return;

    const interactDropzone = interact(SK_INTERACT_TARGET.DROPZONE, {
      context: pageWrapper,
    }).dropzone({
      accept: SK_INTERACT_TARGET.DROPZONE_ACCEPT,
      checker: (_dragEvent, _event, dropped) => {
        return Boolean(dropped);
      },
      ondrop: (event) => {
        const draggableTarget = event.relatedTarget as HTMLElement | null;
        if (!draggableTarget) return;

        const isToolbar =
          draggableTarget.getAttribute(SK_DATA_SET_ATTRS.TOOLBAR) === "true";
        if (!isToolbar) return;

        const blockDataRaw = draggableTarget.getAttribute(
          SK_DATA_SET_ATTRS.TOOLBAR_BLOCK_DATA,
        );
        const overlayRaw = draggableTarget.getAttribute(
          SK_DATA_SET_ATTRS.TOOLBAR_OVERLAY,
        );

        if (!blockDataRaw || !overlayRaw) return;

        let blockDataPartial: Partial<SK_BlockData>;
        let overlayConfig: Record<string, OverlayDeviceConfig>;

        try {
          blockDataPartial = JSON.parse(blockDataRaw) as Partial<SK_BlockData>;
          overlayConfig = JSON.parse(overlayRaw) as Record<
            string,
            OverlayDeviceConfig
          >;
        } catch {
          return;
        }

        // Detect drop target - check for section inner div first
        const dropTarget = event.target as HTMLElement;
        const isSectionInner =
          dropTarget.getAttribute(SK_DATA_SET_ATTRS.DROP_INNER) === "true";

        let dropzoneId = "page";
        let dropRect = pageWrapper.getBoundingClientRect();

        if (isSectionInner) {
          // Find the section block ID from the parent
          const sectionOuter = dropTarget.closest(
            `[${SK_DATA_SET_ATTRS.AUTO_ID}]`,
          ) as HTMLElement | null;
          if (sectionOuter) {
            const sectionId = sectionOuter.getAttribute(
              SK_DATA_SET_ATTRS.AUTO_ID,
            );
            if (sectionId) {
              dropzoneId = sectionId;
              dropRect = dropTarget.getBoundingClientRect();
            }
          }
        }

        const dragClientX = event.dragEvent.client.x;
        const dragClientY = event.dragEvent.client.y;

        const currentDevice = useBuilderStore.getState().currentDevice;
        const deviceOverlay = overlayConfig[currentDevice] ?? {
          width: 200,
          height: 60,
        };

        // Position block so its center is at the cursor.
        const topPx = dragClientY - dropRect.top - deviceOverlay.height / 2;
        const leftPx = dragClientX - dropRect.left - deviceOverlay.width / 2;

        // Generate a unique id.
        const currentBlocks = useBlockStore.getState().blocks;
        const newId = (() => {
          let candidate = generateId("block");
          while (currentBlocks[candidate]) {
            candidate = generateId("block");
          }
          return candidate;
        })();

        const bpConfigs = buildDropBpConfigs(
          blockDataPartial.bpConfigs ??
            ({
              desktop: {},
              tablet: {},
              mobile: {},
            } as SK_BlockData["bpConfigs"]),
          overlayConfig,
          topPx,
          leftPx,
          currentDevice,
        );

        const newBlockData: SK_BlockData = {
          id: newId,
          type: blockDataPartial.type ?? "text",
          cname: blockDataPartial.cname ?? blockDataPartial.type ?? "text",
          label: blockDataPartial.label,
          bpConfigs,
          configs: blockDataPartial.configs ?? {},
        };

        useBlockStore.getState().addBlock(newId, dropzoneId, newBlockData);

        // Select the newly dropped block after a tick so CSS has applied.
        setTimeout(() => {
          useBuilderStore.getState().selectBlockId(newId);
          const newEl = pageWrapper.querySelector(
            `[${SK_DATA_SET_ATTRS.AUTO_ID}="${newId}"]`,
          ) as HTMLElement | null;
          if (newEl) {
            newEl.setAttribute(SK_DATA_SET_ATTRS.SELECTED_BLOCK, "true");
          }
        }, 0);
      },
    });

    return () => {
      interactDropzone.unset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageWrapperRef]);
};
