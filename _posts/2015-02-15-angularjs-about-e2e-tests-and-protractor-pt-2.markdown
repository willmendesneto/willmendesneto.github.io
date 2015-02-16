---
layout: post
title: "AngularJS: About E2E tests and Protractor - pt 2"
categories: angularjs frontend protractor end-to-end tests
tags: workflow frontend tests
status: publish
lang: "us"
image: https://d2eip9sf3oo6c2.cloudfront.net/series/covers/000/000/002/full/angularjs_functional_testing_protractor.jpg?1390674819
type: post
published: true
meta: {}
author:
---


## INTRODUCTION

This time we will know more about it with an overview in some aspects for Protractor usage in projects and best practices such as page objects, performance, cache, usage with nodejs and others.

> Because best practices always are welcome!


## Why Page Objects

Page Object is a object model with properties and methods, wrapping page elements and interactions event (click, submit, etc). Your objective is simplify the test scripts and upgrade your code reuse in end-to-end tests, reducing amount of duplicate code and centralyzing UI modifications and fixes in only one file.

Let's think in a scenario that you have to test one of your directives in diferent scenarios, working with others controllers, services and templates. If you have to write `element(by...)` many times, the manutenability of your tests will not be so cool and ever that you have to take a look in them, your sensation will be something like this...


![urgh!](/assets/images/ugly.gif "urgh!")


## Using Page Objects

> A example of Page object construction

```javascript
var PageObject = function() {
    // properties
    this.property = element(by.id('property'))
    ...
}

module.exports = new PageObject();
```

You should use Page Objects in your application tests. It's a best practice for manutenibility and sanity for your tests.

Page Objects are useds for centralize the properties and methods of the website/system/app page. For example, if you have a form in your app, in this objects the properties will be form elements (inputs, selects, textboxes) and methods are the events of your form elements (click in button, blur in input element, change in select, etc).

A simple example using Page Objects in your protractor tests.

```javascript

describe('angularjs homepage todo list', function() {
  var pageObject = require('page.js');

  beforeEach(function() {
    // before function
    browser.get('<your-url>');
    ...
  });

  afterEach(function() {
    //after function
    ...
  });

  it('Page Object should be "Angular Testing Recipes" in your text content by default', function() {
    expect(pageObject.property.getText()).toEqual('Angular Testing Recipes');
  });
});
```


## Working with promises

All page events returns for you test like as promise. In this case, your have to resolve the promises get your result and finish your test correctly. For example

```javascript
PageObject.property.click();
// your assertions are here
```

can be used this way too

```javascript
PageObject.property.click().then(function(){
   // your assertions are here
   ...
});
```

You can use `waitForAngular()` method for that Protractor waits for AngularJS event finalization.

```javascript
browser.waitForAngular();
```

`expect()` method resolve the promises in your tests. For example:

```javascript
expect(PageObject.property.getText()).toEqual('your test');
```


## Performance in your End to End Tests

Test your application with animation disabled. In many times has no sense to test your app with animations enabled and with this resource disabled the tests run more fast.

```javascript
allowAnimations(false);
```

To disable angular debug informations is a best practice too, because you should use protractor debug for it.

```javascript
$compileProvider.debugInfoEnabled(false);
```


## Using NodeJS in Protractor tests

In some cases you can the option of use NodeJS with protractor methods for more elaborated tests. In this example we are testing a ordenation click event in a tablesorter component, but using NodeJS for set table headers in our tests and caching table headers elements (get all elements that `by.css()` method return, resolving your promise and managing tests based in `items` values).

```javascript
// spec.js
describe('TableSorter: testing component', function () {

  var tableSorter;

  it('changes active table order based in user\'s choice', function () {

    browser.get('/');

    element.all(by.css('.table-sorter-order')).then(function(items) {

      expect(items.length).toBe(1);

      //  Testing all elements with ordenation method
      ['Name', 'Email'].forEach(function(text, key){

        describe('Testing Item "'+text+'"', function(){
          //  Order Asc
          it('ASC ordenation', function () {
            expect(items[key].getText()).toBe(text);
            items[key].click();
            tableSorter = element(by.css('.table-sorter-order.asc'));
            expect(tableSorter.getText()).toEqual(text);
          });
          //  Order Desc
          it('DESC ordenation', function () {
            items[key].click();
            tableSorter = element(by.css('.table-sorter-order.desc'));
            expect(tableSorter.getText()).toEqual(text);
          });
        });
      });
    });
  });

});
```


## CONCLUSION

Protractor is a awesome tool for create and integrate end-to-end test in your applications, but remember that end-to-end is used with unit tests (more unit tests, less end-to-end tests).

Thanks and we see very soon!

