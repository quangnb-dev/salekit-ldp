import { create } from "zustand";

import {
  DEFAULT_CSS_PROPERTIES,
  type SK_CssPropertyDefinition,
} from "../configs";

export interface CssPropertyState {
  properties: Record<string, SK_CssPropertyDefinition>;
  propertyOrder: string[];
}

export interface CssPropertyActions {
  setProperties: (properties: SK_CssPropertyDefinition[]) => void;
  upsertProperty: (property: SK_CssPropertyDefinition) => void;
  removeProperty: (key: string) => void;
  resetProperties: () => void;
}

export type CssPropertyStore = CssPropertyState & CssPropertyActions;

const toPropertyMap = (properties: SK_CssPropertyDefinition[]) =>
  properties.reduce<Record<string, SK_CssPropertyDefinition>>(
    (accumulator, property) => {
      accumulator[property.key] = property;
      return accumulator;
    },
    {},
  );

const createDefaultState = (): CssPropertyState => ({
  properties: toPropertyMap(DEFAULT_CSS_PROPERTIES),
  propertyOrder: DEFAULT_CSS_PROPERTIES.map((property) => property.key),
});

export const useCssPropertyStore = create<CssPropertyStore>((set) => ({
  ...createDefaultState(),

  setProperties: (properties) =>
    set({
      properties: toPropertyMap(properties),
      propertyOrder: properties.map((property) => property.key),
    }),

  upsertProperty: (property) =>
    set((state) => {
      const nextOrder = state.propertyOrder.includes(property.key)
        ? state.propertyOrder
        : [...state.propertyOrder, property.key];

      return {
        properties: {
          ...state.properties,
          [property.key]: property,
        },
        propertyOrder: nextOrder,
      };
    }),

  removeProperty: (key) =>
    set((state) => {
      const nextProperties = { ...state.properties };
      delete nextProperties[key];

      return {
        properties: nextProperties,
        propertyOrder: state.propertyOrder.filter((item) => item !== key),
      };
    }),

  resetProperties: () => set(createDefaultState()),
}));

export const cssPropertySelectors = {
  properties: (state: CssPropertyStore) => state.properties,
  propertyOrder: (state: CssPropertyStore) => state.propertyOrder,
  byKey:
    (key: string) =>
    (state: CssPropertyStore): SK_CssPropertyDefinition | undefined =>
      state.properties[key],
};
