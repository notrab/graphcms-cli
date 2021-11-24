import { Command } from "@oclif/command";

import { directory } from "./flags";
import {
  checkMigrationsDirectoryExists,
  createMigrationsDirectory,
} from "./utils";

export default abstract class extends Command {
  static flags = {
    directory: directory(),
  };

  async init() {
    const { flags } = this.parse(this.constructor as any);
    // @ts-expect-error
    const dirExists = await checkMigrationsDirectoryExists(flags.directory);

    if (!dirExists) {
      // @ts-expect-error
      await createMigrationsDirectory(flags.directory);
    }
  }
}
