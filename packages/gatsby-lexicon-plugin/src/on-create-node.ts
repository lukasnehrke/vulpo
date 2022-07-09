import type { CreateNodeArgs, GatsbyNode } from "gatsby";
import type { FileSystemNode } from "gatsby-source-filesystem";
import * as path from "path";

type shouldCreateNode = GatsbyNode["unstable_shouldOnCreateNode"];
type JsonData = Record<string, any>;

export const unstable_shouldOnCreateNode: shouldCreateNode = ({ node }: { node: FileSystemNode }) => {
  return node.internal.type === "File" && node.internal.mediaType === "application/json";
};

export const onCreateNode: GatsbyNode<FileSystemNode>["onCreateNode"] = async (args) => {
  if (args.node.name === "authors") {
    return createAuthors(args);
  }
  if (args.node.name === "lesson") {
    return create("LexiconLesson", args);
  }
  if (args.node.name === "article") {
    const defaults = { source: path.join(args.node.absolutePath, "..", "README.md") };
    return create("LexiconArticle", args, defaults);
  }
  if (args.node.name === "category") {
    const defaults = { aliases: [], root: false };
    return create("LexiconCategory", args, defaults);
  }
};

const createAuthors = async (args: CreateNodeArgs<FileSystemNode>) => {
  const data: JsonData = JSON.parse(await args.loadNodeContent(args.node));
  data.authors.forEach((author: JsonData) => createNode("LexiconAuthor", args, author));
};

const create = async (type: string, args: CreateNodeArgs<FileSystemNode>, defaults: JsonData = {}) => {
  const data: JsonData = JSON.parse(await args.loadNodeContent(args.node));
  const absolutePath = path.join(args.node.absolutePath, "..");
  createNode(type, args, {
    ...defaults,
    ...data,
    absolutePath,
    path: args.node.relativeDirectory,
    parentDirectory: path.join(absolutePath, ".."),
    lang: "de",
    slug: data.slug ?? path.basename(absolutePath),
  });
};

const createNode = (type: string, args: CreateNodeArgs<FileSystemNode>, data: JsonData) => {
  const node = {
    ...data,
    id: args.createNodeId(path.join(args.node.absolutePath, "..")),
    parent: args.node.id,
    children: [],
    internal: {
      type,
      contentDigest: args.createContentDigest(data),
    },
  };
  args.actions.createNode(node);
  args.actions.createParentChildLink({ parent: args.node, child: node });
};
