import { getCommonBlockToolbarActions } from "./commonActions";
import { blockToolbarActionRegistry } from "./registry";
import type { BlockToolbarAction, BlockToolbarActionContext } from "./types";

const sortActions = (left: BlockToolbarAction, right: BlockToolbarAction) => {
  const leftOrder = left.order ?? Number.MAX_SAFE_INTEGER;
  const rightOrder = right.order ?? Number.MAX_SAFE_INTEGER;

  if (leftOrder !== rightOrder) {
    return leftOrder - rightOrder;
  }

  return left.label.localeCompare(right.label);
};

export const resolveBlockToolbarActions = (
  context: BlockToolbarActionContext,
): BlockToolbarAction[] => {
  const commonActions = getCommonBlockToolbarActions();
  const blockActions = blockToolbarActionRegistry[context.blockType] ?? [];

  return [...commonActions, ...blockActions]
    .filter((action) => action.isVisible?.(context) ?? true)
    .sort(sortActions);
};
