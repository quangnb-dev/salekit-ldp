import { type FC, useRef, useState } from "react";
import { useBuilderEditor } from "@/modules/builder/editor";
import {
  builderSelectors,
  menuSelectors,
  useBuilderMenuStore,
  useBuilderStore,
} from "@/modules/builder/stores/builderStore";
import type { BlockLibraryTab } from "@/modules/elements";
import type { SettingsItemId } from "@/modules/page-settings";
import { SettingsModal } from "@/modules/page-settings";
import { useMenuDismiss } from "@/shared/hooks/useMenuDismiss";
import { BuilderHeaderPanel } from "./BuilderHeaderPanel";
import { HeaderBreakpointSwitch } from "./HeaderBreakpointSwitch";
import { HeaderLeftActions } from "./HeaderLeftActions";
import { HeaderRightActions } from "./HeaderRightActions";

export const EditorHeader: FC = () => {
  const breakpoint = useBuilderStore(builderSelectors.currentDevice);
  const setBreakpoint = useBuilderStore(builderSelectors.setCurrentDevice);
  const menuView = useBuilderMenuStore(menuSelectors.menuView);
  const openMenu = useBuilderMenuStore(menuSelectors.openMenu);
  const closeMenu = useBuilderMenuStore(menuSelectors.closeMenu);
  const toggleMenu = useBuilderMenuStore(menuSelectors.toggleMenu);
  const { undo, redo } = useBuilderEditor();
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
        undo();
        break;
      case "redo":
        redo();
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
      <header className="flex h-14 w-full items-center justify-between border-b border-slate-200 bg-white px-3">
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
          breakpoint={breakpoint}
          onChange={setBreakpoint}
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
