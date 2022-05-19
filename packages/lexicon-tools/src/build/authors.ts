import { readFile, readdir } from "fs/promises";
import * as yaml from "js-yaml";
import * as path from "path";

import { Author } from "../model";
import { isDirectory } from "../utils";
import { BuildOptions } from "./types";

/**
 * Transforms all author files in a directory to an {@link Author} object.
 *
 * @param source Source directory.
 * @param options Build options.
 */
export const buildAuthors = async (source: string, options: BuildOptions): Promise<Author[]> => {
  if (!isDirectory(source)) {
    throw new Error("Author directory is not accessible");
  }
  const authors = [];
  const contents = await readdir(source, { withFileTypes: true });
  for (const file of contents) {
    if (file.isFile()) {
      authors.push(...(await buildAuthor(path.resolve(source, file.name), options)));
    }
  }
  return authors;
};

/**
 * Transforms an author file to an {@link Author}.
 *
 * @param file Path to the author file.
 * @param options Build options.
 */
export const buildAuthor = async (file: string, options: BuildOptions): Promise<Author[]> => {
  const content = await readFile(file, "utf8");
  const slug = path.basename(file, path.extname(file));
  return Promise.all(
    (yaml.loadAll(content) as any[]).map(async (config) => {
      if (!config.slug) config.slug = slug;
      const author = new Author(config);
      // await options.hooks.onAuthorUpdate(author);
      return author;
    })
  );
};
