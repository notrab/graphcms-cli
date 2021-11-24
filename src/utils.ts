import slugify from "slugify";
import * as fs from "fs";
import * as mkdirp from "mkdirp";

export const createMigrationFileName = (name = "migration") =>
  `${Date.now()}_${slugify(name, "_")}.js`;

export const checkMigrationsDirectoryExists = async (
  dir = "graphcms-migrations"
) => {
  return fs.existsSync(dir);
};

export const createMigrationsDirectory = async (
  dir = "graphcms-migrations"
) => {
  return mkdirp.sync(dir);
};
