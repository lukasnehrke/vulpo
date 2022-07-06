import { Link } from "gatsby";
import * as React from "react";
import runtime from "react/jsx-runtime.js";

import ExternalLink from "./ExternalLink";
import Note from "./Note";

const components = {
  Note,
  Link,
  ExternalLink,
};

const Renderer = ({ body, ...props }: any) => {
  const Mdx = React.useMemo(() => {
    if (!body) return null;
    return new Function(`${body}`)(runtime).default;
  }, [body]);
  return React.createElement(Mdx, { ...props });
};

const MDX = ({ body }: any) => <Renderer body={body} components={components} />;

export default MDX;
