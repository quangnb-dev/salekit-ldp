import type { FC } from "react";
import type {
  BuilderMenuPanel,
  BuilderMenuView,
} from "@/features/builder/stores/builderStore";
import { classNames } from "@/shared/lib/classNames";
import { Button } from "@/shared/ui/Button";
import { IconButton } from "@/shared/ui/IconButton";
import { LEFT_HEADER_ACTIONS } from "./config/actions";

type HeaderLeftActionsProps = {
  activeView: BuilderMenuView;
  onToggle: (view: BuilderMenuPanel) => void;
};

export const HeaderLeftActions: FC<HeaderLeftActionsProps> = ({
  activeView,
  onToggle,
}: HeaderLeftActionsProps) => {
  return (
    <div className="ml-2 flex items-center gap-0.5">
      {LEFT_HEADER_ACTIONS.map(({ id, icon: Icon, title, variant }) => {
        const isActive = activeView === id;

        if (variant === "text") {
          return (
            <Button
              key={id}
              variant="ghost"
              label={title}
              icon={Icon}
              onClick={() => onToggle(id)}
              className={classNames(
                "rounded-md transition-colors",
                isActive
                  ? "bg-slate-100 text-slate-900"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
              )}
            />
          );
        }

        return (
          <IconButton
            key={id}
            title={title}
            active={isActive}
            onClick={() => onToggle(id)}
          >
            <Icon className="h-5 w-5" strokeWidth={2} />
          </IconButton>
        );
      })}
    </div>
  );
};
