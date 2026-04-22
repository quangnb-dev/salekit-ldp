import { type FC, memo, type PropsWithChildren } from "react";

import { SK_DATA_SET_ATTRS } from "../configs/constants";
import { IsolateState } from "./IsolateState";

interface BlockViewerProps {
  autoId: string;
  cname: string;
  className?: string;
  style?: React.CSSProperties;
  attrs?: Record<string, unknown>;
  noClick?: boolean;
}

export const BlockViewer: FC<PropsWithChildren<BlockViewerProps>> = memo(
  ({ children, autoId, cname, className, style, attrs, noClick }) => {
    if (noClick) {
      return <>{children}</>;
    }

    return (
      <IsolateState id={autoId}>
        {(isSelected) => (
          <div
            className={["sk_block", className, isSelected ? "sk-selected" : ""]
              .filter(Boolean)
              .join(" ")}
            style={style}
            {...{
              [SK_DATA_SET_ATTRS.AUTO_ID]: autoId,
              [SK_DATA_SET_ATTRS.CNAME]: cname,
              [SK_DATA_SET_ATTRS.CLICKABLE]: "true",
              [SK_DATA_SET_ATTRS.VIEWER]: "true",
            }}
            {...attrs}
          >
            {children}
          </div>
        )}
      </IsolateState>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.autoId === nextProps.autoId &&
      prevProps.cname === nextProps.cname &&
      prevProps.className === nextProps.className &&
      prevProps.children === nextProps.children
    );
  },
);

BlockViewer.displayName = "BlockViewer";
