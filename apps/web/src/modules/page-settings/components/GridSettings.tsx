import type { FC } from "react";
import { ToggleRow } from "@/shared/ui/ToggleRow";
import { usePageSettings } from "../hooks/usePageSettings";

export const GridSettings: FC = () => {
  const { settings, setSetting } = usePageSettings();

  return (
    <div className="space-y-3">
      <ToggleRow
        label="Hiển thị lưới trên canvas"
        checked={settings.showGrid}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setSetting("showGrid", event.target.checked)
        }
      />
      <ToggleRow
        label="Snap vào lưới"
        checked={settings.snapToGrid}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setSetting("snapToGrid", event.target.checked)
        }
      />
    </div>
  );
};
