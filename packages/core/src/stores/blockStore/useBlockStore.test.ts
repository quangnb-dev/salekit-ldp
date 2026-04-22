import { beforeEach, describe, expect, it } from "vitest";

import { createBlankPageStructure } from "../../lib";
import type { SK_BlockData } from "../../types";
import { useBlockStore } from "./useBlockStore";

const createBlock = (id: string, type: SK_BlockData["type"]): SK_BlockData => ({
  id,
  type,
  cname: type,
  label: type,
  bpConfigs: {
    desktop: {},
    tablet: {},
    mobile: {},
  },
  configs: {},
});

const createDeepChain = (depth: number) => {
  const blocks: Record<string, SK_BlockData> = {
    page: createBlock("page", "page"),
    b_0: createBlock("b_0", "section"),
  };
  const hierarchy: Record<string, string[]> = {
    page: depth > 0 ? ["b_0"] : [],
  };

  for (let i = 0; i < depth; i += 1) {
    const id = `b_${i}`;
    const nextId = i < depth - 1 ? `b_${i + 1}` : null;
    blocks[id] =
      i === 0 ? createBlock(id, "section") : createBlock(id, "group");
    hierarchy[id] = nextId ? [nextId] : [];
  }

  return { blocks, hierarchy };
};

describe("useBlockStore", () => {
  beforeEach(() => {
    useBlockStore.setState((state) => ({
      ...state,
      blocks: {},
      hierarchy: {},
      popupBlocks: {},
      popupHierarchy: {},
    }));
    useBlockStore.temporal.getState().clear();
  });

  it("undo restores blocks/hierarchy after addBlock", () => {
    const pageBlock = createBlock("page", "page");
    const sectionBlock = createBlock("section_root", "section");
    const textBlock = createBlock("b1", "text");

    useBlockStore.getState().setBlocks({
      page: pageBlock,
      section_root: sectionBlock,
    });
    useBlockStore.getState().setHierarchy({
      page: ["section_root"],
      section_root: [],
    });
    useBlockStore.temporal.getState().clear();

    useBlockStore.getState().addBlock("b1", "section_root", textBlock);

    expect(useBlockStore.getState().blocks.b1).toBeDefined();
    expect(useBlockStore.getState().hierarchy.section_root).toEqual(["b1"]);

    useBlockStore.temporal.getState().undo();

    expect(useBlockStore.getState().blocks.b1).toBeUndefined();
    expect(useBlockStore.getState().hierarchy.section_root).toEqual([]);
  });

  it("updateBlockMultipleProperty writes nested top/left values", () => {
    const pageBlock = createBlock("page", "page");
    const textBlock = createBlock("b1", "text");

    useBlockStore.getState().setBlocks({
      page: pageBlock,
      b1: textBlock,
    });
    useBlockStore.getState().setHierarchy({
      page: ["b1"],
      b1: [],
    });

    useBlockStore
      .getState()
      .updateBlockMultipleProperty("b1", "desktop", "_multiple_", {
        "top.val": "80",
        "left.val": "120",
      });

    const blockData = useBlockStore.getState().blocks.b1;
    expect(blockData).toBeDefined();
    const desktopConfig = blockData?.bpConfigs.desktop as Record<
      string,
      unknown
    >;

    expect(desktopConfig.top).toEqual({ val: "80" });
    expect(desktopConfig.left).toEqual({ val: "120" });
  });

  it("removeBlock recursively deletes descendants and hierarchy references", () => {
    const blocks = {
      page: createBlock("page", "page"),
      s1: createBlock("s1", "section"),
      b1: createBlock("b1", "text"),
      b2: createBlock("b2", "button"),
    };

    const hierarchy = {
      page: ["s1"],
      s1: ["b1"],
      b1: ["b2"],
      b2: [],
    };

    useBlockStore.getState().setBlocks(blocks);
    useBlockStore.getState().setHierarchy(hierarchy);

    useBlockStore.getState().removeBlock("s1");

    const state = useBlockStore.getState();
    expect(state.blocks.s1).toBeUndefined();
    expect(state.blocks.b1).toBeUndefined();
    expect(state.blocks.b2).toBeUndefined();

    expect(state.hierarchy.s1).toBeUndefined();
    expect(state.hierarchy.b1).toBeUndefined();
    expect(state.hierarchy.b2).toBeUndefined();
    expect(state.hierarchy.page).toEqual([]);
  });

  it("routes setBlocks and setHierarchy to popup state in popup mode", () => {
    const popupBlock = createBlock("popup_1", "popup");

    useBlockStore.getState().setBlocks({ popup_1: popupBlock }, true);
    useBlockStore
      .getState()
      .setHierarchy({ "popup-container": ["popup_1"], popup_1: [] }, true);

    const state = useBlockStore.getState();
    expect(state.popupBlocks.popup_1).toBeDefined();
    expect(state.popupHierarchy["popup-container"]).toEqual(["popup_1"]);
    expect(state.blocks.popup_1).toBeUndefined();
    expect(state.hierarchy.popup_1).toBeUndefined();
  });

  it("addBlock and removeBlock operate on popup maps in popup mode", () => {
    const popupRoot = createBlock("popup_root", "section");
    const textBlock = createBlock("popup_text", "group");
    const nestedBlock = createBlock("popup_nested", "button");

    useBlockStore.getState().setBlocks({ popup_root: popupRoot }, true);
    useBlockStore.getState().setHierarchy({ popup_root: [] }, true);

    useBlockStore
      .getState()
      .addBlock(
        "popup_text",
        "popup_root",
        textBlock,
        undefined,
        undefined,
        true,
      );
    useBlockStore
      .getState()
      .addBlock(
        "popup_nested",
        "popup_text",
        nestedBlock,
        undefined,
        undefined,
        true,
      );

    let state = useBlockStore.getState();
    expect(state.popupBlocks.popup_text).toBeDefined();
    expect(state.popupHierarchy.popup_root).toEqual(["popup_text"]);
    expect(state.popupHierarchy.popup_text).toEqual(["popup_nested"]);
    expect(state.blocks.popup_text).toBeUndefined();

    useBlockStore.getState().removeBlock("popup_text", true);

    state = useBlockStore.getState();
    expect(state.popupBlocks.popup_text).toBeUndefined();
    expect(state.popupBlocks.popup_nested).toBeUndefined();
    expect(state.popupHierarchy.popup_text).toBeUndefined();
    expect(state.popupHierarchy.popup_nested).toBeUndefined();
    expect(state.popupHierarchy.popup_root).toEqual([]);
  });

  it("addBlockPopup creates popup container links and default popup block", () => {
    useBlockStore.getState().addBlockPopup("popup_new");

    const state = useBlockStore.getState();
    expect(state.popupHierarchy["popup-container"]).toEqual(["popup_new"]);
    expect(state.popupHierarchy.popup_new).toEqual([]);
    expect(state.popupBlocks.popup_new).toMatchObject({
      id: "popup_new",
      type: "popup",
      cname: "popup",
      label: "Popup",
    });
  });

  it("reparent does not duplicate block in target parent when called repeatedly", () => {
    const blocks = {
      page: createBlock("page", "page"),
      p1: createBlock("p1", "section"),
      p2: createBlock("p2", "section"),
      b1: createBlock("b1", "text"),
    };
    const hierarchy = {
      page: ["p1", "p2"],
      p1: ["b1"],
      p2: [],
      b1: [],
    };

    useBlockStore.getState().setBlocks(blocks);
    useBlockStore.getState().setHierarchy(hierarchy);

    useBlockStore
      .getState()
      .updateBlockMultipleProperty(
        "b1",
        "desktop",
        "_multiple_",
        { "top.val": "10" },
        { parentId: "p2" },
      );
    useBlockStore
      .getState()
      .updateBlockMultipleProperty(
        "b1",
        "desktop",
        "_multiple_",
        { "top.val": "20" },
        { parentId: "p2" },
      );

    const state = useBlockStore.getState();
    expect(state.hierarchy.p1).toEqual([]);
    expect(state.hierarchy.p2).toEqual(["b1"]);
  });

  it("removeBlock handles very deep chains without stack overflow", () => {
    const { blocks, hierarchy } = createDeepChain(5000);
    useBlockStore.getState().setBlocks(blocks);
    useBlockStore.getState().setHierarchy(hierarchy);

    expect(() => useBlockStore.getState().removeBlock("b_0")).not.toThrow();

    const state = useBlockStore.getState();
    expect(state.hierarchy.page).toEqual([]);
    expect(state.blocks.b_0).toBeUndefined();
    expect(state.blocks.b_4999).toBeUndefined();
  });

  it("duplicateBlock handles deep chains without stack overflow", () => {
    const { blocks, hierarchy } = createDeepChain(5000);
    useBlockStore.getState().setBlocks(blocks);
    useBlockStore.getState().setHierarchy(hierarchy);

    expect(() =>
      useBlockStore.getState().duplicateBlock("b_0", "dup_root"),
    ).not.toThrow();

    const state = useBlockStore.getState();
    expect(state.blocks.dup_root).toBeDefined();
    expect(state.hierarchy.page).toEqual(["b_0", "dup_root"]);
  });

  it("createBlankPageStructure returns page with one empty section", () => {
    const structure = createBlankPageStructure();
    const pageBlock = structure.blocks.page;
    const sectionBlock = structure.blocks["section-root"];

    expect(Object.keys(structure.blocks)).toEqual(["page", "section-root"]);
    expect(pageBlock?.type).toBe("page");
    expect(sectionBlock?.type).toBe("section");
    expect(structure.hierarchy.page).toEqual(["section-root"]);
    expect(structure.hierarchy["section-root"]).toEqual([]);
  });

  it("rejects invalid direct content placement under page", () => {
    const pageBlock = createBlock("page", "page");
    const textBlock = createBlock("text_1", "text");

    useBlockStore.getState().setBlocks({ page: pageBlock });
    useBlockStore.getState().setHierarchy({ page: [] });

    useBlockStore.getState().addBlock("text_1", "page", textBlock);

    const state = useBlockStore.getState();
    expect(state.blocks.text_1).toBeUndefined();
    expect(state.hierarchy.page).toEqual([]);
  });

  it("rejects invalid hierarchy updates that bypass section contract", () => {
    const blocks = {
      page: createBlock("page", "page"),
      section_1: createBlock("section_1", "section"),
      text_1: createBlock("text_1", "text"),
    };

    useBlockStore.getState().setBlocks(blocks);
    useBlockStore.getState().setHierarchy({
      page: ["section_1"],
      section_1: ["text_1"],
      text_1: [],
    });

    useBlockStore.getState().updateHierarchy("page", ["text_1"]);

    const state = useBlockStore.getState();
    expect(state.hierarchy.page).toEqual(["section_1"]);
  });
});
