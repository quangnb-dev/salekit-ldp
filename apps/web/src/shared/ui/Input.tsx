import type {
  FC,
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

export const Input: FC<InputProps> = ({ className, ...props }: InputProps) => {
  return <input className={classNames(baseClass, className)} {...props} />;
};

export const Textarea: FC<TextareaProps> = ({
  className,
  ...props
}: TextareaProps) => {
  return (
    <textarea
      className={classNames(baseClass, "resize-none", className)}
      {...props}
    />
  );
};

export const Select: FC<SelectProps> = ({
  children,
  className,
  ...props
}: SelectProps) => {
  return (
    <select className={classNames(baseClass, className)} {...props}>
      {children}
    </select>
  );
};
