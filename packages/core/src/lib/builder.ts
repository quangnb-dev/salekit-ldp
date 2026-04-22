import { useSyncExternalStore } from "react";

import { ABSOLUTE_POSITION_KEYS } from "../configs";
import { useBlockStore } from "../stores/blockStore";
import { useBuilderStore } from "../stores/builderStore";
import type {
  SK_BlockData,
  SK_BlockDevice,
  SK_BlockStructure,
  SK_BlockType,
} from "../types";
import { generateId } from "../utils";
import { getBlockSchema } from "./blockSchemas";

type DeviceConfig = Record<string, unknown>;

const cloneValue = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

const flattenResponsiveConfig = (
  config: Record<string, unknown>,
): Record<string, unknown> => {
  const flattened: Record<string, unknown> = {};

  Object.entries(config).forEach(([key, value]) => {
    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      "val" in value
    ) {
      flattened[key] = (value as { val?: unknown }).val;
      return;
    }

    flattened[key] = value;
  });

  return flattened;
};

export const PAGE_BLOCK_ID = "page";
export const DEFAULT_SECTION_BLOCK_ID = "section-root";

export const createBlockData = (
  type: SK_BlockType,
  id: string,
  overrides: Partial<SK_BlockData> = {},
): SK_BlockData => {
  const schema = getBlockSchema(type);
  const {
    id: _ignoredId,
    type: _ignoredType,
    bpConfigs: overrideBpConfigs,
    configs: overrideConfigs,
    ...rest
  } = overrides;

  return {
    id,
    type,
    cname: rest.cname ?? schema.cname ?? type,
    label: rest.label ?? schema.label,
    bpConfigs: cloneValue(overrideBpConfigs ?? schema.bpConfigs),
    configs: cloneValue(overrideConfigs ?? schema.configs),
    ...rest,
  };
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

export const createDefaultSectionBlock = (newSectionId: string): SK_BlockData =>
  createBlockData("section", newSectionId);

export const createDefaultPopupBlock = (newPopupId: string): SK_BlockData =>
  createBlockData("popup", newPopupId);

export const createBlankPageStructure = (
  pageId = PAGE_BLOCK_ID,
  sectionId = DEFAULT_SECTION_BLOCK_ID,
): SK_BlockStructure => {
  const page = createBlockData("page", pageId);
  const section = createBlockData("section", sectionId);

  return {
    blocks: {
      [page.id]: page,
      [section.id]: section,
    },
    hierarchy: {
      [page.id]: [section.id],
      [section.id]: [],
    },
  };
};

export const cloneBlockWithId = (
  blockData: SK_BlockData,
  newId: string,
): SK_BlockData => {
  const clonedData = cloneValue(blockData);
  clonedData.id = newId;
  return clonedData;
};

export const applyPositionOffset = (blockData: SK_BlockData): void => {
  (["desktop", "tablet", "mobile"] as SK_BlockDevice[]).forEach((device) => {
    const deviceConfig = blockData.bpConfigs[device] as
      | DeviceConfig
      | undefined;

    if (!deviceConfig) {
      return;
    }

    ABSOLUTE_POSITION_KEYS.forEach((positionKey) => {
      const positionConfig = deviceConfig[positionKey];

      if (
        !positionConfig ||
        typeof positionConfig !== "object" ||
        Array.isArray(positionConfig)
      ) {
        return;
      }

      const rawValue = (positionConfig as { val?: unknown }).val;
      const parsedValue = Number(rawValue);

      if (!Number.isNaN(parsedValue)) {
        (positionConfig as { val?: string }).val = `${parsedValue + 10}`;
      }
    });
  });
};

export const getBlockProperty = (
  blockId: string,
  property: string,
  device: SK_BlockDevice = useBuilderStore.getState().currentDevice,
  defaultValue?: unknown,
): unknown => {
  const block = useBlockStore.getState().blocks[blockId] as
    | SK_BlockData
    | undefined;
  if (!block) {
    return defaultValue;
  }

  if (property === "label" || property === "cname" || property === "type") {
    return (
      (block as unknown as Record<string, unknown>)[property] ?? defaultValue
    );
  }

  const deviceConfig = (block.bpConfigs?.[device] ??
    block.bpConfigs?.desktop ??
    {}) as Record<string, unknown>;
  const flattened = flattenResponsiveConfig(deviceConfig);

  if (property in flattened) {
    return flattened[property];
  }

  if (block.configs && property in block.configs) {
    return block.configs[property];
  }

  return defaultValue;
};

export const useBlockPropertyValue = (
  blockId: string,
  property: string,
  device?: SK_BlockDevice,
  defaultValue?: unknown,
): unknown =>
  useSyncExternalStore(
    useBlockStore.subscribe,
    () => getBlockProperty(blockId, property, device, defaultValue),
    () => getBlockProperty(blockId, property, device, defaultValue),
  );

export const getJSONData = <T = unknown>(
  data: string | T | null | undefined,
  defaultValue: T,
): T => {
  if (data === null || data === undefined) {
    return defaultValue;
  }

  if (typeof data !== "string") {
    return data as T;
  }

  try {
    return JSON.parse(data) as T;
  } catch {
    return defaultValue;
  }
};

export const getPageJSONData = (pageId?: string): unknown => {
  const state = useBlockStore.getState();
  const currentPageId = pageId ?? "page";
  return state.blocks[currentPageId] ?? null;
};
