import { Editor, PAGE_BLOCK_ID } from "@salekit/core";
import type { FC } from "react";

import { blockViewers } from "../../blocks";
import { useBuilderStyles } from "../../hooks/useBuilderStyles";
import { BlockToolbar } from "./BlockToolbar";
import { FloatingQuickAddToolbar } from "./FloatingQuickAddToolbar";
import "./styles.css";

export const EditorWorkspace: FC = () => {
  useBuilderStyles();

  return (
    <Editor rootId={PAGE_BLOCK_ID} views={blockViewers}>
      <BlockToolbar />
      <FloatingQuickAddToolbar />
    </Editor>
  );
};
