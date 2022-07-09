import { compileMdx } from "../mdx/compile";
import { getCreatedAt, getLastModified } from "../util/git";
import { pageResolvers } from "./extend-pages";
import type { CreateSchema } from "./index";

export const createArticleSchema: CreateSchema = async (args, options) => {
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
          resolve: async (node) => getCreatedAt(node.source),
        },
        updatedAt: {
          type: "Date",
          resolve: async (node) => getLastModified(node.source),
        },
        content: {
          type: "String!",
          async resolve(node) {
            const { mdx } = await compileMdx({ path: node.source });
            return mdx;
          },
        },
        toc: {
          type: "JSON",
          args: {
            depth: {
              type: "Int",
              default: 3,
            },
          },
          async resolve(node) {
            const { toc } = await compileMdx({ path: node.source });
            return toc;
          },
        },
      },
    }),
  ]);
};
