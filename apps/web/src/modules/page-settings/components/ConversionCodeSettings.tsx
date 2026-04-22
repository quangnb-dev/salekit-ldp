import type { FC } from "react";
import { Input } from "@/shared/ui/Input";
import { usePageSettings } from "../hooks/usePageSettings";

type ToggleProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export const Toggle: FC<ToggleProps> = ({
  label,
  checked,
  onChange,
}: ToggleProps) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <span className="text-sm text-slate-700">{label}</span>
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
        />
        <div className="h-5 w-9 rounded-full bg-slate-200 transition-colors peer-checked:bg-indigo-500" />
        <div className="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform peer-checked:translate-x-4" />
      </div>
    </label>
  );
};

export const ConversionCodeSettings: FC = () => {
  const { settings, setSetting } = usePageSettings();

  return (
    <div className="space-y-4">
      <div>
        <p className="mb-1 text-sm font-medium text-slate-700">
          Facebook Pixel ID
        </p>
        <Input
          type="text"
          value={settings.facebookPixelId}
          onChange={(event) =>
            setSetting("facebookPixelId", event.target.value)
          }
          placeholder="Ex: 1520656564722XXX"
        />
      </div>

      <div>
        <p className="mb-1 text-sm font-medium text-slate-700">
          Google Analytics ID
        </p>
        <Input
          type="text"
          value={settings.googleAnalyticsId}
          onChange={(event) =>
            setSetting("googleAnalyticsId", event.target.value)
          }
          placeholder="Ex: G-XXXXXXX"
        />
      </div>

      <div>
        <p className="mb-1 text-sm font-medium text-slate-700">Google Ads ID</p>
        <Input
          type="text"
          value={settings.googleAdsId}
          onChange={(event) => setSetting("googleAdsId", event.target.value)}
          placeholder="Ex: AW-866447XXX"
        />
      </div>

      <div>
        <p className="mb-1 text-sm font-medium text-slate-700">
          TikTok Pixel ID
        </p>
        <Input
          type="text"
          value={settings.tiktokPixelId}
          onChange={(event) => setSetting("tiktokPixelId", event.target.value)}
          placeholder="Ex: BLSR3MH5IEM1Q8BOFXXX"
        />
      </div>

      <div>
        <p className="mb-1 text-sm font-medium text-slate-700">
          Google Tag Manager ID
        </p>
        <Input
          type="text"
          value={settings.gtmId}
          onChange={(event) => setSetting("gtmId", event.target.value)}
          placeholder="Ex: GTM-XXXXXXX"
        />
      </div>

      <Toggle
        label="Trang cảm ơn"
        checked={settings.thankYouPage}
        onChange={(checked) => setSetting("thankYouPage", checked)}
      />
    </div>
  );
};
