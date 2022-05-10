import { createLexicon } from "@lukasnehrke/lexicon-tools";

/**
 * @param args {import("gatsby").SourceNodesArgs}
 * @param options {any}
 */
export default (args, options) => {
  const lexicon = createLexicon(options.lexicon || {});
  return lexicon.watch({
    reporter: {
      info: args.reporter.info,
      warn: args.reporter.warn,
    },
    hooks: {
      onCategoryInit: async (category) => {
        category.__gatsbyId = args.createNodeId("LexiconCategory >>> " + category.path);
      },
      onLessonInit: async (lesson) => {
        lesson.__gatsbyId = args.createNodeId("LexiconLesson >>> " + lesson.path);
      },
      onAuthorCreate: async (author) => {
        const node = {
          id: args.createNodeId("LexiconAuthor >>> " + author.slug),
          slug: author.slug,
          name: author.name,
          github: author.github,
          internal: {
            type: "LexiconAuthor",
            contentDigest: args.createContentDigest(author),
          },
        };
        args.actions.createNode(node);
      },
      onCategoryCreate: async (category) => {
        const childCategories = category.childCategories.map((child) => child.__gatsbyId);
        const childLessons = category.childLessons.map((child) => child.__gatsbyId);
        const node = {
          id: category.__gatsbyId,
          path: category.path,
          absolutePath: category.absolutePath,
          root: category.config.root,
          title: category.config.title,
          slug: category.config.slug,
          url: category.url,
          color: category.color,
          childCategories___NODE: childCategories,
          childLessons___NODE: childLessons,
          children: [...childCategories, ...childLessons],
          internal: {
            type: "LexiconCategory",
            contentDigest: args.createContentDigest(category),
          },
        };
        if (category.parent) {
          node.parent = category.parent.__gatsbyId;
          node.parentCategory___NODE = category.parent.__gatsbyId;
          node.parentCategories___NODE = category.categories.map((c) => c.__gatsbyId);
        }
        args.actions.createNode(node);
      },
      onLessonCreate: async (lesson) => {
        lesson.__gatsbyId = args.createNodeId("LexiconLesson >>> " + lesson.path);
        const node = {
          id: lesson.__gatsbyId,
          path: lesson.path,
          absolutePath: lesson.absolutePath,
          title: lesson.title,
          slug: lesson.slug,
          url: lesson.url,
          description: lesson.description,
          color: lesson.color,
          parent: lesson.parent.__gatsbyId,
          parentCategory___NODE: lesson.parent.__gatsbyId,
          pages___NODE: lesson.pages.map((page) => page.__gatsbyId),
          authors___NODE: [],
          internal: {
            type: "LexiconLesson",
            contentDigest: args.createContentDigest(lesson),
          },
        };
        args.actions.createNode(node);
      },
      onArticleCreate: async (article) => {
        article.__gatsbyId = args.createNodeId("LexiconArticle >>> " + article.path);
        const node = {
          id: article.__gatsbyId,
          path: article.path,
          absolutePath: article.absolutePath,
          title: article.title,
          slug: article.slug,
          url: article.url,
          description: article.description,
          color: article.color,
          parent: article.parent.__gatsbyId,
          parentLesson___NODE: article.parent.__gatsbyId,
          authors___NODE: [],
          content: article.content,
          internal: {
            type: "LexiconArticlePage",
            contentDigest: args.createContentDigest(article),
          },
        };
        args.actions.createNode(node);
      },
    },
  });
};
