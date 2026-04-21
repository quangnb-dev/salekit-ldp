export const brand = "sk";

export const SNAP_THRESHOLD = 3;

export const dataSetPrefix = `data-${brand}-`;

export enum SK_DATA_SET_ATTRS {
  BROWSER_WRAPPER = "data-sk-browser-wrapper",
  DOCKING_WRAPPER = "data-sk-docking-wrapper",
  PAGE_WRAPPER = "data-sk-page-wrapper",
  OVERLAY = "data-sk-overlay",
  BOUNDING = "data-sk-bounding",
  BOUNDING_OVERLAY = "data-sk-bounding-overlay",
  RESIZE_HANDLE = "data-sk-resize-handle",
  RESIZE_HANDLE_ITEM = "data-sk-resize-handle-item",
  RESIZE_HANDLE_DIR = "data-sk-resize-handle-dir",
  RESIZE_HANDLE_DOT = "data-sk-resize-handle-dot",
  GUIDELINE = "data-sk-guideline",
  DOCK_VAL_ITEM = "data-sk-dock-val-item",
  DOCK_VAL_ITEM_TOP = "data-sk-dock-val-item-top",
  DOCK_VAL_ITEM_LEFT = "data-sk-dock-val-item-left",
  DOCK_VAL_NUM = "data-sk-dock-val-num",
  DOCK_VAL_NUM_TOP = "data-sk-dock-val-num-top",
  DOCK_VAL_NUM_LEFT = "data-sk-dock-val-num-left",
  DOCK_LINE_ITEM = "data-sk-dock-line-item",
  DOCK_LINE_ITEM_X = "data-sk-dock-line-item-x",
  DOCK_LINE_ITEM_Y = "data-sk-dock-line-item-y",
  TOOLBAR = "data-sk-toolbar",
  TOOLBAR_BLOCK_DATA = "data-sk-toolbar-block-data",
  TOOLBAR_OVERLAY = "data-sk-toolbar-overlay",
  TOOLBAR_OPTION_DATA = "data-sk-toolbar-option-data",
  VIEWER = "data-sk-viewer",
  VIEWER_X = "data-sk-viewer-x",
  VIEWER_Y = "data-sk-viewer-y",
  VIEWER_WIDTH = "data-sk-viewer-width",
  VIEWER_HEIGHT = "data-sk-viewer-height",
  SELECTED_BLOCK = "data-sk-selected-block",
  AUTO_ID = "data-sk-id",
  CNAME = "data-sk-cname",
  AUTO_ID_INNER = "data-sk-id-inner",
  CNAME_INNER = "data-sk-cname-inner",
  CLICKABLE = "data-sk-clickable",
  DROP = "data-sk-drop",
  DROP_INNER = "data-sk-drop-inner",
  INVALID_DROP = "data-sk-invalid-drop",
}

export enum SK_BLOCK_CLASS {
  BLOCK_ROOT = "sk_block",
  POPUP = "sk_popup",
  PAGE = "sk_page",
  SECTION = "sk_section",
  BUTTON = "sk_button",
  TEXT = "sk_text",
  IMAGE = "sk_image",
  VIDEO = "sk_video",
  COUNTDOWN = "sk_countdown",
  GROUP = "sk_group",
  BOX = "sk_box",
  LINE = "sk_line",
  OVERLAY = "sk_overlay",
  FORM = "sk_form",
}

export enum SK_INTERACT_TARGET {
  CLICKABLE = `[${SK_DATA_SET_ATTRS.CLICKABLE}="true"]`,
  RESIZABLE = `[${SK_DATA_SET_ATTRS.BOUNDING}="true"]`,
  DRAG_TOOLBAR = `[${SK_DATA_SET_ATTRS.TOOLBAR}="true"]`,
  DRAG_VIEWER = `[${SK_DATA_SET_ATTRS.VIEWER}="true"]`,
  DROPZONE = `[${SK_DATA_SET_ATTRS.DROP}="true"], [${SK_DATA_SET_ATTRS.DROP_INNER}="true"]`,
  DROPZONE_ACCEPT = `[${SK_DATA_SET_ATTRS.TOOLBAR}="true"], [${SK_DATA_SET_ATTRS.VIEWER}="true"]`,
}

export enum SK_CUSTOM_EVENTS {
  TOOLBAR_DRAG_START = "toolbar-drag-start",
}
