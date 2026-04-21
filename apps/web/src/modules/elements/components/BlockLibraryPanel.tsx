import { useEffect, useMemo, useState } from "react";
import {
  LEFT_NAV_ITEMS,
  NAV_ITEMS_MAP,
  NAV_TO_TAB,
  TAB_TO_NAV,
} from "../config/blockCategories";
import type { BlockLibraryItem } from "../types/menu";
import type { BlockLibraryCategoryId } from "../types/nav";
import type { BlockLibraryTab } from "../types/tab";
import BlockMenuList from "./BlockMenuList";
import NavSidebar from "./NavSidebar";
import { SelectedItemHeader } from "./SelectedItemHeader";
import { SelectedItemPreview } from "./SelectedItemPreview";

type BlockLibraryPanelProps = {
  menuView: BlockLibraryTab;
  onSelect: (type: string) => void;
  onViewChange: (view: BlockLibraryTab) => void;
};

export default function BlockLibraryPanel({
  menuView,
  onSelect,
  onViewChange,
}: BlockLibraryPanelProps) {
  const [activeNav, setActiveNav] = useState<BlockLibraryCategoryId>(
    TAB_TO_NAV[menuView],
  );
  const [selectedType, setSelectedType] = useState<string | null>(null);

  useEffect(() => {
    setActiveNav(TAB_TO_NAV[menuView]);
  }, [menuView]);

  const items = useMemo(() => NAV_ITEMS_MAP[activeNav], [activeNav]);

  useEffect(() => {
    const firstType = items[0]?.type ?? null;
    if (!firstType) {
      setSelectedType(null);
      return;
    }

    setSelectedType((current) =>
      current && items.some((item) => item.type === current)
        ? current
        : firstType,
    );
  }, [items]);

  const selectedItem = useMemo<BlockLibraryItem | null>(() => {
    if (!selectedType) return null;
    return items.find((item) => item.type === selectedType) ?? null;
  }, [items, selectedType]);

  const handleNavClick = (id: BlockLibraryCategoryId) => {
    setActiveNav(id);
    const mappedTab = NAV_TO_TAB[id];
    if (mappedTab) onViewChange(mappedTab);
  };

  const topNav = LEFT_NAV_ITEMS.filter((item) => item.group === "top");
  const bottomNav = LEFT_NAV_ITEMS.filter((item) => item.group === "bottom");

  return (
    <div className="h-[calc(100vh-4.25rem)] w-[min(820px,calc(100vw-1.25rem))] overflow-hidden rounded-2xl bg-white shadow-[0_24px_56px_rgba(15,23,42,0.2)]">
      <div className="grid h-full min-h-0 grid-cols-1 md:grid-cols-[minmax(150px,0.9fr)_minmax(220px,1.1fr)_minmax(0,1.6fr)]">
        <NavSidebar
          activeNav={activeNav}
          topNav={topNav}
          bottomNav={bottomNav}
          onNavClick={handleNavClick}
        />

        <section className="relative flex min-h-0 flex-col bg-white md:after:absolute md:after:bottom-2 md:after:right-0 md:after:top-2 md:after:w-px md:after:bg-slate-100">
          <div className="min-h-0 flex-1 overflow-hidden px-2 pb-2.5 pt-2.5">
            <BlockMenuList
              items={items}
              selectedType={selectedType}
              onSelectItem={setSelectedType}
              onAddItem={onSelect}
            />
          </div>
        </section>

        <section className="hidden min-h-0 flex-col bg-white md:flex">
          <div className="px-5 pb-3 pt-4">
            {selectedItem ? (
              <SelectedItemHeader item={selectedItem} />
            ) : (
              <div className="text-sm text-slate-500">
                Không có dữ liệu preview.
              </div>
            )}
          </div>

          <div className="block-menu-list-scrollbar min-h-0 flex-1 overflow-y-auto px-5 pb-4">
            {selectedItem ? (
              <SelectedItemPreview item={selectedItem} />
            ) : (
              <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
                Không có block được chọn.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
