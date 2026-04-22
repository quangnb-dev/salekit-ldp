import type { Generator } from "@salekit/core";
import {
  generateAbsoluteBaseCss,
  generateBackgroundCss,
  generateTextCss,
} from "@salekit/core";

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
