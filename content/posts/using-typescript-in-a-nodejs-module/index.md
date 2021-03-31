---
status: "active"
title: Using Typescript in a NodeJS module
description: … or Typescript + NodeJS = ❤
date: '2017-07-30T14:02:22.225Z'
path: /posts/using-typescript-in-a-nodejs-module
category: "post"
lang: en
layout: post
author: Wilson Mendes
tags: ['javascript', 'typescript', 'nodejs', 'tooling']
---

![](https://cdn-images-1.medium.com/max/2560/1*SSo_VpLEJ49WTi_ubpTVGQ.png)

… or Typescript + NodeJS = ❤

TypeScript is a really mature project built by Microsoft and supported by communities around the world, with the main goal to bring types to JavaScript, being [a superset of standard JavaScript](https://blogs.msdn.microsoft.com/typescript/2014/10/22/typescript-and-the-road-to-2-0/). Since we have several cases sharing the benefits of types usage in Javascript, such as [Reddit](https://redditblog.com/2017/06/30/why-we-chose-typescript/), [Asana](https://blog.asana.com/2014/11/asana-switching-typescript/) and [NativeScript](https://github.com/NativeScript/NativeScript) and there are lots of available Typescript tooling in a well covered state with a quick integration.

After felt the taste of Typescript with Angular and like it, I give it a try on a NodeJS module called [feature-toggle-service](https://github.com/willmendesneto/feature-toggle-service) which I started in Javascript and now using Typescript.

Since I’m using [feature toggle technique](https://martinfowler.com/articles/feature-toggles.html)s (which I strongly recommend you if you’re not familiar with the concept) in some projects to allow teams to modify system behaviours without code changes, I built small components in some frameworks and libraries such as Angular and React.

Then [feature-toggle-service](https://github.com/willmendesneto/feature-toggle-service) was built based on the component boundaries, one of the most useful NodeJS and software best practices. The main goal is simple: decoupling the logic into a small package and make the idea around feature toggle configuration and validation easier and have integration options for pure Javascript, frameworks and/or libraries.

As a example of this approach you can take a look into [Angular](https://github.com/willmendesneto/ngx-feature-toggle) and [React](https://github.com/willmendesneto/reactor-feature-toggle) component components for Feature toggles/flags.

> If you want to know more about best practices designing NodeJS systems, take a look in this thread on Quora.

[**What are some best architecture practices when designing a nodejs system?**](https://www.quora.com/What-are-some-of-the-best-architecture-practices-when-designing-a-Node-js-system-How-modular-should-I-make-my-design-Should-different-parts-of-the-website-be-served-by-different-nodes-How-do-I-design-to-make-use-of-a-multi-core)

### Setup

The bootstrap of a project with Typescript is something really quick. First of all you need to install some NodeJS packages for support, execution environment and type definition management via command

`yarn install -D ts-node typescript typings`

These packages are:

*   ts-node: TypeScript execution environment;
*   typescript: Support for Typescript in NodeJS;
*   typings: TypeScript Definition Manager;

To do this we will use the `tsc` and `typings` command line executables inside our node\_modules folder. These were installed via Typescript and Typings respectively. So that, we will create the `tsconfig.json` file using the command `./node_modules/.bin/tsc --init` with all information related to your application.

```json
{
  "compilerOptions": {
    "target": "ES5",
    "module": "commonjs",
    "declaration": true,
    "outDir": "lib",
    "rootDir": "src",
    "removeComments": true,
    "strict": true
  }
}
```

That’s the default configuration for the published package. With that the first step is migrate all the files from `.js` to `.ts`, adding types when is required. Typescript is really smart, so in some functions, classes and methods you can suppress type syntax, because it's something already implicit via code.

As a example, this snippet with the function `isOn` is return a `boolean` by default since the operator `!!` transforms the response in a boolean by default. This logic can be applied for methods `void` and other methods as well.

```ts
const settings: any = {};

const isOn = (key: string) => {
  return !!settings[key];
}
```

### Unit tests

NPM scripts is a flexible approach, enabling access from local and global Node packages. This is one of the reasons to add all the tasks of the project inside `package.json` in the current repository.

Unit tests is something **_crucial_** if you're thinking in best practices to evolve your package and add it as a open source project and that was the first step in after change files from `.js` to `.ts`. So before the tests we have a lint task and when the test suit is running the coverage is collected

The tests have a small requirement to build the `.ts` files and after that call use the bundle files in your test suit.

```json
"scripts": {
  "compile": "tsc",
  "test": "npm run compile && npm run code-coverage",
  "code-coverage": "NODE_ENV=test nyc — reporter=lcov — reporter=text-summary mocha ./test/*.spec.js — require ./test/setup.js",
  "pretest": "tslint src"
}
```

So that when `yarn test` is running all the lint and code coverage is triggered by default.

### Publishing

Publish a package is a common task in every single package release and a good tool for help on package publish automation is [semantic-version](https://www.npmjs.com/package/semantic-release), which can runs in your continuous integration/continuous delivery. It's not a Typescript tooling, but it's heavily used in OSS — _Open source projects_.

If you want to know how to integrate this package into your repository and understand all required steps, please watch the Egghead's video ["**How to Write a JavaScript Library — Automating Releases with semantic-release**"](https://egghead.io/lessons/javascript-automating-releases-with-semantic-release).

Another approach that can be combined is the [Canary build](https://www.thoughtworks.com/radar/techniques/canary-builds), which can be added in your repository using [Greenkeeper](https://greenkeeper.io/), sending pull requests in real time with all bumps and updates for NPM dependencies.

![](https://cdn-images-1.medium.com/max/800/1*EMlbRkbWCk6EFRP0eQokMQ.png)

> Please read the post by Kent C Dodds sharing some good points about open source and how to contribute.

[**Introducing: How to Contribute to Open Source**
](https://kentcdodds.com/blog/introducing-how-to-contribute-to-open-source)

<hr/>

### Conclusion

I hope you enjoyed this post and try to use Typescript in your projects, sharing your experience as well. The good outcome is this migration is something transparent for the package consumers and it will help in next features, refactors and other improvements.

IF you are interested in see the final solution, please take a look in the [Github repository](https://github.com/willmendesneto/feature-toggle-service). In the next post I will share the benefits of code decouple and how it will help in aspects such as reuse and flexibility. That's all folks!

### Links

- Martin Fowler: post about feature toggles [https://martinfowler.com/articles/feature-toggles.html](https://martinfowler.com/articles/feature-toggles.html)
- Feature toggle service: [https://github.com/willmendesneto/feature-toggle-service](https://github.com/willmendesneto/feature-toggle-service)
- NGX Feature toggle: Angular component for feature toggles [https://github.com/willmendesneto/ngx-feature-toggle](https://github.com/willmendesneto/ngx-feature-toggle)
- Reactor Feature toggle: React component for feature toggles [https://github.com/willmendesneto/reactor-feature-toggle](https://github.com/willmendesneto/reactor-feature-toggle)
- Introducing: How to Contribute to Open Source: [https://medium.com/@kentcdodds/introducing-how-to-contribute-to-open-source-be67917eb704](https://medium.com/@kentcdodds/introducing-how-to-contribute-to-open-source-be67917eb704)
