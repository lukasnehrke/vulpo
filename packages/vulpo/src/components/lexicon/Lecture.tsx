import { DocumentDuplicateIcon } from "@heroicons/react/outline";
import { DocumentTextIcon } from "@heroicons/react/outline";
import { PencilIcon } from "@heroicons/react/solid";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import * as React from "react";

import Footer from "../footer";
import Link from "../link";
import Banner from "./Banner";

interface Props {
  breadcrumbs: any[];
  color?: string;
  pages: {
    title: string;
    slug: string;
    url: string;
  }[];
  authors: {
    name: string;
  }[];
  editUrl?: string;
  active: string;
  toc: string;
  content: any;
  createdAt?: string;
  updatedAt?: string;
}

const Lecture = (props: Props) => {
  const style = props.color ? { ["--theme-color" as any]: props.color } : {};
  return (
    <div style={style}>
      {props.breadcrumbs && <Banner breadcrumbs={props.breadcrumbs} />}
      <div className="lecture">
        <aside className="lecture-nav">
          <div className="rounded shadow overflow-hidden mb-3 dark:bg-slate-700 dark:text-white dark:highlight-white/5">
            <div className={clsx("flex px-4 py-3 border-b border-slate-200 dark:border-slate-600")}>
              <DocumentDuplicateIcon className="w-5 h-5 mr-3" />
              <span className="text-sm font-medium text-slate-700 dark:text-white">In dieser Lektion</span>
            </div>
            <ol>
              {props.pages.map((page) => {
                const cl = clsx("hover:bg-sky-100 dark:hover:bg-slate-600 px-3 py-3 h-full w-full", {
                  "bg-sky-100 text-sky-600 dark:bg-slate-600 dark:text-white": props.active === page.slug,
                });
                return (
                  <li key={page.url} className="flex">
                    <Link to={page.url} className={cl}>
                      <div className="flex items-center justify-between">
                        <span>{page.title}</span>
                        <DocumentTextIcon className="w-5 h-5" />
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </div>
          {props.editUrl && (
            <a
              href={props.editUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="flex justify-center bg-theme hover:bg-blue-600 shadow text-white py-2 px-4 rounded w-full mb-2"
            >
              <PencilIcon className="w-5 h-5 mr-3" />
              <span className="uppercase font-medium text-sm">Seite bearbeiten</span>
            </a>
          )}
          <a
            href="https://github.com/ritsyx-nosfus/vulpo/issues"
            target="_blank"
            rel="noreferrer noopener"
            className="flex justify-center bg-gray-700 hover:bg-gray-800 text-white shadow py-2 px-4 rounded w-full"
          >
            <ExclamationCircleIcon className="w-5 h-5 mr-3" />
            <span className="uppercase font-medium text-sm">Fehler melden</span>
          </a>
        </aside>
        <article className="lecture-main">
          <div className="prose dark:prose-invert max-w-none mb-4 pb-4 border-b border-slate-200 overflow-hidden">
            {props.content}
          </div>
          <footer>
            <p className="text-slate-700 text-sm">
              {props.createdAt && (
                <span>
                  Veröffentlicht am {props.createdAt}.
                  {props.updatedAt && props.createdAt !== props.updatedAt && (
                    <span> Zuletzt aktualisiert am {props.updatedAt}.</span>
                  )}
                </span>
              )}
            </p>
            <p className="text-slate-700 text-sm">
              Sofern nicht anders angegeben, sind Bilder und Texte in diesem Artikel unter{" "}
              <Link className="text-sky-600" to="https://creativecommons.org/licenses/by-sa/4.0" blank>
                CC BY-SA 4.0
              </Link>{" "}
              lizenziert.
            </p>
            {props.authors && props.authors.length > 0 && (
              <ul className="pt-4">
                {props.authors.map((author) => (
                  <li key={author.name} className="flex items-center mb-1">
                    <div
                      className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white"
                      aria-hidden="true"
                    >
                      {author.name.split(" ")[0][0]}
                      {author.name.split(" ")[1][0]}
                    </div>
                    <div className="flex flex-col justify-content px-3">
                      <p className="text-xs leading-none text-slate-500 dark:text-slate-400">Autor:in</p>
                      <p className="text-lg font-medium leading-tight dark:text-white">{author.name}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </footer>
        </article>
        <aside className="lecture-side">
          <div className="sticky top-20 mx-auto border-l-[3px] border-theme text-slate-800">
            <div dangerouslySetInnerHTML={{ __html: props.toc }} />
          </div>
        </aside>
      </div>
      <Footer />
    </div>
  );
};

export default Lecture;
