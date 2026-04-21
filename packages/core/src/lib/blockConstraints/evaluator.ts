import type {
  BlockConstraintConfig,
  BlockConstraintResult,
  BlockTypeIdentifier,
} from "./types";

export const normalizeBlockType = (value: string | null | undefined): BlockTypeIdentifier =>
  (value ?? "").trim().toLowerCase();

export const toReadableBlockLabel = (value: string): string =>
  value.replace(/-/g, " ").replace(/\b\w/g, (match) => match.toUpperCase());

export const getAllowedParentsForChild = (
  childType: BlockTypeIdentifier,
  config: BlockConstraintConfig,
): BlockTypeIdentifier[] => {
  const byChildRule = config.byChild?.[childType];
  if (byChildRule?.allowedParents?.length) {
    return [...byChildRule.allowedParents];
  }

  const fromParentRules = Object.entries(config.byParent ?? {}).reduce<BlockTypeIdentifier[]>(
    (acc, [parentType, rule]) => {
      if (rule.allowedChildren?.includes(childType)) {
        acc.push(parentType);
      }
      return acc;
    },
    [],
  );

  return fromParentRules;
};

export const validateBlockPlacement = (
  parentType: BlockTypeIdentifier,
  childType: BlockTypeIdentifier,
  config: BlockConstraintConfig,
): BlockConstraintResult => {
  const parentRule = config.byParent?.[parentType];
  if (parentRule?.deniedChildren?.includes(childType)) {
    return {
      valid: false,
      reasonCode: "CHILD_DENIED_IN_PARENT",
    };
  }

  const childRule = config.byChild?.[childType];
  if (childRule?.deniedParents?.includes(parentType)) {
    return {
      valid: false,
      reasonCode: "PARENT_NOT_ALLOWED_FOR_CHILD",
      allowedParents: childRule.allowedParents,
    };
  }

  if (childRule?.allowedParents?.length && !childRule.allowedParents.includes(parentType)) {
    return {
      valid: false,
      reasonCode: "PARENT_NOT_ALLOWED_FOR_CHILD",
      allowedParents: childRule.allowedParents,
    };
  }

  if (parentRule?.allowedChildren?.length && !parentRule.allowedChildren.includes(childType)) {
    return {
      valid: false,
      reasonCode: "CHILD_DENIED_IN_PARENT",
      allowedChildren: parentRule.allowedChildren,
    };
  }

  return { valid: true };
};

export const isBlockPlacementAllowed = (
  parentType: BlockTypeIdentifier,
  childType: BlockTypeIdentifier,
  config: BlockConstraintConfig,
): boolean => validateBlockPlacement(parentType, childType, config).valid;
