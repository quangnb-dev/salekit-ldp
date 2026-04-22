import type { CSSProperties, Generator } from "../cssRuntime";

export const pageGenerators: Generator[] = [
  {
    selector: "",
    generator: () => {
      return {
        position: "unset" as CSSProperties["position"],
        background: "#ccc",
      };
    },
  },
];
