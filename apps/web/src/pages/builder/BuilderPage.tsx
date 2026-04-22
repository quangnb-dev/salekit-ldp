import type { FC } from "react";
import { BuilderEditorProvider } from "@/modules/builder/editor";
import { EditorHeader } from "@/modules/builder/header";
import { EditorWorkspace } from "@/modules/builder/workspace";

export const BuilderPage: FC = () => {
  return (
    <BuilderEditorProvider>
      <EditorHeader />
      <EditorWorkspace />
    </BuilderEditorProvider>
  );
};
