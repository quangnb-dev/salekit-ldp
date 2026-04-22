import { BlockViewer } from "@salekit/core";

type ImageViewerProps = {
  blockId: string;
  autoId: string;
  cname: string;
  label?: string;
  configs?: Record<string, unknown>;
  children?: React.ReactNode;
};

/**
 * Image block viewer.
 * Renders an <img> if url is set; otherwise shows a placeholder div.
 */
export default function ImageViewer({
  autoId,
  cname,
  configs,
}: ImageViewerProps) {
  const url = configs?.url as string | undefined;
  const alt = (configs?.alt as string | undefined) ?? "Image";

  return (
    <BlockViewer autoId={autoId} cname={cname} className="sk_image">
      {url ? (
        <img
          src={url}
          alt={alt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            minHeight: 80,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f1f5f9",
            color: "#94a3b8",
            fontSize: 13,
            borderRadius: 8,
            border: "1px dashed #cbd5e1",
          }}
        >
          Image placeholder
        </div>
      )}
    </BlockViewer>
  );
}
