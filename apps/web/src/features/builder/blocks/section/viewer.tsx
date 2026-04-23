import type { SK_BlockViewer } from "@salekit/core";
import {
  SK_BLOCK_CLASS,
  SK_DATA_SET_ATTRS,
  useBlockResizable,
  useBuilderStore,
} from "@salekit/core";
import clsx from "clsx";
import type { FC, PropsWithChildren } from "react";
import "./styles.scss";

export const SectionViewer: FC<PropsWithChildren<SK_BlockViewer>> = ({
  children,
  autoId,
  cname,
  noClick,
}) => {
  const isSelected = useBuilderStore(
    (state) => state.selectedBlockId === autoId,
  );
  const { blockRef } = useBlockResizable({
    blockId: autoId,
    enabled: isSelected,
  });

  return (
    <section
      ref={blockRef as React.RefObject<HTMLElement>}
      {...{
        [SK_DATA_SET_ATTRS.AUTO_ID]: autoId,
        [SK_DATA_SET_ATTRS.CNAME]: cname,
        [SK_DATA_SET_ATTRS.CLICKABLE]: "true",
        [SK_DATA_SET_ATTRS.DROP]: true,
      }}
      className={clsx(SK_BLOCK_CLASS.BLOCK_ROOT, SK_BLOCK_CLASS.SECTION)}
    >
      {noClick ? (
        children
      ) : (
        <div
          {...{
            [SK_DATA_SET_ATTRS.AUTO_ID_INNER]: autoId,
            [SK_DATA_SET_ATTRS.CNAME_INNER]: cname,
            [SK_DATA_SET_ATTRS.DROP_INNER]: true,
          }}
          className="sk-section-inner"
          style={{ margin: "0 auto" }}
        >
          {children}

          <div className="sk-section-inner__outline" />
        </div>
      )}
      {isSelected && <div className="section-resize-handle" />}
    </section>
  );
};
