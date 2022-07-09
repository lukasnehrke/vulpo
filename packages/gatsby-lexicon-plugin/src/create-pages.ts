import type { GatsbyNode } from "gatsby";

import type { PluginOptions } from "./plugin-options";

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
 * @param args
 * @param options
 *
 * @see https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#createPages
 */
export const createPages: GatsbyNode["createPages"] = async (args, options) => {
  const opts = options as PluginOptions;
  if (!opts.template) return;

  const { data } = (await args.graphql(query)) as any;
  if (!data) return;

  if (opts.template.category) {
    data.allLexiconCategory.edges.forEach(({ node }: any) => {
      args.actions.createPage({
        path: node.url,
        component: opts.template!.category!,
        context: { id: node.id },
      });
    });
  }

  if (opts.template.article) {
    data.allLexiconArticle.edges.forEach(({ node }: any) => {
      args.actions.createPage({
        path: node.url,
        component: opts.template!.article!,
        context: { id: node.id, isPage: true },
      });
    });
  }
};
