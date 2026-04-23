import type { Generator } from "../cssSystem";
import { generateAbsoluteBaseCss, generateBorderCss } from "../cssSystem";

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
