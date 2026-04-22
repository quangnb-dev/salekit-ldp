import type { SK_BlockData } from "@salekit/core";

import type { Breakpoint, CSSProperties, Generator } from "../cssRuntime";
import { generateBackgroundCss } from "../cssRuntime";
import { generateSectionInnerCss } from "./generateSectionInnerCss";

function generateSectionOuterCss(
  _blockData: SK_BlockData,
  _breakpoint: Breakpoint,
): CSSProperties {
  return {
    position: "relative",
    width: "100%",
    display: "block",
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
    selector: " .section-inner",
    generator: generateSectionInnerCss,
  },
];
