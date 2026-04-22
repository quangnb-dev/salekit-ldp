import { useBlockStore } from "../../stores/blockStore";
import type { SK_BlockDevice } from "../../types";

export interface ViewerDropInput {
  element: HTMLElement;
  parentElement: HTMLElement;
  device: SK_BlockDevice;
  blockId: string;
}

export const handleViewerDrop = ({
  element,
  parentElement,
  device,
  blockId,
}: ViewerDropInput): void => {
  const elementRect = element.getBoundingClientRect();
  const parentRect = parentElement.getBoundingClientRect();
  const top = elementRect.top - parentRect.top + parentElement.scrollTop;
  const left = elementRect.left - parentRect.left + parentElement.scrollLeft;

  useBlockStore
    .getState()
    .updateBlockMultipleProperty(blockId, device, "_multiple_", {
      "top.val": top,
      "left.val": left,
      "width.val": elementRect.width,
      "height.val": elementRect.height,
    });
};
