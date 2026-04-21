import { classNames } from "@/shared/lib/classNames";
import type { BlockLibraryItem } from "../types/menu";

type BlockMenuListProps = {
  items: BlockLibraryItem[];
  selectedType: string | null;
  onSelectItem: (type: string) => void;
  onAddItem: (type: string) => void;
};

export default function BlockMenuList({
  items,
  selectedType,
  onSelectItem,
  onAddItem,
}: BlockMenuListProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-xl bg-white px-4 py-8 text-center text-sm text-slate-500">
        Không tìm thấy block phù hợp.
      </div>
    );
  }

  return (
    <div className="block-menu-list-scrollbar h-full min-h-0 overflow-y-auto rounded-xl bg-white p-1.5">
      <div className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = selectedType === item.type;

          return (
            <button
              key={item.type}
              type="button"
              onClick={() => onSelectItem(item.type)}
              onDoubleClick={() => onAddItem(item.type)}
              className={classNames(
                "group flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors",
                isActive ? "bg-slate-100" : "hover:bg-slate-50",
              )}
            >
              <span className="flex min-w-0 items-center gap-2.5">
                <span
                  className={classNames(
                    "flex h-5 w-5 shrink-0 items-center justify-center transition-colors",
                    isActive
                      ? "text-indigo-600"
                      : "text-slate-500 group-hover:text-indigo-500",
                  )}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span
                  className={classNames(
                    "truncate text-[13px] font-medium transition-colors",
                    isActive
                      ? "text-slate-900"
                      : "text-slate-700 group-hover:text-slate-900",
                  )}
                >
                  {item.label}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
