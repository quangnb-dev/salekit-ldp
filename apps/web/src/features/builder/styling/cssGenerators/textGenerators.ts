import type { Generator } from "../cssSystem";
import {
  generateAbsoluteBaseCss,
  generateBackgroundCss,
  generateTextCss,
} from "../cssSystem";

export const textGenerators: Generator[] = [
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
];
