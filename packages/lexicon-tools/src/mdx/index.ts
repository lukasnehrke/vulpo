import { compile } from "@mdx-js/mdx";
import { readFile } from "fs/promises";
import rehypeKatex from "rehype-katex";
import remarkDirective from "remark-directive";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import remarkDirectives from "./plugins/directives";

interface CompileOptions {
  source: string;
}

export const compileMdx = async (options: CompileOptions): Promise<string> => {
  const value = await readFile(options.source, "utf8");

  const remarkPlugins = [remarkGfm, remarkMath, remarkDirective, remarkDirectives];

  const rehypePlugins = [rehypeKatex];

  const output = await compile(
    { path: options.source, value },
    {
      remarkPlugins,
      rehypePlugins,
      jsx: false,
      useDynamicImport: true,
      outputFormat: "function-body",
    }
  );

  return String(output.value);
};
