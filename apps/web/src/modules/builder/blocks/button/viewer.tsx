import { BlockViewer } from "@salekit/core";
import type { FC } from "react";

type ButtonViewerProps = {
  blockId: string;
  autoId: string;
  cname: string;
  label?: string;
  configs?: Record<string, unknown>;
  children?: React.ReactNode;
};

type ButtonContent = { text?: string };

/**
 * Button block viewer.
 * Renders a styled button element inside BlockViewer.
 */
export const ButtonViewer: FC<ButtonViewerProps> = ({
  autoId,
  cname,
  label,
  configs,
}: ButtonViewerProps) => {
  const content = configs?.content as ButtonContent | undefined;
  const text = content?.text ?? label ?? "Button";

  return (
    <BlockViewer autoId={autoId} cname={cname} className="sk_button">
      <button
        type="button"
        style={{
          width: "100%",
          height: "100%",
          background: "#4f46e5",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
          padding: "0 16px",
        }}
      >
        {text}
      </button>
    </BlockViewer>
  );
};
