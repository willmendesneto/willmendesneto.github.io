<!-- docs-synced-at: 0ad81af35b0c -->

# Code review standards

**When to read:** while implementing any change (these are build constraints, like the linter) and when
reviewing a PR.

## Severity ladder

| Level | Meaning                                                                                      | Action                         |
| ----- | -------------------------------------------------------------------------------------------- | ------------------------------ |
| P0    | Security, data loss, broken build or release, silent wrong results                           | Do not merge. Do not hand off. |
| P1    | Incorrect behaviour for a real path, missing tests for changed behaviour, boundary violation | Fix before merge.              |
| P2    | Maintainability, naming, duplication, style the tooling does not catch                       | Fix or open a follow-up.       |

## The seven lenses

1. **Works and is verified**: tests exist for the changed behaviour and ran green; the author says how they verified it.
2. **Architecture fit**: respects the boundaries in [ARCHITECTURE.md](ARCHITECTURE.md); no parallel pattern introduced.
3. **Maintainability**: a newcomer can follow it; names say what things are; no dead code.
4. **Atomicity**: one concern per PR; no drive-by changes; migrations and code can ship independently.
5. **Evolution**: the change makes the next change easier, not harder.
6. **Unhappy paths**: every external call handles failure, including a timeout whose outcome is unknown; retries only for idempotent calls; inputs are validated at the boundary.
7. **Insufficient-review smells**: large diffs with no tests, "minor refactor" touching many files, TODOs without issues, commented-out code.

## Comment format

`[P0|P1|P2] <file:line> <what is wrong> → <what to do instead>`. One finding per comment. Link the doc that defines the rule when one exists.

## Module routing

Use the table in [README.md](README.md). The reviewer checks that the docs it names were respected and updated.

## Known failure modes

Add entries as they happen; this section is institutional memory.

- A post without `status: "active"` or with a missing `path` does not build a page.
- Moving the redirect plugins away from the end of `gatsby-config.js` breaks `redirect_from`.
