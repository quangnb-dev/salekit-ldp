import type { Generator } from "../cssRuntime";
import { generateAbsoluteBaseCss, generateBorderCss } from "../cssRuntime";

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
