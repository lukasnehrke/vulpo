import { loadCSS } from "fg-loadcss";
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
      color?: string;
      content: string;
      parentLesson: {
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

// prettier-ignore
const loadKatex = () => loadCSS("https://cdn.jsdelivr.net/npm/katex@0.15.3/dist/katex.min.css", undefined, undefined, { "crossorigin": "anonymous", "integrity": "sha384-KiWOvVjnN8qwAZbuQyWDIbfCLFhLXNETzBQjA/92pIowpC0d2O3nppDGQVgwd2nB" });

const Article = ({ data }: Props) => {
  const article = data.lexiconArticlePage;
  const lesson = article.parentLesson;

  React.useEffect(() => {
    loadKatex();
  }, []);

  return (
    <>
      <SEO title={article.title} description={article.description} />
      <Lecture
        breadcrumbs={[...[], { title: lesson.title, url: lesson.url }]}
        authors={[]}
        color={article.color}
        pages={lesson.pages}
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
      parentLesson {
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
`;

export default Article;
