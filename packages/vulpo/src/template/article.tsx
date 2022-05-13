import { graphql } from "gatsby";
import * as React from "react";

import Lecture from "../components/lexicon/Lecture";
import SEO from "../components/seo";

interface Props {
  data: {
    lexiconArticlePage: {
      slug: string;
      title: string;
      description?: string;
      color?: string;
      content: string;
      parent: {
        title: string;
        url: string;
        pages: {
          title: string;
          slug: string;
          url: string;
        }[];
      };
    };
  };
}

const Article = ({ data }: Props) => {
  const article = data.lexiconArticlePage;

  return (
    <>
      <SEO title={article.title} description={article.description} />
      <Lecture
        breadcrumbs={[...[], { title: article.parent.title, url: article.parent.url }]}
        authors={[]}
        color={article.color}
        pages={article.parent.pages}
        active={article.slug}
        content={article.content}
      />
    </>
  );
};

export const query = graphql`
  query ($id: String!) {
    lexiconArticlePage(id: { eq: $id }) {
      title
      slug
      content
      color
      parent {
        ... on LexiconLesson {
          title
          url
          pages {
            title
            slug
            url
          }
        }
      }
    }
  }
`;

export default Article;
