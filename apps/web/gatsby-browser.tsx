import type { GatsbyBrowser } from "gatsby";
import * as React from "react";

import Layout from "./src/components/Layout";
import "./src/styles/global.css";
import "./src/styles/lecture.css";

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};
