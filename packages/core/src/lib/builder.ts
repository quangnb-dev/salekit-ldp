import { useSyncExternalStore } from "react";

import { ABSOLUTE_POSITION_KEYS, createAbsoluteBpConfigs } from "../configs";
import { useBlockStore } from "../stores/blockStore";
import { useBuilderStore } from "../stores/builderStore";
import type { SK_BlockData, SK_BlockDevice, SK_BlockType } from "../types";
import { generateId } from "../utils";
import {
  type CssPropertyDefinition,
  cssPropertyDefinitions as defaultCssPropertyDefinitions,
  getBlockSchema,
  getBlockSelector,
  isPropertyApplicable,
} from "./blockSchemas";

type DeviceConfig = Record<string, unknown>;

const cloneValue = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

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
    bpConfigs: cloneValue(overrideBpConfigs ?? createAbsoluteBpConfigs()),
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

type SimpleBlock = {
  id: string;
  type: string;
  bpConfigs: Record<string, unknown>;
  configs?: Record<string, unknown>;
};

let blockViewerStyleSheet: CSSStyleSheet | null = null;

const getGlobalDocument = (): Document | undefined =>
  typeof document === "undefined" ? undefined : document;

const flattenConfig = (
  value: unknown,
  target: Record<string, unknown>,
  prefix = "",
): void => {
  if (value === null || value === undefined) {
    return;
  }

  if (typeof value !== "object" || Array.isArray(value)) {
    if (prefix) {
      target[prefix] = value;
    }
    return;
  }

  const record = value as Record<string, unknown>;
  if ("val" in record || "unit" in record) {
    if (prefix) {
      target[prefix] = record;
    }
    return;
  }

  Object.entries(record).forEach(([key, nestedValue]) => {
    const nextPrefix = prefix ? `${prefix}.${key}` : key;
    flattenConfig(nestedValue, target, nextPrefix);
  });
};

const cssRuleFromValue = (
  property: string,
  value: unknown,
): string | undefined => {
  if (value === undefined || value === null) {
    return undefined;
  }

  if (
    typeof value === "object" &&
    value !== null &&
    "val" in (value as object)
  ) {
    const typed = value as { val?: string | number; unit?: string };
    if (typed.val === undefined || typed.val === null) return undefined;
    return `${property}: ${typed.val}${typed.unit ?? "px"};`;
  }

  if (!property) {
    return typeof value === "string" ? value : undefined;
  }

  return `${property}: ${String(value)};`;
};

const mergeConfigToCss = (
  config: Record<string, unknown>,
  blockType: string,
  definitions: Record<string, CssPropertyDefinition>,
): string => {
  let css = "";

  Object.entries(config).forEach(([property, value]) => {
    const definition = definitions[property];
    if (
      !definition ||
      !isPropertyApplicable(definitions, property, blockType as never)
    ) {
      return;
    }

    if (typeof definition.property === "string") {
      const rule = cssRuleFromValue(definition.property, value);
      if (rule) {
        css += `${rule}\n`;
      }
      return;
    }

    const rule = definition.property(value as never, property);
    if (rule) {
      css += `${rule}\n`;
    }
  });

  return css;
};

export const applyCSSVariablesToBlockViewer = (
  blocks: Record<string, SimpleBlock>,
  options?: {
    cssPropertyDefinitions?: Record<string, CssPropertyDefinition>;
  },
): void => {
  const doc = getGlobalDocument();
  if (!doc) {
    return;
  }

  const definitions =
    options?.cssPropertyDefinitions ?? defaultCssPropertyDefinitions;
  const currentDevice = useBuilderStore.getState().currentDevice;
  const cssRules: string[] = [];

  Object.values(blocks).forEach((block) => {
    const bpConfig = (block.bpConfigs?.[currentDevice] ??
      block.bpConfigs?.desktop ??
      {}) as Record<string, unknown>;
    const flattenedBpConfig: Record<string, unknown> = {};
    flattenConfig(bpConfig, flattenedBpConfig);

    const flattenedConfigs: Record<string, unknown> = {};
    flattenConfig(block.configs ?? {}, flattenedConfigs);

    const css = [
      mergeConfigToCss(flattenedBpConfig, block.type, definitions),
      mergeConfigToCss(flattenedConfigs, block.type, definitions),
    ]
      .filter(Boolean)
      .join("\n");

    if (css) {
      cssRules.push(`${getBlockSelector(block.id)} {\n${css}}`);
    }
  });

  if (!blockViewerStyleSheet) {
    blockViewerStyleSheet = new CSSStyleSheet();
  }

  blockViewerStyleSheet.replaceSync(cssRules.join("\n"));
  const currentSheets = doc.adoptedStyleSheets ?? [];
  if (!currentSheets.includes(blockViewerStyleSheet)) {
    doc.adoptedStyleSheets = [...currentSheets, blockViewerStyleSheet];
  }
};

export const cleanupBlockViewerStyleSheet = (): void => {
  const doc = getGlobalDocument();
  if (!doc || !blockViewerStyleSheet) {
    return;
  }

  doc.adoptedStyleSheets = (doc.adoptedStyleSheets ?? []).filter(
    (sheet) => sheet !== blockViewerStyleSheet,
  );
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
  const flattened: Record<string, unknown> = {};
  flattenConfig(deviceConfig, flattened);

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
