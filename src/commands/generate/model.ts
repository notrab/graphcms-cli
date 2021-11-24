import { flags } from "@oclif/command";
import cli from "cli-ux";
import * as fs from "fs";
import * as path from "path";
import { renderFile } from "template-file";
import * as pluralize from "pluralize";
import * as prompts from "prompts";

import Command from "../../base";
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
    ...Command.flags,
  };

  async run() {
    const { args, flags } = this.parse(GenerateModelMigration);

    const questions: any = [
      {
        type: "text",
        name: "displayName",
        message: "display name?",
        initial: args.displayName,
      },
      {
        type: "text",
        name: "apiId",
        message: "api id?",
        initial: args.apiId || args.displayName,
      },
      {
        type: "text",
        name: "pluralApiId",
        message: "plural api id?",
        initial: args.pluralApiId || pluralize(args.apiId || args.displayName),
      },
    ];

    const answers = await prompts(questions);

    cli.action.start("generating filename");
    const fileName = createMigrationFileName(args.file);
    cli.action.stop();

    cli.action.start("generating migration file");
    const renderedFile = await renderFile(
      path.join(__dirname, "..", "..", "templates", "empty-model.txt"),
      answers
    );

    fs.writeFileSync(path.join(flags.directory, fileName), renderedFile);

    cli.action.stop(`created file ./${flags.directory}/${fileName}`);
  }
}
