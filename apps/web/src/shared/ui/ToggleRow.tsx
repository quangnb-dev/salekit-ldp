type ToggleRowProps = {
  label: string;
  defaultChecked?: boolean;
};

export default function ToggleRow({ label, defaultChecked }: ToggleRowProps) {
  return (
    <label className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2.5">
      <span className="text-sm text-slate-700">{label}</span>
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        className="h-4 w-4 rounded"
      />
    </label>
  );
}
