import type { SK_BlockData } from "@salekit/core";
import { useBlockStore } from "@salekit/core";

import { cssObjectToString, DEVICE_CONFIGS } from "./helper";
import type {
  Breakpoint,
  CssRuleStore,
  GeneratorSelector,
  StylesheetStore,
} from "./types";

const BREAKPOINTS: Breakpoint[] = ["desktop", "tablet", "mobile"];

type CssSystemOptions = {
  generatorSelector: GeneratorSelector;
  templateId?: string | null;
};

export class CssSystem {
  private static instance: CssSystem | null = null;
  private stylesheets: StylesheetStore;
  private cssRules: CssRuleStore;
  private generatorSelector: GeneratorSelector;
  private templateId?: string | null;

  private constructor() {
    this.stylesheets = {
      desktop: new CSSStyleSheet(),
      tablet: new CSSStyleSheet(),
      mobile: new CSSStyleSheet(),
    };

    this.cssRules = {
      desktop: new Map(),
      tablet: new Map(),
      mobile: new Map(),
    };

    this.generatorSelector = () => undefined;
    this.templateId = null;

    if (typeof document !== "undefined") {
      document.adoptedStyleSheets = [
        ...document.adoptedStyleSheets,
        this.stylesheets.desktop,
        this.stylesheets.tablet,
        this.stylesheets.mobile,
      ];
    }
  }

  static getInstance(): CssSystem {
    if (!CssSystem.instance) {
      CssSystem.instance = new CssSystem();
    }
    return CssSystem.instance;
  }

  configure({ generatorSelector, templateId }: CssSystemOptions): void {
    this.generatorSelector = generatorSelector;
    this.templateId = templateId ?? null;
  }

  rebuild(): void {
    const blocks = useBlockStore.getState().blocks;

    this.cssRules.desktop.clear();
    this.cssRules.tablet.clear();
    this.cssRules.mobile.clear();

    Object.values(blocks).forEach((block) => {
      this.updateCssRules(block.id, block);
    });

    this.applyCss();
  }

  updateCssRules(blockId: string, block: SK_BlockData): void {
    const generators = this.generatorSelector({
      block,
      templateId: this.templateId,
    });

    if (!generators || generators.length === 0) {
      this.removeBlockRules(blockId);
      return;
    }

    BREAKPOINTS.forEach((breakpoint) => {
      const cssRulesForBlock: string[] = [];

      generators.forEach((gen) => {
        if (gen.applyTo && !gen.applyTo.includes(breakpoint)) {
          return;
        }

        const cssProps = gen.generator(block, breakpoint);
        if (Object.keys(cssProps).length === 0) {
          return;
        }

        const selector = gen.selector
          ? `[data-sk-id="${blockId}"]${gen.selector}`
          : `[data-sk-id="${blockId}"]`;

        const cssString = cssObjectToString(cssProps);
        cssRulesForBlock.push(`${selector} { ${cssString} }`);
      });

      if (cssRulesForBlock.length > 0) {
        this.cssRules[breakpoint].set(blockId, cssRulesForBlock.join("\n"));
      } else {
        this.cssRules[breakpoint].delete(blockId);
      }
    });
  }

  removeBlockRules(blockId: string): void {
    this.cssRules.desktop.delete(blockId);
    this.cssRules.tablet.delete(blockId);
    this.cssRules.mobile.delete(blockId);
  }

  applyCss(): void {
    BREAKPOINTS.forEach((breakpoint) => {
      const config = DEVICE_CONFIGS[breakpoint];
      const rules = Array.from(this.cssRules[breakpoint].values()).join("\n");

      let cssContent = rules;
      if (config.mediaQuery) {
        cssContent = `${config.mediaQuery} {\n${rules}\n}`;
      }

      this.stylesheets[breakpoint].replaceSync(cssContent);
    });
  }
}
