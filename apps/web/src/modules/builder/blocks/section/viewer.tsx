import type { SK_BlockViewer } from "@salekit/core";
import { SK_DATA_SET_ATTRS } from "@salekit/core";
import type { ReactNode } from "react";

type SectionViewerProps = SK_BlockViewer & {
  children?: ReactNode;
};

/**
 * Section viewer component.
 * Renders a section with:
 * - Outer div: position: relative container with data-sk-id for CSS targeting
 * - Inner div: centered container with data-drop-inner for drop zone detection
 * Children are positioned absolutely within the inner div.
 */
export default function SectionViewer({
  autoId,
  children,
}: SectionViewerProps) {
  return (
    <div
      className="section-outer"
      {...{ [SK_DATA_SET_ATTRS.AUTO_ID]: autoId }}
      style={{ position: "relative" }}
    >
      <div
        className="section-inner"
        {...{ [SK_DATA_SET_ATTRS.DROP_INNER]: "true" }}
        style={{ margin: "0 auto" }}
      >
        {children}
      </div>
    </div>
  );
}
