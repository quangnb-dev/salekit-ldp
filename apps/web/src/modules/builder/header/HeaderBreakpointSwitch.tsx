import type { SK_BlockDevice } from "@salekit/core";
import { classNames } from "@/shared/lib/classNames";
import { BREAKPOINT_OPTIONS } from "./config/breakpoints";

type HeaderBreakpointSwitchProps = {
  breakpoint: SK_BlockDevice;
  onChange: (breakpoint: SK_BlockDevice) => void;
};

export default function HeaderBreakpointSwitch({
  breakpoint,
  onChange,
}: HeaderBreakpointSwitchProps) {
  return (
    <div className="inline-flex items-center gap-1 rounded-lg bg-slate-100 p-1">
      {BREAKPOINT_OPTIONS.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          className={classNames(
            "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm  cursor-pointer",
            breakpoint === id
              ? "bg-white font-medium text-slate-900 shadow-sm"
              : "text-slate-500 hover:text-slate-700",
          )}
        >
          <Icon className="h-4 w-4" />
          {label}
        </button>
      ))}
    </div>
  );
}
