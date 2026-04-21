import type { ComponentType } from "react";
import { classNames } from "@/shared/lib/classNames";

type ButtonProps = {
  variant: "ghost" | "primary";
  label: string;
  icon?: ComponentType<{ className?: string }>;
  onClick?: () => void;
  className?: string;
};

const variantClasses: Record<ButtonProps["variant"], string> = {
  ghost:
    "inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 cursor-pointer",
  primary:
    "inline-flex h-9 items-center gap-1.5 rounded-lg bg-linear-to-r from-indigo-600 to-indigo-500 px-4 text-sm font-semibold text-white shadow-sm transition-all hover:from-indigo-700 hover:to-indigo-600 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 cursor-pointer",
};

export default function Button({
  variant,
  label,
  icon: Icon,
  onClick,
  className,
}: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(variantClasses[variant], className)}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {label}
    </button>
  );
}
