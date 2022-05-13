import { Dialog, Transition } from "@headlessui/react";
import { DocumentTextIcon, FolderIcon, SearchIcon } from "@heroicons/react/solid";
import algolia, { SearchClient } from "algoliasearch/lite";
import { StaticImage } from "gatsby-plugin-image";
import * as React from "react";
import { InstantSearch, connectHits, connectSearchBox } from "react-instantsearch-dom";

import Link from "./link";

interface Hit {
  type: string;
  url: string;
  title: string;
}

const HitComponent = ({ hit, icon, closeDialog }: { hit: Hit; icon: React.ReactNode; closeDialog: () => void }) => {
  return (
    <li>
      <Link
        onClick={closeDialog}
        to={hit.url}
        className="flex items-center hover:bg-sky-100 px-3 py-2 h-full w-full dark:text-white dark:hover:bg-slate-600"
      >
        <div className="flex items-center justify-center w-10 h-10 rounded bg-blue-600 mr-3">{icon}</div>
        <span className="truncate">{hit.title}</span>
      </Link>
    </li>
  );
};

const CustomSearchBox = ({ currentRefinement, refine }: any) => (
  <input
    onChange={(event: React.ChangeEvent<HTMLInputElement>) => refine(event.target.value)}
    className="outline-none w-full dark:text-white dark:bg-slate-700"
    type="search"
    placeholder="Suchen.."
    value={currentRefinement}
    spellCheck={false}
    autoCapitalize="off"
    autoCorrect="off"
    autoComplete="off"
  />
);

const CustomHits = (closeDialog: () => void) => {
  return ({ hits }: { hits: Hit[] }) => {
    const lectures = hits.filter((hit) => hit.type === "lecture");
    const categories = hits.filter((hit) => hit.type === "category");
    return (
      <div className="p-3">
        {lectures.length > 0 && (
          <section>
            <p className="text-sm font-medium text-slate-600 dark:text-white py-2">Lektionen</p>
            <ol>
              {lectures.map((hit) => (
                <HitComponent
                  key={hit.url}
                  hit={hit}
                  closeDialog={closeDialog}
                  icon={<DocumentTextIcon className="h-6 w-6 text-white" />}
                />
              ))}
            </ol>
          </section>
        )}
        {categories.length > 0 && (
          <section>
            <p className="text-sm font-medium text-slate-600 dark:text-white py-2">Themengebiete</p>
            <ol>
              {categories.map((hit) => (
                <HitComponent
                  key={hit.url}
                  hit={hit}
                  closeDialog={closeDialog}
                  icon={<FolderIcon className="h-6 w-6 text-white" />}
                />
              ))}
            </ol>
          </section>
        )}
      </div>
    );
  };
};

const AlgoliaSearch = connectSearchBox(CustomSearchBox);

const Search = () => {
  const [open, setIsOpen] = React.useState(false);
  const [client, setClient] = React.useState<SearchClient>();
  const AlgoliaHits = connectHits(CustomHits(() => setIsOpen(false)));

  React.useEffect(() => {
    if (open && !client) {
      setClient(algolia("I9JMFRODB1", "1666db436093aaa3dadfef7a15f5c477"));
    }
  }, [open]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center px-4 w-72 h-9 text-slate-400 bg-slate-100 dark:bg-slate-700"
      >
        <SearchIcon className="mr-2 w-4 h-4" />
        <span>Suchen..</span>
      </button>
      <Transition appear show={open} as={React.Fragment}>
        <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={() => setIsOpen(false)}>
          <div className="min-h-screen px-4 text-center">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="z-500 inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-slate-700 shadow-xl rounded-2xl">
                {client && (
                  <InstantSearch indexName="lexicon" searchClient={client}>
                    <div className="flex items-center px-4 py-4 border-b">
                      <SearchIcon className="h-5 w-5 mr-3 text-slate-500" />
                      <AlgoliaSearch />
                    </div>
                    <AlgoliaHits />
                  </InstantSearch>
                )}
                <div className="flex items-center justify-end bg-slate-200 px-4 p-2">
                  <Link className="inline-flex" to="https://algolia.com" blank>
                    <StaticImage src="../images/algolia.webp" width={135} placeholder="none" alt="Search by Algolia" />
                  </Link>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Search;
