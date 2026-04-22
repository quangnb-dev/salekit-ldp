import type { Breakpoint, DeviceConfig } from "./types";

export const DEVICE_CONFIGS: Record<Breakpoint, DeviceConfig> = {
  desktop: {
    mediaQuery: "",
    fallback: null,
    editorSelector: ".sk-editor-desktop",
  },
  tablet: {
    mediaQuery: "@media (max-width: 1024px)",
    fallback: "desktop",
    editorSelector: ".sk-editor-tablet",
  },
  mobile: {
    mediaQuery: "@media (max-width: 768px)",
    fallback: "desktop",
    editorSelector: ".sk-editor-mobile",
  },
};
