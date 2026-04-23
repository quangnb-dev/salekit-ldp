import { BlockToolbar } from "@salekit/core";
import { GripVertical, Image, MousePointerClick, Type } from "lucide-react";
import {
  type CSSProperties,
  type FC,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { getToolbarConfig } from "../../blocks/toolbarConfigs";

type QuickAddItem = {
  type: "text" | "image" | "button";
  label: string;
  icon: typeof Type;
};

const DEFAULT_POSITION = { x: 24, y: 24 };
const MIN_OFFSET = 16;

const QUICK_ADD_ITEMS: QuickAddItem[] = [
  { type: "text", label: "Văn bản", icon: Type },
  { type: "image", label: "Ảnh", icon: Image },
  { type: "button", label: "Nút bấm", icon: MousePointerClick },
];

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const FloatingQuickAddToolbar: FC = () => {
  const toolbarRef = useRef<HTMLDivElement | null>(null);
  const handleRef = useRef<HTMLButtonElement | null>(null);
  const activePointerIdRef = useRef<number | null>(null);
  const dragStateRef = useRef<{
    pointerStartX: number;
    pointerStartY: number;
    originX: number;
    originY: number;
  } | null>(null);
  const [position, setPosition] = useState(DEFAULT_POSITION);
  const positionRef = useRef(DEFAULT_POSITION);

  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  const items = useMemo(
    () =>
      QUICK_ADD_ITEMS.map((item) => ({
        item,
        config: getToolbarConfig(item.type),
      })).filter((entry) => entry.config !== null),
    [],
  );

  useEffect(() => {
    const handle = handleRef.current;
    if (!handle) {
      return;
    }

    const onPointerMove = (event: PointerEvent) => {
      const target = toolbarRef.current;
      const parent = target?.parentElement;
      const dragState = dragStateRef.current;
      if (!target || !parent || !dragState) {
        return;
      }

      const maxX = Math.max(
        parent.clientWidth - target.offsetWidth - MIN_OFFSET,
        MIN_OFFSET,
      );
      const maxY = Math.max(
        parent.clientHeight - target.offsetHeight - MIN_OFFSET,
        MIN_OFFSET,
      );
      const deltaX = event.clientX - dragState.pointerStartX;
      const deltaY = event.clientY - dragState.pointerStartY;
      const nextPosition = {
        x: clamp(dragState.originX + deltaX, MIN_OFFSET, maxX),
        y: clamp(dragState.originY + deltaY, MIN_OFFSET, maxY),
      };

      positionRef.current = nextPosition;
      setPosition(nextPosition);
    };

    const stopDragging = () => {
      dragStateRef.current = null;
      const activePointerId = activePointerIdRef.current;
      if (
        activePointerId !== null &&
        handle.hasPointerCapture?.(activePointerId)
      ) {
        handle.releasePointerCapture(activePointerId);
      }
      activePointerIdRef.current = null;
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", stopDragging);
      window.removeEventListener("pointercancel", stopDragging);
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) {
        return;
      }

      event.preventDefault();
      const currentPosition = positionRef.current;
      dragStateRef.current = {
        pointerStartX: event.clientX,
        pointerStartY: event.clientY,
        originX: currentPosition.x,
        originY: currentPosition.y,
      };
      activePointerIdRef.current = event.pointerId;
      handle.setPointerCapture?.(event.pointerId);
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", stopDragging);
      window.addEventListener("pointercancel", stopDragging);
    };

    const onLostPointerCapture = () => {
      stopDragging();
    };

    handle.addEventListener("pointerdown", onPointerDown);
    handle.addEventListener("lostpointercapture", onLostPointerCapture);

    return () => {
      handle.removeEventListener("pointerdown", onPointerDown);
      handle.removeEventListener("lostpointercapture", onLostPointerCapture);
      stopDragging();
    };
  }, []);

  const toolbarStyle: CSSProperties = {
    transform: `translate(${position.x}px, ${position.y}px)`,
  };

  return (
    <div
      ref={toolbarRef}
      className="pointer-events-auto absolute left-0 top-0 z-20 w-10 rounded-md  border-slate-200 bg-white/96 p-1 shadow-[0_14px_30px_rgba(15,23,42,0.12)] backdrop-blur-sm"
      style={toolbarStyle}
    >
      <button
        ref={handleRef}
        type="button"
        aria-label="Di chuyển thanh thêm nhanh"
        className="mb-1.5 flex h-8 w-full cursor-move touch-none items-center justify-center rounded-md border border-transparent text-slate-400 transition-all hover:text-slate-600 "
      >
        <GripVertical className="h-3.5 w-3.5" />
      </button>

      <div className="flex flex-col gap-1">
        {items.map(({ item, config }) => {
          if (!config) {
            return null;
          }

          const Icon = item.icon;
          const { id, overlay, ...blockData } = config;

          return (
            <BlockToolbar
              key={id}
              blockData={blockData}
              overlay={overlay}
              className="group relative flex h-8 w-full cursor-grab items-center justify-center rounded-md border border-transparent bg-white text-slate-600 transition-colors duration-150 hover:bg-slate-100 hover:text-slate-700 active:cursor-grabbing active:bg-slate-100"
            >
              <Icon className="h-4 w-4" />
              <div className="pointer-events-none absolute left-[calc(100%+6px)] top-1/2 z-30 flex -translate-y-1/2 items-center opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                <div className="h-0 w-0 border-b-[6px] border-r-[6px] border-t-[6px] border-b-transparent border-r-black border-t-transparent" />
                <div className="-ml-px whitespace-nowrap bg-black px-2.5 py-1 text-[11px] font-medium text-white">
                  {item.label}
                </div>
              </div>
            </BlockToolbar>
          );
        })}
      </div>
    </div>
  );
};
