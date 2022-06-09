import { Dialog, Transition } from "@headlessui/react";
import { DocumentTextIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import { Link } from "gatsby";
import * as React from "react";
import { Fragment } from "react";

import { useLayout } from "../../Layout";

const PageDrawer = ({ page }: { page: Queries.LexiconPage }) => {
  const { isDrawerOpen, setDrawerOpen } = useLayout();
  return (
    <Transition.Root show={isDrawerOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => setDrawerOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 flex z-40">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative max-w-xs w-full bg-white dark:text-white dark:bg-slate-800 shadow-xl flex flex-col overflow-y-auto rounded-r-lg">
              <div className="pt-5 pb-2">
                <p className="px-4 font-medium text-sm text-slate-700 dark:text-white pb-2">In dieser Lektion</p>
                <ol>
                  {page.lesson.pages.map((item) => {
                    const cl = clsx("px-4 py-3 hover:bg-sky-100 dark:hover:bg-slate-600 h-full w-full text-sm", {
                      "bg-sky-100 text-sky-600 dark:bg-slate-600 dark:text-white": page.slug === item.slug,
                    });
                    return (
                      <li key={item.url} className="flex">
                        <Link to={item.url} className={cl}>
                          <div className="flex items-center justify-between">
                            <span>{item.title}</span>
                            <DocumentTextIcon className="w-5 h-5" />
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default PageDrawer;
