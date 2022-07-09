import type { Plugin } from "unified";

export const remarkAdmonitions: Plugin = () => {
  return async (tree) => {
    const { visit } = await import(`unist-util-visit`);

    visit(tree, (node: any) => {
      if (node.type === "containerDirective") {
        const data = node.data || (node.data = {});
        if (node.name === "info") {
          data.hName = "Note";
          data.hProperties = { type: "info" };
        }
        if (node.name === "warning") {
          data.hName = "Note";
          data.hProperties = { type: "warning" };
        }
      }
    });
  };
};
