import { useCallback } from "react";

import { useBuilderStore } from "../stores/builderStore";

interface IsolateStateProps {
  id: string;
  children: (isSelected: boolean) => React.ReactNode;
}

export const IsolateState = ({ id, children }: IsolateStateProps) => {
  const isSelected = useBuilderStore(
    useCallback((state) => state.selectedBlockId === id, [id]),
  );

  return <>{children(isSelected)}</>;
};

IsolateState.displayName = "IsolateState";
