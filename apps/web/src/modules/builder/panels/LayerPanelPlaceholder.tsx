import type { BuilderMenuPanel } from "@/modules/builder/stores/builderStore";
import MenuPanel from "@/shared/ui/MenuPanel";
import PanelHeader from "@/shared/ui/PanelHeader";

type LayerPanelPlaceholderProps = {
  menuView: Extract<BuilderMenuPanel, "layer">;
};

const LAYER_PANEL = {
  title: "Layers",
  description: "Quản lý thứ tự và cấu trúc các block trên trang.",
};

export default function LayerPanelPlaceholder({
  menuView,
}: LayerPanelPlaceholderProps) {
  if (menuView !== "layer") return null;

  return (
    <MenuPanel>
      <PanelHeader
        title={LAYER_PANEL.title}
        description={LAYER_PANEL.description}
      />
      <div className="px-5 py-4">
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-5 py-10 text-center">
          <div className="text-sm font-medium text-slate-900">
            {LAYER_PANEL.title}
          </div>
          <p className="mt-2 text-sm text-slate-500">
            Tính năng đang được phát triển.
          </p>
        </div>
      </div>
    </MenuPanel>
  );
}
