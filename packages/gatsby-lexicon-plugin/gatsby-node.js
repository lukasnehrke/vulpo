export { createPages } from "./src/create-pages.js";
export { createSchemaCustomization } from "./src/extend/index.js";
export { unstable_shouldOnCreateNode, onCreateNode } from "./src/on-create-node.js";

// prettier-ignore
export const pluginOptionsSchema = ({ Joi }) => {
  return Joi.object({
    source: Joi.string().description("Path to the lexicon directory"),
    edit: Joi.string().description("URL to the lexicon directory, e.g. https://github.com/ritsyx-nosfus/vulpo/tree/main"),
    template: Joi.object({
      category: Joi.string().description("Path to the category template component"),
      article: Joi.string().description("Path to the article template component"),
    }),
  });
};
