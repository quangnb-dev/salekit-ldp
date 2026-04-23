import { FileText } from "lucide-react";

import type { BlockToolbarAction } from "../../toolbar/types";

export const textToolbarActions: BlockToolbarAction[] = [
  {
    id: "edit-text",
    label: "Chỉnh sửa văn bản",
    icon: FileText,
    onClick: () => {
      // Mock action for now.
    },
    order: 100,
  },
];
