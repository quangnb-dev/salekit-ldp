import type { LucideIcon } from "lucide-react";

export type BlockLibraryItemCategory =
  | "element"
  | "section"
  | "popup"
  | "utility";

export type BlockLibraryItem = {
  label: string;
  type: string;
  category: BlockLibraryItemCategory;
  icon: LucideIcon;
};
