import type { GatsbySSR } from "gatsby";
import * as React from "react";

import Layout from "./src/components/Layout";

export const wrapPageElement: GatsbySSR["wrapPageElement"] = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};
