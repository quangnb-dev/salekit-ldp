import { createAbsoluteBpConfigs, SK_DATA_SET_ATTRS } from "../configs";
import type {
  SK_BlockData,
  SK_BlockDevice,
  SK_BlockType,
  SK_Layout,
} from "../types";

export interface SK_BlockSchema<T = Record<string, unknown>> {
  type: SK_BlockType;
  cname: SK_BlockType;
  label: string;
  layout: SK_Layout;
  allowedChildren: SK_BlockType[];
  bpConfigs: Record<SK_BlockDevice, T>;
  configs: Record<string, unknown>;
}

const allContentBlockTypes: SK_BlockType[] = [
  "text",
  "button",
  "image",
  "group",
  "box",
  "line",
  "overlay",
  "video",
  "form",
  "countdown",
  "popup",
  "section",
];

const createSchema = (
  type: SK_BlockType,
  label: string,
  allowedChildren: SK_BlockType[],
): SK_BlockSchema => ({
  type,
  cname: type,
  label,
  layout: "absolute",
  allowedChildren,
  bpConfigs: createAbsoluteBpConfigs(),
  configs: {},
});

export const BLOCK_SCHEMAS: Record<SK_BlockType, SK_BlockSchema> = {
  page: createSchema("page", "Page", ["section", "popup"]),
  section: createSchema("section", "Section", allContentBlockTypes),
  text: createSchema("text", "Text", []),
  button: createSchema("button", "Button", []),
  image: createSchema("image", "Image", []),
  group: createSchema("group", "Group", allContentBlockTypes),
  box: createSchema("box", "Box", allContentBlockTypes),
  line: createSchema("line", "Line", []),
  overlay: createSchema("overlay", "Overlay", allContentBlockTypes),
  video: createSchema("video", "Video", []),
  form: createSchema("form", "Form", []),
  countdown: createSchema("countdown", "Countdown", []),
  popup: createSchema("popup", "Popup", allContentBlockTypes),
};

export const getBlockSchema = (type: SK_BlockType): SK_BlockSchema =>
  BLOCK_SCHEMAS[type];

export const isBlockLeafSchema = (type: SK_BlockType): boolean =>
  BLOCK_SCHEMAS[type].allowedChildren.length === 0;

export const getBlockSchemaDefaults = (
  type: SK_BlockType,
): Pick<SK_BlockData, "bpConfigs" | "configs" | "cname"> => {
  const schema = getBlockSchema(type);

  return {
    bpConfigs: schema.bpConfigs,
    configs: schema.configs,
    cname: schema.cname,
  };
};

export type CssPropertyValue =
  | string
  | number
  | boolean
  | { val?: string | number; unit?: string }
  | Record<string, unknown>;

export interface CssPropertyDefinition {
  property:
    | string
    | ((value: CssPropertyValue, key?: string) => string | undefined);
  appliesTo?: SK_BlockType[];
  valueType?: string;
  inheritable?: boolean;
  description?: string;
  selector?: string;
}

const unitValue = (property: string) => (value: CssPropertyValue) => {
  if (value && typeof value === "object" && "val" in value) {
    const record = value as { val?: string | number; unit?: string };
    if (record.val === undefined || record.val === null) return undefined;
    const unit = record.unit ?? "px";
    return `${property}: ${record.val}${unit};`;
  }

  if (value === undefined || value === null) return undefined;
  return `${property}: ${String(value)};`;
};

const rawValue = (property: string) => (value: CssPropertyValue) => {
  if (value === undefined || value === null) return undefined;
  return `${property}: ${String(value)};`;
};

export const getBlockSelector = (blockId: string, inner = false): string =>
  `[${inner ? SK_DATA_SET_ATTRS.AUTO_ID_INNER : SK_DATA_SET_ATTRS.AUTO_ID}="${blockId}"]`;

export const isPropertyApplicable = (
  definitions: Record<string, CssPropertyDefinition>,
  property: string,
  blockType: SK_BlockType,
): boolean => {
  const definition = definitions[property];
  if (!definition?.appliesTo || definition.appliesTo.length === 0) {
    return true;
  }

  return definition.appliesTo.includes(blockType);
};

export const cssPropertyDefinitions: Record<string, CssPropertyDefinition> = {
  display: { property: rawValue("display") },
  innerDisplay: { property: rawValue("display") },
  zIndex: { property: rawValue("z-index") },
  position: { property: rawValue("position") },
  background: { property: rawValue("background") },
  backgroundColor: { property: rawValue("background-color") },
  backgroundImage: { property: rawValue("background-image") },
  backgroundGradient: { property: rawValue("background-image") },
  backgroundSize: { property: rawValue("background-size") },
  backgroundPosition: { property: rawValue("background-position") },
  backgroundRepeat: { property: rawValue("background-repeat") },
  color: { property: rawValue("color") },
  fontSize: { property: unitValue("font-size") },
  "font-size": { property: rawValue("font-size") },
  fontWeight: { property: rawValue("font-weight") },
  lineHeight: { property: unitValue("line-height") },
  textAlign: { property: rawValue("text-align") },
  fontFamily: { property: rawValue("font-family") },
  textTransform: { property: rawValue("text-transform") },
  border: { property: rawValue("border") },
  borderWidth: { property: unitValue("border-width") },
  borderStyle: { property: rawValue("border-style") },
  borderColor: { property: rawValue("border-color") },
  borderRadius: { property: unitValue("border-radius") },
  borderTop: { property: rawValue("border-top") },
  borderRight: { property: rawValue("border-right") },
  borderBottom: { property: rawValue("border-bottom") },
  borderLeft: { property: rawValue("border-left") },
  width: { property: unitValue("width") },
  maxWidth: { property: unitValue("max-width") },
  height: { property: unitValue("height") },
  innerWidth: { property: unitValue("width"), appliesTo: ["section"] },
  top: { property: unitValue("top") },
  left: { property: unitValue("left") },
  mt: { property: unitValue("margin-top") },
  mb: { property: unitValue("margin-bottom") },
  ml: { property: unitValue("margin-left") },
  mr: { property: unitValue("margin-right") },
  pt: { property: unitValue("padding-top") },
  pb: { property: unitValue("padding-bottom") },
  pl: { property: unitValue("padding-left") },
  pr: { property: unitValue("padding-right") },
  customCSS: { property: rawValue("") },
};
