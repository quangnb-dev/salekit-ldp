import type { Generator } from "../cssRuntime";
import {
  generateAbsoluteBaseCss,
  generateBackgroundCss,
  generateTextCss,
} from "../cssRuntime";

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
