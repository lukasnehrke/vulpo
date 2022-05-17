import { exec } from "child_process";
import * as fs from "fs";
import * as path from "path";

export const isDirectory = (file?: string) => {
  return file && fs.existsSync(file) && fs.lstatSync(file).isDirectory();
};

export const isFile = (file?: string) => {
  return file && fs.existsSync(file) && fs.lstatSync(file).isFile();
};

export const isChildOrParent = (child1: string, child2: string) => {
  return !path.relative(child1, child2).startsWith("..") || !path.relative(child2, child1).startsWith("..");
};

export const getLastModified = (source: string): Promise<Date> => {
  return new Promise((resolve, reject) => {
    const cwd = path.resolve(source, "..");
    exec(`git log --date iso  -n 1 --format="%ad" .`, { cwd }, (err, stdout) => {
      if (err) {
        reject(err);
      } else {
        if (stdout) {
          resolve(new Date(stdout));
        } else {
          resolve(new Date());
        }
      }
    });
  });
};

export const getCreatedAt = (source: string): Promise<Date> => {
  return new Promise((resolve, reject) => {
    if (!isFile(source)) {
      return reject();
    }
    exec(`git log --follow --format=%ad --date iso ${source} | tail -1`, (err, stdout) => {
      if (err) {
        reject(err);
      } else {
        if (stdout) {
          resolve(new Date(stdout));
        } else {
          resolve(new Date());
        }
      }
    });
  });
};
