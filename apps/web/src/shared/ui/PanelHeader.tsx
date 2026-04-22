import type { FC } from "react";

type PanelHeaderProps = {
  title: string;
  description?: string;
};

export const PanelHeader: FC<PanelHeaderProps> = ({
  title,
  description,
}: PanelHeaderProps) => {
  return (
    <div className="border-b border-slate-100 px-5 py-4">
      <p className="text-sm font-semibold text-slate-900">{title}</p>
      {description && (
        <p className="mt-1 text-xs text-slate-500">{description}</p>
      )}
    </div>
  );
};
