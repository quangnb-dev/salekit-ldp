import { Monitor, Smartphone, Tablet } from "lucide-react";
import type { BreakpointOption } from "../types/breakpoint";

export const BREAKPOINT_OPTIONS: BreakpointOption[] = [
  { id: "desktop", label: "Máy tính", icon: Monitor },
  { id: "tablet", label: "Máy tính bảng", icon: Tablet },
  { id: "mobile", label: "Di động", icon: Smartphone },
];
