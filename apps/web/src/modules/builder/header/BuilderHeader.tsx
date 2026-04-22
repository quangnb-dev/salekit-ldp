import {
  createAbsoluteBpConfigs,
  createBlockData,
  type SK_BlockType,
  useBlockStore,
} from "@salekit/core";
import { useRef, useState } from "react";
import { getToolbarConfig } from "@/modules/builder/blocks/toolbarConfigs";
import { useBuilderEditor } from "@/modules/builder/editor";
import { PAGE_BLOCK_ID } from "@/modules/builder/editor/seed";
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
import BuilderHeaderPanel from "./BuilderHeaderPanel";
import HeaderBreakpointSwitch from "./HeaderBreakpointSwitch";
import HeaderLeftActions from "./HeaderLeftActions";
import HeaderRightActions from "./HeaderRightActions";

export default function BuilderHeader() {
  const breakpoint = useBuilderStore(builderSelectors.currentDevice);
  const setBreakpoint = useBuilderStore(builderSelectors.setCurrentDevice);
  const menuView = useBuilderMenuStore(menuSelectors.menuView);
  const openMenu = useBuilderMenuStore(menuSelectors.openMenu);
  const closeMenu = useBuilderMenuStore(menuSelectors.closeMenu);
  const toggleMenu = useBuilderMenuStore(menuSelectors.toggleMenu);
  const { undo, redo, saveDocument } = useBuilderEditor();
  const [activeSettingsModal, setActiveSettingsModal] =
    useState<SettingsItemId | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  useMenuDismiss({
    isOpen: menuView !== "closed",
    menuContainer: menuRef,
    onDismiss: closeMenu,
  });

  /** Double-click on a sidebar item adds the block to the canvas via the store directly. */
  const handleSelectBlock = (type: string) => {
    const config = getToolbarConfig(type);
    const _device = useBuilderStore.getState().currentDevice;
    const blockId = `block-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
    const bpConfigs = {
      desktop: {
        ...createAbsoluteBpConfigs(40).desktop,
        ...(config.bpConfigs as Record<string, unknown>).desktop,
      },
      tablet: {
        ...createAbsoluteBpConfigs(40).tablet,
        ...(config.bpConfigs as Record<string, unknown>).tablet,
      },
      mobile: {
        ...createAbsoluteBpConfigs(40).mobile,
        ...(config.bpConfigs as Record<string, unknown>).mobile,
      },
    };
    const blockData = createBlockData(config.type as SK_BlockType, blockId, {
      label: config.label,
      bpConfigs,
      configs: config.configs,
    });
    useBlockStore
      .getState()
      .addBlock(blockId, PAGE_BLOCK_ID, blockData, undefined, undefined, false);
    useBuilderStore.getState().selectBlockId(blockId);
    closeMenu();
  };

  const handleHeaderAction = (actionId: string) => {
    switch (actionId) {
      case "undo":
        undo();
        break;
      case "redo":
        redo();
        break;
      case "save":
        saveDocument();
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
