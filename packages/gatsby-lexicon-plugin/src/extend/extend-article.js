import { buildToc, compileMdx } from "../mdx/index.js";
import { getCreatedAt, getLastModified } from "../util.js";
import { pageResolvers } from "./extend-pages.js";

export default async (args, options) => {
  args.actions.createTypes([
    args.schema.buildObjectType({
      name: "LexiconArticle",
      extensions: { infer: true },
      interfaces: ["LexiconPage", "Node"],
      fields: {
        ...pageResolvers(args, options),
        source: { type: "String!" },
        createdAt: {
          type: "Date",
          async resolve(node) {
            return getCreatedAt(node.source);
          },
        },
        updatedAt: {
          type: "Date",
          async resolve(node) {
            return getLastModified(node.source);
          },
        },
        content: {
          type: "String!",
          async resolve(node) {
            return compileMdx(node.source);
          },
        },
        toc: {
          type: "String",
          args: {
            depth: {
              type: "Int",
              default: 2,
            },
          },
          async resolve(node, { depth }) {
            return buildToc(node.source, depth);
          },
        },
      },
    }),
  ]);
};
