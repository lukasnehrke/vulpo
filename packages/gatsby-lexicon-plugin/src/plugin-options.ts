import { GatsbyNode } from "gatsby";

export type Options = {
  edit?: string;
  template?: {
    category?: string;
    article?: string;
  };
};

// prettier-ignore
export const pluginOptionsSchema: GatsbyNode["pluginOptionsSchema"] = ({ Joi }) => {
  return Joi.object({
    edit: Joi.string().description("URL to the lexicon directory, e.g. https://github.com/lukasnehrke/vulpo/tree/main/lexicon"),
    template: Joi.object({
      category: Joi.string().description("Path to the category template component"),
      article: Joi.string().description("Path to the article template component"),
    }),
  });
};
