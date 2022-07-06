import type { GatsbyNode } from "gatsby";

export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({ stage, actions }) => {
  if (stage === "build-javascript") {
    actions.setWebpackConfig({
      devtool: false,
    });
  }
};

export const createPages: GatsbyNode["createPages"] = ({ actions }) => {
  actions.createRedirect({
    fromPath: "/docs/*",
    toPath: "https://vulpo-docs-3e0ff.firebaseapp.com/docs/*",
    statusCode: 200,
  });
};
