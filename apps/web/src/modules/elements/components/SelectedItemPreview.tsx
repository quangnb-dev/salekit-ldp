import { BlockToolbar } from "@salekit/core";
import type { FC, JSX } from "react";
import { getToolbarPresets } from "@/modules/builder/blocks/toolbarConfigs";
import {
  ButtonPreview,
  DefaultPreview,
  DividerPreview,
  ImagePreview,
  TextPreview,
} from "../previews";
import type { BlockLibraryItem } from "../types/menu";

export const PREVIEW_MAP: Partial<
  Record<string, (props: { item: BlockLibraryItem }) => JSX.Element>
> = {
  text: () => <TextPreview />,
  button: () => <ButtonPreview />,
  image: () => <ImagePreview />,
  gallery: () => <ImagePreview />,
  video: () => <ImagePreview />,
  divider: () => <DividerPreview />,
};

export const SelectedItemPreview: FC<{ item: BlockLibraryItem }> = ({
  item,
}: {
  item: BlockLibraryItem;
}) => {
  const presets = getToolbarPresets(item.type);

  if (presets.length === 0) {
    const Preview = PREVIEW_MAP[item.type] ?? DefaultPreview;
    return <Preview item={item} />;
  }

  return (
    <div className="space-y-3">
      {presets.map((preset) => {
        const Preview = PREVIEW_MAP[preset.type] ?? DefaultPreview;
        const { id, overlay, ...blockData } = preset;

        return (
          <BlockToolbar
            key={id}
            blockData={blockData}
            overlay={overlay}
            className="group block cursor-grab rounded-2xl border border-slate-200 bg-white p-3 transition-colors hover:border-slate-300 active:cursor-grabbing"
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-slate-900">
                  {preset.label ?? item.label}
                </div>
                <div className="text-xs text-slate-500">Keo vao canvas</div>
              </div>
              <div className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-medium uppercase tracking-wide text-slate-500">
                {preset.type}
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4">
              <Preview item={item} />
            </div>
          </BlockToolbar>
        );
      })}
    </div>
  );
};
