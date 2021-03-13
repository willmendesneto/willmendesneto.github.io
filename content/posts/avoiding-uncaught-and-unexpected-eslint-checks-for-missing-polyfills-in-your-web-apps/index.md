---
status: "active"
title: >-
  Avoiding Uncaught and unexpected — ESLint checks for missing polyfills in your
  web apps
description: "TL;DR; this eslint rule will give you feedback if your code requires polyfills based on browser support… in our dev loop. Enjoy! \U0001F389"
date: '2020-02-07T07:22:41.152Z'
path: >-
  /posts/avoiding-uncaught-and-unexpected-eslint-checks-for-missing-polyfills-in-your-web-apps
category: "post"
lang: en
layout: post
author: Wilson Mendes
tags: ['javascript', 'frontend', 'tooling']
---

> TL;DR; this eslint rule will give you feedback if your code requires polyfills based on browser support… in our dev loop. Enjoy! 🎉

I've seen several Frontend teams who were facing issues related to browser support for some of our features in the past. It could be due to some implementation that requires polyfills, ending up with the code not working as expected.

As an example, sometimes products were facing some issues, like [**Adding polyfill for ChildNode.remove() function**](https://stash.atlassian.com/projects/JIRACLOUD/repos/jira-frontend/pull-requests/21533/overview) issue that was happening with some of the Atlaskit consumers, having few of them ending up as production problems.

Adding to that, other components were facing issues in the last weeks due to the lack of support for some browsers we supported (_did I hear_ **_Internet Explorer_**_?_ 😠).

To mitigate those types of issues in the future impacting Atlassian components and experiences, and as a [**result of this main question in one of the pull requests fixing a related issue**](https://bitbucket.org/atlassian/atlaskit-mk-2/pull-requests/7364/ms-2550-check-if-containsnode-is-defined/diff#comment-121061951) I added a ESlint rule to helps us on that by adding [**eslint-plugin-compat**](https://www.npmjs.com/package/eslint-plugin-compat) integration in Atlaskit.

### 🏁 Polyfill checks in local changes and pull requests in Atlaskit

The applied changes in our repository can help us to avoid issues like [**Uncaught error in IE 11**](https://bitbucket.org/atlassian/atlaskit-mk-2/pull-requests/7364/ms-2550-check-if-containsnode-is-defined/diff) — and lots of different issues in the future due to the lack of support of a specific feature in a specific browser, and lack of awareness in ours/consumers side. Also, that gives us browser support feedback in the dev loop, boosting our Developer Experience.

‌

![](https://cdn-images-1.medium.com/max/800/1*-CV4VXIvf80eCi_JQZywHQ.png)

### 😎 A great start for us to move towards automation

Since **this plugin checks only non-experimental features**, this won’t cover some scenarios such as `Selection.containsNode()`([**https://developer.mozilla.org/en-US/docs/Web/API/Selection/containsNode#Browser\_compatibility**](https://developer.mozilla.org/en-US/docs/Web/API/Selection/containsNode#Browser_compatibility)), unfortunately.

![](https://cdn-images-1.medium.com/max/1200/1*6Z-YznhQb_p_TSeA9mqj8Q.png)

In this case, the `Selection` Typescript interface has `containsNode` method type as mandatory instead of an optional one.

![](https://cdn-images-1.medium.com/max/1200/1*Nu41dmeDwDAIoqT7vS5QMg.png)

This plugin list can be used in combination of other techniques to cover the issue properly. Visual, integration, end-to-end tests can be added in the codebase, and specific validation for polyfills and/or experimental features as well. A small, but huge win!

With all the polyfills in a list in our `.eslintrc.js`, we can make sure the internal and external consumers will have the proper polyfills added on their bundle — perhaps create some automation for it in the future. I’m quite happy to share that now [**Atlaskit monorepo**](https://bitbucket.org/atlassian/atlaskit-mk-2/) is using this new rule with for more than a week successfully so far. 🎉

> You can find more details about the polyfills list used across all the Atlaskit packages by looking the `polyfills`\` **list** [**on the**](https://bitbucket.org/atlassian/atlaskit-mk-2/src/master/.eslintrc.js) `[.eslintrc.js](https://bitbucket.org/atlassian/atlaskit-mk-2/src/master/.eslintrc.js)` [**of the project**](https://bitbucket.org/atlassian/atlaskit-mk-2/src/master/.eslintrc.js)**.**


<hr/>

### 🛣 Next steps: up to us, up to you

That’s the first step to avoid issues with polyfills in Atlaskit packages and products. As described previously, the first step is to create awareness across teams about specific features that require some polyfills, and automation for these integrations across repositories and consumers.

As a next step, anyone can work on some automation to create, publish, update our Atlaskit documentation sharing the necessary polyfills per packages, and adding them into our products.

Of course, that’s just an idea, but the mechanics of it is totally up to us, and up to you and your team — in your case. Definitely a **HUGE** step for us to solve, and mitigate any possible problem your WebApp can face because of lack of polyfills 💃💃💃💃

And now a gif, because we all love gifs 😉

![](https://cdn-images-1.medium.com/max/800/1*7t6OzRBjQGnoKQEbcIw0iQ.gif)

**_Cya 👋_**
