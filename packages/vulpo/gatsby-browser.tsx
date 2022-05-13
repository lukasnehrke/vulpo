import type { GatsbyBrowser } from "gatsby";
import * as React from "react";

import Layout from "./src/components/layout";
import "./src/styles/global.css";

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};
