import { BlockViewer } from "@salekit/core";
import type { FC } from "react";

type TextViewerProps = {
  blockId: string;
  autoId: string;
  cname: string;
  label?: string;
  configs?: Record<string, unknown>;
  children?: React.ReactNode;
};

/**
 * Text block viewer.
 * Wraps content in BlockViewer for selection/drag support.
 * Renders HTML content if contentType is "html", otherwise plain text.
 */
export const TextViewer: FC<TextViewerProps> = ({
  autoId,
  cname,
  label,
  configs,
}: TextViewerProps) => {
  const content =
    (configs?.content as string | undefined) ?? label ?? "Text block";
  const contentType = (configs?.contentType as string | undefined) ?? "html";

  return (
    <BlockViewer autoId={autoId} cname={cname} className="sk_text">
      {contentType === "html" ? (
        // biome-ignore lint/security/noDangerouslySetInnerHtml: intentional HTML rendering for rich text content
        <div dangerouslySetInnerHTML={{ __html: content }} />
      ) : (
        <div>{content}</div>
      )}
    </BlockViewer>
  );
};
