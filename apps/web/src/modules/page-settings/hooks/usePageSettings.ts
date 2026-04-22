import {
  DEFAULT_PAGE_SETTINGS,
  PAGE_BLOCK_ID,
  useBlockStore,
} from "@salekit/core";
import type { EditorPageSettings } from "@/modules/builder/editor/types";

const normalizeSettings = (value: unknown): EditorPageSettings => ({
  ...DEFAULT_PAGE_SETTINGS,
  ...(typeof value === "object" && value !== null
    ? (value as Partial<EditorPageSettings>)
    : {}),
});

export const usePageSettings = () => {
  const pageBlock = useBlockStore((state) => state.blocks[PAGE_BLOCK_ID]);
  const updateBlockConfigsProperty = useBlockStore(
    (state) => state.updateBlockConfigsProperty,
  );

  const settings = normalizeSettings(pageBlock?.configs?.pageSettings);

  const setSetting = <T extends string | number | boolean>(
    path: keyof EditorPageSettings,
    value: T,
  ) => {
    updateBlockConfigsProperty(
      PAGE_BLOCK_ID,
      `pageSettings.${String(path)}`,
      value,
    );
  };

  const setNestedSetting = (path: string, value: unknown) => {
    updateBlockConfigsProperty(
      PAGE_BLOCK_ID,
      `pageSettings.${path}`,
      value as never,
    );
  };

  return {
    pageBlock,
    settings,
    setSetting,
    setNestedSetting,
  };
};
