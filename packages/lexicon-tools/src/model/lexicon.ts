import { build, watch } from "../build";
import { Author } from "./author";
import { BuildOptions } from "../build/types";

export type LexiconOptions = {
  production: boolean;
  directory: string;
};

export class Lexicon {
  public readonly isProd: boolean;
  public readonly directory: string;
  public readonly options: LexiconOptions;
  public authors: Author[] = [];

  constructor(options: LexiconOptions) {
    this.isProd = options.production || process.env.NODE_ENV === "production";
    this.directory = options.directory;
    this.options = options;
  }

  async build(options: BuildOptions) {
    return build(this, options);
  }

  async watch(options: BuildOptions) {
    return watch(this, options);
  }
}
