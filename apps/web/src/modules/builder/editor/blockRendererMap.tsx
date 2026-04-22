import type { SK_BlockData } from "@salekit/core";
import type { ComponentType, ReactNode } from "react";

const shellClassName =
  "relative min-h-[48px] rounded-xl border border-white/20 bg-white/70 shadow-[0_12px_24px_rgba(15,23,42,0.08)] backdrop-blur";

const blockTypeStyles: Record<string, string> = {
  page: "bg-gradient-to-br from-slate-100 to-slate-200",
  section:
    "border-slate-200 bg-white/90 shadow-[0_16px_36px_rgba(15,23,42,0.12)]",
  group: "border-dashed border-slate-300 bg-white/80",
  box: "border-slate-300 bg-white",
  text: "border-transparent bg-transparent shadow-none",
  button: "border-indigo-200 bg-indigo-50 text-indigo-700",
  image: "border-slate-200 bg-slate-100",
  line: "border-slate-200 bg-slate-900",
  overlay: "border-fuchsia-200 bg-fuchsia-50/60",
  video: "border-slate-200 bg-slate-900 text-white",
  form: "border-emerald-200 bg-emerald-50",
  countdown: "border-amber-200 bg-amber-50",
  popup: "border-violet-200 bg-violet-50",
};

const renderLabel = (title: string, subtitle?: string): ReactNode => (
  <div className="space-y-1.5">
    <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
      {title}
    </div>
    {subtitle && <div className="text-sm text-slate-700">{subtitle}</div>}
  </div>
);

const createRenderer = (
  type: string,
): ComponentType<{ block: SK_BlockData }> => {
  switch (type) {
    case "page":
      return () => null;
    case "text":
      return ({ block }) => (
        <div className="rounded-lg border border-transparent px-4 py-2 text-[15px] leading-7 text-slate-700">
          {String(
            (block.configs as Record<string, unknown> | undefined)?.content ??
              block.label ??
              "Text block",
          )}
        </div>
      );
    case "button":
      return ({ block }) => (
        <button
          type="button"
          className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm"
        >
          {String(
            (block.configs as Record<string, unknown> | undefined)?.text ??
              block.label ??
              "Button",
          )}
        </button>
      );
    case "image":
      return () => (
        <div className="flex min-h-[160px] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-100 text-sm text-slate-500">
          Image placeholder
        </div>
      );
    case "line":
      return () => <div className="h-px w-full bg-slate-300" />;
    case "video":
      return () => (
        <div className="flex min-h-[180px] items-center justify-center rounded-xl bg-slate-900 text-sm text-white/80">
          Video placeholder
        </div>
      );
    case "form":
      return () => (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-5 text-sm text-emerald-900">
          Form placeholder
        </div>
      );
    case "countdown":
      return () => (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-5 text-sm text-amber-900">
          Countdown placeholder
        </div>
      );
    case "overlay":
      return () => (
        <div className="rounded-xl border border-fuchsia-200 bg-fuchsia-50/80 px-4 py-5 text-sm text-fuchsia-900">
          Overlay block
        </div>
      );
    default:
      return ({ block }) => (
        <div className="text-sm text-slate-700">
          {renderLabel(block.label ?? block.type, block.type)}
        </div>
      );
  }
};

export const BLOCK_RENDERERS: Record<
  string,
  ComponentType<{ block: SK_BlockData }>
> = {
  page: createRenderer("page"),
  section: createRenderer("section"),
  group: createRenderer("group"),
  box: createRenderer("box"),
  text: createRenderer("text"),
  button: createRenderer("button"),
  image: createRenderer("image"),
  line: createRenderer("line"),
  overlay: createRenderer("overlay"),
  video: createRenderer("video"),
  form: createRenderer("form"),
  countdown: createRenderer("countdown"),
  popup: createRenderer("popup"),
};

export const resolveBlockRenderer = (
  type: string,
): ComponentType<{ block: SK_BlockData }> =>
  (BLOCK_RENDERERS[type] ?? BLOCK_RENDERERS.box) as ComponentType<{
    block: SK_BlockData;
  }>;

export const getRendererShellClassName = (type: string) =>
  `${shellClassName} ${blockTypeStyles[type] ?? "border-slate-200 bg-white"}`;
