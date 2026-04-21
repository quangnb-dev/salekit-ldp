import type { SK_BlockRect } from "../types";

export const checkGuideline = (
  target: SK_BlockRect,
  candidates: SK_BlockRect[],
  threshold = 3,
): SK_BlockRect[] =>
  candidates.filter(
    (candidate) =>
      Math.abs(candidate.left - target.left) <= threshold ||
      Math.abs(candidate.top - target.top) <= threshold ||
      Math.abs(candidate.right - target.right) <= threshold ||
      Math.abs(candidate.bottom - target.bottom) <= threshold,
  );
