import fs from "fs";
import { readdir } from "fs/promises";
import yaml from "js-yaml";
import path from "path";

import { Article } from "../model/article";
import { Category } from "../model/category";
import { Lesson } from "../model/lesson";
import { Lexicon } from "../model/lexicon";
import { isChildOrParent, isFile } from "../utils";
import { BuildOptions } from "./types";

export const buildLexicon = async (source: string, change: string, lexicon: Lexicon, options: BuildOptions) => {
  const categories: Category[] = [];
  let currentLesson: Lesson | null = null;

  const traverse = async (dir: string) => {
    const slug = dir.split(path.sep).pop();

    if (fs.existsSync(path.join(dir, "category.yaml"))) {
      const config = readConfig(dir, "category", { root: false, slug, title: slug });
      const category = new Category({
        lexicon,
        config,
        absolutePath: dir,
        path: path.relative(source, dir),
        parent: categories.length > 0 ? categories[categories.length - 1] : undefined,
      });

      await options.hooks.onCategoryInit(category);

      categories.push(category);

      const children = await next(dir);
      category.childCategories = children.filter((child) => child instanceof Category);
      category.childLessons = children.filter((child) => child instanceof Lesson);

      categories.pop();
      await options.hooks.onCategoryCreate(category);
      return category;
    }

    if (fs.existsSync(path.join(dir, "lesson.yaml"))) {
      if (categories.length === 0) {
        options.reporter.warn("Lecture must be inside category: " + dir);
        return;
      }

      const config = readConfig(dir, "lesson", { slug, title: slug });
      const lesson = new Lesson({
        lexicon,
        config,
        absolutePath: dir,
        path: path.relative(source, dir),
        parent: categories[categories.length - 1],
      });

      await options.hooks.onLessonInit(lesson);

      currentLesson = lesson;
      lesson.pages = await next(dir);
      await options.hooks.onLessonCreate(lesson);

      currentLesson = null;
      return lesson;
    }

    if (fs.existsSync(path.join(dir, "article.yaml"))) {
      if (!currentLesson) {
        options.reporter.warn("Article must be inside lecture: " + dir);
        return;
      }

      const config = readConfig(dir, "article", { slug, title: slug, source: path.join(dir, "README.md") });
      if (!isFile(config.source)) {
        options.reporter.warn("Article has no source file: " + dir);
        return;
      }

      const article = new Article({
        lexicon,
        config,
        absolutePath: dir,
        path: path.relative(source, dir),
        parent: currentLesson,
      });

      await options.hooks.onArticleCreate(article);
      return article;
    }

    await next(dir);
    return null;
  };

  const next = async (parent: string): Promise<any[]> => {
    const children: any[] = [];
    for (const file of await readdir(parent, { withFileTypes: true })) {
      if (!file.isDirectory() || file.name.startsWith("_")) {
        continue;
      }
      if (!isChildOrParent(change, path.relative(parent, file.name))) {
        continue;
      }
      const child = await traverse(path.resolve(parent, file.name));
      if (child) children.push(child);
    }
    return children;
  };

  const readConfig = (dir: string, name: string, defaults: any) => {
    const config = yaml.load(fs.readFileSync(path.join(dir, name + ".yaml"), "utf8")) as any;
    return {
      ...defaults,
      ...config,
      path: path.relative(source, dir),
      absolutePath: dir,
    };
  };

  await traverse(source);
};
