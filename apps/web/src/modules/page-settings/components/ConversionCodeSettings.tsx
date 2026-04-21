import { Input } from "@/shared/ui/Input";

function Toggle({ label }: { label: string }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <span className="text-sm text-slate-700">{label}</span>
      <div className="relative">
        <input type="checkbox" className="sr-only peer" />
        <div className="w-9 h-5 bg-slate-200 rounded-full peer peer-checked:bg-indigo-500 transition-colors" />
        <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-4" />
      </div>
    </label>
  );
}

export default function ConversionCodeSettings() {
  return (
    <div className="space-y-4">
      <div>
        <p className="mb-1 text-sm font-medium text-slate-700">
          Facebook Pixel ID
        </p>
        <Input type="text" placeholder="Ex: 1520656564722XXX" />
      </div>

      <div>
        <p className="mb-1 text-sm font-medium text-slate-700">
          Google Analytics ID
        </p>
        <Input type="text" placeholder="Ex: G-XXXXXXX" />
      </div>

      <div>
        <p className="mb-1 text-sm font-medium text-slate-700">Google Ads ID</p>
        <Input type="text" placeholder="Ex: AW-866447XXX" />
      </div>

      <div>
        <p className="mb-1 text-sm font-medium text-slate-700">
          TikTok Pixel ID
        </p>
        <Input type="text" placeholder="Ex: BLSR3MH5IEM1Q8BOFXXX" />
      </div>

      <div>
        <p className="mb-1 text-sm font-medium text-slate-700">
          Google Tag Manager ID
        </p>
        <Input type="text" placeholder="Ex: GTM-XXXXXXX" />
      </div>

      <Toggle label="Trang cảm ơn" />
    </div>
  );
}
