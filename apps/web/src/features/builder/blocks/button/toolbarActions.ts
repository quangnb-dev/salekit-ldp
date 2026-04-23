import { Link2 } from "lucide-react";

import type { BlockToolbarAction } from "../../toolbar/types";

export const buttonToolbarActions: BlockToolbarAction[] = [
  {
    id: "edit-link",
    label: "Chỉnh sửa liên kết nút",
    icon: Link2,
    onClick: () => {
      // Mock action for now.
    },
    order: 100,
  },
];
