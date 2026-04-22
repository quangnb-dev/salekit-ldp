import type { SK_BlockViewer } from "@salekit/core";
import { SK_BLOCK_CLASS, SK_DATA_SET_ATTRS } from "@salekit/core";
import clsx from "clsx";
import type { FC, PropsWithChildren } from "react";
import "./styles.scss";

export const SectionViewer: FC<PropsWithChildren<SK_BlockViewer>> = ({
  children,
  autoId,
  cname,
  noClick,
  // configs,
}) => {
  return (
    <section
      {...{
        [SK_DATA_SET_ATTRS.AUTO_ID]: autoId,
        [SK_DATA_SET_ATTRS.CNAME]: cname,
        [SK_DATA_SET_ATTRS.CLICKABLE]: "true",
        [SK_DATA_SET_ATTRS.DROP]: true,
      }}
      className={clsx(
        "animate__animated",
        SK_BLOCK_CLASS.BLOCK_ROOT,
        SK_BLOCK_CLASS.SECTION,
      )}
    >
      {noClick ? (
        children
      ) : (
        <div
          {...{
            [SK_DATA_SET_ATTRS.AUTO_ID_INNER]: autoId,
            // [DATA_SET_ATK_ANIMATION_ID]: autoId,
            [SK_DATA_SET_ATTRS.CNAME_INNER]: cname,
            [SK_DATA_SET_ATTRS.DROP_INNER]: true,
          }}
          className="sk-section-inner"
          style={{ height: "400px" }}
        >
          {children}

          <div className="sk-section-inner__outline" />
        </div>
      )}
      {<div className="section-resize-handle" />}
    </section>
  );
};
