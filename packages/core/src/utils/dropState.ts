export const markDraggableDropStateForDrag = (element: HTMLElement): void => {
  element.dataset.skDropState = "dragging";
};

export const restoreDraggableDropStateAfterDrag = (
  element: HTMLElement,
): void => {
  delete element.dataset.skDropState;
};
