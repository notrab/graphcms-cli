import { Command, flags } from "@oclif/command";

export default class Hello extends Command {
  static description = "Perform pending local migrations inside environment";

  static examples = [
    `$ graphcms migrate <migrations-directory>
migrate ./graphcms-migrations
migrate --dry
`,
  ];

  static flags = {
    dry: flags.boolean({ char: "d" }),
  };

  static args = [
    {
      name: "directory",
      description: "directory for migrations",
      default: "graphcms-migrations",
    },
  ];

  async run() {
    const { args, flags } = this.parse(Hello);

    this.log("running migration");

    // const name = flags.name ?? "world";
    // this.log(`hello ${name} from ./src/commands/hello.ts`);
    // if (args.file && flags.force) {
    // this.log(`you input --force and --file: ${args.file}`);
    // }
  }
}
