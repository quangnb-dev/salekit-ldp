import type { JSX } from "react";
import {
  ButtonPreview,
  DefaultPreview,
  DividerPreview,
  ImagePreview,
  TextPreview,
} from "../previews";
import type { BlockLibraryItem } from "../types/menu";

const PREVIEW_MAP: Partial<
  Record<string, (props: { item: BlockLibraryItem }) => JSX.Element>
> = {
  text: () => <TextPreview />,
  button: () => <ButtonPreview />,
  image: () => <ImagePreview />,
  gallery: () => <ImagePreview />,
  video: () => <ImagePreview />,
  divider: () => <DividerPreview />,
};

export function SelectedItemPreview({ item }: { item: BlockLibraryItem }) {
  const Preview = PREVIEW_MAP[item.type] ?? DefaultPreview;
  return <Preview item={item} />;
}
