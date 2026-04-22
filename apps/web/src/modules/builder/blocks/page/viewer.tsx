import { type SK_BlockViewer, SK_DATA_SET_ATTRS } from "@salekit/core";
import type { FC, PropsWithChildren } from "react";

export const PageViewer: FC<PropsWithChildren<SK_BlockViewer>> = ({
  children,
  autoId,
  cname,
}) => {
  return (
    <div
      {...{
        [SK_DATA_SET_ATTRS.AUTO_ID]: autoId,
        [SK_DATA_SET_ATTRS.CNAME]: cname,
        [SK_DATA_SET_ATTRS.CLICKABLE]: "false ",
      }}
    >
      {children}
    </div>
  );
};
