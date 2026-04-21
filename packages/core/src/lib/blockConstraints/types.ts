export type BlockTypeIdentifier = string;

export interface BlockConstraintRule {
  allowedParents?: BlockTypeIdentifier[];
  deniedParents?: BlockTypeIdentifier[];
  allowedChildren?: BlockTypeIdentifier[];
  deniedChildren?: BlockTypeIdentifier[];
}

export interface BlockConstraintConfig {
  byParent?: Record<BlockTypeIdentifier, BlockConstraintRule>;
  byChild?: Record<BlockTypeIdentifier, BlockConstraintRule>;
}

export type BlockConstraintReasonCode =
  | "CHILD_DENIED_IN_PARENT"
  | "PARENT_NOT_ALLOWED_FOR_CHILD"
  | "INVALID_BLOCK_TYPES";

export interface BlockConstraintResult {
  valid: boolean;
  reasonCode?: BlockConstraintReasonCode;
  allowedParents?: BlockTypeIdentifier[];
  allowedChildren?: BlockTypeIdentifier[];
}

export interface BlockConstraintNode {
  type: BlockTypeIdentifier;
  children?: BlockConstraintNode[];
}

export interface BlockConstraintDataNode {
  id: string;
  type: BlockTypeIdentifier;
  childrenIds?: string[];
}

export interface InvalidBlockDropDetail {
  parentType?: BlockTypeIdentifier;
  childType?: BlockTypeIdentifier;
  reasonCode: BlockConstraintReasonCode;
}
