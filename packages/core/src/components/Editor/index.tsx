import {
  type CSSProperties,
  type FC,
  memo,
  type PropsWithChildren,
  useEffect,
  useRef,
} from "react";

import { SK_DATA_SET_ATTRS } from "../../configs/constants";
import { EditorProvider } from "../../contexts";
import { useBlockClickable } from "../../hooks/useBlockClickable";
import { useBlockDragToolbar } from "../../hooks/useBlockDragToolbar";
import { useBlockDragViewer } from "../../hooks/useBlockDragViewer";
import { useBlockDrop } from "../../hooks/useBlockDrop";
import { BlockOverlay } from "../BlockOverlay";
import { Blocks } from "../Blocks";

// Inject the selection ring style once globally.
const SK_SELECTION_CSS = `
.sk-selected {
  outline: 2px solid #3b82f6 !important;
  outline-offset: 1px;
}
`;

let selectionStyleInjected = false;

const injectSelectionStyle = (): void => {
  if (selectionStyleInjected || typeof document === "undefined") return;
  const style = document.createElement("style");
  style.setAttribute("data-sk-selection", "true");
  style.textContent = SK_SELECTION_CSS;
  document.head.appendChild(style);
  selectionStyleInjected = true;
};

interface EditorProps {
  views: Record<string, React.ComponentType<Record<string, unknown>>>;
  rootId: string;
  pageWrapperStyle?: CSSProperties;
  pageWrapperClass?: string;
}

export const Editor: FC<PropsWithChildren<EditorProps>> = memo(
  ({ views, rootId, pageWrapperStyle, pageWrapperClass, children }) => {
    const browserWrapperRef = useRef<HTMLDivElement | null>(null);
    const pageWrapperRef = useRef<HTMLDivElement | null>(null);
    const overlayRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      injectSelectionStyle();
    }, []);

    useBlockClickable({ browserWrapperRef, pageWrapperRef });
    useBlockDragToolbar({ browserWrapperRef, overlayRef });
    useBlockDragViewer({ pageWrapperRef });
    useBlockDrop({ pageWrapperRef, overlayRef });

    return (
      <EditorProvider browserWrapperRef={browserWrapperRef} rootId={rootId}>
        <div
          ref={browserWrapperRef}
          {...{ [SK_DATA_SET_ATTRS.BROWSER_WRAPPER]: "true" }}
        >
          <div
            ref={pageWrapperRef}
            {...{ [SK_DATA_SET_ATTRS.PAGE_WRAPPER]: "true" }}
            style={{
              ...pageWrapperStyle,
            }}
            className={pageWrapperClass}
          >
            <Blocks rootId={rootId} views={views} />
          </div>
          <BlockOverlay ref={overlayRef} />
          {children}
        </div>
      </EditorProvider>
    );
  },
);

Editor.displayName = "Editor";
