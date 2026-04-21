import type { SK_BlockRect } from "../types";

export const checkSnap = (
  target: SK_BlockRect,
  candidates: SK_BlockRect[],
  threshold = 3,
): SK_BlockRect => {
  const match = candidates.find(
    (candidate) =>
      Math.abs(candidate.left - target.left) <= threshold ||
      Math.abs(candidate.top - target.top) <= threshold,
  );

  return match ?? target;
};

export const checkSnapResize = checkSnap;
