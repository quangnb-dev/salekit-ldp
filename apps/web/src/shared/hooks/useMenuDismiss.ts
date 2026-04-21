import { type RefObject, useEffect } from "react";

type UseMenuDismissParams = {
  isOpen: boolean;
  menuContainer: RefObject<HTMLDivElement | null>;
  onDismiss: () => void;
};

export function useMenuDismiss({
  isOpen,
  menuContainer,
  onDismiss,
}: UseMenuDismissParams) {
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!menuContainer.current?.contains(event.target as Node)) onDismiss();
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onDismiss();
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, menuContainer, onDismiss]);
}
