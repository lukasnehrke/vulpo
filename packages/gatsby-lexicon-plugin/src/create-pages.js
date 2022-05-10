const query = `query {
  allLexiconCategory {
    edges {
      node {
        id
        url
      }
    }
  }
  allLexiconArticlePage {
    edges {
      node {
        id
        url
      }
    }
  }
}`;

/**
 * @param args {import("gatsby").CreatePagesArgs}
 * @param options
 */
export default async (args, options) => {
  if (options.template) {
    const { data } = await args.graphql(query);
    if (data) {
      if (options.template.category) {
        data.allLexiconCategory.edges.forEach(({ node }) => {
          args.actions.createPage({
            path: node.url.toLowerCase(),
            component: options.template.category,
            context: { id: node.id },
          });
        });
      }
      if (options.template.article) {
        data.allLexiconArticlePage.edges.forEach(({ node }) => {
          args.actions.createPage({
            path: node.url.toLowerCase(),
            component: options.template.article,
            context: { id: node.id },
          });
        });
      }
    }
  }
};
