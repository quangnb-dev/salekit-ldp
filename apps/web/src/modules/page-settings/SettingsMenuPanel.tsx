import { useState } from "react";
import { classNames } from "@/shared/lib/classNames";
import MenuPanel from "@/shared/ui/MenuPanel";
import PanelHeader from "@/shared/ui/PanelHeader";
import { SETTINGS_ITEMS } from "./config/settingsItems";
import type { SettingsItemId } from "./types/settings";

type SettingsMenuPanelProps = {
  onOpenModal: (itemId: SettingsItemId) => void;
};

export default function SettingsMenuPanel({
  onOpenModal,
}: SettingsMenuPanelProps) {
  const [activeItemId, setActiveItemId] = useState<SettingsItemId | null>(null);

  return (
    <MenuPanel>
      <PanelHeader
        title="Cài đặt"
        description="Chọn mục bên dưới để mở modal cấu hình tương ứng."
      />

      <div className="space-y-2 px-5 py-4">
        {SETTINGS_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeItemId === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setActiveItemId(item.id);
                onOpenModal(item.id);
              }}
              className={classNames(
                "flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition-colors",
                isActive
                  ? "border-indigo-200 bg-indigo-50/70"
                  : "border-slate-200 hover:border-indigo-200 hover:bg-slate-50",
              )}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-100 text-slate-600">
                <Icon className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium text-slate-900">
                  {item.title}
                </span>
                <span className="block truncate text-xs text-slate-500">
                  {item.description}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </MenuPanel>
  );
}
