import type { SK_BlockData } from "@salekit/core";
import type { LucideIcon } from "lucide-react";

export interface BlockToolbarActionContext {
  blockId: string;
  blockType: string;
  selectedBlock: SK_BlockData;
}

export interface BlockToolbarAction {
  id: string;
  label: string;
  icon: LucideIcon;
  onClick: (context: BlockToolbarActionContext) => void;
  isVisible?: (context: BlockToolbarActionContext) => boolean;
  isDisabled?: (context: BlockToolbarActionContext) => boolean;
  order?: number;
}

export type BlockToolbarActionMap = Partial<
  Record<string, BlockToolbarAction[]>
>;
