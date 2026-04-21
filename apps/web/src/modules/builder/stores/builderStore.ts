import { create } from "zustand";

export type Breakpoint = "desktop" | "tablet" | "mobile";
export type BuilderMenuView =
  | "closed"
  | "all"
  | "section"
  | "popup"
  | "layer"
  | "settings";
export type BuilderMenuPanel = Exclude<BuilderMenuView, "closed">;

type BuilderState = {
  breakpoint: Breakpoint;
  menuView: BuilderMenuView;
  setBreakpoint: (breakpoint: Breakpoint) => void;
  openMenu: (view: BuilderMenuPanel) => void;
  closeMenu: () => void;
  toggleMenu: (view: BuilderMenuPanel) => void;
};

export const useBuilderStore = create<BuilderState>((set, get) => ({
  breakpoint: "desktop",
  menuView: "closed",
  setBreakpoint: (breakpoint) => set({ breakpoint }),
  openMenu: (menuView) => set({ menuView }),
  closeMenu: () => set({ menuView: "closed" }),
  toggleMenu: (menuView) =>
    set({ menuView: get().menuView === menuView ? "closed" : menuView }),
}));

export const builderSelectors = {
  breakpoint: (state: BuilderState) => state.breakpoint,
  menuView: (state: BuilderState) => state.menuView,
  setBreakpoint: (state: BuilderState) => state.setBreakpoint,
  openMenu: (state: BuilderState) => state.openMenu,
  closeMenu: (state: BuilderState) => state.closeMenu,
  toggleMenu: (state: BuilderState) => state.toggleMenu,
};
