import { useBlockStore } from "../../stores/blockStore";
import type { SK_BlockData, SK_BlockDevice } from "../../types";
import { generateId } from "../../utils";

export interface ToolbarDropInput {
  parentElement: HTMLElement;
  overlayElement: HTMLElement;
  blockType: SK_BlockData["type"];
  device: SK_BlockDevice;
}

export const handleToolbarDrop = ({
  parentElement,
  overlayElement,
  blockType,
  device,
}: ToolbarDropInput): string => {
  const parentRect = parentElement.getBoundingClientRect();
  const overlayRect = overlayElement.getBoundingClientRect();
  const left = overlayRect.left - parentRect.left + overlayRect.width / 2;
  const top = overlayRect.top - parentRect.top + overlayRect.height / 2;
  const blockId = generateId("block");
  const blockData: SK_BlockData = {
    id: blockId,
    type: blockType,
    cname: blockType,
    label: blockType,
    bpConfigs: {
      desktop: {
        top: { val: top, unit: "px" },
        left: { val: left, unit: "px" },
      },
      tablet: {
        top: { val: top, unit: "px" },
        left: { val: left, unit: "px" },
      },
      mobile: {
        top: { val: top, unit: "px" },
        left: { val: left, unit: "px" },
      },
    },
    configs: {},
  };

  useBlockStore
    .getState()
    .addBlock(blockId, "page", blockData, undefined, undefined, false);
  useBlockStore.getState().updateBlockProperty(blockId, device, "top.val", top);
  useBlockStore
    .getState()
    .updateBlockProperty(blockId, device, "left.val", left);
  return blockId;
};
