import type { SK_BlockDevice } from "../types";

export interface UseBlockResizableOptions {
  selector?: string;
  device?: SK_BlockDevice;
  blockId?: string;
}

export const useBlockResizable = (
  options: UseBlockResizableOptions = {},
): void => {
  void options;
};
