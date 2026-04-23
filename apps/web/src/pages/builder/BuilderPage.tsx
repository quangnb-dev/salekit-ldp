import type { FC } from "react";
import { EditorHeader } from "@/features/builder/components/header";
import { EditorWorkspace } from "@/features/builder/components/workspace";
import { usePageBuilder } from "./hooks/usePageBuilder";

export const BuilderPage: FC = () => {
  usePageBuilder();
  return (
    <>
      <EditorHeader />
      <EditorWorkspace />
    </>
  );
};
