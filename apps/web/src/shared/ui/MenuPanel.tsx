import type { FC, ReactNode } from "react";
import { classNames } from "@/shared/lib/classNames";

type MenuPanelProps = {
  children: ReactNode;
  className?: string;
};

export const MenuPanel: FC<MenuPanelProps> = ({
  children,
  className,
}: MenuPanelProps) => {
  return (
    <div
      className={classNames(
        "w-105 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.14)]",
        className,
      )}
    >
      {children}
    </div>
  );
};
