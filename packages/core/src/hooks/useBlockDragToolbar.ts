export interface UseBlockDragToolbarOptions {
  selector?: string;
  onStart?: (element: HTMLElement) => void;
  onEnd?: (element: HTMLElement) => void;
}

export const useBlockDragToolbar = (options: UseBlockDragToolbarOptions = {}): void => {
  void options;
};
