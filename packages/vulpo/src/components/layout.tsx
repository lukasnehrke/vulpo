import { Link } from "gatsby";
import * as React from "react";

import logo from "../images/logo.svg";
import Search from "./search";
import Theme from "./theme";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => (
  <Theme>
    <header className="flex sticky top-0 h-12 z-50 w-full shadow-md bg-white dark:text-white dark:bg-slate-800">
      <div className="flex items-center px-4 h-full w-full">
        <Link to="/" className="flex items-center text-lg">
          <img className="w-8 h-8 mr-2" src={logo} alt="Logo" aria-hidden="true" />
          Vulpo
        </Link>
        <div className="grow" />
        <div className="hidden sm:flex items-center">
          <Theme.Icon />
          <Search />
        </div>
      </div>
    </header>
    <main className="dark:bg-slate-900">{children}</main>
  </Theme>
);

export default Layout;
