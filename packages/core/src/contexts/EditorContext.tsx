import {
  createContext,
  type FC,
  type ReactNode,
  type RefObject,
  useContext,
} from "react";

interface EditorContextValue {
  browserWrapperRef: RefObject<HTMLDivElement | null>;
  rootId: string;
}

const EditorContext = createContext<EditorContextValue | null>(null);

interface EditorProviderProps extends EditorContextValue {
  children: ReactNode;
}

export const EditorProvider: FC<EditorProviderProps> = ({
  browserWrapperRef,
  rootId,
  children,
}) => {
  return (
    <EditorContext.Provider value={{ browserWrapperRef, rootId }}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditorContext = (): EditorContextValue => {
  const context = useContext(EditorContext);

  if (!context) {
    throw new Error("useEditorContext must be used within an EditorProvider");
  }

  return context;
};
