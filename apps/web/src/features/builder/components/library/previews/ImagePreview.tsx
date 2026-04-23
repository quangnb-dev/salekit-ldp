import type { FC } from "react";
export const ImagePreview: FC = () => {
  return (
    <div className="space-y-3">
      <div className="h-36 rounded-xl bg-slate-100" />
      <div className="h-24 rounded-xl bg-slate-100/80" />
    </div>
  );
};
