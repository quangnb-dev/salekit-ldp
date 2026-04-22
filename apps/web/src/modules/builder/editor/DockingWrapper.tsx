import { Editor, useBuilderStore } from "@salekit/core";
import type { ReactNode } from "react";
import { useMemo } from "react";
import { classNames } from "@/shared/lib/classNames";
import { blockViewers } from "../blocks";
import { useBuilderEditor } from "./BuilderEditorContext";
import { usePageStyles } from "./hooks/usePageStyles";
import { PAGE_BLOCK_ID } from "./seed";

type DockingWrapperProps = {
  children?: ReactNode;
};

export default function DockingWrapper({ children }: DockingWrapperProps) {
  const currentDevice = useBuilderStore((state) => state.currentDevice);
  const selectedBlockId = useBuilderStore((state) => state.selectedBlockId);
  const { hydrated } = useBuilderEditor();

  // Initialize CSS system
  usePageStyles();

  const pageWidth = useMemo(() => {
    if (currentDevice === "mobile") {
      return 430;
    }
    if (currentDevice === "tablet") {
      return 820;
    }
    return 1200;
  }, [currentDevice]);

  const pageMaxWidthClass = useMemo(() => {
    if (currentDevice === "mobile") {
      return "max-w-107.5";
    }
    if (currentDevice === "tablet") {
      return "max-w-225";
    }
    return "max-w-300";
  }, [currentDevice]);

  return (
    <div
      data-sk-docking-wrapper="true"
      className="relative min-h-full overflow-auto bg-[linear-gradient(180deg,rgba(248,250,252,1)_0%,rgba(241,245,249,1)_100%)] p-6"
    >
      <div
        className={classNames(
          "mx-auto flex min-h-[calc(100vh-10rem)] flex-col rounded-[28px] border border-slate-200 bg-white shadow-[0_24px_64px_rgba(15,23,42,0.10)]",
          pageMaxWidthClass,
        )}
        style={{ width: pageWidth, maxWidth: "100%" }}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-3">
          <div>
            <p className="text-sm font-semibold text-slate-900">Canvas</p>
            <p className="text-xs text-slate-500">
              Relative shell with absolute block placement
            </p>
          </div>
          <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            {currentDevice}
          </div>
        </div>

        <div
          className={classNames(
            "relative flex-1 overflow-hidden rounded-b-[28px] bg-[radial-gradient(circle,#e2e8f0_1px,transparent_1px)] bg-size-[16px_16px]",
            !hydrated && "opacity-50",
          )}
          style={{ minHeight: "calc(100vh - 14rem)" }}
        >
          <Editor
            rootId={PAGE_BLOCK_ID}
            views={blockViewers}
            pageWrapperStyle={{ minHeight: "calc(100vh - 14rem)" }}
          />

          <div className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-slate-900/80 px-3 py-1 text-[11px] font-medium text-white">
            {selectedBlockId ?? "page"}
          </div>

          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-indigo-500/40 to-transparent"
            data-sk-guideline="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-px bg-linear-to-b from-transparent via-indigo-500/40 to-transparent"
            data-sk-guideline="true"
          />
        </div>
      </div>
      {children}
    </div>
  );
}
