import type { SK_BlockData } from "@salekit/core";

import type { Breakpoint, CSSProperties, Generator } from "../cssSystem";
import { generateBackgroundCss } from "../cssSystem";
import { generateSectionInnerCss } from "./generateSectionInnerCss";

function generateSectionOuterCss(
  _blockData: SK_BlockData,
  _breakpoint: Breakpoint,
): CSSProperties {
  return {
    position: "relative",
    width: "100%",
    display: "block",
    borderBottom: "1px dashed red",
  };
}

export const sectionGenerators: Generator[] = [
  {
    selector: "",
    generator: generateSectionOuterCss,
  },
  {
    selector: "",
    generator: generateBackgroundCss,
  },
  {
    selector: " .sk-section-inner",
    generator: generateSectionInnerCss,
  },
];
