import type { FC, PropsWithChildren } from "react";

import { SK_DATA_SET_ATTRS } from "../configs/constants";
import type { SK_BlockToolbar } from "../types";

interface BlockToolbarProps extends PropsWithChildren {
  blockData: Omit<SK_BlockToolbar, "id" | "overlay">;
  overlay: SK_BlockToolbar["overlay"];
  className?: string;
}

export const BlockToolbar: FC<BlockToolbarProps> = ({
  children,
  blockData,
  overlay,
  className,
}) => {
  return (
    <div
      className={className}
      style={{ touchAction: "none", userSelect: "none" }}
      {...{ [SK_DATA_SET_ATTRS.TOOLBAR]: "true" }}
      {...{ [SK_DATA_SET_ATTRS.TOOLBAR_OVERLAY]: JSON.stringify(overlay) }}
      {...{
        [SK_DATA_SET_ATTRS.TOOLBAR_BLOCK_DATA]: JSON.stringify(blockData),
      }}
    >
      {children}
    </div>
  );
};

BlockToolbar.displayName = "BlockToolbar";
