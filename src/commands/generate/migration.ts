import cli from "cli-ux";
import * as fs from "fs";
import * as path from "path";
import { renderFile } from "template-file";

import Command from "../../base";
import { createMigrationFileName } from "../../utils";
import { endpoint } from "../../flags";

export default class GenerateMigration extends Command {
  static examples = [
    `$ graphcms generate:migration [name]
generate:migration CreateAuthorModel
`,
  ];

  static args = [
    {
      name: "file",
      description: "filename for new migration",
      default: "migration",
    },
  ];

  static flags = {
    endpoint: endpoint(),
    ...Command.flags,
  };

  async run() {
    const { args, flags } = this.parse(GenerateMigration);

    const fileName = createMigrationFileName(args.file);

    cli.action.start("generating empty migration");
    const renderedFile = await renderFile(
      path.join(__dirname, "..", "..", "templates", "empty-migration.txt"),
      {}
    );

    fs.writeFileSync(
      path.join(flags.directory as string, fileName),
      renderedFile
    );

    cli.action.stop(`done ./${flags.directory}/${fileName}`);
  }
}
