import type { FC, ReactNode } from "react";
import { classNames } from "@/shared/lib/classNames";

type FieldRowProps = {
  label: string;
  children: ReactNode;
  className?: string;
  labelClassName?: string;
  contentClassName?: string;
};

export const FieldRow: FC<FieldRowProps> = ({
  label,
  children,
  className,
  labelClassName,
  contentClassName,
}: FieldRowProps) => {
  return (
    <div className={classNames("flex items-center gap-3", className)}>
      <span
        className={classNames(
          "w-36 shrink-0 text-sm text-slate-700",
          labelClassName,
        )}
      >
        {label}
      </span>
      <div className={classNames("flex-1", contentClassName)}>{children}</div>
    </div>
  );
};
