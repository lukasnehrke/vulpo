import path from "path";

const getConfig = async ({ cache, getNode }, node) => getNode(node.parent);

export const getParent = async ({ cache, getNode, createNodeId }, node) => {
  return getNode(createNodeId(path.join(node.absolutePath, "..")));
};

export const getCategories = async ({ cache, getNode, createNodeId }, node) => {
  const categories = [];
  let category = await getParent({ cache, getNode, createNodeId }, node);
  while (category) {
    categories.unshift(category);
    category = await getParent({ cache, getNode, createNodeId }, category);
  }
  return categories;
};

const getURL = async ({ cache, getNode, createNodeId }, node) => {
  const categories = await getCategories({ cache, getNode, createNodeId }, node);
  return (
    categories.reduce((url, category) => {
      return category.root ? `${url}/${category.slug}` : url;
    }, "") + `/${node.slug}`
  );
};

export const getColor = async ({ cache, getNode, createNodeId }, node) => {
  const config = await getConfig({ cache, getNode }, node);
  if (config.color) return config.color;
  const parent = await getParent({ cache, getNode, createNodeId }, node);
  if (!parent) return undefined;
  return getColor({ cache, getNode, createNodeId }, parent);
};

export default async (args, options) => {
  args.actions.createTypes([
    args.schema.buildObjectType({
      name: "LexiconCategory",
      fields: {
        id: { type: "ID!" },
        path: { type: "String!" },
        absolutePath: { type: "String!" },
        parentDirectory: { type: "String!" },
        root: { type: "Boolean!" },
        slug: { type: "String!" },
        title: { type: "String!" },
        description: { type: "String" },
        url: {
          type: "String!",
          async resolve(node) {
            return getURL(args, node);
          },
        },
        edit: {
          type: "String",
          async resolve(node) {
            if (!options.lexicon.edit) return undefined;
            return `${options.lexicon.edit}/${node.path}`;
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
        childCategories: {
          type: "[LexiconCategory!]!",
          resolve: async (node, _args, context) => {
            return (
              await context.nodeModel.findAll({
                query: { filter: { parentDirectory: { eq: node.absolutePath } } },
                type: "LexiconCategory",
              })
            ).entries;
          },
        },
        childLessons: {
          type: "[LexiconLesson!]!",
          resolve: async (node, _args, context) => {
            return (
              await context.nodeModel.findAll({
                query: { filter: { parentDirectory: { eq: node.absolutePath } } },
                type: "LexiconLesson",
              })
            ).entries;
          },
        },
        color: {
          type: "String",
          resolve: async (node) => {
            return getColor(args, node);
          },
        },
      },
      extensions: { infer: true },
      interfaces: ["Node"],
    }),
  ]);
};
