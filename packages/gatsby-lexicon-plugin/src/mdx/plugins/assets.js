import * as fs from "fs-extra";
import isRelativeUrl from "is-relative-url";
import * as path from "path";
import { visit } from "unist-util-visit";

/** @return {import("unified").Transformer} */
export default function remarkAssets() {
  return (tree, file) => {
    const dest = path.resolve(process.cwd(), "public", "_lexicon");

    const isLocalUrl = (url) => {
      return url && isRelativeUrl(url) && !url.startsWith("/");
    };

    const copyFile = (src, dest) => {
      if (!fs.existsSync(dest)) {
        fs.ensureDirSync(path.dirname(dest));
        fs.copySync(src, dest);
      }
    };

    visit(tree, "image", (node) => {
      const base = file.dirname ? path.resolve(file.cwd, file.dirname) : file.cwd;
      if (isLocalUrl(node.url)) {
        copyFile(path.resolve(base, node.url), path.resolve(dest, path.basename(node.url)));
        node.url = "/_lexicon/" + path.basename(node.url);
      }
    });
  };
}
