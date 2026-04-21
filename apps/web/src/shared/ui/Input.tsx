import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { classNames } from "@/shared/lib/classNames";

const baseClass =
  "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-500";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  className?: string;
};

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  children: ReactNode;
  className?: string;
};

export function Input({ className, ...props }: InputProps) {
  return <input className={classNames(baseClass, className)} {...props} />;
}

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={classNames(baseClass, "resize-none", className)}
      {...props}
    />
  );
}

export function Select({ children, className, ...props }: SelectProps) {
  return (
    <select className={classNames(baseClass, className)} {...props}>
      {children}
    </select>
  );
}
