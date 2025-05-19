import type { AstPath, Doc, Printer } from "prettier";
import type { MtmlTailwindNode } from "./types";

export const print: Printer["print"] = (path: AstPath): Doc => {
  const node: MtmlTailwindNode = path.node;
  return node.body;
};