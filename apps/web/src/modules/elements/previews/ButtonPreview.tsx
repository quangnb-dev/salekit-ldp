import type { FC } from "react";
export const ButtonPreview: FC = () => {
  return (
    <div className="space-y-3">
      <button
        type="button"
        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white"
      >
        Nút chính
      </button>
      <button
        type="button"
        className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700"
      >
        Nút phụ
      </button>
    </div>
  );
};
