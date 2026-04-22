import type { Generator } from "@salekit/core";
import {
  generateAbsoluteBaseCss,
  generateBackgroundCss,
  generateBorderCss,
  generateTextCss,
} from "@salekit/core";

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
