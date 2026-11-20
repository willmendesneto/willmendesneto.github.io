<!-- docs-synced-at: 0ad81af35b0c -->

# Agent instructions (willmendesneto.github.io)

Instructions for every coding agent and for humans working in this repository. The `docs/` folder is
the source of truth for architecture and conventions; this file tells you when to read what.

## Commands

| Task        | Command         |
| ----------- | --------------- |
| Lint        | `npm run lint`  |
| Build       | `npm run build` |
| Install     | `npm install`   |
| Run locally | `npm start`     |

`npm run test` is a placeholder that exits 1. The repo has no tests yet.

Node 20.10.0 from .nvmrc (engines: >=14). Package manager: npm.

## Mandatory for every change to application code

| Step           | Requirement                                                                                                                                                                                                                      |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Before coding  | Read [docs/README.md](docs/README.md) and open every doc its table maps to the paths you will touch. Read the matching `docs/features/*` entry when the area is product-specific. State which docs you read.                     |
| While coding   | Keep the change atomic: no drive-by refactors, no unrelated files. Handle unhappy paths for every new external call. Tests first for behaviour changes; match the conventions in [docs/TESTING-GUIDE.md](docs/TESTING-GUIDE.md). |
| Before handoff | Run the commands above in order and fix failures; never hand off with a red gate. Update support files in the same PR (below). Summarise what was verified and how.                                                              |

## Support files travel with the code

A change that makes a doc, rule or template wrong or incomplete fixes it in the same PR. Check
`docs/README.md`'s table for the docs that cover the paths you changed. When nothing needs an update,
say so explicitly in the PR description: `Support files: no update needed`.

## Path to doc routing

See the table in [docs/README.md](docs/README.md). Add a row whenever a new area gets a doc.

## Git

- Branch from `main`; name branches `feat/<slug> or fix/<slug>`.
- Commit only when asked. Never force-push shared branches. Small, reviewable PRs.
- Never commit secrets or `.env*` files. Reference where a secret lives, not its value.

## Documentation rules

- Feature behaviour lives in `docs/features/`, updated in the same PR as the code.
- Architectural decisions that change a boundary get an ADR in `docs/decisions/`.
- Keep this file under 200 lines; move detail into `docs/`.
