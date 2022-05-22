const query = `query {
  allLexiconCategory {
    edges {
      node {
        id
        url
      }
    }
  }
  allLexiconArticle {
    edges {
      node {
        id
        url
      }
    }
  }
}`;

/**
 * Creates pages for each category and article.
 *
 * @param args {import("gatsby").CreatePagesArgs}
 * @param options
 *
 * @see https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#createPages
 */
export const createPages = async (args, options) => {
  if (!options.template) return;

  const { data } = await args.graphql(query);
  if (!data) return;

  if (options.template.category) {
    data.allLexiconCategory.edges.forEach(({ node }) => {
      args.actions.createPage({
        path: node.url,
        component: options.template.category,
        context: { id: node.id },
      });
    });
  }

  if (options.template.article) {
    data.allLexiconArticle.edges.forEach(({ node }) => {
      args.actions.createPage({
        path: node.url,
        component: options.template.article,
        context: { id: node.id },
      });
    });
  }
};
