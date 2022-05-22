import path from "path";

import { getCategories, getColor, getParent } from "./extend-categories.js";

export const getURL = async ({ cache, getNode, createNodeId }, node) => {
  const categories = await getCategories({ cache, getNode, createNodeId }, node);
  return (
    categories.reduce((url, category) => {
      return category.root ? `${url}/${category.slug}` : url;
    }, "") + `/${node.slug}`
  );
};

export const getPages = async ({ cache, getNode, createNodeId }, node) => {
  const pages = [];
  const yaml = getNode(node.parent);
  for (const slug of yaml.pages) {
    const id = createNodeId(path.join(node.absolutePath, slug));
    const page = getNode(id);
    if (page) {
      pages.push(page);
    }
  }
  return pages;
};

export const getAuthors = async ({ cache, getNode, createNodeId }, node) => {
  const yaml = getNode(node.parent);
  const authors = [];
  for (const slug of yaml.authors || []) {
    const id = createNodeId(`LexiconAuthor ${slug}`);
    const node = getNode(id);
    if (node) authors.push(node);
  }
  return authors;
};

export default async (args, options) => {
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
        slug: { type: "String!" },
        title: { type: "String!" },
        description: {
          type: "String",
          resolve: async (node) => {
            const yaml = args.getNode(node.parent);
            if (yaml.description) return yaml.description;
            const pages = await getPages(args, node);
            if (pages.length === 0) return undefined;
            return args.getNode(pages[0].parent).description;
          },
        },
        category: {
          type: "LexiconCategory",
          resolve: async (node) => {
            return getParent(args, node);
          },
        },
        categories: {
          type: "[LexiconCategory!]!",
          resolve: async (node) => {
            return getCategories(args, node);
          },
        },
        pages: {
          type: "[LexiconPage!]!",
          resolve: async (node) => {
            return getPages(args, node);
          },
        },
        color: {
          type: "String",
          resolve: async (node) => {
            return getColor(args, await getParent(args, node));
          },
        },
        url: {
          type: "String!",
          resolve: async (node) => {
            return getURL(args, node);
          },
        },
        authors: {
          type: "[LexiconAuthor!]!",
          resolve: async (node) => {
            return getAuthors(args, node);
          },
        },
      },
    }),
  ]);
};
