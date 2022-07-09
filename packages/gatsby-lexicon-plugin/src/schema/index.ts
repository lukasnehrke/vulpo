import type { CreateSchemaCustomizationArgs, GatsbyNode } from "gatsby";

import type { PluginOptions } from "../plugin-options";
import { createArticleSchema } from "./extend-article";
import { createAuthorSchema } from "./extend-authors";
import { createCategorySchema } from "./extend-categories";
import { createLessonSchema } from "./extend-lessons";
import { createPageSchema } from "./extend-pages";

export type CreateSchema = (args: CreateSchemaCustomizationArgs, options: PluginOptions) => Promise<void>;

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = (args, options) => {
  const opts = options as PluginOptions;
  return Promise.all([
    createAuthorSchema(args, opts),
    createCategorySchema(args, opts),
    createLessonSchema(args, opts),
    createPageSchema(args, opts),
    createArticleSchema(args, opts),
  ]).then();
};
