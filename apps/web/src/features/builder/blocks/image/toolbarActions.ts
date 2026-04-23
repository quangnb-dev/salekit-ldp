import { ImagePlus } from "lucide-react";

import type { BlockToolbarAction } from "../../toolbar/types";

export const imageToolbarActions: BlockToolbarAction[] = [
  {
    id: "replace-image",
    label: "Thay ảnh",
    icon: ImagePlus,
    onClick: () => {
      // Mock action for now.
    },
    order: 100,
  },
];
