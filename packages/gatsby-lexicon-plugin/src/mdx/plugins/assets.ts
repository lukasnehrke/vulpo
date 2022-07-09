import * as fs from "fs";
import * as path from "path";
import type { Plugin } from "unified";

export const remarkAssets: Plugin = () => {
  return async (tree, file) => {
    const { visit } = await import(`unist-util-visit`);
    const { default: isRelativeUrl } = await import("is-relative-url");

    const dest = path.resolve(process.cwd(), "public", "_lexicon");

    const isLocalUrl = (url: string) => url && isRelativeUrl(url) && !url.startsWith("/");

    const copyFile = (src: string, dest: string) => {
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.copyFileSync(src, dest);
    };

    visit(tree, "image", (node: any) => {
      const base = file.dirname ? path.resolve(file.cwd, file.dirname) : file.cwd;
      if (isLocalUrl(node.url)) {
        copyFile(path.resolve(base, node.url), path.resolve(dest, path.basename(node.url)));
        node.url = "/_lexicon/" + path.basename(node.url);
      }
    });
  };
};
