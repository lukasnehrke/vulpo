import type { GatsbyConfig } from "gatsby";
import * as path from "path";

const config: GatsbyConfig = {
  siteMetadata: {
    title: "Vulpo",
    description: "Open-Source E-Learning Platform.",
    siteUrl: "https://vulpo.org",
  },
  plugins: [
    "gatsby-plugin-gatsby-cloud",
    "gatsby-plugin-postcss",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-image",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-plugin-sitemap",
    "gatsby-transformer-yaml",
    {
      resolve: "gatsby-plugin-react-helmet-canonical-urls",
      options: {
        siteUrl: "https://vulpo.org",
        noTrailingSlash: true,
        noHash: true,
        noQueryString: true,
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Vulpo",
        short_name: "Vulpo",
        description: "Open-Source E-Learning Platform.",
        start_url: "/",
        background_color: "#1976d2",
        theme_color: "#ffffff",
        display: "minimal-ui",
        orientation: "portrait-primary",
        icon: "src/images/logo.png",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: { name: "images", path: path.resolve("src/images") },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: { name: "lexicon", path: path.resolve("../../lexicon") },
    },
    {
      resolve: "gatsby-lexicon-plugin-wrapper",
      options: {
        lexicon: {
          directory: path.resolve("../../lexicon"),
          edit: "https://github.com/lukasnehrke/vulpo/tree/main/lexicon",
        },
        template: {
          category: path.resolve("./src/template/category.tsx"),
          article: path.resolve("./src/template/article.tsx"),
        },
      },
    },
  ],
};

export default config;
