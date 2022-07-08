import { exec } from "child_process";
import * as fs from "fs";
import * as path from "path";

export const getLastModified = (source: string) => {
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

export const getCreatedAt = (source: string) => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(source)) {
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
