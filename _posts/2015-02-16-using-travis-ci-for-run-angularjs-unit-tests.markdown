---
layout: post
title: "Using Travis-CI for run AngularJS unit tests"
categories: travis-ci unit-test workflow continuous integration opensource
tags: tags
status: publish
image: http://blog.travis-ci.com/images/logo-downloads.png
type: post
published: true
meta: {}
author:
---

## INTRODUCTION

Used in opensource projects, Travis-CI is a excellent solution for will used in projects for add continuous integrations of a simple way in you project and, it's free!

But in your AngularJS apps, you have to add karma for test runner and we have problems for run karma tests in browsers. For this, you should use some trick for run these tests.


## TRAVIS-CI CONFIGURATION

First you have to create a login in Travis-CI with your github credentials. After this, you enable travis-ci to access your github repository and intercept the commits and pull requests and use travis-ci commands via web hook for run your commands list specified in a .yml file with name `.travis.yml`.

Let's take a look in a example of travis-ci configuration file for angularjs apps.

```yaml
language: node_js
node_js:
  - '0.10.33'
before_script:
  - 'export CHROME_BIN=chromium-browser'
  - 'export DISPLAY=:99.0'
  - 'sh -e /etc/init.d/xvfb start'
  - 'npm install -g bower karma grunt-cli jshint'
  - 'npm install' # install npm packages
  - 'bower install' # install bower packages

after_script:
  - 'grunt' # or other command for build, run tests, etc
```

This file specifally has 3 points that should be explained:

- language: In this line we choice what language travis-ci will be use for run your commands specified;
- before_script: All commands that will run before the main command. Normally in this point is inserted all commands for bootstrap your test environment. In this code block we enable the Chrome and Firefox browsers for will be useds in our tests;
- after_script: The commands that will be executeds for validate the send code. If the return of these commands will be `true`, the code was accept, if not will show in repository that your code have problems that you have to fix them;

If you would like to know more about these specifications please take a look in [travis-ci documentation][travis-ci-docs]


## CONCLUSION

The use of any tool for automate your code integration is a best practice and Travis-CI is a good and concise tool for it, but remember that if you need of a more elaborated integration, testing many kinds of browsers, you have to combine with other tools for it, such as saucelabs (AWESOME TOOL), for example.

Use other tools for use continuous integration in your applications? Comment and share your experience here.

Thanks and see you very soon!

Links:

* Travis-CI Documentation: [http://docs.travis-ci.com][travis-ci-docs]

[travis-ci-docs]:http://docs.travis-ci.com
