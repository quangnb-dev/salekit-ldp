import type { FC } from "react";
import type { BlockLibraryItem } from "../types/menu";

export const PREVIEW_HINTS: Partial<Record<string, string>> = {
  text: "Xem trước cho block văn bản",
  button: "Xem trước cho block nút bấm",
  image: "Xem trước cho block hình ảnh",
  video: "Xem trước cho block video",
  form: "Xem trước cho block biểu mẫu",
  section: "Xem trước cho mẫu section",
};

export const DefaultPreview: FC<{ item: BlockLibraryItem }> = ({
  item,
}: {
  item: BlockLibraryItem;
}) => {
  const Icon = item.icon;
  const hint = PREVIEW_HINTS[item.type] ?? `Xem trước cho ${item.label}`;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-indigo-600" />
        <span className="text-sm font-semibold text-slate-900">
          {item.label}
        </span>
      </div>
      <p className="text-sm text-slate-500">{hint}</p>
      <div className="h-28 rounded-xl bg-slate-100/80" />
    </div>
  );
};
