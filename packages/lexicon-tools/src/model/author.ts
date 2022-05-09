import { Lexicon } from "./lexicon";

export interface AuthorConfig {
  slug: string;
  name: string;
  github?: string;
}

export class Author {
  public readonly lexicon?: Lexicon;
  public readonly slug: string;
  public readonly name: string;
  public readonly github?: string;

  constructor(config: AuthorConfig, lexicon?: Lexicon) {
    this.lexicon = lexicon;
    this.slug = config.slug;
    this.name = config.name;
    this.github = config.github;
  }
}
