---
layout: post
title: Working with Thin Directives in AngularJS
categories: angularjs javascript directives architecture
tags: javascript angularjs frameworks frontend
status: publish
lang: "us"
image: https://pbs.twimg.com/profile_images/2149314222/square.png
type: post
published: true
meta: {}
author: Wilson Mendes Neto
---

<a class="page-link" href="{{ '/2014/07/26/trabalhando-com-thin-directives-no-angularjs' | prepend: site.baseurl | replace: '//', '/' }}">Read the Brazillian Portuguese version</a>

## INTRODUCTION

The AngularJS directives concept is a bit very interesting for apps, if you think in software aspects as reuse, portability, modularity, among others. However, depending on the complexity of your directive, some tests become more complex. One approach to simplify some procedures is the construction of directives based on the concept of Thin Directives. I met this concept in Joel Hooks post ["Let's Make Full-Ass AngularJS Directives"] [post-thin-directives], where he discusses the concept of a very simple way. I recommend reading this, very explanatory!

The thin directives conception is based in construction of an angular directive using other components (as Controllers Services, factories, etc.) based on a directive for better integration and testability. With this approach the tests are much simpler, as you delegate some responsibilities to other Angular components.

## PROBLEM: NAVBAR DIRECTIVE

We will create a menu as an example using a directive based in thin directive concept. Something simple, but I believe that good teaching so that everyone can better understand this new concept (for some people) and some ways to use it in your apps. The idea is that our directive can check which item is being accessed in real time from the information passed by the url.

For this task we will create three files to works directly with this directive:

- `navbar.html`: Template of our policy with the information and values ​​to be updated;
- `navbar-ctrl.js`: Controller for our menu. He will be responsible for making the integration so that our controller works perfectly;
- `navbar.js`: our directive really. This file is very compact, it will have only a few simple settings;

Basing our directive's building in [TDD concepts] [tdd], we will focus on the concept of [Red, Green, Refactor] [red-green-refactor], so beyond the Thin Directives, we still have knowledge of TDD (for whom have doubts/questions about it).

## DIRETIVE CREATION

Initially we have this html code that will become the template for our application, the file with the configuration of the routes of our app and other template (file `.html`) that will be vinculated with the directive.

`index.html`:

{% highlight html %}
<!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title></title>
    <meta name="description" content="">
    <script>document.write('<base href="' + document.location + '" />');</script>
    <meta name="viewport" content="width=device-width">

    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">

  </head>
  <body ng-app="plunkerApp">
    <!-- Esta é a nossa diretiva-->
    <navbar></navbar>
    <!-- -->

    <!-- Add your site or application content here -->
    <div class="container" ng-view=""></div>

    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.6/angular.min.js"></script>

    <script src="angular-route.js"></script>

    <script src="app.js"></script>
    <script src="navbar-ctrl.js"></script>
    <script src="navbar.js"></script>
</body>
</html>
{% endhighlight %}

`app.js`:

{% highlight javascript %}
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
{% endhighlight %}

`navbar.html`:

{% highlight html %}
<div class="header">
  <ul class="nav nav-pills pull-right">
    <li ng-class="{active:isActive('/')}"><a href="#">Home</a></li>
    <li ng-class="{active:isActive('#/contacts')}"><a href="#/contacts">Contacts</a></li>
  </ul>
  <h3 class="text-muted">THIN DIRECTIVE EXAMPLE</h3>
</div>
{% endhighlight %}

`isActive ()` method is used for `NavbarCtrl` controller accessing the directive, but for now we will not create the controller, but yes our directive. But we have to do some tests to validate the component and make sure everything is going correctly. Come to our test:

`navbar-test.js`:

{% highlight javascript %}

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
    httpBackend = _$httpBackend_;

    template = '<div class="header">' +
  '<ul class="nav nav-pills pull-right">' +
  '  <li ng-class="{active:{active:isActive('/')}"><a href="#">Home</a></li>' +
  '  <li ng-class="{active:isActive('#/contacts')}"><a href="#/contacts">Contacts</a></li>' +
  '</ul>' +
  '<h3 class="text-muted">THIN DIRECTIVE EXAMPLE</h3>' +
'</div>';
    httpBackend.whenGET('navbar.html').respond(template);

    element = angular.element(template);
    element = $compile(element)(scope);
  }));

  it('should create a navbar header with ".header" class in element', function () {
    expect(element.hasClass('header')).toBe(true);
  });

  it('should create a navbar header with ng-controller value equals "NavbarCtrl"', function () {
    expect(element.attr('ng-controller')).toEqual('NavbarCtrl');
  });

});
{% endhighlight %}

