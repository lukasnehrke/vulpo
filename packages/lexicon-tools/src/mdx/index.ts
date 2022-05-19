import { compile, createProcessor } from "@mdx-js/mdx";
import { readFile } from "fs/promises";
import { toHtml } from "hast-util-to-html";
import { toHast } from "mdast-util-to-hast";
import { toc } from "mdast-util-toc";
import rehypeKatex from "rehype-katex";
import remarkDirective from "remark-directive";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import remarkDirectives from "./plugins/directives";

interface CompileOptions {
  source: string;
}

export const generateMdx = async (options: CompileOptions) => {
  const value = await readFile(options.source, "utf8");
  const output = await compile({ path: options.source, value }, createOptions());
  return String(output.value);
};

export const generateToc = async (options: CompileOptions, depth: number) => {
  const value = await readFile(options.source, "utf8");
  const opts = { maxDepth: depth as any };
  const ast = toc(createProcessor(createOptions()).parse({ path: options.source, value }) as any, opts);
  return toHtml(toHast(ast.map as any)!);
};

const createOptions = (): any => {
  const remarkPlugins = [remarkGfm, remarkMath, remarkDirective, remarkDirectives];
  const rehypePlugins = [rehypeKatex];
  return {
    remarkPlugins,
    rehypePlugins,
    jsx: false,
    useDynamicImport: true,
    outputFormat: "function-body",
  };
};
