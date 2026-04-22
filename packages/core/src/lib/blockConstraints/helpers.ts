import type { BlockConstraintConfig } from "./types";

const defaultConfig: BlockConstraintConfig = {
  byParent: {},
  byChild: {},
};

let currentConfig: BlockConstraintConfig = defaultConfig;

export const defaultBlockConstraintConfig = (): BlockConstraintConfig => ({
  byParent: {},
  byChild: {},
});

export const setBlockConstraintConfig = (
  config: BlockConstraintConfig,
): void => {
  currentConfig = config;
};

export const getBlockConstraintConfig = (): BlockConstraintConfig =>
  currentConfig;

export const resetBlockConstraintConfig = (): void => {
  currentConfig = defaultBlockConstraintConfig();
};
