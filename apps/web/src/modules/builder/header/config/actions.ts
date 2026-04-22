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
  { id: "all", title: "Them moi", icon: Plus, variant: "text" },
  { id: "section", title: "Section", icon: LayoutTemplate, variant: "icon" },
  { id: "layer", title: "Layer", icon: Layers, variant: "icon" },
  { id: "settings", title: "Cai dat", icon: Settings, variant: "icon" },
];

export const RIGHT_HEADER_ACTIONS: RightHeaderAction[] = [
  { id: "undo", title: "Hoan tac", icon: Undo2, variant: "icon" },
  { id: "redo", title: "Lam lai", icon: Redo2, variant: "icon" },
  {
    id: "save",
    title: "Luu",
    label: "Luu",
    icon: Save,
    variant: "ghost",
    className: "text-slate-600 hover:bg-white hover:text-slate-900",
  },
  {
    id: "preview",
    title: "Xem truoc",
    label: "Xem truoc",
    icon: Eye,
    variant: "ghost",
    className: "text-slate-700 hover:bg-white hover:text-slate-900",
  },
  {
    id: "publish",
    title: "Xuat ban",
    label: "Xuat ban",
    icon: Upload,
    variant: "primary",
  },
  { id: "menu", title: "Menu", icon: Menu, variant: "icon" },
];
