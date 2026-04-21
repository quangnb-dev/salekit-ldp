import { useRef, useState } from "react";
import {
  builderSelectors,
  useBuilderStore,
} from "@/modules/builder/stores/builderStore";
import type { BlockLibraryTab } from "@/modules/elements";
import type { SettingsItemId } from "@/modules/page-settings";
import { SettingsModal } from "@/modules/page-settings";
import { useMenuDismiss } from "@/shared/hooks/useMenuDismiss";
import BuilderHeaderPanel from "./BuilderHeaderPanel";
import HeaderBreakpointSwitch from "./HeaderBreakpointSwitch";
import HeaderLeftActions from "./HeaderLeftActions";
import HeaderRightActions from "./HeaderRightActions";

export default function BuilderHeader() {
  const breakpoint = useBuilderStore(builderSelectors.breakpoint);
  const setBreakpoint = useBuilderStore(builderSelectors.setBreakpoint);
  const menuView = useBuilderStore(builderSelectors.menuView);
  const openMenu = useBuilderStore(builderSelectors.openMenu);
  const closeMenu = useBuilderStore(builderSelectors.closeMenu);
  const toggleMenu = useBuilderStore(builderSelectors.toggleMenu);
  const [activeSettingsModal, setActiveSettingsModal] =
    useState<SettingsItemId | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  useMenuDismiss({
    isOpen: menuView !== "closed",
    menuContainer: menuRef,
    onDismiss: closeMenu,
  });

  const handleSelectBlock = (type: string) => {
    console.log("add-block", type);
  };

  const handleHeaderAction = (actionId: string) => {
    console.log(actionId);
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
                onSelectBlock={handleSelectBlock}
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
}
