---
layout: post
title: "Micro tunnings with Angular apps - Part 2"
categories: "performance, frontend, angular"
tags: "performance, frontend, angular, web performance, tips, tricks"
status: publish
lang: "us"
image: "http://amitdev.github.io/img/s.svg"
type: post
published: true
meta: {}
author: Will Mendes
---


## INTRODUCTION

In last post we talking about real-time web concepts, angular best practices, one-time-binding and how to integrate javascript async patterns in angular apps. Now lets take a look in some aspects of functional programming. So let's go?


## FUNCTIONAL PROGRAMMING - CONCEPTS

Here I will talk about functional programming concepts in angular apps.

## IMMUTABLE DATA STRUCTURE

 An immutable data are based in a data structure that can't be modified in any way after its creation. The only way to effective modify it would be to make a mutable copy or something similar (slightly modifying the parameters you pass to the constructor of the new one). One of the most caracteristics of these structure are the thread safe behaviour (if you can't modify/update the data, you can understand too that your data is really safe of corruption) and your usage for hash keys.

 Thinking in Javascript, your first attempt was [MoriJS project][morijs], a library based in ClojureScript using immutability concepts. But this idea will be more familiar in front-end via [ImmutableJS project][immutablejs].

Lee Byron, Interactive Information Designer at Facebook says in the first time that show Immutable JS in public:

 > Immutable js fits better with the rest of the JS ecosystem in my opinion, because it is designed for and written in JS, rather than ClojureScript. The API follows the native Array API where possible, so it's  a lot easier to switch between the two

Using a simple approach, we can take a look in results when we use immutable js instead mori js in our apps:


![ImmutableJS versus MoriJS: Comparison](/assets/images/immutable-vs-mori.png "ImmutableJS versus MoriJS: Comparison")

* More informations in [http://jsperf.com/immutablejs-versus-morijs][jsperf-immutable-mori]


## HOW TO USE THIS CONCEPTS IN ANGULAR APPS

Thinking in improve more performance and give a simple way to use this library in angular apps, Minko Gechev create angular-immutable module. The idea of this module is simplify the $digest cycle of the data manipulated for angular apps.

Some points in this approach in angular apps:

Goods

- Performance improvements when app work with bigger informations;

Bads

- Less performatic when app work with few informations;
- Insert more complexity in your app;

> Please take a look in your post ["Boost the Performance of an AngularJS Application Using Immutable Data"][angular-immutable] for more detailed informations.



## REACTIVE PROGRAMMING: A WORLD WITH GOOD NEWS

Reactive programming, in resume, is a programming paradigm oriented around data flows and the propagation of change. This is not a new idea or concept, but return with a new approach via [React JS][reactjs] and Flux/Reflux.

Your algorithm is considered the most performatic when we talking about DOM rendering actually (AngularJS 2 will be using WebWorker for DOM rendering and give many performance improvements).

There are many approaches for your utilization integrating with front-end frameworks, such as Ember, Backbone and Angular. For Angular specifically has a module ngReact that help in this work, integrating React components via directive in angular apps.

Let me show you a simple example. We have 2 directives: one with ReactJS and another without. Based in a simple Devtools profiler for this example the results are:

```javascript
// without react
angular.module('angularPerformanceApp')
  .directive('myMessage', function () {
    return {
      template: '<div>Hello {{vm.message}}</div>',
      restrict: 'A'
    };
  });
```

![Using Angular directives](/assets/images/without-react.png "Using Angular directives")

```javascript
// with react
angular.module('angularPerformanceApp')
  .directive('myReactMessage', function () {

    return {
      compile: function(element) {
       var Hello = React.createClass({
          render: function() {
            return React.DOM.div({}, 'Hello ' + this.props.name);
          }
        });

        return {
          post: function(scope, element) {
            scope.$watch('vm.message', function(newVal, oldVal) {
              React.renderComponent(Hello({
                name: scope.vm.message
              }), document.getElementById('example'));
            });
          }
        }
      }
    }
```

![Using React JS](/assets/images/with-react.png "Using React JS")

> The Angular and React teams are sharing ideas about new steps (performance, DOM rendering, coesion and other aspects) and ideas about these projects and the resolutions are shared with community


## CONCLUSION

In this post, was approached the Functional programming concepts and some simple aspects about immutable data structure, how to use in app and libraries for help in this work.

In next post we will talking about test performance: Why we have that focuses on performance in this step too, what are the good practices in unit and end-to-end tests, tips and tricks.

Do you use other methods? Comment and share your experience here.

Thanks and see you very soon!

Links:

* Mori JS: [http://swannodette.github.io/mori/][morijs]
* Immutable JS: [http://facebook.github.io/immutable-js/][immutablejs]
* JSPerf: ImmutableJS x MoriJS: [http://jsperf.com/immutablejs-versus-morijs][jsperf-immutable-mori]
* Boost the Performance of an AngularJS Application Using Immutable Data: [http://blog.mgechev.com/2015/03/02/immutability-in-angularjs-immutablejs/][angular-immutable]
* React JS: [http://facebook.github.io/react/][reactjs]

[morijs]: http://swannodette.github.io/mori/
[immutablejs]: http://facebook.github.io/immutable-js/
[jsperf-immutable-mori]: http://jsperf.com/immutablejs-versus-morijs
[angular-immutable]: http://blog.mgechev.com/2015/03/02/immutability-in-angularjs-immutablejs/
[reactjs]: http://facebook.github.io/react/
