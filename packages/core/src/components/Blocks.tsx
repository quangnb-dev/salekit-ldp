import { type FC, memo } from "react";

import { BlockViewsProvider } from "../contexts/BlockViewsContext";
import { BlockRenderer } from "./BlockRenderer";

interface BlocksProps {
  rootId: string;
  views: Record<string, React.ComponentType<Record<string, unknown>>>;
}

export const Blocks: FC<BlocksProps> = memo(({ views, rootId }) => {
  return (
    <BlockViewsProvider views={views}>
      <BlockRenderer blockId={rootId} />
    </BlockViewsProvider>
  );
});

Blocks.displayName = "Blocks";
