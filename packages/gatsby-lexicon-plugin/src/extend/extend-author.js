export default async (args) => {
  args.actions.createTypes([
    args.schema.buildObjectType({
      name: "LexiconAuthor",
      extensions: { infer: true },
      interfaces: ["Node"],
      fields: {
        id: { type: "ID!" },
        slug: { type: "String!", description: "The slug of this author." },
        name: { type: "String!", description: "The full name of this person." },
        email: { type: "String", description: "The author's email address." },
        github: { type: "String", description: "The author's github username." },
      },
    }),
  ]);
};
