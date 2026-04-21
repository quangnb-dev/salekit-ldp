import type {
  SK_BlockData,
  SK_BlockDevice,
  SK_BlockStructure,
} from "../../types";
import { generateId } from "../../utils";
import type { BlockState } from "./types";

export type ConfigObject = Record<string, unknown>;
export type BlockMap = Record<string, SK_BlockData>;
export type HierarchyMap = Record<string, string[]>;

const DEVICE_KEYS: SK_BlockDevice[] = ["desktop", "tablet", "mobile"];

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

export const createUniqueBlockId = (
  blocksData: Record<string, SK_BlockData>,
): string => {
  let nextId = generateId("block");

  while (blocksData[nextId]) {
    nextId = generateId("block");
  }

  return nextId;
};

export const createDefaultSectionBlock = (
  newSectionId: string,
): SK_BlockData => ({
  id: newSectionId,
  type: "section",
  cname: "section",
  label: "Section",
  bpConfigs: {
    desktop: {},
    tablet: {},
    mobile: {},
  },
  configs: {},
});

export const createDefaultPopupBlock = (newPopupId: string): SK_BlockData => ({
  id: newPopupId,
  type: "popup",
  cname: "popup",
  label: "Popup",
  bpConfigs: {
    desktop: {},
    tablet: {},
    mobile: {},
  },
  configs: {},
});

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

export const cloneBlockWithId = (
  blockData: SK_BlockData,
  newId: string,
): SK_BlockData => {
  const clonedData = JSON.parse(JSON.stringify(blockData)) as SK_BlockData;
  clonedData.id = newId;
  return clonedData;
};

export const applyPositionOffset = (blockData: SK_BlockData): void => {
  DEVICE_KEYS.forEach((device) => {
    const deviceConfig = blockData.bpConfigs[device];

    if (!isPlainObject(deviceConfig)) {
      return;
    }

    (["top", "left"] as const).forEach((positionKey) => {
      const positionConfig = deviceConfig[positionKey];
      if (!isPlainObject(positionConfig)) {
        return;
      }

      const rawValue = positionConfig.val;
      const parsedValue = Number(rawValue);

      if (!Number.isNaN(parsedValue)) {
        positionConfig.val = `${parsedValue + 10}`;
      }
    });
  });
};
