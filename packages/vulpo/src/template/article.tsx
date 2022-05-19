import { graphql } from "gatsby";
import * as React from "react";
import { Helmet } from "react-helmet";

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
      toc: string;
      content: string;
      createdAt: string;
      updatedAt: string;
      next?: {
        title: string;
        url: string;
      };
      previous?: {
        title: string;
        url: string;
      };
      parent: {
        title: string;
        url: string;
        categories: {
          title: string;
          url: string;
        }[];
        children: {
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
      <Helmet>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.15.3/dist/katex.min.css"
          integrity="sha384-KiWOvVjnN8qwAZbuQyWDIbfCLFhLXNETzBQjA/92pIowpC0d2O3nppDGQVgwd2nB"
          crossOrigin="anonymous"
        />
      </Helmet>
      <Lecture
        breadcrumbs={[...(article.parent.categories || []), { title: article.parent.title, url: article.parent.url }]}
        editUrl={article.edit}
        authors={article.authors}
        color={article.color}
        pages={article.parent.children}
        next={article.next}
        previous={article.previous}
        active={article.slug}
        toc={article.toc}
        content={<MDX body={article.content} />}
        createdAt={new Date(article.createdAt).toLocaleDateString("de-DE")}
        updatedAt={new Date(article.updatedAt).toLocaleDateString("de-DE")}
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
      toc
      createdAt
      updatedAt
      next {
        title
        url
      }
      previous {
        title
        url
      }
      parent {
        ... on LexiconLesson {
          title
          url
          categories {
            title
            url
          }
          children {
            ... on LexiconArticlePage {
              title
              slug
              url
            }
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
