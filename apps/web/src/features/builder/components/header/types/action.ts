import type { LucideIcon } from "lucide-react";
import type { BuilderMenuPanel } from "@/features/builder/stores/builderStore";

export type LeftHeaderAction = {
  id: BuilderMenuPanel;
  title: string;
  icon: LucideIcon;
  variant: "text" | "icon";
};

export type RightHeaderAction = {
  id: "undo" | "redo" | "save" | "preview" | "publish" | "menu";
  title: string;
  label?: string;
  icon: LucideIcon;
  variant: "icon" | "ghost" | "primary";
  className?: string;
};
