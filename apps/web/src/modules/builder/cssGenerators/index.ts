import type { SK_BlockType } from "@salekit/core";

import type { Generator } from "../cssRuntime";
import { buttonGenerators } from "./buttonGenerators";
import { imageGenerators } from "./imageGenerators";
import { pageGenerators } from "./pageGenerators";
import { sectionGenerators } from "./sectionGenerators";
import { textGenerators } from "./textGenerators";

export const generatorRegistry = new Map<SK_BlockType, Generator[]>([
  ["page", pageGenerators],
  ["section", sectionGenerators],
  ["text", textGenerators],
  ["button", buttonGenerators],
  ["image", imageGenerators],
]);
