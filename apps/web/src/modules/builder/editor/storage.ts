import type { EditorSnapshot } from "./types";

const STORAGE_KEY = "salekit-web-core-integration:editor-snapshot";

export const loadEditorSnapshot = (): EditorSnapshot | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as EditorSnapshot;
  } catch {
    return null;
  }
};

export const saveEditorSnapshot = (snapshot: EditorSnapshot): void => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
};

export const clearEditorSnapshot = (): void => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
};
