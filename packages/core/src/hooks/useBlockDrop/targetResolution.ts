export const resolveDropTarget = (
  element: Element | null | undefined,
): HTMLElement | null => {
  if (!element) return null;
  return element instanceof HTMLElement ? element : null;
};
