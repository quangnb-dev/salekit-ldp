import { useBlockStore, useBuilderStore } from "@salekit/core";
import {
  createContext,
  type FC,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createBlankEditorSnapshot } from "./seed";
import type { EditorContextValue } from "./types";

export const BuilderEditorContext = createContext<EditorContextValue | null>(
  null,
);

type BuilderEditorProviderProps = {
  children: ReactNode;
};

export const BuilderEditorProvider: FC<BuilderEditorProviderProps> = ({
  children,
}: BuilderEditorProviderProps) => {
  const [hydrated, setHydrated] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(null);
  const hydratedRef = useRef(false);

  useEffect(() => {
    if (hydratedRef.current) {
      return;
    }

    const snapshot = createBlankEditorSnapshot();

    useBlockStore.setState({
      blocks: snapshot.blocks,
      hierarchy: snapshot.hierarchy,
      popupBlocks: snapshot.popupBlocks,
      popupHierarchy: snapshot.popupHierarchy,
    });
    useBuilderStore.getState().setCurrentDevice(snapshot.currentDevice);
    useBuilderStore.getState().selectBlockId(snapshot.selectedBlockId);

    hydratedRef.current = true;
    setHydrated(true);
  }, []);

  const setSelectedBlockId = useCallback((blockId: string | null) => {
    useBuilderStore.getState().selectBlockId(blockId);
  }, []);

  const saveDocument = useCallback(() => {
    setLastSavedAt(Date.now());
  }, []);

  const restoreDocument = useCallback(() => {
    const blankSnapshot = createBlankEditorSnapshot();
    useBlockStore.setState({
      blocks: blankSnapshot.blocks,
      hierarchy: blankSnapshot.hierarchy,
      popupBlocks: blankSnapshot.popupBlocks,
      popupHierarchy: blankSnapshot.popupHierarchy,
    });
    useBuilderStore.getState().setCurrentDevice(blankSnapshot.currentDevice);
    useBuilderStore.getState().selectBlockId(blankSnapshot.selectedBlockId);
    setLastSavedAt(null);
  }, []);

  const undo = useCallback(() => {
    useBlockStore.temporal.getState().undo();
  }, []);

  const redo = useCallback(() => {
    useBlockStore.temporal.getState().redo();
  }, []);

  const value = useMemo<EditorContextValue>(
    () => ({
      hydrated,
      lastSavedAt,
      setSelectedBlockId,
      undo,
      redo,
      saveDocument,
      restoreDocument,
    }),
    [
      hydrated,
      lastSavedAt,
      redo,
      restoreDocument,
      saveDocument,
      setSelectedBlockId,
      undo,
    ],
  );

  return (
    <BuilderEditorContext.Provider value={value}>
      {children}
    </BuilderEditorContext.Provider>
  );
};

export const useBuilderEditor = (): EditorContextValue => {
  const context = useContext(BuilderEditorContext);
  if (!context) {
    throw new Error(
      "useBuilderEditor must be used within BuilderEditorProvider",
    );
  }

  return context;
};
