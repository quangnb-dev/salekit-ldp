import {
  Eye,
  Layers,
  LayoutTemplate,
  Menu,
  Plus,
  Redo2,
  Save,
  Settings,
  Undo2,
  Upload,
} from "lucide-react";
import type { LeftHeaderAction, RightHeaderAction } from "../types/action";

export const LEFT_HEADER_ACTIONS: LeftHeaderAction[] = [
  { id: "all", title: "Thêm mới", icon: Plus, variant: "text" },
  { id: "section", title: "Section", icon: LayoutTemplate, variant: "icon" },
  { id: "layer", title: "Lớp", icon: Layers, variant: "icon" },
  { id: "settings", title: "Cài đặt", icon: Settings, variant: "icon" },
];

export const RIGHT_HEADER_ACTIONS: RightHeaderAction[] = [
  { id: "undo", title: "Hoàn tác", icon: Undo2, variant: "icon" },
  { id: "redo", title: "Làm lại", icon: Redo2, variant: "icon" },
  {
    id: "save",
    title: "Lưu",
    label: "Lưu",
    icon: Save,
    variant: "ghost",
    className: "text-slate-600 hover:bg-white hover:text-slate-900",
  },
  {
    id: "preview",
    title: "Xem trước",
    label: "Xem trước",
    icon: Eye,
    variant: "ghost",
    className: "text-slate-700 hover:bg-white hover:text-slate-900",
  },
  {
    id: "publish",
    title: "Xuất bản",
    label: "Xuất bản",
    icon: Upload,
    variant: "primary",
  },
  { id: "menu", title: "Menu", icon: Menu, variant: "icon" },
];
