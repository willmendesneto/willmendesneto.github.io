---
status: "active"
title: Publishing Angular Module with NP package
description: >-
  This is one of the posts about the improvements I've done on
  ngx-feature-toggle module and in today the topic is: how to publish a new…
date: '2018-08-15T13:32:40.738Z'
path: /posts/publishing-angular-module-with-np-package
category: "post"
lang: en
layout: post
author: Wilson Mendes
tags: ['angular', 'tooling', 'module']
---

This is one of the posts about the improvements I've done on [ngx-feature-toggle module](https://github.com/willmendesneto/ngx-feature-toggle/) and in today the topic is: how to publish a new version of my angular module or angular application.

Until few months ago, we had several ways to publish an Angular package, independent or module or application. Currently, we can use `@angular/cli` directly to create, run tests, validations, builds and more via CLI commands, which's really useful.

[**Version 6 of Angular Now Available**
_The 6.0.0 release of Angular is here! This is a major release focused less on the underlying framework, and more on the…_blog.angular.io](https://blog.angular.io/version-6-of-angular-now-available-cc56b0efa7a4 "https://blog.angular.io/version-6-of-angular-now-available-cc56b0efa7a4")[](https://blog.angular.io/version-6-of-angular-now-available-cc56b0efa7a4)

> You can read more about it on "[Publishing your library](https://github.com/angular/angular-cli/blob/master/docs/documentation/stories/create-library.md#publishing-your-library)" section on Angular docs

With that, we can use the same features having the same support to build great libraries as well. You just need to run these commands and all your support is up-to-date 🎉. But a good package should follow some good software principles.

Publish versions needs to be based on [Semantic versioning](https://semver.org/). This standard was created to make sure that upgrade your project using that component should be smooth as much as possible.

We need to [keep a changelog](https://keepachangelog.com/en/1.0.0/) (a ) file with all the changes that happened in the project since the beginning. Usually, in opensource (and non-opensource) projects keep the changes/features/fixes/etc. in a file called`CHANGELOG.md`

Needs to have a well-defined process to build, bundle and publish. But as you can see in different Angular Projects, there are lots of different ways to publish an Angular module and based in a way to cover different bundle types to be published, such as **ESM2015**, **FESM2015**, **FESM5**, **ESM5**, **UMD** and more that NG-Packagr was built.

Another good decision the Angular CLI team applied was to integrate the publish Angular libraries with Angular-CLI using [ng-packagr](https://www.npmjs.com/package/ng-packagr), a package that transpile your libraries to Angular Package Format.

Some projects are using shell scripts…

`gist:willmendesneto/2fe057f934507247760c751be95cda86`

…or even build systems using Gulp, as used on [Angular Material](https://github.com/angular/material2/blob/master/package.json#L15-L25).

![](https://cdn-images-1.medium.com/max/800/1*8bRO8CtMTJv5ONcKN3cF_Q.png)

However, the`npm publish` command by default doesn't trigger any tests and validations. So what you we do in that case?

To cover this scenario and avoid different approaches to publish a package, having a simple way to ship the new versions with all the steps described here in this post and more, I'm glad to share I added support for folder contents, as existent in `np publish` command.

How to use it:

*   Follow the npm events that [**np**](https://www.npmjs.com/package/np) triggers: `test`, `version` and `publish`;
*   Make sure that the bundle folder with the `package.json` generated internally by NG-Packagr has the `package.json` in the root folder;
*   Be happy, you don’t need more shell-scripts or manual steps to publish you code!

> You can find more about it [in this tweet](https://twitter.com/willmendesneto/status/1000705491385790464)

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">NP package `v3.0.0` now has support to specify the subdirectory to publish, as we have on `npm publish` command. Stop create shell-scripts to publish your NPM packages, just run `np &lt;patch|minor|major&gt; --contents=&lt;your-folder&gt;`<a href="https://t.co/mENfCABotE">https://t.co/mENfCABotE</a> <a href="https://twitter.com/hashtag/gde?src=hash&amp;ref_src=twsrc%5Etfw">#gde</a> <a href="https://twitter.com/hashtag/js?src=hash&amp;ref_src=twsrc%5Etfw">#js</a> <a href="https://twitter.com/hashtag/opensource?src=hash&amp;ref_src=twsrc%5Etfw">#opensource</a> <a href="https://twitter.com/hashtag/node?src=hash&amp;ref_src=twsrc%5Etfw">#node</a> <a href="https://t.co/7CyMSxUKCf">pic.twitter.com/7CyMSxUKCf</a></p>&mdash; Will Mendes (@willmendesneto) <a href="https://twitter.com/willmendesneto/status/1000705491385790464?ref_src=twsrc%5Etfw">May 27, 2018</a></blockquote>


<hr/>

So that's all for now. Follow these steps, run `np <patch|minor|major> --no-yarn --contents=./dist` for an Angular application, or `np <patch|minor|major> —-no-yarn --contents=./dist/<your-angular-module>` in case you're publishing an Angular module and you're good to go without any problem at all! 🎉🎉🎉

If you want to check an example, please take a look at the setup of `[ngx-feature-toggle](https://www.npmjs.com/package/ngx-feature-toggle)` and `[ngx-skeleton-loader](https://github.com/willmendesneto/ngx-skeleton-loader)` packages.

… and what if I told you can use `@angular/cli`\` and add all your components there, using it as a mono-repository? But this is a topic for another post ;)

Cya 👋
