import type { SK_BlockData } from "../../types";
import { DEVICE_CONFIGS } from "./constants";
import type { Breakpoint, CSSProperties } from "./types";

/**
 * Get responsive value with fallback from desktop
 * Merges desktop bpConfig with target breakpoint bpConfig
 */
export function getResponsiveValue<T = Record<string, unknown>>(
  bpConfigs: SK_BlockData["bpConfigs"],
  breakpoint: Breakpoint,
): T {
  const config = DEVICE_CONFIGS[breakpoint];
  const baseConfig = config.fallback ? bpConfigs[config.fallback] : {};
  const targetConfig = bpConfigs[breakpoint] || {};

  return deepMerge(baseConfig, targetConfig) as T;
}

/**
 * Deep merge two objects
 */
function deepMerge<T>(
  target: Record<string, unknown>,
  source: Record<string, unknown>,
): T {
  const output = { ...target };

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(
            target[key] as Record<string, unknown>,
            source[key] as Record<string, unknown>,
          );
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }

  return output as T;
}

function isObject(item: unknown): boolean {
  return item !== null && typeof item === "object" && !Array.isArray(item);
}

/**
 * Convert CSS object to string
 * Converts camelCase keys to kebab-case
 */
export function cssObjectToString(cssObj: CSSProperties): string {
  return Object.entries(cssObj)
    .map(([key, value]) => {
      const kebabKey = camelToKebab(key);
      return `${kebabKey}: ${value};`;
    })
    .join(" ");
}

function camelToKebab(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

/**
 * Map object keys using a transform function
 */
export function mapObjectKeys<T extends Record<string, unknown>>(
  obj: T,
  transform: (key: string) => string,
): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  Object.entries(obj).forEach(([key, value]) => {
    result[transform(key)] = value;
  });

  return result;
}
