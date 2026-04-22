import type { InvalidBlockDropDetail } from "./types";

export const SK_INVALID_DROP_EVENT = "sk-invalid-drop";

export const dispatchInvalidBlockDrop = (
  detail: InvalidBlockDropDetail,
): void => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(SK_INVALID_DROP_EVENT, { detail }));
};
