import { Editor, PAGE_BLOCK_ID } from "@salekit/core";
import type { FC } from "react";

import { blockViewers } from "../blocks";
import { useBuilderStyles } from "../useBuilderStyles";
import "./styles.css";

export const EditorWorkspace: FC = () => {
  useBuilderStyles();

  return <Editor rootId={PAGE_BLOCK_ID} views={blockViewers} />;
};
