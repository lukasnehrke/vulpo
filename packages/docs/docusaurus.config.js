const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
module.exports = {
  title: "Vulpo",
  tagline: "E-Learning based on Markdown.",
  url: "https://vulpo.org",
  baseUrl: "/docs/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "lukasnehrke",
  projectName: "vulpo",
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        blog: false,
        docs: {
          path: "docs",
          routeBasePath: "docs",
          sidebarPath: require.resolve("./sidebars.js"),
        },
        theme: {
          customCss: [require.resolve("./src/css/custom.css")],
        },
      },
    ],
  ],
  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "legal",
        path: "legal",
        routeBasePath: "legal",
        sidebarPath: require.resolve("./sidebars.js"),
      },
    ],
  ],
  themeConfig: {
    navbar: {
      title: "Vulpo",
      logo: {
        alt: "Vulpo Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "doc",
          docId: "intro",
          position: "left",
          label: "Tutorial",
        },
        {
          type: "doc",
          docId: "imprint",
          position: "left",
          label: "Rechtliches",
          docsPluginId: "legal",
        },
        {
          href: "https://github.com/lukasnehrke/vulpo",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
};
