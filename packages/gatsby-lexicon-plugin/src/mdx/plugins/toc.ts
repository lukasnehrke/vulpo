import type { Plugin } from "unified";

export const remarkToc: Plugin = () => {
  return async (tree, file) => {
    const { toc } = await import("mdast-util-toc");
    file.data.toc = convertTree(toc(tree as any, { maxDepth: 3 }).map).children;
  };
};

const convertTree = (node: any, current: any = {}): any => {
  if (node.type === "list") {
    current.children = node.children.map((child: any) => convertTree(child));
    return current;
  }

  if (node.type === "paragraph" && node.children && node.children[0].type === "link") {
    current.url = node.children[0].url;
    current.text = node.children[0].children[0].value;
    return current;
  }

  if (node.type === "listItem") {
    const pg = convertTree(node.children[0]);
    if (node.children.length > 1) {
      convertTree(node.children[1], pg);
    }
    return pg;
  }

  return {};
};
