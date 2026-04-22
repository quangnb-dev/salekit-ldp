import type { Generator } from "../cssRuntime";
import {
  generateAbsoluteBaseCss,
  generateBackgroundCss,
  generateBorderCss,
  generateTextCss,
} from "../cssRuntime";

export const buttonGenerators: Generator[] = [
  {
    selector: "",
    generator: generateAbsoluteBaseCss,
  },
  {
    selector: "",
    generator: generateTextCss,
  },
  {
    selector: "",
    generator: generateBackgroundCss,
  },
  {
    selector: "",
    generator: generateBorderCss,
  },
];
