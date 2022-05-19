import { nodes } from "./source-nodes.js";

/** @param args {import("gatsby").CreateSchemaCustomizationArgs} */
export default (args) => {
  const pageResolvers = {
    id: { type: "ID!" },
    path: { type: "String!" },
    absolutePath: { type: "String!" },
    lexiconId: { type: "String" },
    title: { type: "String!" },
    slug: { type: "String!" },
    url: { type: "String!" },
    description: { type: "String" },
    edit: { type: "String" },
    color: { type: "String" },
    previous: {
      type: "LexiconArticlePage",
      async resolve(node, args, context) {
        const id = nodes[node.id].previous?.__gatsbyId;
        if (id) return context.nodeModel.getNodeById({ id });
        return null;
      },
    },
    next: {
      type: "LexiconArticlePage",
      async resolve(node, args, context) {
        const id = nodes[node.id].next?.__gatsbyId;
        if (id) return context.nodeModel.getNodeById({ id });
        return null;
      },
    },
  };

  args.actions.createTypes([
    args.schema.buildObjectType({
      name: "LexiconAuthor",
      fields: {
        id: { type: "ID!" },
        slug: { type: "String!" },
        name: { type: "String!", description: "The full name of this person." },
        email: { type: "String", description: "The author's email address." },
        github: { type: "String", description: "The author's github username." },
      },
      extensions: { infer: true },
      interfaces: ["Node"],
    }),
    args.schema.buildObjectType({
      name: "LexiconCategory",
      fields: {
        id: { type: "ID!" },
        path: { type: "String!" },
        absolutePath: { type: "String!" },
        root: { type: "Boolean!" },
        title: { type: "String!" },
        slug: { type: "String!" },
        url: { type: "String!" },
        edit: { type: "String" },
        color: { type: "String" },
      },
      extensions: { infer: true },
      interfaces: ["Node"],
    }),
    args.schema.buildObjectType({
      name: "LexiconLesson",
      fields: {
        id: { type: "ID!" },
        path: { type: "String!" },
        absolutePath: { type: "String!" },
        title: { type: "String!" },
        slug: { type: "String!" },
        url: { type: "String!" },
        description: { type: "String" },
        color: { type: "String" },
      },
      extensions: { infer: true },
      interfaces: ["Node"],
    }),
    args.schema.buildObjectType({
      name: "LexiconArticlePage",
      fields: {
        ...pageResolvers,
        source: { type: "String!" },
        createdAt: {
          type: "Date",
          async resolve(node) {
            return nodes[node.id].getCreatedAt();
          },
        },
        updatedAt: {
          type: "Date",
          async resolve(node) {
            return nodes[node.id].getUpdatedAt();
          },
        },
        content: {
          type: "String!",
          async resolve(node) {
            return nodes[node.id].build();
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
            return nodes[node.id].buildTOC({ depth });
          },
        },
      },
      extensions: { infer: true },
      interfaces: ["Node"],
    }),
  ]);
};
