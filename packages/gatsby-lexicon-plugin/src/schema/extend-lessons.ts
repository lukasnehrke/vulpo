import * as path from "path";

import { getCategories, getColor, getParent, getURL } from "./extend-categories";
import type { CreateSchema } from "./index";

export const getAuthors = async (context: any, node?: any) => {
  return context.nodeModel.findAll({
    query: { filter: { slug: { in: node.authors || [] } } },
    type: "LexiconAuthor",
  }).entries;
};

export const getPages = async (args: any, node?: any) => {
  return node.pages.map((slug: string) => args.getNode(args.createNodeId(path.join(node.absolutePath, slug))));
};

export const createLessonSchema: CreateSchema = async (args) => {
  args.actions.createTypes([
    args.schema.buildObjectType({
      name: "LexiconLesson",
      extensions: { infer: true },
      interfaces: ["Node"],
      fields: {
        id: { type: "ID!" },
        path: { type: "String!" },
        absolutePath: { type: "String!" },
        parentDirectory: { type: "String!" },
        lang: { type: "String" },
        slug: { type: "String!" },
        title: { type: "String!" },
        category: {
          type: "LexiconCategory",
          resolve: async (node, args, context) => getParent(context, node),
        },
        categories: {
          type: "[LexiconCategory!]!",
          resolve: async (node, args, context) => getCategories(context, node),
        },
        color: {
          type: "String",
          resolve: async (node, args, context) => getColor(context, node),
        },
        url: {
          type: "String!",
          resolve: async (node, args, context) => getURL(context, node),
        },
        authors: {
          type: "[LexiconAuthor!]!",
          resolve: async (node, args, context) => getAuthors(context, node),
        },
        pages: {
          type: "[LexiconPage!]!",
          resolve: async (node) => getPages(args, node),
        },
        description: {
          type: "String",
          resolve: async (node) => {
            if (node.description) return node.description;
            const pages = await getPages(args, node);
            return pages.length > 0 ? pages[0].description : undefined;
          },
        },
      },
    }),
  ]);
};
