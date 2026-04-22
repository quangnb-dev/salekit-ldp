import type { ComponentType } from "react";
import { ButtonViewer } from "./button/viewer";
import { ImageViewer } from "./image/viewer";
import { PageViewer } from "./page/viewer";
import { SectionViewer } from "./section/viewer";
import { TextViewer } from "./text/viewer";

const asViewer = <TProps>(
  component: ComponentType<TProps>,
): ComponentType<Record<string, unknown>> =>
  component as unknown as ComponentType<Record<string, unknown>>;

/**
 * Maps block cname/type strings to their viewer components.
 * Pass this to <Editor views={blockViewers} /> or <Blocks views={blockViewers} />.
 */
export const blockViewers: Record<
  string,
  ComponentType<Record<string, unknown>>
> = {
  page: asViewer(PageViewer),
  section: asViewer(SectionViewer),
  text: asViewer(TextViewer),
  image: asViewer(ImageViewer),
  button: asViewer(ButtonViewer),
};

export { ButtonViewer, ImageViewer, PageViewer, SectionViewer, TextViewer };