And now, let's go to create the navbar directive really.

`navbar.js`:

{% highlight javascript %}
'use strict';

angular.module('plunkerApp')
  .directive('navbar', function () {
    return {
      restrict: 'E',
      templateUrl: 'navbar.html',
      controller: 'NavbarCtrl',
    };
  });
{% endhighlight %}

We are using the directive with the "element" element. Now, we have some formats for directives:

- 'E': Element (<navbar></navbar>);
- 'C': Class (<div class="navbar"></div>);
- 'A': Attribute (<div navbar ></div>);

These options can be combined, which opens a range of new possibilities for the more directives.
ex:

{% highlight javascript %}
'use strict';

angular.module('plunkerApp')
  .directive('navbar', function () {
    return {
      restrict: 'EAC', // Aceita o formato de classe, atributo ou element
      templateUrl: 'navbar.html',
      controller: 'NavbarCtrl',
    };
  });
{% endhighlight %}

If you have to know more about directives, please take a look in [AngularJS directives documentation][angular-directive-docs].

## LAST DIRECTIVE CONSTRUCTION STEP

Still, our test will not be correct, because we don't have our controller created already. Let's create it now and their respective tests.

`navbar-ctrl-test.js`:

{% highlight javascript %}
'use strict';

describe('Controller: NavbarCtrl', function () {

  // load the controller's module
  beforeEach(module('plunkerApp'));

  var NavbarCtrl,
    scope,
    location;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $location) {
    location = $location;
    scope = $rootScope.$new();
    NavbarCtrl = $controller('NavbarCtrl', {
      $scope: scope
    });
  }));

  describe('isActive', function(){

    it('should return "true" when paths are the same', function () {
      location.path('/');
      expect(scope.isActive('/')).toBeTruthy();
    });

    it('should return "false" when paths aren\'t the same', function () {
      location.path('/');
      expect(scope.isActive('/error')).toBeFalsy();
    });

    it('should return "true" when word starts are the same', function () {
      location.path('/contacts/1/edit');
      expect(scope.isActive('/contacts')).toBeTruthy();
    });

    it('should return "true" when word starts are the same followed by query string', function () {
      location.path('/contacts?id=1');
      expect(scope.isActive('/contacts')).toBeTruthy();
    });

  });
});
{% endhighlight %}

`navbar-ctrl.js`:
{% highlight javascript %}
'use strict';

angular.module('plunkerApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.isActive = function(path){
      var currentPath = $location.path().split('/')[1];
      if (currentPath.indexOf('?') !== -1) {
        currentPath = currentPath.split('?')[0];
      }
      return currentPath === path.split('/')[1];
    };
  });
{% endhighlight %}

Agora ao rodar os testes, tudo estará ok.

## CONCLUSÃO

Thin directives are interesting for create components with middle and/or high complexity characteristics as delegates to other elements of AngularJS, improving your maintenance, testing, etc. Worth aiming for a little more advanced aspects together to the directives, vinculated with others AngularJS Patterns. This way, we can create an app much more modular application using the best of javascript and AngularJS.

If want see this working example accessing the plunker, I created with this example.

Link Plunker: [http://plnkr.co/edit/UHnbq5Nn5dNLsAPxOikk?p=preview][link-plunker]

What do you think about it? How do you uses it in your works?

Thanks and I see you very soon!

Links:

- Directives documentation: [https://docs.angularjs.org/guide/directive][angular-directive-docs]
- Let's Make Full-Ass AngularJS Directives: [http://joelhooks.com/blog/2014/02/11/lets-make-full-ass-angularjs-directives/][post-thin-directives]
- Test Driven Development (TDD): [http://pt.wikipedia.org/wiki/Test_Driven_Development][tdd]
- Red, Green, Refactor: [http://www.jamesshore.com/Blog/Red-Green-Refactor.html][red-green-refactor]

[post-thin-directives]: http://joelhooks.com/blog/2014/02/11/lets-make-full-ass-angularjs-directives/
[red-green-refactor]: http://www.jamesshore.com/Blog/Red-Green-Refactor.html
[tdd]: http://pt.wikipedia.org/wiki/Test_Driven_Development
[link-plunker]: http://plnkr.co/edit/UHnbq5Nn5dNLsAPxOikk?p=preview
[angular-directive-docs]: https://docs.angularjs.org/guide/directive
