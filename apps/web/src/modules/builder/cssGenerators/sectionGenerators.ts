import type { Generator } from "@salekit/core";
import { generateAbsoluteBaseCss, generateBackgroundCss } from "@salekit/core";
import { generateSectionInnerCss } from "./generateSectionInnerCss";

export const sectionGenerators: Generator[] = [
  {
    selector: "",
    generator: generateAbsoluteBaseCss,
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
