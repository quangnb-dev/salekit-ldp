import { X } from "lucide-react";
import { type FC, useEffect } from "react";

type MediaModalProps = {
  onClose: () => void;
};

export const MediaModal: FC<MediaModalProps> = ({
  onClose,
}: MediaModalProps) => {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Đóng modal"
        className="absolute inset-0 bg-slate-900/45"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Thư viện media"
        className="relative z-10 flex w-full max-w-3xl flex-col max-h-[90vh] rounded-2xl bg-white shadow-[0_24px_60px_rgba(15,23,42,0.3)]"
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <p className="text-sm font-semibold text-slate-900">Thư viện media</p>
          <button
            type="button"
            aria-label="Đóng modal"
            onClick={onClose}
            className="rounded-md p-1 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-4">
          <div className="flex h-48 items-center justify-center rounded-lg bg-slate-100 text-sm text-slate-400">
            Thư viện media
          </div>
        </div>

        <div className="flex items-center justify-end border-t border-slate-100 px-5 py-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
