<!-- docs-synced-at: 0ad81af35b0c -->

# Development standards

**When to read:** before writing or reviewing code in this repository. These are the conventions the
code already follows; keep new code consistent with them.

## Toolchain

| Concern         | Tool                                         | Command          |
| --------------- | -------------------------------------------- | ---------------- |
| Language        | JavaScript (ES modules + JSX, no TypeScript) |                  |
| Formatting      | Prettier 2.4.1                               | `npm run format` |
| Linting         | ESLint (`react-app` config)                  | `npm run lint`   |
| Types           | none                                         | `n/a`            |
| Package manager | npm                                          | `npm install`    |
| Node            | 20.10.0                                      | from .nvmrc      |

## File and naming conventions

- Components: one PascalCase file per component in `src/components/` (`PostLink.js`), default export.
- Pages: lowercase file names in `src/pages/`; the file name is the route.
- Posts: one kebab-case folder per post in `content/posts/<slug>/index.md`. Frontmatter fields: `status`, `title`, `description`, `date`, `path` (`/posts/<slug>`), `category` (`post` or `workshop`), `lang`, `layout`, `author`, `tags`, optional `redirect_from`.
- Prettier: 120 columns, single quotes, trailing commas, `arrowParens: avoid`.

<!-- pack:base-js -->

### Quality gates

Run these before handing off, in this order. All must pass.

1. `npm run lint` (Lint)
2. `npm run build` (Build)

### Conventions

- Code style, TypeScript and script rules live in `.claude/rules/` and are summarised here. The formatter is the source of truth for layout; do not argue with it in review.
- Commits: imperative subject under 72 characters, body explains why. One logical change per commit.
- Changelog entries go under `## [Unreleased]` in `CHANGELOG.md` in the same PR as the change.

<!-- /pack:base-js -->

<!-- pack:framework -->

### Components

- Folder per feature; shared primitives under `components/ui/`. One component per file, named export, `PascalCase.tsx`.
- Props interface exported next to the component; defaults in the signature.
- Data access through hooks in `hooks/` or the query layer; components never call `fetch` directly.
- Tests sit next to the component or under `test/` mirroring the path, with Jest and Testing Library once a test runner is added (none exists today).

### State and data

- Build-time data comes from Gatsby GraphQL (page queries and `useStaticQuery`); UI state in component state or a small store. Avoid duplicating server data into local state.
- Error and loading states are explicit components.

<!-- /pack:framework -->

## Error handling and logging

`gatsby-node.js` calls `reporter.panicOnBuild` when the GraphQL query fails. `src/templates/post.js` renders a "Post not found" page when `markdownRemark` is missing. There is no runtime logging.

## Dependencies

- Add a dependency only when the standard library or an existing dependency cannot do the job.
- Pin or range versions the same way the rest of `package.json` does.

## Git and commits

- Branch from `main`, pattern `feat/<slug> or fix/<slug>`.
- Commit messages: Conventional Commits prefix (`feat:`, `fix:`), PR number appended on merge.

## Related documentation

- [TESTING-GUIDE.md](TESTING-GUIDE.md)
- [CODE-REVIEW-STANDARDS.md](CODE-REVIEW-STANDARDS.md)
