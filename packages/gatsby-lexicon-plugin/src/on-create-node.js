import * as path from "path";

export const unstable_shouldOnCreateNode = ({ node }) => {
  return node.internal.owner === "gatsby-transformer-yaml";
};

export const onCreateNode = (args) => {
  const file = args.getNode(args.node.parent);
  if (path.basename(path.join(file.absolutePath, "..")) === "authors") {
    createAuthorNode(args, args.node, file);
    return;
  }
  if (file.name === "category") {
    createCategoryNode(args, args.node, file);
    return;
  }
  if (file.name === "lesson") {
    createLessonNode(args, args.node, file);
    return;
  }
  if (file.name === "article") {
    createArticleNode(args, args.node, file);
  }
};

const createAuthorNode = (args, yaml, file) => {
  const obj = {
    id: args.createNodeId(`LexiconAuthor ${file.name}`),
    slug: file.name,
    lexiconId: yaml.id,
    name: yaml.name,
    email: yaml.email,
    github: yaml.github,
  };
  const node = {
    ...obj,
    children: [],
    parent: yaml.id,
    internal: {
      type: "LexiconAuthor",
      contentDigest: args.createContentDigest(obj),
    },
  };
  args.actions.createNode(node);
  args.actions.createParentChildLink({ parent: args.node, child: node });
};

const createCategoryNode = (args, yaml, file) => {
  const absolutePath = path.join(file.absolutePath, "..");
  const obj = {
    absolutePath,
    parentDirectory: path.join(absolutePath, ".."),
    id: args.createNodeId(absolutePath),
    path: file.relativeDirectory,
    slug: path.basename(absolutePath),
    lexiconId: yaml.id,
    title: yaml.title,
    root: yaml.root || false,
  };
  const node = {
    ...obj,
    children: [],
    parent: yaml.id,
    internal: {
      type: "LexiconCategory",
      contentDigest: args.createContentDigest(obj),
    },
  };
  args.actions.createNode(node);
  args.actions.createParentChildLink({ parent: args.node, child: node });
};

const createLessonNode = (args, yaml, file) => {
  const absolutePath = path.join(file.absolutePath, "..");
  const obj = {
    absolutePath,
    parentDirectory: path.join(absolutePath, ".."),
    id: args.createNodeId(absolutePath),
    path: file.relativeDirectory,
    slug: path.basename(absolutePath),
    lexiconId: yaml.id,
    title: yaml.title,
  };
  const node = {
    ...obj,
    children: [],
    parent: yaml.id,
    internal: {
      type: "LexiconLesson",
      contentDigest: args.createContentDigest(obj),
    },
  };
  args.actions.createNode(node);
  args.actions.createParentChildLink({ parent: args.node, child: node });
};

const createArticleNode = (args, yaml, file) => {
  const absolutePath = path.join(file.absolutePath, "..");
  const obj = {
    absolutePath,
    parentDirectory: path.join(absolutePath, ".."),
    id: args.createNodeId(absolutePath),
    path: file.relativeDirectory,
    slug: path.basename(absolutePath),
    lexiconId: yaml.id,
    title: yaml.title,
    source: yaml.source || path.join(absolutePath, "README.md"),
  };
  const node = {
    ...obj,
    children: [],
    parent: yaml.id,
    internal: {
      type: "LexiconArticle",
      contentDigest: args.createContentDigest(obj),
    },
  };
  args.actions.createNode(node);
  args.actions.createParentChildLink({ parent: args.node, child: node });
};
