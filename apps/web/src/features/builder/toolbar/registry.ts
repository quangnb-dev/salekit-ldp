import { buttonToolbarActions } from "../blocks/button/toolbarActions";
import { imageToolbarActions } from "../blocks/image/toolbarActions";
import { sectionToolbarActions } from "../blocks/section/toolbarActions";
import { textToolbarActions } from "../blocks/text/toolbarActions";

import type { BlockToolbarActionMap } from "./types";

export const blockToolbarActionRegistry: BlockToolbarActionMap = {
  section: sectionToolbarActions,
  text: textToolbarActions,
  image: imageToolbarActions,
  button: buttonToolbarActions,
};
