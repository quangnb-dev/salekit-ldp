import { Monitor, Smartphone, Tablet } from "lucide-react";
import type { BreakpointOption } from "../types/breakpoint";

export const BREAKPOINT_OPTIONS: BreakpointOption[] = [
  { id: "desktop", label: "Desktop", icon: Monitor },
  { id: "tablet", label: "Tablet", icon: Tablet },
  { id: "mobile", label: "Mobile", icon: Smartphone },
];
