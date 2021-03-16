---
status: "draft"
title: Tales of big tech
layout: post
author: Wilson Mendes
description: >-
  Once upon a time I had
date: '2014-09-23'
path: /posts/working-with-thin-directives-in-angularjs/
category: "post"
lang: en
tags: ['frontend', 'angularjs']
---

AngularJS directives concept is a bit very interesting for apps, if you think in software aspects as reuse, portability, modularity, among others. However, depending on the complexity of your directive, some tests become more complex. One approach to simplify some procedures is the construction of directives based on the concept of Thin Directives. I met this concept in Joel Hooks post [“Let’s Make Full-Ass AngularJS Directives”](http://joelhooks.com/posts/2014/02/11/lets-make-full-ass-angularjs-directives/), where he discusses the concept of a very simple way. I recommend reading this, very explanatory!

The thin directives conception is based in construction of an angular directive using other components (as Controllers Services, factories, etc.) based on a directive for better integration and testability. With this approach the tests are much simpler, as you delegate some responsibilities to other Angular components.

We will create a menu as an example using a directive based in thin directive concept. Something simple, but I believe that good teaching so that everyone can better understand this new concept (for some people) and some ways to use it in your apps. The idea is that our directive can check which item is being accessed in real time from the information passed by the url.

For this task we will create three files to works directly with this directive:

*   `navbar.html`: Template of our policy with the information and values ​​to be updated;
*   `navbar-ctrl.js`: Controller for our menu. He will be responsible for making the integration so that our controller works perfectly;
*   `navbar.js`: our directive really. This file is very compact, it will have only a few simple settings;

Basing our directive’s building in [TDD concepts](http://pt.wikipedia.org/wiki/Test_Driven_Development), we will focus on the concept of [Red, Green, Refactor](http://www.jamesshore.com/posts/Red-Green-Refactor.html), so beyond the Thin Directives, we still have knowledge of TDD (for whom have doubts/questions about it).

### Creating our directive

Initially we have this html code that will become the template for our application, the file with the configuration of the routes of our app and other template (file .html) that will be vinculated with the directive.

index.html:

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title></title>
  <meta name="description" content="">
  <script>document.write('<base href="' + document.location + '" />');</script>
  <meta name="viewport" content="width=device-width">

</head>
<body ng-app="plunkerApp">
    <!-- That's our directive -->
    <navbar></navbar>
    <!-- -->

    <!-- Add your site or application content here -->
    <div class="container" ng-view=""></div>

    <script src="[https://ajax.googleapis.com/ajax/libs/angularjs/1.2.6/angular.min.js](https://ajax.googleapis.com/ajax/libs/angularjs/1.2.6/angular.min.js)"></script>

    <script src="angular-route.js"></script>

    <script src="app.js"></script>
    <script src="navbar-ctrl.js"></script>
    <script src="navbar.js"></script>
</body>
</html>
```

app.js:

```js
'use strict';

angular.module('plunkerApp', [
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'list.html',
        controller: 'ContactsCtrl'
      })
      .when('/contacts', {
        templateUrl: 'list.html',
        controller: 'ContactsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
```

navbar.html:

```html
<div class="header">
  <ul class="nav nav-pills pull-right">
    <li ng-class="{active:isActive('/')}"><a href="#">Home</a></li>
    <li ng-class="{active:isActive('#/contacts')}"><a href="#/contacts">Contacts</a></li>
  </ul>
  <h3 class="text-muted">THIN DIRECTIVE EXAMPLE</h3>
</div>
```

`isActive()` method is used for NavbarCtrl controller accessing the directive, but for now we will not create the controller, but yes our directive. But we have to do some tests to validate the component and make sure everything is going correctly. Come to our test:

navbar-test.js:

```js
'use strict';

describe('Directive: navbar', function () {

// load the directive's module
  beforeEach(module('plunkerApp'));

var element,
    template,
    httpBackend,
    scope;

beforeEach(inject(function ($rootScope, $compile, _$httpBackend_) {
    scope = $rootScope.$new();
AngularJS directives concept is a bit very interesting for apps, if you think in software aspects as reuse, portability, modularity, among others. However, depending on the complexity of your directive, some tests become more complex. One approach to simplify some procedures is the construction of directives based on the concept of Thin Directives. I met this concept in Joel Hooks post [“Let’s Make Full-Ass AngularJS Directives”](http://joelhooks.com/posts/2014/02/11/lets-make-full-ass-angularjs-directives/), where he discusses the concept of a very simple way. I recommend reading this, very explanatory!

The thin directives conception is based in construction of an angular directive using other components (as Controllers Services, factories, etc.) based on a directive for better integration and testability. With this approach the tests are much simpler, as you delegate some responsibilities to other Angular components.

We will create a menu as an example using a directive based in thin directive concept. Something simple, but I believe that good teaching so that everyone can better understand this new concept (for some people) and some ways to use it in your apps. The idea is that our directive can check which item is being accessed in real time from the information passed by the url.

For this task we will create three files to works directly with this directive:

*   `navbar.html`: Template of our policy with the information and values ​​to be updated;
*   `navbar-ctrl.js`: Controller for our menu. He will be responsible for making the integration so that our controller works perfectly;
*   `navbar.js`: our directive really. This file is very compact, it will have only a few simple settings;

Basing our directive’s building in [TDD concepts](http://pt.wikipedia.org/wiki/Test_Driven_Development), we will focus on the concept of [Red, Green, Refactor](http://www.jamesshore.com/posts/Red-Green-Refactor.html), so beyond the Thin Directives, we still have knowledge of TDD (for whom have doubts/questions about it).

### Creating our directive

Initially we have this html code that will become the template for our application, the file with the configuration of the routes of our app and other template (file .html) that will be vinculated with the directive.

index.html:

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title></title>
  <meta name="description" content="">
  <script>document.write('<base href="' + document.location + '" />');</script>
  <meta name="viewport" content="width=device-width">

</head>
<body ng-app="plunkerApp">
    <!-- That's our directive -->
    <navbar></navbar>
    <!-- -->

    <!-- Add your site or application content here -->
    <div class="container" ng-view=""></div>

    <script src="[https://ajax.googleapis.com/ajax/libs/angularjs/1.2.6/angular.min.js](https://ajax.googleapis.com/ajax/libs/angularjs/1.2.6/angular.min.js)"></script>

    <script src="angular-route.js"></script>

    <script src="app.js"></script>
    <script src="navbar-ctrl.js"></script>
    <script src="navbar.js"></script>
</body>
</html>
```

app.js:

```js
'use strict';

angular.module('plunkerApp', [
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'list.html',
        controller: 'ContactsCtrl'
      })
      .when('/contacts', {
        templateUrl: 'list.html',
        controller: 'ContactsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
```

navbar.html:

```html
<div class="header">
  <ul class="nav nav-pills pull-right">
    <li ng-class="{active:isActive('/')}"><a href="#">Home</a></li>
    <li ng-class="{active:isActive('#/contacts')}"><a href="#/contacts">Contacts</a></li>
  </ul>
  <h3 class="text-muted">THIN DIRECTIVE EXAMPLE</h3>
</div>
```

`isActive()` method is used for NavbarCtrl controller accessing the directive, but for now we will not create the controller, but yes our directive. But we have to do some tests to validate the component and make sure everything is going correctly. Come to our test:

navbar-test.js:

```js
'use strict';

describe('Directive: navbar', function () {

// load the directive's module
  beforeEach(module('plunkerApp'));

var element,
    template,
    httpBackend,
    scope;

beforeEach(inject(function ($rootScope, $compile, _$httpBackend_) {
    scope = $rootScope.$new();
AngularJS directives concept is a bit very interesting for apps, if you think in software aspects as reuse, portability, modularity, among others. However, depending on the complexity of your directive, some tests become more complex. One approach to simplify some procedures is the construction of directives based on the concept of Thin Directives. I met this concept in Joel Hooks post [“Let’s Make Full-Ass AngularJS Directives”](http://joelhooks.com/posts/2014/02/11/lets-make-full-ass-angularjs-directives/), where he discusses the concept of a very simple way. I recommend reading this, very explanatory!

The thin directives conception is based in construction of an angular directive using other components (as Controllers Services, factories, etc.) based on a directive for better integration and testability. With this approach the tests are much simpler, as you delegate some responsibilities to other Angular components.

We will create a menu as an example using a directive based in thin directive concept. Something simple, but I believe that good teaching so that everyone can better understand this new concept (for some people) and some ways to use it in your apps. The idea is that our directive can check which item is being accessed in real time from the information passed by the url.

For this task we will create three files to works directly with this directive:

*   `navbar.html`: Template of our policy with the information and values ​​to be updated;
*   `navbar-ctrl.js`: Controller for our menu. He will be responsible for making the integration so that our controller works perfectly;
*   `navbar.js`: our directive really. This file is very compact, it will have only a few simple settings;

Basing our directive’s building in [TDD concepts](http://pt.wikipedia.org/wiki/Test_Driven_Development), we will focus on the concept of [Red, Green, Refactor](http://www.jamesshore.com/posts/Red-Green-Refactor.html), so beyond the Thin Directives, we still have knowledge of TDD (for whom have doubts/questions about it).

### Creating our directive

Initially we have this html code that will become the template for our application, the file with the configuration of the routes of our app and other template (file .html) that will be vinculated with the directive.

index.html:

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title></title>
  <meta name="description" content="">
  <script>document.write('<base href="' + document.location + '" />');</script>
  <meta name="viewport" content="width=device-width">

</head>
<body ng-app="plunkerApp">
    <!-- That's our directive -->
    <navbar></navbar>
    <!-- -->

    <!-- Add your site or application content here -->
    <div class="container" ng-view=""></div>

    <script src="[https://ajax.googleapis.com/ajax/libs/angularjs/1.2.6/angular.min.js](https://ajax.googleapis.com/ajax/libs/angularjs/1.2.6/angular.min.js)"></script>

    <script src="angular-route.js"></script>

    <script src="app.js"></script>
    <script src="navbar-ctrl.js"></script>
    <script src="navbar.js"></script>
</body>
</html>
```

app.js:

```js
'use strict';

angular.module('plunkerApp', [
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'list.html',
        controller: 'ContactsCtrl'
      })
      .when('/contacts', {
        templateUrl: 'list.html',
        controller: 'ContactsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
```

navbar.html:

```html
<div class="header">
  <ul class="nav nav-pills pull-right">
    <li ng-class="{active:isActive('/')}"><a href="#">Home</a></li>
    <li ng-class="{active:isActive('#/contacts')}"><a href="#/contacts">Contacts</a></li>
  </ul>
  <h3 class="text-muted">THIN DIRECTIVE EXAMPLE</h3>
</div>
```

`isActive()` method is used for NavbarCtrl controller accessing the directive, but for now we will not create the controller, but yes our directive. But we have to do some tests to validate the component and make sure everything is going correctly. Come to our test:

navbar-test.js:

```js
'use strict';

describe('Directive: navbar', function () {

// load the directive's module
  beforeEach(module('plunkerApp'));

var element,
    template,
    httpBackend,
    scope;

beforeEach(inject(function ($rootScope, $compile, _$httpBackend_) {
    scope = $rootScope.$new();
AngularJS directives concept is a bit very interesting for apps, if you think in software aspects as reuse, portability, modularity, among others. However, depending on the complexity of your directive, some tests become more complex. One approach to simplify some procedures is the construction of directives based on the concept of Thin Directives. I met this concept in Joel Hooks post [“Let’s Make Full-Ass AngularJS Directives”](http://joelhooks.com/posts/2014/02/11/lets-make-full-ass-angularjs-directives/), where he discusses the concept of a very simple way. I recommend reading this, very explanatory!

The thin directives conception is based in construction of an angular directive using other components (as Controllers Services, factories, etc.) based on a directive for better integration and testability. With this approach the tests are much simpler, as you delegate some responsibilities to other Angular components.

We will create a menu as an example using a directive based in thin directive concept. Something simple, but I believe that good teaching so that everyone can better understand this new concept (for some people) and some ways to use it in your apps. The idea is that our directive can check which item is being accessed in real time from the information passed by the url.

For this task we will create three files to works directly with this directive:

*   `navbar.html`: Template of our policy with the information and values ​​to be updated;
*   `navbar-ctrl.js`: Controller for our menu. He will be responsible for making the integration so that our controller works perfectly;
*   `navbar.js`: our directive really. This file is very compact, it will have only a few simple settings;

Basing our directive’s building in [TDD concepts](http://pt.wikipedia.org/wiki/Test_Driven_Development), we will focus on the concept of [Red, Green, Refactor](http://www.jamesshore.com/posts/Red-Green-Refactor.html), so beyond the Thin Directives, we still have knowledge of TDD (for whom have doubts/questions about it).

### Creating our directive

Initially we have this html code that will become the template for our application, the file with the configuration of the routes of our app and other template (file .html) that will be vinculated with the directive.

index.html:

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title></title>
  <meta name="description" content="">
  <script>document.write('<base href="' + document.location + '" />');</script>
  <meta name="viewport" content="width=device-width">

</head>
<body ng-app="plunkerApp">
    <!-- That's our directive -->
    <navbar></navbar>
    <!-- -->

    <!-- Add your site or application content here -->
    <div class="container" ng-view=""></div>

    <script src="[https://ajax.googleapis.com/ajax/libs/angularjs/1.2.6/angular.min.js](https://ajax.googleapis.com/ajax/libs/angularjs/1.2.6/angular.min.js)"></script>

    <script src="angular-route.js"></script>

    <script src="app.js"></script>
    <script src="navbar-ctrl.js"></script>
    <script src="navbar.js"></script>
</body>
</html>
```

app.js:

```js
'use strict';

angular.module('plunkerApp', [
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'list.html',
        controller: 'ContactsCtrl'
      })
      .when('/contacts', {
        templateUrl: 'list.html',
        controller: 'ContactsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
```

navbar.html:

```html
<div class="header">
  <ul class="nav nav-pills pull-right">
    <li ng-class="{active:isActive('/')}"><a href="#">Home</a></li>
    <li ng-class="{active:isActive('#/contacts')}"><a href="#/contacts">Contacts</a></li>
  </ul>
  <h3 class="text-muted">THIN DIRECTIVE EXAMPLE</h3>
</div>
```

`isActive()` method is used for NavbarCtrl controller accessing the directive, but for now we will not create the controller, but yes our directive. But we have to do some tests to validate the component and make sure everything is going correctly. Come to our test:

navbar-test.js:

```js
'use strict';

describe('Directive: navbar', function () {

// load the directive's module
  beforeEach(module('plunkerApp'));

var element,
    template,
    httpBackend,
    scope;

beforeEach(inject(function ($rootScope, $compile, _$httpBackend_) {
    scope = $rootScope.$new();
<hr />

### That’s all for now

Stay tuned because this is not the end, it's just the beginning. Let's keep building awesome stuff and have **_#ngxFun_** 🚀

I hope you enjoyed this reading as much as I enjoyed writing it. Thank you so much for reading until the end and see you soon!

<hr />

### Cya 👋
