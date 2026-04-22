import type { FC, InputHTMLAttributes } from "react";

type ToggleRowProps = {
  label: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: InputHTMLAttributes<HTMLInputElement>["onChange"];
};

export const ToggleRow: FC<ToggleRowProps> = ({
  label,
  checked,
  defaultChecked,
  onChange,
}: ToggleRowProps) => {
  return (
    <label className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2.5">
      <span className="text-sm text-slate-700">{label}</span>
      <input
        type="checkbox"
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={onChange}
        className="h-4 w-4 rounded"
      />
    </label>
  );
};
