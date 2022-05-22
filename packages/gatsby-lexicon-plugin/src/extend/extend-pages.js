import { getColor, getParent } from "./extend-categories.js";
import { getAuthors, getPages, getURL } from "./extend-lessons.js";

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

export const pageResolvers = (args, options) => ({
  ...pageFields,
  lesson: {
    type: "LexiconLesson!",
    resolve: async (node) => {
      return getParent(args, node);
    },
  },
  next: {
    type: "LexiconPage",
    resolve: async (node) => {
      const parent = await getParent(args, node);
      const pages = await getPages(args, parent);
      const index = pages.findIndex((page) => page.id === node.id);
      if (index === -1 || index === pages.length - 1) return undefined;
      return pages[index + 1];
    },
  },
  previous: {
    type: "LexiconPage",
    resolve: async (node) => {
      const parent = await getParent(args, node);
      const pages = await getPages(args, parent);
      const index = pages.findIndex((page) => page.id === node.id);
      if (index === -1 || index === 0) return undefined;
      return pages[index - 1];
    },
  },
  url: {
    type: "String!",
    resolve: async (node) => {
      const parent = await getParent(args, node);
      const pages = await getPages(args, parent);
      const index = pages.findIndex((page) => page.id === node.id);
      const url = await getURL(args, parent);
      return index === 0 ? url : `${url}/${node.slug}`;
    },
  },
  authors: {
    type: "[LexiconAuthor!]!",
    resolve: async (node, _args) => {
      const parent = await getParent(args, node);
      const authors = await getAuthors(args, node);
      return [...(await getAuthors(args, parent)), ...authors];
    },
  },
  description: {
    type: "String",
    resolve: async (node) => {
      const yaml = args.getNode(node.parent);
      if (yaml.description) return yaml.description;
      const parent = await getParent(args, node);
      return args.getNode(parent.parent).description;
    },
  },
  color: {
    type: "String",
    resolve: async (node) => {
      return getColor(args, await getParent(args, node));
    },
  },
  edit: {
    type: "String",
    resolve: async (node) => {
      if (!options.lexicon.edit) return undefined;
      return `${options.lexicon.edit}/${node.path}`;
    },
  },
});

export default async (args) => {
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
