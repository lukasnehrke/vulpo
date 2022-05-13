import { Lesson } from "./lesson";
import { Lexicon } from "./lexicon";

export interface CategoryConfig {
  parent?: Category;
  path: string;
  absolutePath: string;
  root: boolean;
  title: string;
  slug: string;
  color?: string;
}

interface CategoryArgs {
  lexicon: Lexicon;
  parent?: Category;
  path: string;
  absolutePath: string;
  config: CategoryConfig;
}

export class Category {
  public readonly lexicon: Lexicon;
  public readonly parent?: Category;
  public readonly path: string;
  public readonly absolutePath: string;
  public readonly config: CategoryConfig;
  public childCategories: Category[] = [];
  public childLessons: Lesson[] = [];

  constructor(args: CategoryArgs) {
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

  get categories(): Category[] {
    const categories = [];
    let category = this.parent;
    while (category) {
      categories.unshift(category);
      category = category.parent;
    }
    return categories;
  }

  get root(): Category | null {
    const categories = this.categories.filter((category) => !category.config.root);
    if (categories.length === 0) return null;
    return categories[0];
  }

  get url(): string {
    if (this.config.root) return "/de";
    if (!this.root) {
      return `/de/${this.slug}`;
    }
    return `/de/${this.root.slug}/${this.slug}`;
  }

  get color(): string | undefined {
    if (this.config.color) return this.config.color;
    if (!this.parent) return undefined;
    return this.parent.color;
  }
}
