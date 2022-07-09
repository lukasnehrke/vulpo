import type { CreateSchemaCustomizationArgs } from "gatsby";
import * as path from "path";

import type { PluginOptions } from "../plugin-options";
import { getColor, getURL } from "./extend-categories";
import { getPages } from "./extend-lessons";
import type { CreateSchema } from "./index";

const pageFields = {
  id: { type: "ID!" },
  title: { type: "String!" },
  slug: { type: "String!" },
  url: { type: "String!" },
  next: { type: "LexiconPage" },
  previous: { type: "LexiconPage" },
  authors: { type: "[LexiconAuthor!]!" },
  description: { type: "String" },
  color: { type: "String" },
  edit: { type: "String" },
};

export const getParent = async (context: any, node?: any) => {
  return context.nodeModel.findOne({
    query: { filter: { absolutePath: { eq: path.join(node.absolutePath, "..") } } },
    type: "LexiconLesson",
  });
};

export const pageResolvers = (args: CreateSchemaCustomizationArgs, options: PluginOptions) => ({
  ...pageFields,
  edit: {
    type: "String",
    resolve: async (node: any) => (options.edit ? `${options.edit}/${node.path}` : undefined),
  },
  color: {
    type: "String",
    resolve: async (node: any, args: any, context: any) => getColor(context, await getParent(context, node)),
  },
  lesson: {
    type: "LexiconLesson!",
    resolve: async (node: any, args: any, context: any) => getParent(context, node),
  },
  authors: {
    type: "[LexiconAuthor!]!",
    resolve: async (node: any, args: any, context: any) => {
      // merge lesson authors and node authors
      return [];
    },
  },
  description: {
    type: "String",
    resolve: async (node: any, args: any, context: any) => {
      if (node.description) return node.description;
      return (await getParent(context, node)).description;
    },
  },
  next: {
    type: "LexiconPage",
    resolve: async (node: any, _args: any, context: any) => {
      const pages = await getPages(args, await getParent(context, node));
      const index = pages.findIndex((page: any) => page.id === node.id);
      return index === -1 || index === pages.length - 1 ? undefined : pages[index + 1];
    },
  },
  previous: {
    type: "LexiconPage",
    resolve: async (node: any, _args: any, context: any) => {
      const pages = await getPages(args, await getParent(context, node));
      const index = pages.findIndex((page: any) => page.id === node.id);
      return index === -1 || index === 0 ? undefined : pages[index - 1];
    },
  },
  url: {
    type: "String!",
    resolve: async (node: any, _args: any, context: any) => {
      const lesson = await getParent(context, node);
      const pages = await getPages(args, lesson);

      const index = pages.findIndex((page: any) => page.id === node.id);
      const url = await getURL(context, lesson);
      return index === 0 ? url : `${url}/${node.slug}`;
    },
  },
});

export const createPageSchema: CreateSchema = async (args) => {
  args.actions.createTypes([
    args.schema.buildInterfaceType({
      name: "LexiconPage",
      interfaces: ["Node"],
      fields: {
        ...pageFields,
      },
    }),
  ]);
};
