import type { FC } from "react";

export const TextPreview: FC = () => {
  return (
    <div className="space-y-4">
      <div className="text-[30px] font-black leading-tight text-slate-900">
        Tiêu đề mẫu
      </div>
      <p className="max-w-105 text-[15px] leading-relaxed text-slate-600">
        Đây là đoạn văn mẫu cho phần tử văn bản đã chọn.
      </p>
    </div>
  );
};
