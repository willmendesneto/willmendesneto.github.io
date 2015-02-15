---
layout: post
title: "AngularJS: About E2E tests and Protractor - pt 1"
categories: angularjs frontend protractor end-to-end tests
tags: workflow frontend tests
status: publish
image:
type: post
published: true
meta: {}
author:
---


## INTRODUCTION

You never speak about protractor or End-to-tests? This time the aspect approached will be the tests, most specifically End-to-end test, with an overview in some aspects for Protractor, the framework created for AngularJS, but that can be used with many other projects without angularjs dependency. In this post I will explain some aspects for end-to-end tests, why to use them, how the protractor is included in this approach and show a example of your use in tests.


## Why End to End (E2E) tests

End to End tests are pretty good tests for validate some aspects of your application , such as functionalities and interactions. For example, you will use End to End test in this cases:

- Validate if your component works on in your application, generating a "happy way";
- Validate interaction in your browser between backend and frontend, based in a complete operation, like a login, search and other validations;

> Unit Tests and End to End tests ever works together.


## Well, but...why Protractor

Protractor is a tool created for attend developers of an easier way, with a reasonable setup, low context-switching and sensible syntax using all power of WebDrivers can do for us.

Your configuration is very easy (protractor born with this specification), that help in your use in applications.

## SETUP

The setup of protractor is very easy. Firts it's available via NPM (Node Package Manager) and your installation is done with the command

```bash
$ npm install -g protractor
```


## Boilerplate

> Basic step for use end-to-end tests

An example of end-to-end tests file is access the todo list that exists in angularjs website.

```javascript
describe('angularjs homepage todo list', function() {

  beforeEach(function() {
    // before function
    ...
  });

  afterEach(function() {
    //after function
    ...
  });

  it('should add a todo', function() {
    browser.get('http://www.angularjs.org');

    element(by.model('todoText')).sendKeys('write a protractor test');
    element(by.css('[value="add"]')).click();

    var todoList = element.all(by.repeater('todo in todos'));
    expect(todoList.count()).toEqual(3);
    expect(todoList.get(2).getText()).toEqual('write a protractor test');
  });
});
```

In this example we can see some elements that we will use many times in Protractor tests, such as:

- browser: Interface for browser element. In this example we use `browser` for access some url;
- element: Interface for access some page element. Is very usefull for get elements based in certain parameters and manipulate them;
- by: Interface for access element based in parameters (css, angular models, angular repeaters, etc);

If you would like to know more about the interfaces protractor, [please take a look in protractor documentation][protractor-interface-docs]

## CONCLUSION

Now you are most familiarized with the concept of End-to-end tests and the powerfull tool that is protractor. In next post we will take a look in others aspects of protractor, such as performance and best practices.

Do you like of this post? Comments this post, feedbacks are always welcome ;)

Links:

* Protractor interface docs: [http://angular.github.io/protractor/#/api][protractor-interface-docs]

[protractor-interface-docs]: http://angular.github.io/protractor/#/api
