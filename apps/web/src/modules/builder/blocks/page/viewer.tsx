import type { ReactNode } from "react";

type PageViewerProps = {
  children?: ReactNode;
};

/**
 * Page viewer component.
 * Renders the page drop zone with position: relative and data-sk-drop="true"
 * so useBlockDrop picks it up as the drop target.
 * Does NOT use <BlockViewer> — the page block is not selectable/draggable.
 * Children are injected by BlockRenderer's recursive rendering.
 */
export default function PageViewer({ children }: PageViewerProps) {
  return (
    <div
      data-sk-drop="true"
      style={{ position: "relative", minHeight: "100vh" }}
    >
      {children}
    </div>
  );
}
