import { Article } from "@lukasnehrke/lexicon-tools";

/** @param args {import("gatsby").CreateSchemaCustomizationArgs} */
export default (args) => {
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
        source: { type: "String!" },
        content: {
          type: "String!",
          async resolve(node) {
            return Article.generateMdx(node.source);
          },
        },
        toc: {
          type: "String",
          args: {
            depth: {
              type: "Int",
              default: 3,
            },
          },
          async resolve(node, { depth }) {
            return Article.generateToc(node.source);
          },
        },
      },
      extensions: { infer: true },
      interfaces: ["Node"],
    }),
  ]);
};
