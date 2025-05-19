import type {
  Options,
  Parser,
  Printer,
  SupportLanguage,
  SupportOption,
} from "prettier";
import { parse } from "./parser";
import { print } from "./printer";
import type { MtmlTailwindNode } from "./types";

export const languages: Partial<SupportLanguage>[] = [
  {
    name: "TailwindCSS in MTML",
    parsers: ["mtmlTailwind"],
    extensions: [".mtml"]
  },
];

export const parsers: Record<string, Parser> = {
  mtmlTailwind: {
    parse,
    astFormat: "mtmlTailwind",
    locStart: (node: MtmlTailwindNode) => node.start,
    locEnd: (node: MtmlTailwindNode) => node.end,
  },
};

export const printers: Record<string, Printer> = {
  mtmlTailwind: {
    print,
  },
};

export const options: Record<string, SupportOption> = {

  mtmlTailwindAttribute: {
    type: "string",
    category: "Format",
    default: "class",
    description: "",
  },
};

export const defaultOptions: Options = {
};