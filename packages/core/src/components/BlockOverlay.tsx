import { forwardRef } from "react";

import { SK_DATA_SET_ATTRS } from "../configs/constants";

interface BlockOverlayProps {
  className?: string;
  style?: React.CSSProperties;
}

export const BlockOverlay = forwardRef<HTMLDivElement, BlockOverlayProps>(
  ({ className, style }, ref) => {
    return (
      <div
        ref={ref}
        className={className}
        style={{
          display: "none",
          position: "fixed",
          pointerEvents: "none",
          backgroundColor: "rgba(59, 130, 246, 0.15)",
          border: "2px dashed #3b82f6",
          boxSizing: "border-box",
          zIndex: 9999,
          ...style,
        }}
        {...{ [SK_DATA_SET_ATTRS.OVERLAY]: "true" }}
      />
    );
  },
);

BlockOverlay.displayName = "BlockOverlay";
