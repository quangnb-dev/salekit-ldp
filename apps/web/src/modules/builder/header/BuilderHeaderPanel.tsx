import LayerPanelPlaceholder from "@/modules/builder/panels/LayerPanelPlaceholder";
import type { BuilderMenuPanel } from "@/modules/builder/stores/builderStore";
import type { BlockLibraryTab } from "@/modules/elements";
import { BlockLibraryPanel } from "@/modules/elements";
import SettingsMenuPanel from "@/modules/page-settings/SettingsMenuPanel";
import type { SettingsItemId } from "@/modules/page-settings/types/settings";

type BuilderHeaderPanelProps = {
  menuView: BuilderMenuPanel;
  onSelectBlock: (type: string) => void;
  onViewChange: (view: BlockLibraryTab) => void;
  onOpenSettingsModal: (itemId: SettingsItemId) => void;
};

export default function BuilderHeaderPanel({
  menuView,
  onSelectBlock,
  onViewChange,
  onOpenSettingsModal,
}: BuilderHeaderPanelProps) {
  if (menuView === "layer") {
    return <LayerPanelPlaceholder menuView={menuView} />;
  }

  if (menuView === "settings") {
    return <SettingsMenuPanel onOpenModal={onOpenSettingsModal} />;
  }

  return (
    <BlockLibraryPanel
      menuView={menuView}
      onSelect={onSelectBlock}
      onViewChange={onViewChange}
    />
  );
}
