import { useBlockStore, useBuilderStore } from "@salekit/core";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createSeedSnapshot } from "./seed";
import {
  clearEditorSnapshot,
  loadEditorSnapshot,
  saveEditorSnapshot,
} from "./storage";
import type { EditorContextValue, EditorSnapshot } from "./types";

const BuilderEditorContext = createContext<EditorContextValue | null>(null);

const _cloneSnapshot = (snapshot: EditorSnapshot): EditorSnapshot =>
  JSON.parse(JSON.stringify(snapshot)) as EditorSnapshot;

const getCurrentSnapshot = (): EditorSnapshot => ({
  blocks: useBlockStore.getState().blocks,
  hierarchy: useBlockStore.getState().hierarchy,
  popupBlocks: useBlockStore.getState().popupBlocks,
  popupHierarchy: useBlockStore.getState().popupHierarchy,
  currentDevice: useBuilderStore.getState().currentDevice,
  selectedBlockId: useBuilderStore.getState().selectedBlockId,
});

type BuilderEditorProviderProps = {
  children: ReactNode;
};

export function BuilderEditorProvider({
  children,
}: BuilderEditorProviderProps) {
  const [hydrated, setHydrated] = useState(false);
  const [saving, setSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(null);
  const hydratedRef = useRef(false);

  useEffect(() => {
    if (hydratedRef.current) {
      return;
    }

    const storedSnapshot = loadEditorSnapshot();
    const snapshot = storedSnapshot ?? createSeedSnapshot();

    useBlockStore.getState().setBlocks(snapshot.blocks);
    useBlockStore.getState().setHierarchy(snapshot.hierarchy);
    useBlockStore.getState().setBlocks(snapshot.popupBlocks, true);
    useBlockStore.getState().setHierarchy(snapshot.popupHierarchy, true);
    useBuilderStore.getState().setCurrentDevice(snapshot.currentDevice);
    useBuilderStore.getState().selectBlockId(snapshot.selectedBlockId);

    hydratedRef.current = true;
    setHydrated(true);
  }, []);

  const setSelectedBlockId = useCallback((blockId: string | null) => {
    useBuilderStore.getState().selectBlockId(blockId);
  }, []);

  const saveDocument = useCallback(() => {
    setSaving(true);
    try {
      saveEditorSnapshot(getCurrentSnapshot());
      setLastSavedAt(Date.now());
    } finally {
      setSaving(false);
    }
  }, []);

  const restoreDocument = useCallback(() => {
    clearEditorSnapshot();
    const seed = createSeedSnapshot();
    useBlockStore.getState().setBlocks(seed.blocks);
    useBlockStore.getState().setHierarchy(seed.hierarchy);
    useBlockStore.getState().setBlocks(seed.popupBlocks, true);
    useBlockStore.getState().setHierarchy(seed.popupHierarchy, true);
    useBuilderStore.getState().setCurrentDevice(seed.currentDevice);
    useBuilderStore.getState().selectBlockId(seed.selectedBlockId);
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
      saving,
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
      saving,
      setSelectedBlockId,
      undo,
    ],
  );

  return (
    <BuilderEditorContext.Provider value={value}>
      {children}
    </BuilderEditorContext.Provider>
  );
}

export const useBuilderEditor = (): EditorContextValue => {
  const context = useContext(BuilderEditorContext);
  if (!context) {
    throw new Error(
      "useBuilderEditor must be used within BuilderEditorProvider",
    );
  }

  return context;
};
