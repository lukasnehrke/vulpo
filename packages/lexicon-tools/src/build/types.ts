import { Article, Author, Category, Lesson } from "../model";

export type BuildOptions = {
  /** Log Hooks */
  reporter: Reporter;

  /** Build hooks. */
  hooks: Hooks;
};

export type Reporter = {
  /**
   * Prints info messages.
   * @param message The message.
   */
  info: (message: string) => void;

  /**
   * Prints warning messages.
   * @param message The message.
   */
  warn: (message: string) => void;
};

export type Hooks = {
  /**
   * Called when an author has been updated.
   * @param author The updated author object.
   */
  onAuthorUpdate: (author: Author) => Promise<void>;

  /**
   * Called when a category has been updated.
   * @param author The updated category object.
   */
  onCategoryUpdate: (category: Category) => Promise<void>;

  /**
   * Called when a lesson has been updated.
   * @param author The updated lesson object.
   */
  onLessonUpdate: (lesson: Lesson) => Promise<void>;

  /**
   * Called when an article has been updated.
   * @param author The updated article object.
   */
  onArticleUpdate: (article: Article) => Promise<void>;
};
