import { Article, Category, Lesson, createLexicon } from "@lukasnehrke/lexicon-tools";

export const articles = {};

/**
 * @param args {import("gatsby").SourceNodesArgs}
 * @param options {any}
 */
export default async (args, options) => {
  const lexicon = createLexicon(options.lexicon || {});

  const createAuthorNode = async (author) => {
    args.actions.createNode({
      id: author.__gatsbyId,
      slug: author.slug,
      name: author.name,
      github: author.github,
      internal: {
        type: "LexiconAuthor",
        contentDigest: args.createContentDigest(author),
      },
    });
  };

  const createCategoryNode = async (category) => {
    args.actions.createNode({
      id: category.__gatsbyId,
      path: category.path,
      absolutePath: category.absolutePath,
      title: category.title,
      slug: category.slug,
      url: category.url,
      edit: category.edit,
      color: category.color,
      root: category.config.root,
      categories___NODE: category.categories.map((c) => c.__gatsbyId),
      parent: category.parent?.__gatsbyId,
      children: category.children.map((child) => child.__gatsbyId),
      internal: {
        type: "LexiconCategory",
        contentDigest: args.createContentDigest(category),
      },
    });
  };

  const createLessonNode = async (lesson) => {
    args.actions.createNode({
      id: lesson.__gatsbyId,
      path: lesson.path,
      absolutePath: lesson.absolutePath,
      title: lesson.title,
      slug: lesson.slug,
      url: lesson.url,
      description: lesson.description,
      color: lesson.color,
      categories___NODE: lesson.categories.map((child) => child.__gatsbyId),
      authors___NODE: lesson.authors.map((author) => author.__gatsbyId),
      parent: lesson.parent.__gatsbyId,
      children: lesson.pages.map((page) => page.__gatsbyId),
      internal: {
        type: "LexiconLesson",
        contentDigest: args.createContentDigest(lesson),
      },
    });
  };

  const createArticleNode = async (article) => {
    args.actions.createNode({
      id: article.__gatsbyId,
      path: article.path,
      absolutePath: article.absolutePath,
      title: article.title,
      slug: article.slug,
      url: article.url,
      description: article.description,
      edit: article.edit,
      color: article.color,
      source: article.source,
      createdAt: await article.getCreatedAt(),
      updatedAt: await article.getUpdatedAt(),
      authors___NODE: article.authors.map((author) => author.__gatsbyId),
      parent: article.parent.__gatsbyId,
      children: [],
      internal: {
        type: "LexiconArticlePage",
        contentDigest: args.createContentDigest(article),
      },
    });
  };

  const createNodes = async (obj) => {
    if (obj instanceof Category) {
      obj.__gatsbyId = args.createNodeId("LexiconCategory >>> " + obj.path);
      for (const child of obj.children) {
        await createNodes(child);
      }
      return await createCategoryNode(obj);
    }
    if (obj instanceof Lesson) {
      obj.__gatsbyId = args.createNodeId("LexiconLesson >>> " + obj.path);
      for (const child of obj.pages) {
        await createNodes(child);
      }
      return await createLessonNode(obj);
    }
    if (obj instanceof Article) {
      obj.__gatsbyId = args.createNodeId("LexiconArticle >>> " + obj.path);
      articles[obj.__gatsbyId] = obj;
      return await createArticleNode(obj);
    }
  };

  const root = await lexicon.watch({
    reporter: {
      info: args.reporter.info,
      warn: args.reporter.warn,
    },
  });

  for (const author of lexicon.authors) {
    author.__gatsbyId = args.createNodeId("LexiconAuthor >>> " + author.slug);
    await createAuthorNode(author);
  }

  for (const category of root) {
    await createNodes(category);
  }
};
