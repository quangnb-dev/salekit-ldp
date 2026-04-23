import { useBlockStore } from "@salekit/core";
import { Copy, Trash2 } from "lucide-react";

import type { BlockToolbarAction } from "./types";

const handleDuplicateBlock: BlockToolbarAction["onClick"] = ({ blockId }) => {
  useBlockStore.getState().duplicateBlock(blockId, `${blockId}-copy`);
};

const handleDeleteBlock: BlockToolbarAction["onClick"] = ({ blockId }) => {
  useBlockStore.getState().removeBlock(blockId);
};

export const getCommonBlockToolbarActions = (): BlockToolbarAction[] => {
  return [
    {
      id: "duplicate",
      label: "Nhân bản khối",
      icon: Copy,
      onClick: handleDuplicateBlock,
      order: 20,
    },
    {
      id: "delete",
      label: "Xóa khối",
      icon: Trash2,
      onClick: handleDeleteBlock,
      order: 30,
    },
  ];
};
