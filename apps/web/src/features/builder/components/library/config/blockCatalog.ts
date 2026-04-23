import { Image, LayoutTemplate, MousePointerClick, Type } from "lucide-react";
import type { BlockLibraryItem } from "../types/menu";

export const ELEMENT_ITEMS: BlockLibraryItem[] = [
  { label: "Văn bản", type: "text", category: "element", icon: Type },
  {
    label: "Nút bấm",
    type: "button",
    category: "element",
    icon: MousePointerClick,
  },
  { label: "Ảnh", type: "image", category: "element", icon: Image },
];

export const SECTION_ITEMS: BlockLibraryItem[] = [
  {
    label: "Section",
    type: "section",
    category: "section",
    icon: LayoutTemplate,
  },
];

export const POPUP_ITEMS: BlockLibraryItem[] = [];

export const UTILITY_ITEMS: BlockLibraryItem[] = [];
