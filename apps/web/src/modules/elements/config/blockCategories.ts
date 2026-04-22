import {
  AlignLeft,
  Columns2,
  FileText,
  FolderCog,
  FolderOpen,
  Grid2x2,
  Image,
  LayoutTemplate,
  Newspaper,
  PictureInPicture2,
  Puzzle,
  ShoppingBag,
} from "lucide-react";
import type { BlockLibraryItem } from "../types/menu";
import type { BlockLibraryCategoryId, BlockLibraryNavItem } from "../types/nav";
import type { BlockLibraryTab } from "../types/tab";
import {
  ELEMENT_ITEMS,
  POPUP_ITEMS,
  SECTION_ITEMS,
  UTILITY_ITEMS,
} from "./blockCatalog";

export const NAV_ITEMS_MAP: Record<BlockLibraryCategoryId, BlockLibraryItem[]> =
  {
    all: ELEMENT_ITEMS,
    section: SECTION_ITEMS,
    popup: POPUP_ITEMS,
    utility: UTILITY_ITEMS,
    assets: [],
    dropbox: [],
    product: [],
    blog: [],
    content: [],
    media: [],
    document: [],
    font: [],
  };

export const ALL_NAV_ITEMS: BlockLibraryNavItem[] = [
  { id: "all", label: "Phan tu", icon: Grid2x2, group: "top" },
  { id: "assets", label: "Assets", icon: FolderOpen, group: "top" },
  { id: "section", label: "Section", icon: LayoutTemplate, group: "top" },
  { id: "popup", label: "Popup", icon: PictureInPicture2, group: "top" },
  { id: "dropbox", label: "Dropbox", icon: Columns2, group: "top" },
  { id: "product", label: "San pham", icon: ShoppingBag, group: "top" },
  { id: "blog", label: "Blog", icon: Newspaper, group: "top" },
  { id: "utility", label: "Tien ich", icon: Puzzle, group: "bottom" },
  {
    id: "content",
    label: "Quan ly noi dung",
    icon: FolderCog,
    group: "bottom",
  },
  { id: "media", label: "Quan ly Media", icon: Image, group: "bottom" },
  {
    id: "document",
    label: "Quan ly tai lieu",
    icon: FileText,
    group: "bottom",
  },
  { id: "font", label: "Quan ly Font", icon: AlignLeft, group: "bottom" },
];

export const LEFT_NAV_ITEMS = ALL_NAV_ITEMS.filter(
  (item) => (NAV_ITEMS_MAP[item.id] ?? []).length > 0,
);

export const TAB_TO_NAV: Record<BlockLibraryTab, BlockLibraryCategoryId> = {
  all: "all",
  section: "section",
  popup: "popup",
};

export const NAV_TO_TAB: Partial<
  Record<BlockLibraryCategoryId, BlockLibraryTab>
> = {
  all: "all",
  section: "section",
  popup: "popup",
};
