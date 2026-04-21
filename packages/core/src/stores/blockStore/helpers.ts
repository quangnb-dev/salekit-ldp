import type {
  SK_BlockData,
  SK_BlockStructure,
} from "../../types";
import type { BlockState } from "./types";

export type ConfigObject = Record<string, unknown>;
export type BlockMap = Record<string, SK_BlockData>;
export type HierarchyMap = Record<string, string[]>;

export const isPlainObject = (value: unknown): value is ConfigObject =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const setNestedValue = (
  targetObj: ConfigObject,
  path: string,
  value: unknown,
): void => {
  const pathParts = path.split(".");

  if (pathParts.length === 1) {
    const [singlePart] = pathParts;
    if (singlePart) {
      targetObj[singlePart] = value;
    }
    return;
  }

  let currentObj = targetObj;

  for (let i = 0; i < pathParts.length - 1; i += 1) {
    const part = pathParts[i];
    if (!part) {
      continue;
    }

    if (!isPlainObject(currentObj[part])) {
      currentObj[part] = {};
    }

    currentObj = currentObj[part] as ConfigObject;
  }

  const lastPart = pathParts[pathParts.length - 1];
  if (lastPart) {
    currentObj[lastPart] = value;
  }
};

export const updateProperties = (
  targetObj: ConfigObject,
  path: string,
  value: string | number | boolean | Record<string, unknown>,
): void => {
  if (path === "_multiple_" && isPlainObject(value)) {
    Object.entries(value).forEach(([propPath, propValue]) => {
      setNestedValue(targetObj, propPath, propValue);
    });
    return;
  }

  if (!path.includes(".") && isPlainObject(value)) {
    const current = targetObj[path];
    targetObj[path] = {
      ...(isPlainObject(current) ? current : {}),
      ...value,
    };
    return;
  }

  setNestedValue(targetObj, path, value);
};

export const getActiveData = (
  state: BlockState,
  isPopupEditMode?: boolean,
): { blocksData: BlockMap; hierarchyData: HierarchyMap } => ({
  blocksData: isPopupEditMode ? state.popupBlocks : state.blocks,
  hierarchyData: isPopupEditMode ? state.popupHierarchy : state.hierarchy,
});

export const mergeStructure = (
  blocksData: BlockMap,
  hierarchyData: HierarchyMap,
  structure: SK_BlockStructure,
): void => {
  Object.entries(structure.blocks).forEach(([blockId, blockData]) => {
    blocksData[blockId] = blockData;
  });

  Object.entries(structure.hierarchy).forEach(([parentId, childIds]) => {
    hierarchyData[parentId] = childIds;
  });
};

export {
  applyPositionOffset,
  cloneBlockWithId,
  createDefaultPopupBlock,
  createDefaultSectionBlock,
  createUniqueBlockId,
} from "../../lib/builder";
