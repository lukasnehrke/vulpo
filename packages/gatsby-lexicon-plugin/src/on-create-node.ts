import type { CreateNodeArgs, GatsbyNode } from "gatsby";
import type { FileSystemNode } from "gatsby-source-filesystem";
import * as path from "path";

type JsonData = Record<string, any>;

export const unstable_shouldOnCreateNode: GatsbyNode["unstable_shouldOnCreateNode"] = ({
  node,
}: {
  node: FileSystemNode;
}) => {
  return node.internal.type === "File" && node.internal.mediaType === "application/json";
};

export const onCreateNode: GatsbyNode<FileSystemNode>["onCreateNode"] = async (args) => {
  switch (args.node.name) {
    case "authors":
      return createAuthors(args);
    case "lesson":
      return create("LexiconLesson", args);
    case "article":
      return create("LexiconArticle", args, {
        source: path.join(args.node.absolutePath, "..", "README.md"),
      });
    case "category":
      return create("LexiconCategory", args, {
        aliases: [],
        root: false,
      });
  }
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
    slug: data.slug ?? path.basename(absolutePath),
  });
};

const createAuthors = async (args: CreateNodeArgs<FileSystemNode>) => {
  const data: JsonData = JSON.parse(await args.loadNodeContent(args.node));
  data.authors.forEach((author: JsonData) => createNode("LexiconAuthor", args, author));
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
