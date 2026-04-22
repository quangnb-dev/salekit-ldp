import type { SK_BlockType } from "@salekit/core";

export const SUPPORTED_LIBRARY_BLOCK_TYPES = [
  "section",
  "text",
  "button",
  "image",
] as const satisfies readonly SK_BlockType[];

export type SupportedLibraryBlockType =
  (typeof SUPPORTED_LIBRARY_BLOCK_TYPES)[number];

const supportedLibraryBlockTypeSet = new Set<string>(
  SUPPORTED_LIBRARY_BLOCK_TYPES,
);

export const isSupportedLibraryBlockType = (
  type: string,
): type is SupportedLibraryBlockType => supportedLibraryBlockTypeSet.has(type);
