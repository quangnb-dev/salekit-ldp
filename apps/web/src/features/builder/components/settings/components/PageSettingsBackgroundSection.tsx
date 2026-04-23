import { type FC, useCallback, useEffect, useRef, useState } from "react";
import ColorPicker from "react-best-gradient-color-picker";
import { createPortal } from "react-dom";
import { FieldRow } from "@/shared/ui/FieldRow";
import { Select } from "@/shared/ui/Input";
import { usePageSettings } from "../hooks/usePageSettings";
import { MediaModal } from "./MediaModal";

type BackgroundType = "color" | "image" | "video";

export const COLOR_POPUP_WIDTH = 272;
const COLOR_POPUP_FALLBACK_HEIGHT = 220;
const COLOR_POPUP_GAP = 8;
const VIEWPORT_MARGIN = 8;

export const PageSettingsBackgroundSection: FC = () => {
  const { settings, setSetting } = usePageSettings();
  const [isColorPopupOpen, setIsColorPopupOpen] = useState(false);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [colorPopupPos, setColorPopupPos] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const triggerRef = useRef<HTMLDivElement>(null);
  const colorButtonRef = useRef<HTMLButtonElement>(null);
  const colorPopupRef = useRef<HTMLDivElement>(null);

  const backgroundType = settings.backgroundType;

  const getColorPopupPosition = useCallback((popupHeight: number) => {
    const anchor = colorButtonRef.current;
    if (!anchor) return null;

    const rect = anchor.getBoundingClientRect();

    let left = rect.left;
    if (left + COLOR_POPUP_WIDTH > window.innerWidth - VIEWPORT_MARGIN) {
      left = window.innerWidth - COLOR_POPUP_WIDTH - VIEWPORT_MARGIN;
    }
    left = Math.max(VIEWPORT_MARGIN, left);

    let top = rect.bottom + COLOR_POPUP_GAP;
    if (top + popupHeight > window.innerHeight - VIEWPORT_MARGIN) {
      top = rect.top - popupHeight - COLOR_POPUP_GAP;
    }
    top = Math.max(VIEWPORT_MARGIN, top);

    return { top, left };
  }, []);

  useEffect(() => {
    if (!isColorPopupOpen) return;

    const updateColorPopupPosition = () => {
      const popupHeight =
        colorPopupRef.current?.offsetHeight ?? COLOR_POPUP_FALLBACK_HEIGHT;
      const nextPos = getColorPopupPosition(popupHeight);
      if (nextPos) setColorPopupPos(nextPos);
    };

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedTrigger = triggerRef.current?.contains(target);
      const clickedPopup = colorPopupRef.current?.contains(target);
      if (!clickedTrigger && !clickedPopup) {
        setIsColorPopupOpen(false);
        setColorPopupPos(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsColorPopupOpen(false);
        setColorPopupPos(null);
      }
    };

    updateColorPopupPosition();
    const rafId = window.requestAnimationFrame(updateColorPopupPosition);

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", updateColorPopupPosition);
    window.addEventListener("scroll", updateColorPopupPosition, true);

    return () => {
      window.cancelAnimationFrame(rafId);
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", updateColorPopupPosition);
      window.removeEventListener("scroll", updateColorPopupPosition, true);
    };
  }, [isColorPopupOpen, getColorPopupPosition]);

  return (
    <>
      <p className="pt-1 text-sm font-medium text-slate-700">
        Màu &amp; Hình nền
      </p>

      <FieldRow label="Chọn kiểu">
        <Select
          value={backgroundType}
          onChange={(event) =>
            setSetting("backgroundType", event.target.value as BackgroundType)
          }
        >
          <option value="color">Color</option>
          <option value="image">Image</option>
          <option value="video">Video</option>
        </Select>
      </FieldRow>

      {backgroundType === "color" ? (
        <FieldRow label="Màu nền">
          <div ref={triggerRef} className="space-y-2">
            <div className="flex items-center gap-2">
              <button
                ref={colorButtonRef}
                type="button"
                onClick={() => {
                  if (isColorPopupOpen) {
                    setIsColorPopupOpen(false);
                    setColorPopupPos(null);
                    return;
                  }

                  const initialPos = getColorPopupPosition(
                    COLOR_POPUP_FALLBACK_HEIGHT,
                  );
                  if (!initialPos) return;

                  setColorPopupPos(initialPos);
                  setIsColorPopupOpen(true);
                }}
                className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50"
              >
                <span
                  className="h-5 w-5 shrink-0 rounded border border-slate-200"
                  style={{ background: settings.backgroundColor }}
                />
                <span>Chọn màu</span>
              </button>
              <button
                type="button"
                onClick={() =>
                  setSetting(
                    "backgroundColor",
                    "linear-gradient(90deg, rgba(15,118,110,1) 0%, rgba(59,130,246,1) 100%)",
                  )
                }
                className="rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-600 transition-colors hover:bg-slate-50"
              >
                Reset
              </button>
            </div>
          </div>
        </FieldRow>
      ) : (
        <FieldRow label={backgroundType === "image" ? "Hình nền" : "Video nền"}>
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => setIsMediaModalOpen(true)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50"
            >
              {backgroundType === "image" ? "Chọn ảnh" : "Chọn video"}
            </button>
            <p className="text-xs text-slate-500">
              {backgroundType === "image"
                ? settings.backgroundImageUrl || "Nền đang sử dụng: Image"
                : settings.backgroundVideoUrl || "Nền đang sử dụng: Video"}
            </p>
          </div>
        </FieldRow>
      )}

      {isColorPopupOpen &&
        colorPopupPos &&
        createPortal(
          <div
            ref={colorPopupRef}
            role="dialog"
            aria-label="Chọn màu nền"
            className="fixed z-300 w-68 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_12px_28px_rgba(15,23,42,0.18)]"
            style={{ top: colorPopupPos.top, left: colorPopupPos.left }}
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-3 py-2">
              <p className="text-xs font-semibold text-slate-700">Màu nền</p>
              <button
                type="button"
                onClick={() => {
                  setIsColorPopupOpen(false);
                  setColorPopupPos(null);
                }}
                className="rounded-md border border-slate-200 px-2 py-0.5 text-[11px] text-slate-600 hover:bg-slate-50"
              >
                Xong
              </button>
            </div>
            <div className="px-2 py-2">
              <ColorPicker
                value={settings.backgroundColor}
                onChange={(value) => setSetting("backgroundColor", value)}
                disableDarkMode
                hideInputs
                hidePresets
                hideColorGuide
                hideAdvancedSliders
                hideOpacity
                hideEyeDrop
                hideInputType
                hideGradientAngle
                hideGradientStop
                width={248}
                height={112}
              />
            </div>
          </div>,
          document.body,
        )}

      {isMediaModalOpen && (
        <MediaModal onClose={() => setIsMediaModalOpen(false)} />
      )}
    </>
  );
};
