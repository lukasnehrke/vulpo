import { Lesson } from "./lesson";
import { Lexicon } from "./lexicon";

export interface PageConfig {
  title: string;
  slug: string;
  description?: string;
}

export interface PageArgs<T extends PageConfig> {
  lexicon: Lexicon;
  parent: Lesson;
  path: string;
  absolutePath: string;
  config: T;
}

export abstract class Page<T extends PageConfig> {
  public readonly lexicon: Lexicon;
  public readonly parent: Lesson;
  public readonly path: string;
  public readonly absolutePath: string;
  public readonly config: T;

  protected constructor(args: PageArgs<T>) {
    this.lexicon = args.lexicon;
    this.parent = args.parent;
    this.path = args.path;
    this.absolutePath = args.absolutePath;
    this.config = args.config;
  }

  get title(): string {
    return this.config.title;
  }

  get slug(): string {
    return this.config.slug;
  }

  get description(): string | undefined {
    if (this.config.description) return this.config.description;
    return this.parent.config.description;
  }

  get url(): string {
    const pages = this.parent.config.pages;
    if (pages && pages.length > 0 && pages[0] === this.config.slug) {
      return this.parent.url;
    }
    return `${this.parent.url}/${this.config.slug}`;
  }

  get color(): string | undefined {
    return this.parent.color;
  }
}
