import type { LucideIcon } from "lucide-react";

export type BlockLibraryCategoryId =
  | "all"
  | "assets"
  | "section"
  | "popup"
  | "dropbox"
  | "product"
  | "blog"
  | "utility"
  | "content"
  | "media"
  | "document"
  | "font";

export type BlockLibraryNavItem = {
  id: BlockLibraryCategoryId;
  label: string;
  icon: LucideIcon;
  group: "top" | "bottom";
};
