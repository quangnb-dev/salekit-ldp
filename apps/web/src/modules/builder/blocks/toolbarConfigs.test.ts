import { describe, expect, it } from "vitest";
import {
  ELEMENT_ITEMS,
  POPUP_ITEMS,
  SECTION_ITEMS,
  UTILITY_ITEMS,
} from "@/modules/elements/config/blockCatalog";
import {
  isSupportedLibraryBlockType,
  SUPPORTED_LIBRARY_BLOCK_TYPES,
} from "./supportedBlockTypes";
import { getToolbarConfig, getToolbarPresets } from "./toolbarConfigs";

describe("toolbarConfigs", () => {
  it("returns configs only for supported library block types", () => {
    expect(getToolbarConfig("hero-section")).toBeNull();
    expect(getToolbarConfig("email-popup")).toBeNull();
    expect(getToolbarPresets("hero-section")).toEqual([]);

    for (const type of SUPPORTED_LIBRARY_BLOCK_TYPES) {
      expect(getToolbarConfig(type)?.type).toBe(type);
      expect(getToolbarPresets(type).length).toBeGreaterThan(0);
    }
  });

  it("keeps block catalog scoped to supported block types", () => {
    const catalogTypes = [
      ...ELEMENT_ITEMS,
      ...SECTION_ITEMS,
      ...POPUP_ITEMS,
      ...UTILITY_ITEMS,
    ].map((item) => item.type);

    expect(catalogTypes).toEqual(
      expect.arrayContaining([...SUPPORTED_LIBRARY_BLOCK_TYPES]),
    );
    expect(
      catalogTypes.every((type) => isSupportedLibraryBlockType(type)),
    ).toBe(true);
  });
});
