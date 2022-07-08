import * as path from "path";

import type { CreateSchema } from "./index";

export const getParent = async (context: any, node?: any) => {
  return context.nodeModel.findOne({
    query: { filter: { absolutePath: { eq: path.join(node.absolutePath, "..") } } },
    type: "LexiconCategory",
  });
};

export const getCategories = async (context: any, node: any) => {
  const categories = [];
  let category = node;
  while ((category = await getParent(context, category))) categories.unshift(category);
  return categories;
};

const getURL = async (context: any, node: any) => {
  const categories = await getCategories(context, node);
  return categories.reduce((url, category) => (category.root ? `${url}/${category.slug}` : url), "") + `/${node.slug}`;
};

export const getColor = async (context: any, node: any): Promise<any> => {
  let current = node;
  while (current) {
    if (current.color) return current.color;
    current = await getParent(context, current);
  }
  return undefined;
};

export const createCategorySchema: CreateSchema = async (args, options) => {
  args.actions.createTypes([
    args.schema.buildObjectType({
      name: "LexiconCategory",
      extensions: { infer: true },
      interfaces: ["Node"],
      fields: {
        id: { type: "ID!" },
        path: { type: "String!" },
        absolutePath: { type: "String!" },
        parentDirectory: { type: "String!" },
        root: { type: "Boolean!" },
        slug: { type: "String!" },
        title: { type: "String!" },
        description: { type: "String" },
        edit: {
          type: "String",
          resolve: async (node) => (options.edit ? `${options.edit}/${node.path}` : undefined),
        },
        url: {
          type: "String!",
          resolve: async (node, args, context) => getURL(context, node),
        },
        color: {
          type: "String",
          resolve: async (node, args, context) => getColor(context, node),
        },
        category: {
          type: "LexiconCategory",
          resolve: async (node, args, context) => getParent(context, node),
        },
        categories: {
          type: "[LexiconCategory!]!",
          resolve: async (node, args, context) => getCategories(context, node),
        },
        childCategories: {
          type: "[LexiconCategory!]!",
          resolve: async (node, args, context) => {
            const query = await context.nodeModel.findAll({
              query: { filter: { parentDirectory: { eq: node.absolutePath } } },
              type: "LexiconCategory",
            });
            return query.entries;
          },
        },
        childLessons: {
          type: "[LexiconLesson!]!",
          resolve: async (node, args, context) => {
            const query = await context.nodeModel.findAll({
              query: { filter: { parentDirectory: { eq: node.absolutePath } } },
              type: "LexiconLesson",
            });
            return query.entries;
          },
        },
      },
    }),
  ]);
};
