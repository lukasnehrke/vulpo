import { MenuIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import { Link, graphql, useStaticQuery } from "gatsby";
import * as React from "react";

import logo from "../../images/logo.svg";
import { useLayout } from "../Layout";
import Search from "../search";
import Theme from "../theme";

const Navbar = () => {
  const data = useStaticQuery(graphql`
    query NavbarQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const { isIconVisible, setDrawerOpen } = useLayout();

  const onMenuClick = () => setDrawerOpen(true);

  return (
    <header className="flex relative sticky top-0 h-12 z-50 w-full shadow-md bg-white dark:text-white dark:bg-slate-800">
      <div className={clsx("absolute inset-y-0 left-0 sm:static flex items-center", !isIconVisible && "sm:hidden")}>
        <button
          onClick={onMenuClick}
          className="inline-flex items-center justify-center p-3 rounded-md text-gray-500 dark:text-white focus:outline-none"
        >
          <MenuIcon className="block h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div className="flex items-center justify-center sm:justify-start px-4 h-full w-full">
        <div className="flex grow justify-center sm:justify-start">
          <Link to="/" className="inline-flex items-center text-lg">
            <img src={logo} className="w-8 h-8" alt="Logo" aria-hidden="true" />
            <span className="hidden sm:block ml-2">{data.site.siteMetadata.title}</span>
          </Link>
        </div>
        <div className="hidden sm:flex items-center">
          <Theme.Icon />
          <Search />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
