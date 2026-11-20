<!-- docs-synced-at: 0ad81af35b0c -->

# Documentation index

Start here. The table maps areas of the codebase to the doc you must read before changing them.
Agents and `docs` tooling parse this table, so keep its three columns and the glob syntax.

## If you change X, read Y

| Doc                                                  | Covers                                         | Paths                                     |
| ---------------------------------------------------- | ---------------------------------------------- | ----------------------------------------- |
| [ARCHITECTURE.md](ARCHITECTURE.md)                   | Modules, boundaries, data flow                 | `src/**`, `gatsby-*.js`                   |
| [DEVELOPMENT-STANDARDS.md](DEVELOPMENT-STANDARDS.md) | Language, formatting, imports, errors          | `src/**`, `gatsby-*.js`                   |
| [TESTING-GUIDE.md](TESTING-GUIDE.md)                 | Runners, fixtures, what to test                | none                                      |
| [CODE-REVIEW-STANDARDS.md](CODE-REVIEW-STANDARDS.md) | Review lenses and severity                     | `**`                                      |
| [TROUBLESHOOTING.md](TROUBLESHOOTING.md)             | Environment and build problems                 | `package.json`, `.nvmrc`, `**/*.config.*` |
| [features/SITE.md](features/SITE.md)                 | Pages, post template, posts content, SEO, feed | `src/**`, `content/**`, `gatsby-*.js`     |
| [decisions/](decisions/README.md)                    | Architecture decision records                  | `**`                                      |
| [specs/](specs/README.md)                            | Feature specs in progress                      | `**`                                      |

## Conventions for this folder

- One topic per file, UPPER-KEBAB-CASE names, H1 is the title, first paragraph says when to read it.
- Each doc starts with a `docs-synced-at` marker; tooling uses it to detect drift against the code.
- Update docs in the same PR as the code they describe. No new top-level doc for routine work; extend an existing one.
