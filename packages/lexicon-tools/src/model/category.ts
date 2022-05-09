import { Lesson } from "./lesson";

export interface CategoryConfig {
  parent?: Category;
  path: string;
  absolutePath: string;
  root: boolean;
  title: string;
  slug: string;
  color?: string;
}

export class Category {
  public readonly parent?: Category;
  public readonly path: string;
  public readonly absolutePath: string;
  public readonly title: string;
  public readonly slug: string;

  public readonly config: CategoryConfig;
  public childCategories: Category[] = [];
  public childLessons: Lesson[] = [];

  constructor(config: CategoryConfig) {
    this.parent = config.parent;
    this.path = config.path;
    this.absolutePath = config.absolutePath;
    this.title = config.title;
    this.slug = config.slug;
    this.config = config;
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
