---
status: "draft"
title: "ngx-skeleton-loader/testing — a component harness that keeps your tests (and your agents) in sync"
description: ngx-skeleton-loader now ships NgxSkeletonLoaderHarness in a new ngx-skeleton-loader/testing entry point, so unit tests written by people or by coding agents assert what the skeleton shows instead of how it is rendered.
layout: post
author: Wilson Mendes
date: '2026-11-24T09:00:00.000Z'
path: /posts/ngx-skeleton-loader-testing-component-harness/
category: "post"
lang: en
tags: ['angular', 'testing', 'ai', 'frontend', 'tooling']
---

![](./hero.png)

> TL;DR; `ngx-skeleton-loader` now has a secondary entry point, `ngx-skeleton-loader/testing`, with `NgxSkeletonLoaderHarness`. Your tests ask the skeleton what it shows (`getAppearance()`, `getItemCount()`, `getLoadingText()`) instead of querying internal CSS classes, and that makes them a lot harder to break, whether a person or a coding agent wrote them. Feel free to check the [pull request](https://github.com/willmendesneto/ngx-skeleton-loader/pull/314) and give the repo a star 🎉

<hr />

### Introduction

Skeleton loaders are one of those components that show up everywhere and that nobody wants to think about in tests. The component renders a few grey blocks while the data loads, and then it disappears.

So how do teams test it today? Mostly with CSS selectors. Something like this:

```ts
const items = fixture.nativeElement.querySelectorAll('ngx-skeleton-loader .skeleton-loader.circle');

expect(items.length).toBe(1);
expect(items[0].getAttribute('aria-valuetext')).toBe('Loading...');
```

It works. Until it doesn't.

In this post I'll show what changed in `ngx-skeleton-loader` with the new testing entry point, why a component harness is a better contract for your unit tests, and why this matters even more now that Gemini, Copilot, Claude and friends write a good part of those tests for us.

### Problem statement

The snippet above knows too much. It knows that each skeleton item is a `.skeleton-loader` element, that the appearance is a CSS class on that item, and where the ARIA attributes live.

That last part is not hypothetical. In [`14.0.0`](https://github.com/willmendesneto/ngx-skeleton-loader/blob/main/CHANGELOG.md) the WAI-ARIA attributes moved from every `.skeleton-loader` item to the `<ngx-skeleton-loader>` host, so screen readers announce a single progress bar per component. A good change for accessibility. And every test with the `items[0].getAttribute('aria-valuetext')` line above broke on upgrade.

Steven Chim ([@chimurai](https://github.com/chimurai)) described the cost well in the [RFC for issue #313](https://github.com/willmendesneto/ngx-skeleton-loader/issues/313):

- Every consumer test repeats knowledge of the internal markup.
- A class rename in the library breaks applications that select on those classes, and selector-based tests make that break wider.
- Custom animations render as `animation-<name>`, so consumers need to know that prefix to assert them.

> Tests should break when behaviour changes, not when markup moves.

### What is a component harness?

A [component harness](https://angular.dev/guide/testing/component-harnesses-overview) is a class that knows how to talk to one component in a test. The component's author writes it once, and consumers use its methods instead of DOM queries. The Angular CDK provides the base classes in `@angular/cdk/testing`, and Angular Material ships harnesses for all its components.

A few things make harnesses a good fit here:

- **One owner for the markup knowledge.** If the library renames a class, the harness changes in the same pull request and your tests keep passing.
- **Async by design.** Every method returns a `Promise`, and the harness environment waits for change detection to settle before reading. No manual `fixture.detectChanges()` dance before each assertion.
- **Environment agnostic.** The same harness API can run in unit tests with `TestbedHarnessEnvironment`, and the CDK lets you [add other environments](https://angular.dev/guide/testing/component-harnesses-testing-environments) for end-to-end runners.

If you never used them, the [Using component harnesses in tests](https://angular.dev/guide/testing/using-component-harnesses) guide is the best place to start.

### Using `ngx-skeleton-loader/testing`

The harness lives in its own entry point, and it needs `@angular/cdk` (`>=19.0.0`) in your project. It is an **optional** peer dependency, so you only install it if you use the harness:

```bash
npm install ngx-skeleton-loader@<NEXT_VERSION>
npm install --save-dev @angular/cdk
```

#### 1. Assert a skeleton in a component test

```ts
import { TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { NgxSkeletonLoaderHarness } from 'ngx-skeleton-loader/testing';

it('shows a circular skeleton with the default loading text', async () => {
  const fixture = TestBed.createComponent(UserCardComponent);
  const loader = TestbedHarnessEnvironment.loader(fixture);

  const skeleton = await loader.getHarness(NgxSkeletonLoaderHarness);

  expect(await skeleton.getAppearance()).toBe('circle');
  expect(await skeleton.getItemCount()).toBe(1);
  expect(await skeleton.getLoadingText()).toBe('Loading...');
});
```

Same assertions as the selector version, but nothing in this test knows about `.skeleton-loader`, CSS classes or where the ARIA attributes live.

#### 2. Find one skeleton among many

Real pages have more than one skeleton. `NgxSkeletonLoaderHarness.with()` filters by `appearance`, `animation` and `loadingText` (a `string` or a `RegExp`):

```ts
const avatar = await loader.getHarness(NgxSkeletonLoaderHarness.with({ appearance: 'circle' }));
const rows = await loader.getAllHarnesses(NgxSkeletonLoaderHarness.with({ appearance: 'line' }));
const profile = await loader.getHarness(NgxSkeletonLoaderHarness.with({ loadingText: /profile/i }));

expect(await avatar.getItemCount()).toBe(1);
expect(rows.length).toBe(3);
expect(await profile.getAriaLabel()).toBe('loading');
```

#### 3. Assert that the skeleton disappears after the data loads

The harness has no "is visible" helper on purpose. The CDK already has `hasHarness()` for that:

```ts
it('replaces the skeleton with the content once the request resolves', async () => {
  const fixture = TestBed.createComponent(UserCardComponent);
  const loader = TestbedHarnessEnvironment.loader(fixture);

  expect(await loader.hasHarness(NgxSkeletonLoaderHarness)).toBe(true);

  httpTesting.expectOne('/api/user').flush({ name: 'Ada' });

  expect(await loader.hasHarness(NgxSkeletonLoaderHarness)).toBe(false);
});
```

#### 4. Animations, including custom ones

`getAnimation()` returns the animation name without the internal `animation-` prefix, and `false` when the animation is off (`animation="false"` and `[animation]="false"` are treated the same):

```ts
const skeleton = await loader.getHarness(NgxSkeletonLoaderHarness.with({ animation: 'my-wave' }));

expect(await skeleton.getAnimation()).toBe('my-wave');
```

#### 5. Use it inside your own harnesses

If your components already have harnesses, compose them. This is where it pays off the most:

```ts
import { ComponentHarness } from '@angular/cdk/testing';
import { NgxSkeletonLoaderHarness } from 'ngx-skeleton-loader/testing';

export class UserCardHarness extends ComponentHarness {
  static hostSelector = 'app-user-card';

  private readonly skeleton = this.locatorForOptional(NgxSkeletonLoaderHarness);

  async isLoading(): Promise<boolean> {
    return (await this.skeleton()) !== null;
  }
}
```

The [Creating harnesses for your components](https://angular.dev/guide/testing/creating-component-harnesses) guide covers `locatorFor`, `locatorForOptional` and friends in detail.

Keep in mind that the harness reports the resolved values rendered in the DOM, not the inputs you passed. As an example, `custom-content` always reports one item, because the component forces it, and an empty `appearance` reports `'line'`.

### Why this matters for coding agents 🧠

Here's the part that got me excited about this pull request.

A coding agent writes tests from what it can see: the component's types, the existing specs in the repo, and whatever it learned before. When the only way to test a skeleton is a CSS selector, the agent has to guess the markup. Sometimes it reads the rendered template and gets it right. Sometimes it remembers how the library looked two majors ago and writes `.skeleton-loader[aria-valuetext]`, which is exactly what `14.0.0` changed. The test compiles, then fails, and someone has to figure out why.

It also tends to over-assert. With raw DOM access, an agent happily checks inline styles, class order and attribute counts, because nothing tells it which details matter. Those are the tests that break on every refactor and get deleted a month later.

A harness changes the shape of the problem:

- **The API is the documentation.** Five typed methods and one `with()` filter, each with a JSDoc comment. Gemini, Copilot or Claude can discover them from the types in `node_modules` instead of guessing.
- **The compiler catches drift.** If a future version renames something, the agent's code fails at type-check time, not as a confusing runtime assertion.
- **Fewer, better assertions.** The harness only exposes what is meaningful to a consumer: appearance, item count, animation, loading text and label. The agent can't over-specify what it can't reach.
- **Stable across versions.** The library owns the mapping from markup to meaning, so a markup change is one library commit, and zero changes in your tests or your agent's next suggestion.

> Give agents a small, typed contract and they write tests that age well.

You can make this explicit. Angular publishes a [`best-practices.md` and `llms.txt` files for AI tools](https://angular.dev/ai/develop-with-ai), and you can add your own rule next to them in your `AGENTS.md` or editor rules file:

```markdown
- Test `<ngx-skeleton-loader>` with `NgxSkeletonLoaderHarness` from `ngx-skeleton-loader/testing`.
  Never query `.skeleton-loader` classes or ARIA attributes directly.
```

I wrote more about this idea, how modern Angular conventions and written rules help agents produce better code, in [Zoneless, signals and conventions — making an Angular repo agent-ready](/posts/zoneless-signals-and-conventions-making-an-angular-repo-agent-ready/).

And a fun detail: this feature is itself a good example of the workflow. Steven refined the RFC with Copilot, opened the issue with the API, the design notes and the acceptance criteria written down, and then implemented it with Copilot too. Clear criteria in, reviewable code out.

### Packaging notes

A few decisions from the RFC that are worth calling out, especially if you maintain an Angular library:

- `ngx-skeleton-loader/testing` is an [ng-packagr secondary entry point](https://github.com/ng-packagr/ng-packagr/blob/main/docs/secondary-entrypoints.md), with its own `ng-package.json` and `public-api.ts`.
- The main entry point doesn't import `@angular/cdk` or the testing entry point. Your application bundle stays the same size.
- `@angular/cdk` is marked optional in `peerDependenciesMeta`, so consumers that don't use the harness see no missing-peer warning.
- The minimum peer check (`check:min-peer`) imports the harness, so it is verified against `@angular/core` and `@angular/cdk` 19.
- It is a minor release with no breaking change: the change adds an entry point and an optional peer dependency.

### Thank you, Steven

A **_HUGE_** **_thank you_** to Steven Chim for proposing the RFC, writing it with this level of detail and shipping the implementation, tests and docs. This is open source at its best ❤️

### References

- [PR #314: feat(ngx-skeleton-loader/testing): add NgxSkeletonLoaderHarness](https://github.com/willmendesneto/ngx-skeleton-loader/pull/314)
- [Issue #313: RFC for a component harness](https://github.com/willmendesneto/ngx-skeleton-loader/issues/313)
- [Angular: Component harnesses overview](https://angular.dev/guide/testing/component-harnesses-overview)
- [Angular: Using component harnesses in tests](https://angular.dev/guide/testing/using-component-harnesses)
- [Angular: Creating harnesses for your components](https://angular.dev/guide/testing/creating-component-harnesses)
- [Angular CDK: Testing overview](https://material.angular.dev/cdk/testing/overview)
- [Angular: LLM prompts and AI IDE setup](https://angular.dev/ai/develop-with-ai)
- [Angular: Creating libraries](https://angular.dev/tools/libraries/creating-libraries)
- [ng-packagr: Secondary entry points](https://github.com/ng-packagr/ng-packagr/blob/main/docs/secondary-entrypoints.md)

### That’s all for now

Stay tuned because this is not the end, it's just the beginning.

I hope you enjoyed this reading as much as I enjoyed writing it. Thank you so much for reading until the end and see you soon!

🚀🚀🚀🚀🚀🚀

<hr />

### Cya 👋
