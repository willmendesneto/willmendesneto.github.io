# <Feature or change title>

- Status: draft | approved | in progress | done
- Ticket: <id or link>
- Date: YYYY-MM-DD
- Mode: spec-driven

## Context

Why this is being done, who asked, what exists today.

## Goal

One paragraph. What will be true when this ships.

## Non-goals

What this explicitly does not do, to keep scope stable.

## Acceptance criteria

Each criterion is checkable by a test or a manual step.

1. Given <state>, when <action>, then <observable result>.
2. ...

## Test plan

| Criterion | Test type                         | Where |
| --------- | --------------------------------- | ----- |
| 1         | unit / integration / e2e / manual |       |

## Docs impact

Which `docs/` files change, and which `AGENTS.md` rows if any.

## Integrations

Only when the change calls, exposes or changes an API, queue, webhook or SDK owned or consumed by
another team or vendor. Delete the section otherwise.

| Dependency | Failure modes (incl. timeout = unknown outcome) | User sees | Retry / idempotency | Owner: data, contract, alerts | Decision record |
| ---------- | ----------------------------------------------- | --------- | ------------------- | ----------------------------- | --------------- |
|            |                                                 |           |                     |                               |                 |

## Rollout and risks

Flags, migrations, backwards compatibility, monitoring, rollback.

## Open questions

Decisions still needed and who owns them.

## Evidence plan

What proves it works: gate output, screenshots, recording, links.
