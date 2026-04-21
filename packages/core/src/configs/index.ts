import type { SK_BlockDevice, SK_Layout, Unit } from "../types";

export * from "./constants";

export type SK_CssPropertyGroup = "layout" | "position" | "size" | "spacing";

export interface SK_CssPropertyDefinition {
  key: string;
  label: string;
  group: SK_CssPropertyGroup;
  defaultValue?: string | number | boolean;
  unit?: Unit;
  supportsDevices?: SK_BlockDevice[];
}

export const ABSOLUTE_POSITION_KEYS = ["top", "left"] as const;

export const DEFAULT_ABSOLUTE_POSITION_VALUE = {
  val: "0",
  unit: "px" as const,
};

export const createAbsoluteDeviceConfig = (offset = 0) => ({
  layout: "absolute" as SK_Layout,
  position: { val: "absolute" as const },
  top: { val: `${offset}`, unit: "px" as const },
  left: { val: `${offset}`, unit: "px" as const },
});

export const createAbsoluteBpConfigs = (offset = 0) => ({
  desktop: createAbsoluteDeviceConfig(offset),
  tablet: createAbsoluteDeviceConfig(offset),
  mobile: createAbsoluteDeviceConfig(offset),
});

export const DEFAULT_CSS_PROPERTIES: SK_CssPropertyDefinition[] = [
  {
    key: "position",
    label: "Position",
    group: "layout",
    defaultValue: "absolute",
  },
  {
    key: "top",
    label: "Top",
    group: "position",
    defaultValue: 0,
    unit: "px",
    supportsDevices: ["desktop", "tablet", "mobile"],
  },
  {
    key: "left",
    label: "Left",
    group: "position",
    defaultValue: 0,
    unit: "px",
    supportsDevices: ["desktop", "tablet", "mobile"],
  },
  {
    key: "width",
    label: "Width",
    group: "size",
    defaultValue: "auto",
    supportsDevices: ["desktop", "tablet", "mobile"],
  },
  {
    key: "height",
    label: "Height",
    group: "size",
    defaultValue: "auto",
    supportsDevices: ["desktop", "tablet", "mobile"],
  },
];
