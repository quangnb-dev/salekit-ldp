import type { Generator } from "@salekit/core";
import { generateAbsoluteBaseCss, generateBackgroundCss } from "@salekit/core";

export const pageGenerators: Generator[] = [
  {
    selector: "",
    generator: generateAbsoluteBaseCss,
  },
  {
    selector: "",
    generator: generateBackgroundCss,
  },
];
