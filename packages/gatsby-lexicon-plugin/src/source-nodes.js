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
        author.__gatsbyId = args.createNodeId("LexiconAuthor >>> " + author.slug);
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
      },
      onCategoryCreate: async (category) => {
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
          parent: category.parent?.__gatsbyId,
          categories___NODE: category.categories.map((c) => c.__gatsbyId),
          children: [
            ...category.childCategories.map((child) => child.__gatsbyId),
            ...category.childLessons.map((child) => child.__gatsbyId),
          ],
          internal: {
            type: "LexiconCategory",
            contentDigest: args.createContentDigest(category),
          },
        });
      },
      onLessonCreate: async (lesson) => {
        lesson.__gatsbyId = args.createNodeId("LexiconLesson >>> " + lesson.path);
        args.actions.createNode({
          id: lesson.__gatsbyId,
          path: lesson.path,
          absolutePath: lesson.absolutePath,
          title: lesson.title,
          slug: lesson.slug,
          url: lesson.url,
          description: lesson.description,
          color: lesson.color,
          parent: lesson.parent.__gatsbyId,
          categories___NODE: lesson.categories.map((child) => child.__gatsbyId),
          pages___NODE: lesson.pages.map((page) => page.__gatsbyId),
          authors___NODE: lesson.authors.map((author) => author.__gatsbyId),
          internal: {
            type: "LexiconLesson",
            contentDigest: args.createContentDigest(lesson),
          },
        });
      },
      onArticleCreate: async (article) => {
        article.__gatsbyId = args.createNodeId("LexiconArticle >>> " + article.path);
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
          parent: article.parent.__gatsbyId,
          authors___NODE: article.authors.map((author) => author.__gatsbyId),
          internal: {
            type: "LexiconArticlePage",
            contentDigest: args.createContentDigest(article),
          },
        });
      },
    },
  });
};
