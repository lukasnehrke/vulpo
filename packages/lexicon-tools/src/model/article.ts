import { generateMdx, generateToc } from "../mdx";
import { Page, PageArgs, PageConfig } from "./page";

export interface ArticleConfig extends PageConfig {
  source: string;
}

export class Article extends Page<ArticleConfig> {
  constructor(args: PageArgs<ArticleConfig>) {
    super(args);
  }

  static async generateMdx(source: string) {
    return generateMdx({ source });
  }

  static async generateToc(source: string) {
    return generateToc({ source });
  }

  get source(): string {
    return this.config.source;
  }
}
