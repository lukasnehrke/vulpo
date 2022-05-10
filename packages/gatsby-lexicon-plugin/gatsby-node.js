export { default as createPages } from "./src/create-pages.js";
export { default as sourceNodes } from "./src/source-nodes.js";
export { default as createSchemaCustomization } from "./src/create-schema-customization.js";

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
