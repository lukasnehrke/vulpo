import { ChevronRightIcon } from "@heroicons/react/solid";
import { Link } from "gatsby";
import * as React from "react";

import GraduationCapIcon from "../../icons/GraduationCap";

interface Props {
  breadcrumbs: {
    root?: boolean;
    url: string;
    title: string;
  }[];
}

const Banner = ({ breadcrumbs }: Props) => (
  <nav className="flex bg-theme h-10 w-full overflow-x-auto" aria-label="Breadcrumb">
    <ol className="inline-flex items-center text-white px-4">
      {breadcrumbs.map((b, i) => (
        <li key={b.url} className="flex items-center">
          {i != 0 && <ChevronRightIcon className="w-5 h-5 mx-1" />}
          <Link to={b.url} className="font-medium text-white text-sm truncate">
            {i == 0 ? (
              <GraduationCapIcon className="w-5 h-5 text-white" aria-label="Lexikon" />
            ) : (
              <span>{b.title}</span>
            )}
          </Link>
        </li>
      ))}
    </ol>
  </nav>
);

export default Banner;
