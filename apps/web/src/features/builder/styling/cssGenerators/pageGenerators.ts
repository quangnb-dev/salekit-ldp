import type { CSSProperties, Generator } from "../cssSystem";

export const pageGenerators: Generator[] = [
  {
    selector: "",
    generator: () => {
      return {
        position: "unset" as CSSProperties["position"],
      };
    },
  },
];
