let idCounter = 0;

export const genRandomBlockId = (prefix = "block"): string => {
  idCounter += 1;
  return `${prefix}_${idCounter}`;
};

export const findParentId = (
  hierarchy: Record<string, string[]>,
  childId: string,
): string | null => {
  for (const [parentId, childIds] of Object.entries(hierarchy)) {
    if (childIds.includes(childId)) {
      return parentId;
    }
  }
  return null;
};

export const convertToNumber = (value: unknown, fallback = 0): number => {
  if (typeof value === "number") return value;
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    return Number.isNaN(parsed) ? fallback : parsed;
  }
  return fallback;
};

export const renderAttach = (value: unknown): string => String(value ?? "");

export const getBorderOffset = (value = 0): number => value;

export const adjustRectForBorder = (
  rect: { top: number; left: number; width: number; height: number },
  border = 0,
) => ({
  ...rect,
  top: rect.top + border,
  left: rect.left + border,
  width: Math.max(0, rect.width - border * 2),
  height: Math.max(0, rect.height - border * 2),
});
