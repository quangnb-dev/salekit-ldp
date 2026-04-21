import { useState } from "react";
import { Input, Textarea } from "@/shared/ui/Input";
import MediaModal from "./MediaModal";

function Toggle({
  label,
  defaultChecked,
}: {
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only peer"
          defaultChecked={defaultChecked}
        />
        <div className="w-9 h-5 bg-slate-200 rounded-full peer peer-checked:bg-indigo-500 transition-colors" />
        <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-4" />
      </div>
      <span className="text-sm text-slate-700">{label}</span>
    </label>
  );
}

export default function SeoSocialSettings() {
  const [mediaModalOpen, setMediaModalOpen] = useState(false);

  return (
    <>
      <div className="space-y-4">
        {/* Title */}
        <div>
          <p className="mb-1 text-sm font-medium text-slate-700">Title</p>
          <Input type="text" placeholder="Mẫu login page" />
        </div>

        {/* Description */}
        <div>
          <p className="mb-1 text-sm font-medium text-slate-700">Description</p>
          <Textarea
            rows={3}
            placeholder="Nhập mô tả trang, tối đa 160 ký tự"
            maxLength={160}
          />
        </div>

        {/* Keywords */}
        <div>
          <p className="mb-1 text-sm font-medium text-slate-700">Keywords</p>
          <Input
            type="text"
            placeholder="Nhập từ khoá về trang, ví dụ: salepage, salekit..."
          />
        </div>

        {/* Hình ảnh khi chia sẻ */}
        <div>
          <p className="mb-1 text-sm font-medium text-slate-700">
            Hình ảnh khi chia sẻ
          </p>
          <div className="flex gap-2">
            <Input type="text" placeholder="Link ảnh" />
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

        {/* Favicon image */}
        <div>
          <p className="mb-1 text-sm font-medium text-slate-700">
            Favicon image
          </p>
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 shrink-0 rounded bg-slate-200" />
            <Input type="text" placeholder="Link ảnh" />
            <button
              type="button"
              onClick={() => setMediaModalOpen(true)}
              className="shrink-0 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 whitespace-nowrap"
            >
              Chọn ảnh
            </button>
          </div>
        </div>

        {/* Canonical URL */}
        <div>
          <p className="mb-1 text-sm font-medium text-slate-700">
            Canonical URL
          </p>
          <Input type="text" placeholder="Nhập Canonical URL (tuỳ chọn)" />
        </div>

        {/* Toggles */}
        <div className="flex items-center gap-6">
          <Toggle label="Sử dụng Layzyload" defaultChecked={false} />
          <Toggle label="Googlebot chỉ mục" defaultChecked={true} />
        </div>
      </div>

      {mediaModalOpen && (
        <MediaModal onClose={() => setMediaModalOpen(false)} />
      )}
    </>
  );
}
