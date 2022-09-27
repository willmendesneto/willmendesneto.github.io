---
status: "draft"
title: "Another way to think in unit tests for components"
layout: post
author: Wilson Mendes
description: >-
  This time I'll share a quick code tip. Usually, when writing unit tests on components there's a common usage/pitfal. Some teams can start describing only and exclusively what the code does instead of the intentions around the code exists.
date: '2022-05-16T09:13:00.419Z'
path: /posts/another-way-to-think-in-unit-tests-for-components/
category: "post"
lang: en
tags: ['frontend', 'javascript', 'nodejs', 'tips', 'architecture', 'tests', 'unit']
---

This time I'll share a quick code tip. Usually, when writing unit tests on components there's a common usage/pitfal. Some teams can start describing only and exclusively what the code does instead of the intentions around the code exists.

> ⚠️ This post will talk only and exclusively about the way to write tests that makes sense to humans, so we it won't cover Test Driven Development - AKA TDD. TDD is not a design tool. It’s a software development workflow that has prompts for code improvement in its lifecycle. ⚠️


<hr/>

## The problem

If you're looking at unit tests content, eventually you might find some posts, articles and such mentioning phrases like "tests are a way of documenting your code". But, are they really?

They should, of course! However, I rarely heard about some deep and technical discussions around standards, clarifications or any matter to read the tests and understand what's happening in there.

## Writing unit tests that are real and live documentation of your code

This time I'll share a quick code tip. Usually, when writing unit tests on components there's a common usage/pitfal. Some teams can start describing only and exclusively what the code does instead of the intentions around the code exists.

For this example, we'll play with some test cases for a component called "Quick Search", a fancy name for another search component 😜

### Less focus on component internals


Nobody cares if your callback has been called, but everybody cares about component behaviors working as expected


`gist:willmendesneto/dd3caf21c142ff4e25b4a955474882f1`

### Main focus on what, how and why the feature exists

<hr />

### That’s all for now

This was a quick one, but I hope you enjoyed this reading as much as I enjoyed writing it. Thank you so much for reading until the end and see you soon!

<hr />

### Cya 👋
