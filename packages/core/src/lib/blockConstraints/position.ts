import { ABSOLUTE_POSITION_KEYS } from "../../configs";
import type { SK_BlockData, SK_BlockDevice } from "../../types";

type PositionConfig = {
  val?: unknown;
  unit?: string;
  [key: string]: unknown;
};

const isPositionConfig = (value: unknown): value is PositionConfig =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const isAbsoluteLayoutBlock = (
  blockData: SK_BlockData | null | undefined,
): boolean => {
  if (!blockData) {
    return false;
  }

  return (["desktop", "tablet", "mobile"] as SK_BlockDevice[]).some((device) => {
    const deviceConfig = blockData.bpConfigs[device] as
      | Record<string, unknown>
      | undefined;
    if (!deviceConfig) {
      return false;
    }

    const position = deviceConfig.position as { val?: unknown } | undefined;
    return position?.val === "absolute";
  });
};

export const hasAbsoluteTopLeftPosition = (
  blockData: SK_BlockData | null | undefined,
  device: SK_BlockDevice = "desktop",
): boolean => {
  if (!blockData) {
    return false;
  }

  const deviceConfig = blockData.bpConfigs[device] as
    | Record<string, unknown>
    | undefined;
  if (!deviceConfig) {
    return false;
  }

  return ABSOLUTE_POSITION_KEYS.every((key) => {
    const positionConfig = deviceConfig[key];
    return isPositionConfig(positionConfig) && positionConfig.val !== undefined;
  });
};

export const normalizeAbsoluteTopLeft = (
  blockData: SK_BlockData,
  fallbackValue = "0",
): void => {
  (["desktop", "tablet", "mobile"] as SK_BlockDevice[]).forEach((device) => {
    const deviceConfig = blockData.bpConfigs[device] as
      | Record<string, unknown>
      | undefined;
    if (!deviceConfig) {
      return;
    }

    ABSOLUTE_POSITION_KEYS.forEach((key) => {
      const current = deviceConfig[key];
      if (isPositionConfig(current)) {
        if (current.val === undefined) {
          current.val = fallbackValue;
        }
        if (!current.unit) {
          current.unit = "px";
        }
        return;
      }

      deviceConfig[key] = { val: fallbackValue, unit: "px" };
    });
  });
};
