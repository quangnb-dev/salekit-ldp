import type { Generator } from "../cssSystem";
import {
  generateAbsoluteBaseCss,
  generateBackgroundCss,
  generateBorderCss,
  generateTextCss,
} from "../cssSystem";

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
