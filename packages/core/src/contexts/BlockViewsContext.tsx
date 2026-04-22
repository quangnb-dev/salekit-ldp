import { createContext, type FC, type ReactNode, useContext } from "react";

import type { SK_BlockRelated } from "../types";

type ViewsContextType = Pick<SK_BlockRelated, "views"> | null;

const BlockViewsContext = createContext<ViewsContextType>(null);

interface BlockViewsProviderProps {
  views: SK_BlockRelated["views"];
  children: ReactNode;
}

export const BlockViewsProvider: FC<BlockViewsProviderProps> = ({
  views,
  children,
}) => {
  return (
    <BlockViewsContext.Provider value={{ views }}>
      {children}
    </BlockViewsContext.Provider>
  );
};

export const useBlockViews = () => {
  const context = useContext(BlockViewsContext);

  if (!context) {
    throw new Error("useBlockViews must be used within a BlockViewsProvider");
  }

  return context.views;
};
