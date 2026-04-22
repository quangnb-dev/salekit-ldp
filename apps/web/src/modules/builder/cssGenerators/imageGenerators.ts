import type { Generator } from "@salekit/core";
import { generateAbsoluteBaseCss, generateBorderCss } from "@salekit/core";

export const imageGenerators: Generator[] = [
  {
    selector: "",
    generator: generateAbsoluteBaseCss,
  },
  {
    selector: "",
    generator: generateBorderCss,
  },
];
