import { graphql } from "gatsby";
import * as React from "react";

import Lecture from "../components/lexicon/Lecture";
import MDX from "../components/lexicon/MDX";
import SEO from "../components/seo";

interface Props {
  data: {
    lexiconArticlePage: {
      slug: string;
      title: string;
      description?: string;
      edit?: string;
      color?: string;
      content: string;
      parent: {
        title: string;
        url: string;
        categories: {
          title: string;
          url: string;
        }[];
        pages: {
          title: string;
          slug: string;
          url: string;
        }[];
      };
      authors: {
        name: string;
      }[];
    };
  };
}

const Article = ({ data }: Props) => {
  const article = data.lexiconArticlePage;

  return (
    <>
      <SEO title={article.title} description={article.description} />
      <Lecture
        breadcrumbs={[...(article.parent.categories || []), { title: article.parent.title, url: article.parent.url }]}
        editUrl={article.edit}
        authors={article.authors}
        color={article.color}
        pages={article.parent.pages}
        active={article.slug}
        content={<MDX body={article.content} />}
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
      edit
      color
      parent {
        ... on LexiconLesson {
          title
          url
          categories {
            title
            url
          }
          pages {
            title
            slug
            url
          }
        }
      }
      authors {
        name
      }
    }
  }
`;

export default Article;
