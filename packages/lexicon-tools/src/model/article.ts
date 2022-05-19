import { generateMdx, generateToc } from "../mdx";
import { getCreatedAt, getLastModified } from "../utils";
import { Page, PageArgs, PageConfig } from "./page";

export interface ArticleConfig extends PageConfig {
  source: string;
  createdAt: string;
  updatedAt: string;
}

export class Article extends Page<ArticleConfig> {
  constructor(args: PageArgs<ArticleConfig>) {
    super(args);
  }

  get source(): string {
    return this.config.source;
  }

  async getCreatedAt(): Promise<Date | undefined> {
    if (this.config.createdAt) {
      return new Date(this.config.createdAt);
    }
    return getCreatedAt(this.source);
  }

  async getUpdatedAt(): Promise<Date | undefined> {
    if (this.config.updatedAt) {
      return new Date(this.config.updatedAt);
    }
    return getLastModified(this.source);
  }

  async build() {
    return generateMdx({ source: this.source });
  }

  async buildTOC({ depth }: { depth: number }) {
    return generateToc({ source: this.source }, depth);
  }
}
