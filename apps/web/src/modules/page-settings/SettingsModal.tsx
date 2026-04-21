import { X } from "lucide-react";
import { useEffect, useState } from "react";
import ConversionCodeSettings from "./components/ConversionCodeSettings";
import CustomCodeSettings from "./components/CustomCodeSettings";
import GridSettings from "./components/GridSettings";
import PageSettings from "./components/PageSettings";
import SeoSocialSettings from "./components/SeoSocialSettings";
import { SETTINGS_ITEMS } from "./config/settingsItems";
import type { SettingsItemId } from "./types/settings";

const SETTINGS_CONTENT: Record<SettingsItemId, React.ComponentType> = {
  grid: GridSettings,
  "seo-social": SeoSocialSettings,
  "conversion-code": ConversionCodeSettings,
  "custom-code": CustomCodeSettings,
  "page-settings": PageSettings,
};

type SettingsModalProps = {
  itemId: SettingsItemId;
  onClose: () => void;
};

export default function SettingsModal({ itemId, onClose }: SettingsModalProps) {
  const [activeTab, setActiveTab] = useState<SettingsItemId>(itemId);

  useEffect(() => {
    setActiveTab(itemId);
  }, [itemId]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const Content = SETTINGS_CONTENT[activeTab];

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/45 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Thiết lập trang"
        className="flex w-full max-w-2xl flex-col max-h-[90vh] rounded-2xl bg-white shadow-[0_24px_60px_rgba(15,23,42,0.3)]"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between  border-slate-100 px-5 py-4">
          <p className="text-sm font-semibold text-slate-900">
            Thiết lập trang
          </p>
          <button
            type="button"
            aria-label="Đóng modal"
            onClick={onClose}
            className="rounded-md p-1 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tab bar */}
        <div className="flex gap-1 border-b border-slate-100 px-5">
          {SETTINGS_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-2.5 text-sm transition-colors cursor-pointer border-b-2 -mb-px ${
                activeTab === item.id
                  ? "border-indigo-600 text-indigo-600 font-medium"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="modal-body-scrollbar h-120 overflow-y-auto px-5 py-4">
          <Content />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 border-t border-slate-100 px-5 py-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
          >
            Đóng
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}
