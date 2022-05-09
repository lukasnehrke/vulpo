import { Lexicon, LexiconOptions } from "./model/lexicon";

export function createLexicon(options: LexiconOptions) {
  return new Lexicon(options);
}
