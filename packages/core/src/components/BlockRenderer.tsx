import { type FC, memo, useCallback, useMemo } from "react";
import { shallow } from "zustand/shallow";

import { useBlockViews } from "../contexts/BlockViewsContext";
import { useBlockStore } from "../stores/blockStore";

interface BlockRendererProps {
  blockId: string;
}

const EMPTY_ARRAY: string[] = [];

export const BlockRenderer: FC<BlockRendererProps> = memo(({ blockId }) => {
  const views = useBlockViews();

  const blockData = useBlockStore(
    useCallback(
      (state) => {
        const block = state.blocks[blockId];
        const hierarchy = state.hierarchy;

        if (!block) {
          return {
            id: blockId,
            cname: undefined,
            label: undefined,
            type: undefined,
            childrenIds: EMPTY_ARRAY,
            bpConfigs: undefined,
            configs: undefined,
          };
        }

        return {
          id: block.id,
          cname: block.cname,
          label: block.label,
          type: block.type,
          childrenIds: hierarchy[blockId] ?? EMPTY_ARRAY,
          bpConfigs: block.bpConfigs,
          configs: block.configs,
        };
      },
      [blockId],
    ),
    shallow,
  );

  const Component = useMemo(() => {
    return blockData.cname ? views[blockData.cname] : null;
  }, [views, blockData.cname]);

  if (!Component || !blockData.cname) return null;

  return (
    <Component
      blockId={blockData.id}
      autoId={blockData.id}
      cname={blockData.cname}
      label={blockData.label}
      type={blockData.type}
      bpConfigs={blockData.bpConfigs}
      configs={blockData.configs}
    >
      {blockData.childrenIds.map((childId) => (
        <BlockRenderer key={childId} blockId={childId} />
      ))}
    </Component>
  );
});

BlockRenderer.displayName = "BlockRenderer";
