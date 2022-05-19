import { Lexicon, LexiconOptions } from "./model/lexicon";

export * from "./model";

export function createLexicon(options: LexiconOptions) {
  return new Lexicon(options);
}
