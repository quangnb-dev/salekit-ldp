import {
  type BuilderActions as CoreBuilderActions,
  type BuilderState as CoreBuilderState,
  useBuilderStore as useCoreBuilderStore,
} from "@salekit/core";
import { create } from "zustand";

export type BuilderMenuView =
  | "closed"
  | "all"
  | "section"
  | "popup"
  | "layer"
  | "settings";
export type BuilderMenuPanel = Exclude<BuilderMenuView, "closed">;

type BuilderMenuState = {
  menuView: BuilderMenuView;
  openMenu: (view: BuilderMenuPanel) => void;
  closeMenu: () => void;
  toggleMenu: (view: BuilderMenuPanel) => void;
};

export const useBuilderMenuStore = create<BuilderMenuState>((set, get) => ({
  menuView: "closed",
  openMenu: (menuView) => set({ menuView }),
  closeMenu: () => set({ menuView: "closed" }),
  toggleMenu: (menuView) =>
    set({ menuView: get().menuView === menuView ? "closed" : menuView }),
}));

export type BuilderState = CoreBuilderState & CoreBuilderActions;

export const useBuilderStore = useCoreBuilderStore;

export const builderSelectors = {
  currentDevice: (state: CoreBuilderState) => state.currentDevice,
  selectedBlockId: (state: CoreBuilderState) => state.selectedBlockId,
  setCurrentDevice: (state: BuilderState) => state.setCurrentDevice,
  selectBlockId: (state: BuilderState) => state.selectBlockId,
};

export const menuSelectors = {
  menuView: (state: BuilderMenuState) => state.menuView,
  openMenu: (state: BuilderMenuState) => state.openMenu,
  closeMenu: (state: BuilderMenuState) => state.closeMenu,
  toggleMenu: (state: BuilderMenuState) => state.toggleMenu,
};
