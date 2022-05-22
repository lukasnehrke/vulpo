import { visit } from "unist-util-visit";

export default function remarkDirectives() {
  return (tree) => {
    visit(tree, (node) => {
      if (["textDirective", "leafDirective", "containerDirective"].includes(node.type)) {
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
}
