import {
  AlignLeft,
  AppWindow,
  BarChart2,
  Columns2,
  FileText,
  GalleryHorizontal,
  Grid2x2,
  Image,
  LayoutTemplate,
  Minus,
  MousePointerClick,
  PanelTop,
  PictureInPicture2,
  ShoppingCart,
  Smile,
  Star,
  Table,
  Timer,
  Type,
  Video,
} from "lucide-react";
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
  {
    label: "Gallery",
    type: "gallery",
    category: "element",
    icon: GalleryHorizontal,
  },
  { label: "Hình hộp", type: "shape", category: "element", icon: Columns2 },
  { label: "Biểu tượng", type: "icon", category: "element", icon: Star },
  { label: "Đường kẻ", type: "divider", category: "element", icon: Minus },
  { label: "Form", type: "form", category: "element", icon: AlignLeft },
  {
    label: "Sản phẩm mẫu",
    type: "product-sample",
    category: "element",
    icon: ShoppingCart,
  },
  { label: "Video", type: "video", category: "element", icon: Video },
  {
    label: "Collection List",
    type: "collection-list",
    category: "element",
    icon: Grid2x2,
  },
  {
    label: "Carousel",
    type: "carousel",
    category: "element",
    icon: GalleryHorizontal,
  },
  { label: "Tabs", type: "tabs", category: "element", icon: PanelTop },
  { label: "Frame", type: "frame", category: "element", icon: AppWindow },
  {
    label: "Accordion",
    type: "accordion",
    category: "element",
    icon: Columns2,
  },
  { label: "Table", type: "table", category: "element", icon: Table },
  { label: "Survey", type: "survey", category: "element", icon: BarChart2 },
  { label: "Menu", type: "menu", category: "element", icon: PanelTop },
  { label: "Mã HTML", type: "html", category: "element", icon: FileText },
];

export const SECTION_ITEMS: BlockLibraryItem[] = [
  {
    label: "Hero Section",
    type: "hero-section",
    category: "section",
    icon: LayoutTemplate,
  },
  {
    label: "Feature Section",
    type: "feature-section",
    category: "section",
    icon: LayoutTemplate,
  },
  {
    label: "CTA Section",
    type: "cta-section",
    category: "section",
    icon: LayoutTemplate,
  },
  {
    label: "Testimonial Section",
    type: "testimonial-section",
    category: "section",
    icon: LayoutTemplate,
  },
  {
    label: "Pricing Section",
    type: "pricing-section",
    category: "section",
    icon: LayoutTemplate,
  },
  {
    label: "FAQ Section",
    type: "faq-section",
    category: "section",
    icon: LayoutTemplate,
  },
];

export const POPUP_ITEMS: BlockLibraryItem[] = [
  {
    label: "Email Popup",
    type: "email-popup",
    category: "popup",
    icon: PictureInPicture2,
  },
  {
    label: "Promo Popup",
    type: "promo-popup",
    category: "popup",
    icon: PictureInPicture2,
  },
  {
    label: "Exit Intent Popup",
    type: "exit-popup",
    category: "popup",
    icon: PictureInPicture2,
  },
  {
    label: "Cookie Popup",
    type: "cookie-popup",
    category: "popup",
    icon: PictureInPicture2,
  },
];

export const UTILITY_ITEMS: BlockLibraryItem[] = [
  { label: "Countdown", type: "countdown", category: "utility", icon: Timer },
  { label: "FAQ", type: "faq", category: "utility", icon: Smile },
  {
    label: "Survey",
    type: "survey-widget",
    category: "utility",
    icon: BarChart2,
  },
  { label: "Ứng dụng", type: "app", category: "utility", icon: AppWindow },
];
