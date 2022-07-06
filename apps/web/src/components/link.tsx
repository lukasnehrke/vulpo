import { Link as GatsbyLink } from "gatsby";
import * as React from "react";

const Link = ({ children, to, activeClassName, partiallyActive, blank, ...other }: any) => {
  const internal = /^\/(?!\/)/.test(to);
  if (internal) {
    return (
      <GatsbyLink to={to} activeClassName={activeClassName} partiallyActive={partiallyActive} {...other}>
        {children}
      </GatsbyLink>
    );
  }
  if (blank) {
    other = { ...other, target: "_blank", rel: "noopener noreferrer" };
  }
  return (
    <a href={to} className="text-sky-600" {...other}>
      {children}
    </a>
  );
};
export default Link;
