import { Page, PageArgs, PageConfig } from "./page";

export interface ArticleConfig extends PageConfig {
  source: string;
}

export class Article extends Page<ArticleConfig> {
  constructor(args: PageArgs<ArticleConfig>) {
    super(args);
  }

  get content(): string {
    return "<p>Hello World!</p>";
  }
}
