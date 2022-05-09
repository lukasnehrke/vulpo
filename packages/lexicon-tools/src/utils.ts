import fs from "fs";
import path from "path";

export const isDirectory = (file?: string) => {
  return file && fs.existsSync(file) && fs.lstatSync(file).isDirectory();
};

export const isFile = (file?: string) => {
  return file && fs.existsSync(file) && fs.lstatSync(file).isFile();
};

export const isChildOrParent = (child1: string, child2: string) => {
  return !path.relative(child1, child2).startsWith("..") || !path.relative(child2, child1).startsWith("..");
};
