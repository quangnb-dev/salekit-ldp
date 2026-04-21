export type SK_Layout = "absolute";

export type Unit = "px" | "%" | "vh" | "vw" | "auto";

export interface DimensionValue {
  value: number;
  unit: Unit;
}

export type SK_BlockDevice = "desktop" | "tablet" | "mobile";

export type SK_BlockType =
  | "page"
  | "section"
  | "text"
  | "button"
  | "image"
  | "group"
  | "box"
  | "line"
  | "overlay"
  | "video"
  | "form"
  | "countdown"
  | "popup";

export interface SK_BlockData<T = Record<string, any>> {
  id: string;
  cname?: SK_BlockType;
  label?: string;
  type: SK_BlockType;
  bpConfigs: {
    desktop: T;
    tablet: T;
    mobile: T;
  };
  configs?: Record<string, unknown>;
}

export interface SK_BlockStructure {
  blocks: {
    [key: string]: SK_BlockData;
  };
  hierarchy: {
    [key: string]: string[];
  };
}

export interface SK_BlockToolbar extends SK_BlockData {
  id: string;
  overlay?: {
    desktop: {
      width: number;
      height: number;
      widthPercent?: number;
      widthUnit?: string;
    };
    tablet?: {
      width: number;
      height: number;
      widthPercent?: number;
      widthUnit?: string;
    };
    mobile: {
      width: number;
      height: number;
      widthPercent?: number;
      widthUnit?: string;
    };
  };
}

export interface SK_BlockViewer extends SK_BlockData {
  autoId: string;
  attrs?: Record<string, any>;
  noClick?: boolean;
}

export interface SK_BlockRect {
  id: string;
  left: number;
  right: number;
  top: number;
  bottom: number;
  width: number;
  height: number;
}

export interface SK_Data extends SK_BlockStructure {
  settings: Record<string, unknown>;
  globalStyles: Record<string, unknown>;
}

export interface SK_BlockRelated {
  initialData: SK_Data;
  views: { [key: string]: any };
}
