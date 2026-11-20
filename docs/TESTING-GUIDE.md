<!-- docs-synced-at: 0ad81af35b0c -->

# Testing guide

**When to read:** before adding or changing tests, or when a gate fails and you need to know what it checks.

## Runners and commands

| Level | Runner | Command                               | Where tests live |
| ----- | ------ | ------------------------------------- | ---------------- |
| none  | none   | `npm run test (placeholder, exits 1)` | `n/a`            |

## What to test

- Behaviour through public interfaces, not implementation details.
- Every bug fix starts with a failing test that reproduces it.
- Unhappy paths for every external call: timeouts, malformed responses, auth failures.

## Fixtures and mocks

None. Gatsby recommends Jest with `babel-preset-gatsby` if tests are added.

<!-- pack:testing -->

### Test runner

`none` runs unit tests with `n/a`. There are no end-to-end tests.

### Rules that apply to every test

- A test must fail when the behaviour it covers is broken. Never wrap assertions in `if`; assert presence first, then act.
- Arrange, act, assert, in that order, with a blank line between them. One behaviour per test; name it after the behaviour, not the method.
- Mock only at the boundary (HTTP, time, randomness, environment). Do not mock the module under test or sibling components.
- Pin the clock when dates matter. Never assert on `Date.now()` output.
- Prefer table-free tests: duplicated `it` blocks with clear names beat a clever `each` that hides which case failed.
- Keep fixtures small and local to the test file unless three or more files share them.

<!-- /pack:testing -->

## Coverage and CI

No coverage. CircleCI runs `npm install` and `npm run build` only. The deploy job is commented out.

## Flaky or slow tests

None, because there are no tests.

## Related documentation

- [DEVELOPMENT-STANDARDS.md](DEVELOPMENT-STANDARDS.md)
- [CODE-REVIEW-STANDARDS.md](CODE-REVIEW-STANDARDS.md)
