import { Author } from "./author";
import { Category } from "./category";
import { Lexicon } from "./lexicon";
import { Page } from "./page";

export interface LessonConfig {
  title: string;
  slug: string;
  description?: string;
  pages?: string[];
  authors?: string[];
}

interface LessonArgs {
  lexicon: Lexicon;
  parent: Category;
  path: string;
  absolutePath: string;
  config: LessonConfig;
}

export class Lesson {
  public readonly lexicon: Lexicon;
  public readonly parent: Category;
  public readonly path: string;
  public readonly absolutePath: string;
  public readonly config: LessonConfig;
  public pages: Page<any>[] = [];

  constructor(args: LessonArgs) {
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
    if (this.pages.length === 0) return undefined;
    return this.pages[0].config.description;
  }

  get url(): string {
    return `${this.parent.url}/${this.slug}`;
  }

  get color(): string | undefined {
    return this.parent.color;
  }

  get authors(): Author[] {
    return (this.config.authors || []).flatMap((author) => this.lexicon.authors.find((_) => _.slug === author) || []);
  }
}
