import { Lexicon, LexiconOptions } from "./model/lexicon";

export { Article } from "./model/article";

export function createLexicon(options: LexiconOptions) {
  return new Lexicon(options);
}
