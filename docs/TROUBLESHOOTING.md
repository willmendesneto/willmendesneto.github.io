<!-- docs-synced-at: 0ad81af35b0c -->

# Troubleshooting

**When to read:** when install, build, test or run fails on your machine or in CI.

## Environment

### Node version

Required: 20.10.0 (.nvmrc). With nvm: `nvm use`. A different major usually shows up as native module build errors or syntax errors in dependencies.

### Install

`npm install`. Delete `node_modules` and the lockfile cache before retrying only when the lockfile itself is suspected; otherwise keep the lockfile.

## Build

- Stale cache errors: run `npm run clean`, then `npm run build`.
- Sharp or native module errors: check `node -v` matches `.nvmrc` and reinstall.
- `gh-pages` cache problems on deploy: `npm run deploy` already removes `node_modules/.cache/gh-pages`.

## Tests

`npm run test` always fails by design. It prints a link to Gatsby unit testing docs and exits 1.

## Gates in CI but not locally

CircleCI builds on Node 16.14. A local build on Node 20 can pass while CI fails, because Gatsby 5 requires Node 18 or later.

## Add an entry

Title the problem with the exact error text, then cause, then fix. Link the PR that fixed it.
