import type { DimensionValue, Unit } from "../types";

let idCounter = 0;

export function dim(value: number, unit: Unit = "px"): DimensionValue {
  return { value, unit };
}

export function dimToCss(dimension: DimensionValue): string {
  if (dimension.unit === "auto") {
    return "auto";
  }

  return `${dimension.value}${dimension.unit}`;
}

export function generateId(prefix = "id"): string {
  idCounter += 1;
  return `${prefix}_${idCounter}`;
}

export * from "./base";
export * from "./block";
export * from "./check";
export * from "./dock";
export * from "./dropState";
export * from "./edges";
export * from "./gen";
export * from "./grid";
export * from "./guideline";
export * from "./snap";
export * from "./toggle";
