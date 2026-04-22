import { useBlockStore } from "@salekit/core";
import { render, screen, waitFor } from "@testing-library/react";
import { type FC, useEffect } from "react";
import { beforeEach, describe, expect, it } from "vitest";
import { BuilderEditorProvider } from "@/modules/builder/editor";
import type { EditorPageSettings } from "@/modules/builder/editor/types";
import { usePageSettings } from "./usePageSettings";

const Probe: FC = () => {
  const { settings, setSetting } = usePageSettings();

  useEffect(() => {
    setSetting("fontFamily", "Montserrat");
    setSetting("showGrid", false);
  }, [setSetting]);

  return <span>{settings.fontFamily}</span>;
};

describe("usePageSettings", () => {
  beforeEach(() => {
    window.localStorage.clear();
    useBlockStore.getState().setBlocks({});
    useBlockStore.getState().setHierarchy({});
    useBlockStore.getState().setBlocks({}, true);
    useBlockStore.getState().setHierarchy({}, true);
  });

  it("writes page settings through the shared core store", async () => {
    render(
      <BuilderEditorProvider>
        <Probe />
      </BuilderEditorProvider>,
    );

    expect(await screen.findByText("Montserrat")).toBeTruthy();

    await waitFor(() => {
      const pageSettings = useBlockStore.getState().blocks.page?.configs
        ?.pageSettings as Partial<EditorPageSettings> | undefined;

      expect(pageSettings?.fontFamily).toBe("Montserrat");
      expect(pageSettings?.showGrid).toBe(false);
    });
  });
});
