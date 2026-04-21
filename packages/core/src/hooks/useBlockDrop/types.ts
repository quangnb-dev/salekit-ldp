export interface SimpleRef<T> {
  current: T | null;
}

export interface UseBlockDropOptions {
  blockOverlayRef?: SimpleRef<HTMLElement>;
  dragEnterRef?: SimpleRef<HTMLElement>;
  toolbarCallback?: (blockId: string) => void;
  isPopupEditMode?: boolean;
}
