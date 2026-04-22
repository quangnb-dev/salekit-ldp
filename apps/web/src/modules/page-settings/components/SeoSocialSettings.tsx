import { type FC, useState } from "react";
import { Input, Textarea } from "@/shared/ui/Input";
import { usePageSettings } from "../hooks/usePageSettings";
import { MediaModal } from "./MediaModal";

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
      <span className="text-sm text-slate-700">{label}</span>
    </label>
  );
};

export const SeoSocialSettings: FC = () => {
  const { settings, setSetting } = usePageSettings();
  const [mediaModalOpen, setMediaModalOpen] = useState(false);

  return (
    <>
      <div className="space-y-4">
        <div>
          <p className="mb-1 text-sm font-medium text-slate-700">Title</p>
          <Input
            type="text"
            value={settings.seoTitle}
            onChange={(event) => setSetting("seoTitle", event.target.value)}
            placeholder="Mẫu login page"
          />
        </div>

        <div>
          <p className="mb-1 text-sm font-medium text-slate-700">Description</p>
          <Textarea
            rows={3}
            value={settings.seoDescription}
            onChange={(event) =>
              setSetting("seoDescription", event.target.value)
            }
            placeholder="Nhập mô tả trang, tối đa 160 ký tự"
            maxLength={160}
          />
        </div>

        <div>
          <p className="mb-1 text-sm font-medium text-slate-700">Keywords</p>
          <Input
            type="text"
            value={settings.seoKeywords}
            onChange={(event) => setSetting("seoKeywords", event.target.value)}
            placeholder="Nhập từ khoá về trang, ví dụ: salepage, salekit..."
          />
        </div>

        <div>
          <p className="mb-1 text-sm font-medium text-slate-700">
            Hình ảnh khi chia sẻ
          </p>
          <div className="flex gap-2">
            <Input
              type="text"
              value={settings.shareImageUrl}
              onChange={(event) =>
                setSetting("shareImageUrl", event.target.value)
              }
              placeholder="Link ảnh"
            />
            <button
              type="button"
              onClick={() => setMediaModalOpen(true)}
              className="shrink-0 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 whitespace-nowrap"
            >
              Chọn ảnh
            </button>
          </div>
          <div className="mt-2 h-20 rounded-lg bg-slate-100" />
        </div>

        <div>
          <p className="mb-1 text-sm font-medium text-slate-700">
            Favicon image
          </p>
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 shrink-0 rounded bg-slate-200" />
            <Input
              type="text"
              value={settings.faviconUrl}
              onChange={(event) => setSetting("faviconUrl", event.target.value)}
              placeholder="Link ảnh"
            />
            <button
              type="button"
              onClick={() => setMediaModalOpen(true)}
              className="shrink-0 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 whitespace-nowrap"
            >
              Chọn ảnh
            </button>
          </div>
        </div>

        <div>
          <p className="mb-1 text-sm font-medium text-slate-700">
            Canonical URL
          </p>
          <Input
            type="text"
            value={settings.canonicalUrl}
            onChange={(event) => setSetting("canonicalUrl", event.target.value)}
            placeholder="Nhập Canonical URL (tuỳ chọn)"
          />
        </div>

        <div className="flex items-center gap-6">
          <Toggle
            label="Sử dụng Lazyload"
            checked={settings.useLazyload}
            onChange={(checked) => setSetting("useLazyload", checked)}
          />
          <Toggle
            label="Googlebot chỉ mục"
            checked={settings.googlebotOnly}
            onChange={(checked) => setSetting("googlebotOnly", checked)}
          />
        </div>
      </div>

      {mediaModalOpen && (
        <MediaModal onClose={() => setMediaModalOpen(false)} />
      )}
    </>
  );
};
