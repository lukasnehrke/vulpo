import { DocumentTextIcon } from "@heroicons/react/solid";
import { FolderIcon } from "@heroicons/react/solid";
import { graphql } from "gatsby";
import * as React from "react";

import GitHubIcon from "../components/icons/GithubIcon";
import Banner from "../components/lexicon/Banner";
import Link from "../components/link";
import SEO from "../components/seo";

const truncate = (text: string) => (text.length > 80 ? `${text.substring(0, 80)}...` : text);

interface Props {
  data: {
    lexiconCategory: {
      root: boolean;
      pageTitle: string;
      title: string;
      url: string;
      edit?: string;
      description?: string;
      color?: string;
      categories: {
        root: boolean;
        title: string;
        url: string;
      }[];
      childCategories: {
        title: string;
        url: string;
      }[];
      childLessons: {
        title: string;
        url: string;
      }[];
    };
    allLexiconLesson: {
      nodes: {
        title: string;
        description: string;
        url: string;
      }[];
    };
  };
}

const Category = ({ data }: Props) => {
  const category = data.lexiconCategory;

  const categories = category.childCategories.map((c) => (
    <li key={c.url}>
      <Link to={c.url} className="flex items-center px-4 py-2 h-full w-full hover:bg-sky-100 dark:hover:bg-slate-600">
        <div className="rounded-full bg-zinc-400 h-10 w-10 flex items-center justify-center mr-3">
          <FolderIcon className="h-6 w-6 text-white" />
        </div>
        <span className="text-slate-800 dark:text-slate-200 truncate">{c.title}</span>
      </Link>
    </li>
  ));

  const lessons = category.childLessons.map((c) => (
    <li key={c.url}>
      <Link to={c.url} className="flex items-center px-4 py-2 h-full w-full hover:bg-sky-100 dark:hover:bg-slate-600">
        <div className="rounded-full bg-zinc-400 h-10 w-10 flex items-center justify-center mr-3">
          <DocumentTextIcon className="h-6 w-6 text-white" />
        </div>
        <span className="text-slate-800 dark:text-slate-200 truncate">{c.title}</span>
      </Link>
    </li>
  ));

  const breadcrumbs = [...category.categories, { root: category.root, title: category.title, url: category.url }];

  return (
    <div style={category.color ? { ["--theme-color" as any]: category.color } : {}}>
      <SEO title={category.pageTitle} description={category.description} />
      <Banner breadcrumbs={breadcrumbs} />
      <div className="flex mx-auto md:max-w-screen-xl md:grid md:gap-4 md:grid-cols-12 md:mt-4 md:px-2">
        <div className="col-span-3 hidden md:block rounded shadow overflow-hidden dark:bg-slate-700 dark:text-white dark:highlight-white/5">
          <div className="bg-theme text-white px-4 py-2.5">
            <span className="text-sm font-medium">Vorschläge</span>
          </div>
          <ol>
            {data.allLexiconLesson.nodes.map((node) => (
              <li key={node.url} className="flex">
                <Link to={node.url} className="px-3 py-2 h-full w-full hover:bg-sky-100 dark:hover:bg-slate-600">
                  <p className="text-slate-800 dark:text-slate-300">{node.title}</p>
                  {node.description && (
                    <p className="text-sm text-slate-500 dark:text-white">{truncate(node.description)}</p>
                  )}
                </Link>
              </li>
            ))}
          </ol>
        </div>
        <div className="w-full col-span-9">
          <div className="md:rounded shadow overflow-hidden dark:bg-slate-700 dark:text-white dark:highlight-white/5">
            <div className="hidden md:flex items-center justify-between bg-theme text-white px-4 py-2.5">
              <span className="text-sm font-medium">{category.title}</span>
              {category.edit && (
                <Link to={category.edit} blank>
                  <GitHubIcon className="text-white w-6 w-6" />
                </Link>
              )}
            </div>
            <ol>
              {categories}
              {lessons}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export const query = graphql`
  query ($id: String!) {
    lexiconCategory(id: { eq: $id }) {
      root
      title
      url
      edit
      color
      categories {
        root
        title
        url
      }
      childCategories {
        title
        url
      }
      childLessons {
        title
        url
      }
    }
    allLexiconLesson(limit: 5) {
      nodes {
        title
        description
        url
      }
    }
  }
`;

export default Category;
