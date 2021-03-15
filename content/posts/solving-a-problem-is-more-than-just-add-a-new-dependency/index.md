---
status: "active"
title: Solving a problem is more than just adding a new dependency
description: >-
  My main goal in this post is starting some discussions about the criteria used
  to add a new dependency on several projects. So this should…
date: '2020-01-19T09:13:00.419Z'
path: >-
  /posts/solving-a-problem-is-more-than-just-adding-a-new-dependency
category: "post"
lang: en
layout: post
author: Wilson Mendes
tags: ['frontend', 'performance', 'javascript', 'tests']
redirect_from:
  - /posts/solving-a-problem-is-more-than-just-add-a-new-dependency
  - /posts/solving-a-problem-is-more-than-just-add-a-new-dependency/
---

![](https://cdn-images-1.medium.com/max/2560/1*t6F7uYkRCKuCM2Rh_D0NVA.png)

> _My main goal in this post is starting some discussions about the criteria used to add a new dependency on several projects. So this should be something to keep in mind and start a broader discussion._

### First things first

On our daily basis work, we usually need to do some improvements, add some features or solve some bugs. For several times we need to have a look forward to a new library to solve those.

As good — and also lazy — developers, one of the first things that came in our mind will be "Don’t reinvent the wheel" and looking for options you found a library that can help you in your issue, feature, or improvement.

### First things first: why should I use this library?

At the first time, this section can sound redundant, but it isn't — trust me. It's always good to keep in mind what you want to achieve before even start looking for something or add a dependency/development dependency on your project.

Every dependency adds more time to create the first artifact to start automated validation, will invalidate cache in different layers until production (not just frontend, a docker cache of your app can be invalidated in that case, for example), and result in a bundle increase. How can we create awareness of those things, then? Time to bring transparency into that.

As an example of how this aspect can be applied in different teams, [**Atlaskit**](https://atlaskit.atlassian.com/) has a transparent integration on Slack and Bitbucket, which gives us all the information about the bundle size of each package, which makes us think twice about the node packages we were using on our components.

![](https://cdn-images-1.medium.com/max/800/1*Bk6h7S20gDYfIH0v57iCCQ.png)

> You can find more details about that on the pull request at the Bitbucket repository of [Atlaskit monorepo project](https://bitbucket.org/atlassian/atlaskit-mk-2/pull-requests/7385/ci-adding-eslint-rule-for-polyfills-in/diff)

A benefit of that was to make things easy to dig and start some discussions focusing on performance improvements, which components can be loaded async and which dependencies could be removed on the main task. As an example, we have a package to provide a better and navigation experience across our products.

To give us a better page-load and improve the performance of our products, we decided to follow the [**RAIL model**](https://developers.google.com/web/fundamentals/performance/rail)**,** moving towards the Performance Budget's approach.

In order to achieve that, some techniques such as code-splitting, async loading, and stream content were applied and we got a huge benefit in our request files with optimized and parallelized and the bundle size for the package was reduced massively: from **500kB** to **30kB!**

![](https://cdn-images-1.medium.com/max/800/1*iPDfR_B9VRtLUBbDNCp-qA.png)

> You can find more details about the code on the Atlaskit pull request adding [**code-splitting on Navigation next component**](https://bitbucket.org/atlassian/atlaskit-mk-2/pull-requests/3639/code-splitting-components-and-exposing/diff).

### What should I check and how can I deal with these scenarios?

But that was a scenario when these things were clear, what about when they’re not that much? Some of these points can be happening with your team and, eventually, the chose package can show one or more of these points.

### 1\. Lack of maintenance

It can be related to different things such as the library is working fine and the problem they are trying to solve is done apart from a few bug fixes, the team deprecated the library in favor of another modern tooling, lack of reply in issues and open pull requests.

> _What if we find a bug on it, open an issue and a pull request solving it and it took a long time?_

If you ask for your team the question and the answer is an unknown you can think of a solution such as a fork the repository (in case the library has an [**opensource permissive license**](https://en.wikipedia.org/wiki/Permissive_software_license) 😉 ) and wait for the library to solve it.

But this scenario can start another issue, having someone as a maintainer and making hard to have some improvements, bug fixes and new features of the main library in your forked one.

Of course, it’s a case-by-case issue and each team has ownership to solve with the best knowledge they have.

### 2\. Great tool, but nothing to guide you

In this section have proper/non-vague documentation is the main takeaway. We are in the land of the beauty when all the code examples are working like a charm, but it’s not friendly when you have to know something more than a "How to …", "Getting started" docs.

In case you’re moving for this library anyways for some really valuable reason, such as this library is _way_ better than all the other options, please make sure you will contribute with their official docs, writing blog posts (internally and externally) or in the worse scenario sharing your knowledge with your team.

### 3\. Hard to contribute on the codebase

This is not the place you want to be, neither an experience you’re keen to have. That’s the scenario when the project is definitely _amazing_, but there’s a huge risk in use it because of reasons such as:

*   Non-permissive license;
*   There’s no continuous integration/continuous deployment/continuous delivery integration;
*   There’s no \`CONTRIBUTION.md\` file or GitHub/BitBucket templates for issues and pull requests with a proper description;
*   No easy way to do a local setup, neither a good [**developer experience**](https://medium.com/@albertcavalcante/what-is-dx-developer-experience-401a0e44a9d9);
*   Nothing defined regards to test architecture, code styling or possible candidates for some automation/validation;

In case you want to move it forward with the option #3, _please_ make sure that you know that a _proactive approach_ can be applied in this case as well, not only inside your company and/or codebase 😉

As an example, \`@atlaskit/navigation-next\` was using few libraries without some of these points and I sent some pull requests from those applying few improvements, such as:

*   Adding a CI integration;
*   Adding a test architecture;
*   Improving automation in the repository;

Open issues when I couldn’t do some of the improvements can be an approach and if things can’t be sorted out, you will have a really hard decision to make: _keep it or leave it_.

### Helping open source projects

As you already notice, some of these problems can be solved by contribution, that’s the spirit of use opensource: you should give back to the community.

I've found some packages heavily used across several codebases without any tests, documentation, and a lot of issues, with folks totally keen to have these points improved in their codebase. In these scenarios, you can jump into the code to understand more how the library is solving a few of the issues or open an issue to start a discussion about it.

I sent some pull requests and opened issues on these libs and I would like to share a **_HUGE_** **_thank you_** for all the discussions we had during the process.

Everyone does the best they can to get things done, but we’re (usually) not being paid to help open source projects _directly._ So please be kind, humble, and as we always do, try to be the change you seek

<hr/>

### That’s all for now

It was great to write this blog post, it just brings me back a lot of memories and a few of the reasons why I started contributing to opensource projects such as _Oh-my-ZSH_, _Webpack_, _Angular_ and our ❤ _React_.

If you can’t contribute directly it’s ok, this is not something mandatory… but try to keep in mind how easy or hard it will be your life and the customer’s life if you use a library without some of the points and be more conscious about your choices, why you need that and possible risk management in case of things move to any possible unhappy path.

I don’t have the answers and that’s not the goal of this post. I’m starting with the questions and calling everyone for an open discussion looking for awareness, knowledge sharing to check how your team is doing that and thinking about possible solutions 🚀 🚀

### Cya 👋
