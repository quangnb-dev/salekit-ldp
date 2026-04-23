import { Settings } from "lucide-react";

import type { BlockToolbarAction } from "../../toolbar/types";

export const sectionToolbarActions: BlockToolbarAction[] = [
  {
    id: "section-settings",
    label: "Cài đặt Section",
    icon: Settings,
    onClick: () => {
      // Mock action for now.
    },
    order: 100,
  },
];
