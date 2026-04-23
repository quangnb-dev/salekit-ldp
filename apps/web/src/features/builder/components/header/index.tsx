import { useBuilderStore } from "@salekit/core";
import { type FC, useRef, useState } from "react";
import type { BlockLibraryTab } from "@/features/builder/components/library";
import type { SettingsItemId } from "@/features/builder/components/settings";
import { SettingsModal } from "@/features/builder/components/settings";
import {
  menuSelectors,
  useBuilderMenuStore,
} from "@/features/builder/stores/builderStore";
import { useMenuDismiss } from "@/shared/hooks/useMenuDismiss";
import { BuilderHeaderPanel } from "./BuilderHeaderPanel";
import { HeaderBreakpointSwitch } from "./HeaderBreakpointSwitch";
import { HeaderLeftActions } from "./HeaderLeftActions";
import { HeaderRightActions } from "./HeaderRightActions";

export const EditorHeader: FC = () => {
  const currentDevice = useBuilderStore((state) => state.currentDevice);
  const setCurrentDevice = useBuilderStore((state) => state.setCurrentDevice);
  const menuView = useBuilderMenuStore(menuSelectors.menuView);
  const openMenu = useBuilderMenuStore(menuSelectors.openMenu);
  const closeMenu = useBuilderMenuStore(menuSelectors.closeMenu);
  const toggleMenu = useBuilderMenuStore(menuSelectors.toggleMenu);
  const [activeSettingsModal, setActiveSettingsModal] =
    useState<SettingsItemId | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  useMenuDismiss({
    isOpen: menuView !== "closed",
    menuContainer: menuRef,
    onDismiss: closeMenu,
  });

  const handleHeaderAction = (actionId: string) => {
    switch (actionId) {
      case "undo":
        break;
      case "redo":
        break;

      default:
        console.log(actionId);
        break;
    }
  };

  const handleViewChange = (view: BlockLibraryTab) => {
    openMenu(view);
  };

  const handleOpenSettingsModal = (itemId: SettingsItemId) => {
    closeMenu();
    setActiveSettingsModal(itemId);
  };

  return (
    <>
      <header className="sticky top-0 z-50 flex h-14 w-full items-center justify-between border-b border-slate-200 bg-white px-3">
        <div className="relative flex items-center gap-1" ref={menuRef}>
          <HeaderLeftActions activeView={menuView} onToggle={toggleMenu} />

          {menuView !== "closed" && (
            <div className="absolute left-0 top-full z-50 mt-3">
              <BuilderHeaderPanel
                menuView={menuView}
                onViewChange={handleViewChange}
                onOpenSettingsModal={handleOpenSettingsModal}
              />
            </div>
          )}
        </div>

        <HeaderBreakpointSwitch
          breakpoint={currentDevice}
          onChange={setCurrentDevice}
        />
        <HeaderRightActions onAction={handleHeaderAction} />
      </header>

      {activeSettingsModal && (
        <SettingsModal
          itemId={activeSettingsModal}
          onClose={() => setActiveSettingsModal(null)}
        />
      )}
    </>
  );
};
