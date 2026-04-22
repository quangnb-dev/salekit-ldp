import type { SK_BlockData } from "../../types";
import { DEVICE_CONFIGS } from "./constants";
import { cssObjectToString } from "./helpers";
import type { Breakpoint, Generator } from "./types";

export class CssSystem {
  private static instance: CssSystem | null = null;
  private stylesheets: Record<Breakpoint, CSSStyleSheet>;
  private cssRules: Record<Breakpoint, Map<string, string>>;
  private generatorRegistry: Map<string, Generator[]>;
  private getBlocksFunc: (() => Record<string, SK_BlockData>) | null = null;

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

    this.generatorRegistry = new Map();

    // Add stylesheets to document
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

  /**
   * Register generator registry (called from app layer)
   */
  registerGenerators(registry: Map<string, Generator[]>): void {
    this.generatorRegistry = registry;
  }

  /**
   * Register function to get blocks from store
   */
  registerBlocksGetter(getBlocks: () => Record<string, SK_BlockData>): void {
    this.getBlocksFunc = getBlocks;
  }

  /**
   * Rebuild entire CSS for all blocks
   */
  rebuild(): void {
    if (!this.getBlocksFunc) {
      console.warn("CssSystem: No blocks getter registered");
      return;
    }

    const blocks = this.getBlocksFunc();

    // Clear existing rules
    this.cssRules.desktop.clear();
    this.cssRules.tablet.clear();
    this.cssRules.mobile.clear();

    // Generate CSS for all blocks
    Object.values(blocks).forEach((block) => {
      this.updateCssRules(block.id);
    });

    // Apply CSS
    this.applyCss();
  }

  /**
   * Update CSS rules for a specific block
   */
  updateCssRules(blockId: string): void {
    if (!this.getBlocksFunc) {
      console.warn("CssSystem: No blocks getter registered");
      return;
    }

    const blocks = this.getBlocksFunc();
    const block = blocks[blockId];

    if (!block) {
      console.warn(`CssSystem: Block ${blockId} not found`);
      return;
    }

    const generators = this.generatorRegistry.get(block.type);

    if (!generators || generators.length === 0) {
      console.warn(
        `CssSystem: No generators registered for block type ${block.type}`,
      );
      return;
    }

    // Generate CSS for each breakpoint
    const breakpoints: Breakpoint[] = ["desktop", "tablet", "mobile"];

    breakpoints.forEach((breakpoint) => {
      const cssRulesForBlock: string[] = [];

      generators.forEach((gen) => {
        // Check if generator applies to this breakpoint
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
      }
    });
  }

  /**
   * Remove CSS rules for a specific block
   */
  removeBlockRules(blockId: string): void {
    this.cssRules.desktop.delete(blockId);
    this.cssRules.tablet.delete(blockId);
    this.cssRules.mobile.delete(blockId);
  }

  /**
   * Apply CSS to stylesheets
   */
  applyCss(): void {
    const breakpoints: Breakpoint[] = ["desktop", "tablet", "mobile"];

    breakpoints.forEach((breakpoint) => {
      const config = DEVICE_CONFIGS[breakpoint];
      const rules = Array.from(this.cssRules[breakpoint].values()).join("\n");

      let cssContent = rules;

      // Wrap in media query for tablet/mobile
      if (config.mediaQuery) {
        cssContent = `${config.mediaQuery} {\n${rules}\n}`;
      }

      try {
        this.stylesheets[breakpoint].replaceSync(cssContent);
      } catch (error) {
        console.error(`CssSystem: Error applying CSS for ${breakpoint}`, error);
      }
    });
  }
}
