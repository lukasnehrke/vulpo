import { compileMdx } from "../mdx";
import { Page, PageArgs, PageConfig } from "./page";

export interface ArticleConfig extends PageConfig {
  source: string;
}

export class Article extends Page<ArticleConfig> {
  constructor(args: PageArgs<ArticleConfig>) {
    super(args);
  }

  async generateMdx(): Promise<string> {
    return compileMdx({ source: this.config.source });
  }
}
