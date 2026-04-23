import type { FC } from "react";
import type { BlockLibraryTab } from "@/features/builder/components/library";
import { BlockLibraryPanel } from "@/features/builder/components/library";
import { LayerPanelPlaceholder } from "@/features/builder/components/panels/LayerPanelPlaceholder";
import { SettingsMenuPanel } from "@/features/builder/components/settings/SettingsMenuPanel";
import type { SettingsItemId } from "@/features/builder/components/settings/types/settings";
import type { BuilderMenuPanel } from "@/features/builder/stores/builderStore";

type BuilderHeaderPanelProps = {
  menuView: BuilderMenuPanel;
  onViewChange: (view: BlockLibraryTab) => void;
  onOpenSettingsModal: (itemId: SettingsItemId) => void;
};

export const BuilderHeaderPanel: FC<BuilderHeaderPanelProps> = ({
  menuView,
  onViewChange,
  onOpenSettingsModal,
}: BuilderHeaderPanelProps) => {
  if (menuView === "layer") {
    return <LayerPanelPlaceholder menuView={menuView} />;
  }

  if (menuView === "settings") {
    return <SettingsMenuPanel onOpenModal={onOpenSettingsModal} />;
  }

  return <BlockLibraryPanel menuView={menuView} onViewChange={onViewChange} />;
};
