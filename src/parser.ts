import { format, ParserOptions } from "prettier";
import * as prettierPluginTailwindcss from "prettier-plugin-tailwindcss";
import type { MtmlTailwindNode } from "./types";

export const parse = async (
  text: string,
  options: ParserOptions,
): Promise<MtmlTailwindNode> => {

  try {
    let formattedText = text;
    const mtmlTailwindAttribute = options.mtmlTailwindAttribute as unknown as string;
    const reg = new RegExp(`((${mtmlTailwindAttribute.split(",").join("|")})="([^"]*)"|(${mtmlTailwindAttribute.split(",").join("|")})='([^']*)')`, "gi")
    const matches = text.matchAll(reg);

    const map = new Map();

    if (matches) {
      for (const match of matches) {

        const original = match[0];
        const value = match[3] || match[5];

        if (!/<\$?mt:/i.test(value)) {
          const fixedValue = (await format(
            `<div class="${value}"></div>`,
            {
              parser: "html",
              plugins: [prettierPluginTailwindcss]
            }
          )).match(/class="([^"]*)"/)?.[1] as string;

          const fixed = original.replace(value, fixedValue);
          map.set(original, fixed);
        }
      }
    }

    for (const [original, fixed] of map) {
      formattedText = formattedText.replaceAll(original, fixed);
    }

    return {
      type: "mtmlTailwind",
      body: formattedText,
      start: 0,
      end: text.length,
    };
  } catch (error) {
    console.error("Parse error:", error);
    throw error;
  }
};