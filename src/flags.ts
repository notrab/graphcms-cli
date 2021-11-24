require("dotenv").config();

import { flags } from "@oclif/command";

export const endpoint = flags.build({
  char: "e",
  description: "your project endpoint",
  default: process.env.GRAPHCMS_ENDPOINT,
});

export const token = flags.build({
  char: "t",
  description: "your api token",
  default: process.env.GRAPCHMS_TOKEN,
});

export const directory = flags.build({
  char: "d",
  description: "your migrations directory",
  default: "graphcms-migrations",
});
