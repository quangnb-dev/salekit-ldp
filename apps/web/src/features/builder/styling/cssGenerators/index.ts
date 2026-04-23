import type { SK_BlockType } from "@salekit/core";

import type { Generator, GeneratorSelector } from "../cssSystem";
import { buttonGenerators } from "./buttonGenerators";
import { imageGenerators } from "./imageGenerators";
import { pageGenerators } from "./pageGenerators";
import { sectionGenerators } from "./sectionGenerators";
import { textGenerators } from "./textGenerators";

const generatorLookup = new Map<SK_BlockType, Generator[]>([
  ["page", pageGenerators],
  ["section", sectionGenerators],
  ["text", textGenerators],
  ["button", buttonGenerators],
  ["image", imageGenerators],
]);

export const selectBlockGenerators: GeneratorSelector = ({ block }) => {
  // Future extension point: template-aware publish/export CSS can branch here
  // once the builder supports distinct non-editor outputs. Keep editor runtime
  // selection limited to current block-type behavior in this refactor.
  return generatorLookup.get(block.type);
};

export type { Generator } from "../cssSystem";
