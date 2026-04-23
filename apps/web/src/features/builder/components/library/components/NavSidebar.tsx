import type { FC } from "react";
import { classNames } from "@/shared/lib/classNames";
import type { BlockLibraryCategoryId, BlockLibraryNavItem } from "../types/nav";

type NavSidebarProps = {
  activeNav: BlockLibraryCategoryId;
  topNav: BlockLibraryNavItem[];
  bottomNav: BlockLibraryNavItem[];
  onNavClick: (id: BlockLibraryCategoryId) => void;
};

type NavButtonProps = {
  item: BlockLibraryNavItem;
  isActive: boolean;
  onClick: () => void;
};

export const NavButton: FC<NavButtonProps> = ({
  item,
  isActive,
  onClick,
}: NavButtonProps) => {
  const Icon = item.icon;

  return (
    <button
      key={item.id}
      type="button"
      onClick={onClick}
      className={classNames(
        "relative flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[13px] font-medium transition-colors",
        isActive
          ? "bg-slate-100 text-slate-900"
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
      )}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" />
      <span className="truncate">{item.label}</span>
    </button>
  );
};

export const NavSidebar: FC<NavSidebarProps> = ({
  activeNav,
  topNav,
  bottomNav,
  onNavClick,
}: NavSidebarProps) => {
  return (
    <aside className="block-menu-list-scrollbar relative hidden min-h-0 flex-col overflow-y-auto bg-white p-2 md:flex md:after:absolute md:after:bottom-2 md:after:right-0 md:after:top-2 md:after:w-px md:after:bg-slate-100">
      <nav className="space-y-1 px-1.5">
        {topNav.map((item) => (
          <NavButton
            key={item.id}
            item={item}
            isActive={activeNav === item.id}
            onClick={() => onNavClick(item.id)}
          />
        ))}
      </nav>

      <div className="mx-2 my-2 h-px bg-slate-100" />

      <nav className="space-y-1 px-1.5">
        {bottomNav.map((item) => (
          <NavButton
            key={item.id}
            item={item}
            isActive={activeNav === item.id}
            onClick={() => onNavClick(item.id)}
          />
        ))}
      </nav>
    </aside>
  );
};
