import ToggleRow from "@/shared/ui/ToggleRow";
import { usePageSettings } from "../hooks/usePageSettings";

export default function GridSettings() {
  const { settings, setSetting } = usePageSettings();

  return (
    <div className="space-y-3">
      <ToggleRow
        label="Hiển thị lưới trên canvas"
        checked={settings.showGrid}
        onChange={(event) => setSetting("showGrid", event.target.checked)}
      />
      <ToggleRow
        label="Snap vào lưới"
        checked={settings.snapToGrid}
        onChange={(event) => setSetting("snapToGrid", event.target.checked)}
      />
    </div>
  );
}
