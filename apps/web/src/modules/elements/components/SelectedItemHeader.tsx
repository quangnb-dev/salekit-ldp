import type { BlockLibraryItem } from "../types/menu";

export function SelectedItemHeader({ item }: { item: BlockLibraryItem }) {
  const Icon = item.icon;

  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-indigo-600" />
      <div className="text-sm font-semibold text-slate-900">{item.label}</div>
      <div className="rounded bg-slate-100 px-2 py-0.5 text-[11px] uppercase tracking-wide text-slate-500">
        {item.type}
      </div>
    </div>
  );
}
