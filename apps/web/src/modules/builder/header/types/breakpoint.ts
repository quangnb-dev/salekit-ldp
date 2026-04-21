import type { LucideIcon } from "lucide-react";
import type { Breakpoint } from "@/modules/builder/stores/builderStore";

export type BreakpointOption = {
  id: Breakpoint;
  label: string;
  icon: LucideIcon;
};
