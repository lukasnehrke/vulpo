import { graphql } from "gatsby";
import * as React from "react";
import { Helmet } from "react-helmet";

import Lecture from "../components/lexicon/Lecture";
import MDX from "../components/lexicon/MDX";
import SEO from "../components/seo";

interface Props {
  data: {
    lexiconArticle: {
      slug: string;
      title: string;
      description?: string;
      edit?: string;
      color?: string;
      toc?: string;
      content?: string;
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
      lesson: {
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
  const article = data.lexiconArticle;
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
        breadcrumbs={[...(article.lesson.categories || []), { title: article.lesson.title, url: article.lesson.url }]}
        editUrl={article.edit}
        authors={article.authors}
        color={article.color}
        pages={article.lesson.pages}
        next={article.next}
        previous={article.previous}
        active={article.slug}
        content={<MDX body={article.content} />}
        toc={article.toc}
        createdAt={new Date(article.createdAt).toLocaleDateString("de-DE")}
        updatedAt={new Date(article.updatedAt).toLocaleDateString("de-DE")}
      />
    </>
  );
};

export const query = graphql`
  query ($id: String!) {
    lexiconArticle(id: { eq: $id }) {
      title
      slug
      edit
      color
      content
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
      lesson {
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
      authors {
        name
      }
    }
  }
`;

export default Article;
