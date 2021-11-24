import { Command, flags } from "@oclif/command";
import cli from "cli-ux";
import * as fs from "fs";
import * as path from "path";
import { renderFile } from "template-file";
import * as pluralize from "pluralize";

import { createMigrationFileName } from "../../utils";

export default class GenerateModelMigration extends Command {
  static examples = [
    `$ graphcms generate:model [displayName]
generate:model Author
`,
  ];

  static args = [
    {
      name: "displayName",
      required: true,
      description: "display name for the model",
    },
  ];

  static flags = {
    apiId: flags.string({
      char: "i",
      description: "api id",
    }),
    pluralApiId: flags.string({
      char: "p",
      description: "plural api id",
    }),
    directory: flags.string({
      char: "d",
      description: "directory for migrations",
      default: "graphcms-migrations",
    }),
  };

  async run() {
    const { args, flags } = this.parse(GenerateModelMigration);

    cli.action.start("generating filename");
    const fileName = createMigrationFileName(args.file);
    cli.action.stop();

    cli.action.start("generating migration file");
    const renderedFile = await renderFile(
      path.join(__dirname, "..", "..", "templates", "empty-model.txt"),
      {
        displayName: args.displayName,
        apiId: flags.apiId ?? args.displayName,
        pluralApiId: pluralize(
          flags.pluralApiId ? flags.pluralApiId : args.displayName
        ),
      }
    );

    fs.writeFileSync(path.join(flags.directory, fileName), renderedFile);

    cli.action.stop(`created file ./${flags.directory}/${fileName}`);
  }
}
