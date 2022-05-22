import { default as createArticleSchema } from "./extend-article.js";
import { default as createAuthorSchema } from "./extend-author.js";
import { default as createCategorySchema } from "./extend-categories.js";
import { default as createLessonSchema } from "./extend-lessons.js";
import { default as createPageSchema } from "./extend-pages.js";

export const createSchemaCustomization = (args, options) => {
  return Promise.all([
    createAuthorSchema(args, options),
    createCategorySchema(args, options),
    createLessonSchema(args, options),
    createPageSchema(args, options),
    createArticleSchema(args, options),
  ]);
};
