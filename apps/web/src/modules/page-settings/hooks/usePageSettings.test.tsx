import { useBlockStore } from "@salekit/core";
import { render, screen, waitFor } from "@testing-library/react";
import { useEffect } from "react";
import { beforeEach, describe, expect, it } from "vitest";
import { BuilderEditorProvider } from "@/modules/builder/editor";
import { usePageSettings } from "./usePageSettings";

function Probe() {
  const { settings, setSetting } = usePageSettings();

  useEffect(() => {
    setSetting("fontFamily", "Montserrat");
    setSetting("showGrid", false);
  }, [setSetting]);

  return <span>{settings.fontFamily}</span>;
}

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
      expect(
        useBlockStore.getState().blocks.page?.configs?.pageSettings?.fontFamily,
      ).toBe("Montserrat");
      expect(
        useBlockStore.getState().blocks.page?.configs?.pageSettings?.showGrid,
      ).toBe(false);
    });
  });
});
