import type { SK_BlockRect } from "../types";

export const getGridTemplate = (count: number): string =>
  `repeat(${Math.max(1, count)}, minmax(0, 1fr))`;

export const findMaxMarginTop = (rects: SK_BlockRect[]): number =>
  rects.reduce((max, rect) => Math.max(max, rect.top + rect.height), 0);
