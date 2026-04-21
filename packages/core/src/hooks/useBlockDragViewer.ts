export interface UseBlockDragViewerOptions {
  selector?: string;
  onCommit?: (payload: { element: HTMLElement; top: number; left: number }) => void;
}

const readPixel = (value: string | null | undefined): number => {
  if (!value) return 0;
  const parsed = Number.parseFloat(value);
  return Number.isNaN(parsed) ? 0 : parsed;
};

export const useBlockDragViewer = (options: UseBlockDragViewerOptions = {}): void => {
  void options;
};
