---
status: "active"
title: >-
  Angular and open source: automation improvements in your project using Circle
  CI
description: >-
  Working in some improvements for ngx-feature-toggle component, I noticed that
  all the automated steps were taking 3 minutes to run using a…
date: '2018-04-09T19:35:14.810Z'
categories: []
keywords: []
path: >-
  /blog/angular-and-open-source-automation-improvements-in-your-project-using-circle-ci

category: "post"
lang: end
layout: post
author: Wilson Mendes
tags: ['wordpress', 'jekyll']
---

![](https://cdn-images-1.medium.com/max/2560/1*A_bbexwTEGYGECTCNsfj_w.png)
undefined

Working in some improvements for [**_ngx-feature-toggle_** component](https://github.com/willmendesneto/ngx-feature-toggle/), I noticed that all the automated steps were taking 3 minutes to run using a Circle CI v1 configuration. Since all of them were happening in sequence, that was an opportunity to improve that.

When we are talking about automation workflow in a project, we need to provide a great experience for the developers. Automate tasks/validations and give them a fast feedback should be always in your plan as a top priority. These are points that make people contribute to your open source project with more confidence.

For that, moving to use _Circle CI v2_ configuration was a decision to make and these are some of the points that helped in this decision:

### Clear configuration

Configure a project using Circle CI v2, which is not something new, is really transparent. It's interesting that you can find some projects which are not having benefits of all power of the new feature that came from v2 configuration.

The configuration format using a `.yaml` file is really transparent and steps such as save and restore cache are related to the configuration, not coupled with the platform itself.

![](https://cdn-images-1.medium.com/max/1200/1*OuY8Uc0CjYTh-nCvOqxLTA.png)

In this example the cache has been restored as a pre-step, the command `npm install` is used to install all the dependencies in case of there’s nothing in the cache and save the content of `node_modules` folder.

### Reusing configuration

Reuse configuration is something straightforward as well. As an example, in the code below you can see the default docker configuration on left and how to add it in your step using `<<: *docker_defaults` syntax.

![](https://cdn-images-1.medium.com/max/800/1*zuEXbJ_8V0aPO73gyKaV-g.png)
undefined![](https://cdn-images-1.medium.com/max/600/1*EFfAqzxwraoKR8_YuxF2Yg.png)

Using this approach you can reuse your configuration across tasks.

### Parallelising tasks with workflows

Configure tests in parallel or in sequence is quite simple using Circle CI workflows. As example, let's take a look in this configuration.

![](https://cdn-images-1.medium.com/max/800/1*eFVRIDJCZRUPccy0wLY1Sw.png)

In the code above, we are describing every step of our tasks. The field `required` is used when you need a explicit dependency, sharing that for your task start, it requires a pre step to be finished. So your tasks will run:

1.  build task will **install** all your **dependencies**
2.  After installed, you can run **unit tests**, **e2e tests** and **bundle size** tasks in _parallel_, which will give you a fast feedback.

The new workflow uses some [build pipeline concepts](https://www.thoughtworks.com/insights/blog/architecting-continuous-delivery) to make it faster, such as install all dependencies as first step and parallelism between tasks. That provides us a flexibility since a specific step can be replayed instead of all the tasks or in case of add more tasks in parallel, such as integration tests or performance tests as an example.

In a real world, it means that if your e2e tests are failing you can replay only the test, avoiding time consuming waiting for install dependencies or run other tasks that you already know are passing.

And this is the final configuration file with all the steps and validations.

undefined
undefined

### Before and after

About numbers and impact, before the project was taking an **average of ~3 minutes**, which is not bad, if you think that are lot of tasks happening in sequence.

![](https://cdn-images-1.medium.com/max/800/1*37P1MZGjBuhLlRYCkI4bjA.png)

Using the new configuration we are running all the validations with a feedback in less than **1 minute.**

![](https://cdn-images-1.medium.com/max/800/1*etGZK-cMda1pqoDqNoZ7qg.png)
undefined![](https://cdn-images-1.medium.com/max/600/1*Wfi4k8kLjQU6CDx6VRyRYQ.png)

<hr/>

### Conclusion

For sure there are lots of tools to use with some pros and cons. In that case, Circle CI solved some of the automation problems, using a clean and expressive configuration. The outcome was a result of focusing in make the development environment for this project transparent and faster.

What about you? It's time to share what are you doing to improve your automated tasks in your Angular projects. Next post will share some tips and tricks for share your Angular component using `[**ng-packagr**](https://github.com/dherges/ng-packagr/)`.

I hope you enjoyed this reading. Thank you so much for read until the end and see you soon!
