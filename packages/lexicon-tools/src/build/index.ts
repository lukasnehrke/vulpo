import * as chokidar from "chokidar";
import * as fs from "fs";
import * as path from "path";

import { Category, Lexicon } from "../model";
import { isDirectory } from "../utils";
import { buildAuthors } from "./authors";
import { buildLexicon } from "./lexicon";
import { BuildOptions } from "./types";

const defaultOptions: Partial<BuildOptions> = {
  hooks: {
    onAuthorUpdate: async () => {},
    onCategoryUpdate: async () => {},
    onLessonUpdate: async () => {},
    onArticleUpdate: async () => {},
  },
  reporter: {
    info: (args) => console.info(args),
    warn: (args) => console.warn(args),
  },
};

export const build = async (lexicon: Lexicon, options: BuildOptions): Promise<Category[]> => {
  const opts = { ...defaultOptions, ...options };

  if (!isDirectory(lexicon.directory)) {
    throw new Error("Lexicon directory is not accessible");
  }

  const authors = path.resolve(lexicon.directory, "authors");
  if (isDirectory(authors)) {
    lexicon.authors = await buildAuthors(authors, opts);
  }

  const source = path.resolve(lexicon.directory, "de");
  return [await buildLexicon(source, "/", lexicon, opts)];
};

export const watch = async (lexicon: Lexicon, options: BuildOptions): Promise<Category[]> => {
  const opts = { ...defaultOptions, ...options };
  const watcher = chokidar.watch([lexicon.directory], { ignoreInitial: true });
  const root = await build(lexicon, options);

  watcher.on("change", async (file) => {
    const dir = fs.lstatSync(file).isDirectory() ? file : path.join(file, "..");
    if (path.basename(dir) === "authors") {
      await buildAuthors(dir, opts);
    } else {
      await buildLexicon(path.resolve(lexicon.directory, "de"), dir, lexicon, opts);
    }
  });

  return root;
};
