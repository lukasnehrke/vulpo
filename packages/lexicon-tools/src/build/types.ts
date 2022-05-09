import { Author } from "../model/author";
import { Category } from "../model/category";
import { Lesson } from "../model/lesson";
import { Article } from "../model/article";

export type BuildOptions = {
  /** Log Hooks */
  reporter: Reporter;

  /** Build hooks. */
  hooks: PluginHooks<any, any, any, any>;
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

export type PluginHooks<HAuthor, HCategory, HLesson, HArticle> = {
  /**
   * Called when an author has been created.
   * @param author The created author object.
   */
  onAuthorCreate: (author: Author) => Promise<void>;

  /**
   * Called when a category has been initialized.
   * @param author The created category object.
   */
  onCategoryInit: (category: Category) => Promise<void>;

  /**
   * Called when a category has been created.
   * @param author The created category object.
   */
  onCategoryCreate: (category: Category) => Promise<void>;

  /**
   * Called when a lesson has been initialized.
   * @param author The created lesson object.
   */
  onLessonInit: (lesson: Lesson) => Promise<void>;

  /**
   * Called when a lesson has been created.
   * @param author The created lesson object.
   */
  onLessonCreate: (lesson: Lesson) => Promise<void>;

  /**
   * Called when an article has been created.
   * @param author The created article object.
   */
  onArticleCreate: (article: Article) => Promise<void>;
};
