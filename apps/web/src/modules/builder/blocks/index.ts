import type { ComponentType } from "react";
import ButtonViewer from "./button/viewer";
import ImageViewer from "./image/viewer";
import PageViewer from "./page/viewer";
import SectionViewer from "./section/viewer";
import TextViewer from "./text/viewer";

/**
 * Maps block cname/type strings to their viewer components.
 * Pass this to <Editor views={blockViewers} /> or <Blocks views={blockViewers} />.
 */
export const blockViewers: Record<
  string,
  ComponentType<Record<string, unknown>>
> = {
  page: PageViewer,
  section: SectionViewer,
  text: TextViewer,
  image: ImageViewer,
  button: ButtonViewer,
};

export { ButtonViewer, ImageViewer, PageViewer, SectionViewer, TextViewer };
