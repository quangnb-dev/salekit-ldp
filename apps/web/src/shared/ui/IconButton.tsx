import type { FC, ReactNode } from "react";
import { classNames } from "@/shared/lib/classNames";

type IconButtonProps = {
  children: ReactNode;
  title?: string;
  active?: boolean;
  onClick?: () => void;
};

export const IconButton: FC<IconButtonProps> = ({
  children,
  title,
  active = false,
  onClick,
}: IconButtonProps) => {
  return (
    <button
      type="button"
      title={title}
      aria-expanded={active}
      onClick={onClick}
      className={classNames(
        "inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors cursor-pointer",
        active
          ? "bg-slate-100 text-slate-900"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
      )}
    >
      {children}
    </button>
  );
};
