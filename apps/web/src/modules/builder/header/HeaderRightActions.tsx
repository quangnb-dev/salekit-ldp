import Button from "@/shared/ui/Button";
import IconButton from "@/shared/ui/IconButton";
import { RIGHT_HEADER_ACTIONS } from "./config/actions";

type HeaderRightActionsProps = {
  onAction: (actionId: string) => void;
};

const leadingIconActions = RIGHT_HEADER_ACTIONS.slice(0, 2); // undo, redo
const middleActions = RIGHT_HEADER_ACTIONS.slice(2, -1); // save, preview, publish

export default function HeaderRightActions({
  onAction,
}: HeaderRightActionsProps) {
  return (
    <div className="flex items-center gap-2">
      {leadingIconActions.map(({ id, title, icon: Icon }) => (
        <IconButton key={id} title={title} onClick={() => onAction(id)}>
          <Icon className="h-5 w-5" strokeWidth={2} />
        </IconButton>
      ))}

      <div className="mx-0.5 h-6 w-px bg-slate-200" />

      <div className="inline-flex items-center">
        {middleActions.map(
          ({ id, title, label, icon: Icon, variant, className }) => {
            const actionLabel = label ?? title;

            if (variant === "primary") {
              return (
                <Button
                  key={id}
                  variant="primary"
                  label={actionLabel}
                  icon={Icon}
                  onClick={() => onAction(id)}
                />
              );
            }

            // ghost
            return (
              <Button
                key={id}
                variant="ghost"
                label={actionLabel}
                icon={Icon}
                onClick={() => onAction(id)}
                className={className}
              />
            );
          },
        )}
      </div>
    </div>
  );
}
