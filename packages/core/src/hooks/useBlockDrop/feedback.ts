export const showDropFeedback = (element: HTMLElement | null | undefined): void => {
  if (!element) return;
  element.setAttribute("data-sk-drop-feedback-visible", "true");
};

export const clearDropFeedback = (element: HTMLElement | null | undefined): void => {
  if (!element) return;
  element.removeAttribute("data-sk-drop-feedback-visible");
};
