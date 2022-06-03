import { compile, createProcessor } from "@mdx-js/mdx";
import { readFile } from "fs/promises";
import { toHtml } from "hast-util-to-html";
import { toHast } from "mdast-util-to-hast";
import { toc } from "mdast-util-toc";
import rehypeKatex from "rehype-katex";
import remarkDirective from "remark-directive";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import remarkAssets from "./plugins/assets.js";
import remarkDirectives from "./plugins/directives.js";

const options = {
  remarkPlugins: [remarkGfm, remarkMath, remarkDirective, remarkDirectives, remarkAssets],
  rehypePlugins: [rehypeKatex],
  jsx: false,
  useDynamicImport: true,
  outputFormat: "function-body",
};

export const compileMdx = async (source) => {
  const value = await readFile(source, "utf8");
  const output = await compile({ path: source, value }, options);
  return String(output.value);
};

export const buildToc = async (source, depth) => {
  const value = await readFile(source, "utf8");
  const opts = { maxDepth: depth };
  const ast = toc(createProcessor(options).parse({ path: source, value }), opts);
  return toHtml(toHast(ast.map));
};
