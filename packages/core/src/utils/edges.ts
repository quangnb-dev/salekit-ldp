import type { SK_BlockType } from "../types";

export const getEdges = (type: SK_BlockType): Record<string, boolean> => {
  if (type === "page" || type === "section") {
    return {};
  }

  return {
    top: true,
    left: true,
    right: true,
    bottom: true,
  };
};
