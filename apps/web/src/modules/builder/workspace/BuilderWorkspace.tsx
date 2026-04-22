import { DockingWrapper, useBuilderEditor } from "@/modules/builder/editor";

export default function BuilderWorkspace() {
  const { hydrated, saving, lastSavedAt } = useBuilderEditor();

  return (
    <div className="relative flex-1 overflow-hidden bg-slate-50">
      <DockingWrapper />

      <div className="pointer-events-none absolute right-4 top-4 z-20 flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm backdrop-blur">
        <span className={hydrated ? "text-emerald-600" : "text-amber-600"}>
          {hydrated ? "Hydrated" : "Bootstrapping"}
        </span>
        <span className="h-1 w-1 rounded-full bg-slate-300" />
        <span>
          {saving
            ? "Saving..."
            : lastSavedAt
              ? new Date(lastSavedAt).toLocaleTimeString()
              : "Unsaved"}
        </span>
      </div>
    </div>
  );
}
