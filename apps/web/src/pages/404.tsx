import { BookOpenIcon } from "@heroicons/react/outline";
import { ChevronRightIcon } from "@heroicons/react/solid";
import * as React from "react";

import GithubIcon from "../components/icons/GithubIcon";
import Link from "../components/link";
import SEO from "../components/seo";

interface TileProps {
  title: string;
  description: string;
  icon: any;
}

const Tile = ({ title, description, icon }: TileProps) => (
  <div className="flex items-center p-2 py-3">
    <div className="flex items-center justify-center h-12 w-12 bg-blue-100 text-indigo-600 rounded-md">
      {React.createElement(icon, { className: "w-6 h-6" })}
    </div>
    <div className="flex flex-col ml-3 overflow-hidden">
      <p className="font-medium leading-tight dark:text-slate-200 text-slate-900 ">{title}</p>
      <p className="text-sm truncate text-slate-600 dark:text-slate-400">{description}</p>
    </div>
    <div className="flex-grow" />
    <ChevronRightIcon className="inline w-5 h-5 text-indigo-600 dark:text-indigo-200" />
  </div>
);

const NotFound = () => (
  <>
    <SEO title="Nicht gefunden (404)" />
    <div className="max-w-screen-sm mx-auto px-3">
      <div className="text-center md:pt-16 pt-8">
        <p className="font-medium text-lg text-indigo-600 dark:text-indigo-300">HTTP 404</p>
        <h1 className="font-bold text-4xl dark:text-white">Diese Seite existiert nicht.</h1>
        <p className="text-md text-slate-500 dark:text-slate-200">Die angefragte Seite konnte nicht gefunden werden.</p>
      </div>
      <div className="mt-8">
        <p className="uppercase text-sm font-medium pb-2 text-slate-600 dark:text-slate-200">Vorschläge</p>
        <ul className="mb-4 divide-y border-y">
          <li>
            <Link to="/docs">
              <Tile title="Dokumentation" description="Lerne wie das Projekt funktioniert." icon={BookOpenIcon} />
            </Link>
          </li>
          <li>
            <Link to="https://github.com/ritsyx-nosfus/vulpo">
              <Tile title="GitHub" description="Schau dir den Quellcode des Projekts an." icon={GithubIcon} />
            </Link>
          </li>
        </ul>
        <Link to="/" className="flex items-center font-medium text-indigo-600 dark:text-slate-200">
          Zurück zur Startseite <ChevronRightIcon className="inline w-5 h-5" />
        </Link>
      </div>
    </div>
  </>
);

export default NotFound;
