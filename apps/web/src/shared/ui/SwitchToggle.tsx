import type { InputHTMLAttributes } from "react";
import { classNames } from "@/shared/lib/classNames";

type SwitchToggleProps = {
  label: string;
  hint?: boolean;
  className?: string;
} & Pick<
  InputHTMLAttributes<HTMLInputElement>,
  "checked" | "defaultChecked" | "onChange" | "disabled"
>;

export default function SwitchToggle({
  label,
  hint = false,
  className,
  checked,
  defaultChecked,
  onChange,
  disabled = false,
}: SwitchToggleProps) {
  return (
    <div
      className={classNames(
        "flex items-center justify-between py-1.5",
        className,
      )}
    >
      <span className="flex items-center gap-1 text-sm text-slate-700">
        {label}
        {hint && (
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-slate-300 text-[10px] font-bold text-white">
            ?
          </span>
        )}
      </span>

      <label
        className={classNames(
          "relative cursor-pointer",
          disabled && "cursor-not-allowed opacity-60",
        )}
      >
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={onChange}
          disabled={disabled}
        />
        <div className="h-5 w-9 rounded-full bg-slate-200 transition-colors peer-checked:bg-indigo-500" />
        <div className="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform peer-checked:translate-x-4" />
      </label>
    </div>
  );
}
