# graphcms-cli

Generate new, and execute pending migrations within your GraphCMS project.

You can pass global flags for your `-e` (endpoint) and `-` (token), or set `GRAPHCMS_ENDPOINT` and `GRAPHCMS_TOKEN` as environment variables within your local project, GitHub Workflow, etc.

## Commands

### `graphcms generate:migration`

Args:

- [nameOfFile]

Flags:

- `-d` for directory name

Generates a new migration file
