---
layout: post
title: "Micro tunnings with Angular apps - Part 1"
categories: performance, frontend, angular
tags: performance, frontend, angular, web performance, tips, tricks
status: publish
lang: "us"
image: "/assets/images/components.jpeg"
type: post
published: true
meta: {}
author: Will Mendes
---


## INTRODUCTION

Many applications are using angular for frontend and it's really awesome. But with time and software evolution other aspects about product/service are (more) importants too, such as manutenibility and...performance.

But when you think about performance, what are you remember like (re)solution?

- ++ machines?
- ++ cache?
- ++ file minification/compression?
- ++ use more async calls?
- ++ HTTP2 usage?

> Don't hide the problem

Yes, all of these are good ideas, but **doesn't resolve the core problem**. Why not? All these ideas are **paliatives**, because you never attack the real problem and it will appear again in some moment.


## REAL-TIME WEB - CONCEPTS

Angular is used for various apps including real time webapps, using websockets and three way data binding with Firebase, for example. But firstly, let's understand some theorical aspects.

When user access your app and the data are updated in a velocity <= 100 miliseconds: this is real-time. Real-time (for now) don't exist. What exist is a "brain hack" because your brain can't proccess all that happens in this time, because this it understood such if all behaviours are happening in real time, passing this idea.

Two-way data binding help in this task, based in more [hollywood-principle](hollywood principle) possible.

> The developers don't need understand how two-way data binding works in background initially

Yes, it's true, but when you have an app with many bindings all tips are welcome, such as:

### **Minimize bindings and watchers**

Ever that can, minimize bindings and watchers, `Object.freeze` usage [jsperf-object-freeze](take a look in jsperf comparison between `Object.freeze`, `Object.seal` and object with default behaviour)

### **ng-if instead ng-show**

Use ng-if instead ng-show when you can, because ng-show manipulate element display, but it already exist in DOM and two-way data binding already active, decreasing performance.

```html
<div ng-if="!vm.usingOneTimeBinding">
  <p>
    Makes more sense
  </p>
</div>

<div ng-show="!vm.usingOneTimeBinding">
  <p>
    Please, avoid this approach
  </p>
</div>
```


### **$filter + two-way data binding === no!**

Manipulate data in a once moment and pass the data for template instead $filter's usage in template;

```javascript
...
this.users = [
  {firstName: 'eu', lastName: 'ea'},
  {firstName: 'William', lastName: 'Wallace'}
];
...
```
Based in this data, avoid use filter in template...

```html
...
<div ng-repeat="item in vm.users">
  {{ item | username }}
</div>
...
```
... because the effect in your performance is very considerable...

![When use filter comparison](/assets/images/using-filters-in-template.png)

... instead this manipulate the stream's data in controller, passing the data in your final format only for render in template. In this example is used `.map()` javascript function for it.

```javascript
...
this.users.map(function(el){
  el.username = el.firstName + ' ' + el.lastName;
});
...
```

```html
...
<div ng-repeat="item in vm.users">
  {{ item.username }}
</div>
...
```

### **ngRepeat + Track by**

Track by in elements are always welcome! ngRepeat is more fast when tracking something.


```html

<!-- Without track by -->
<div ng-repeat="item in vm.users">
  {{ item.username }}
</div>

<!-- With track by -->
<div ng-repeat="item in vm.users track by $index">
  {{ item.username }}
</div>

```

In a simple example with and without `ngRepeat + Track by` the results are very expressives

![ngRepeat track by usage comparison](/assets/images/ng-repeat-track-by-comparison.png)


### **One-time-binding usage**

Use one-time-binding when you can, your app and your users are grateful for it!


```html
<div ng-repeat="item in ::vm.users track by $index" >
  {{ ::item.username }}
</div>

<div ng-if="::vm.users.loggedIn">
  ...
</div>

<div ng-class="::{ 'my-awesome-class': vm.users.loggedIn}">
  ...
</div>
```

### Use async patterns

In all javascript apps, ever use async patterns for help your life. In angular apps patterns like debounce are very easier to implement and add because `ngModelOptions` directive. This directive enable async patterns in components in a powerful way.

Debounce is a pattern for how many times the event/method will be called in your application. A example of your usage is a simple search in a list.

```html
<form autocomplete="off" role="form">
  <div class="form-group">
    <fieldset>
      <input type="search" name="search" id="search" placeholder="Search..." ng-model="vm.searchItem" class="form-control" />
    </fieldset>
  </div>
</form>
<ul>
  <li ng-repeat="item in vm.users | myFilter:vm.searchItem">
    {{item.firstName}}
  </li>
</ul>
```

In this example the search will be called each user add character in input for search. But this isn't a good idea. So let't take a look in debounce usage.


```javascript
...
this.myModelOptions = {
  updateOn: 'keydown blur',
  debounce: {
      keydown: 250, //for search we don't want to update server during user type
      blur: 250 //when user move on to the next field, we update immedately
  }
};
...
```

```html
<form autocomplete="off" role="form">
  <div class="form-group">
    <fieldset>
      <input type="search" name="search" id="search" placeholder="Search..." ng-model="vm.searchItem" class="form-control" ng-model-options="vm.myModelOptions" />
    </fieldset>
  </div>
</form>
<ul>
  <li ng-repeat="item in vm.users | myFilter:vm.searchItem">
    {{item.firstName}}
  </li>
</ul>
```

This way the search method/event is dispatched only after 250 miliseconds when triggered via keydown or blur events. The number, based in 3 characters are inserted for search is this.

![With and Without Debounce usage comparison](/assets/images/debounce-comparison.png)

For memoization pattern you can use `$provide.decorator()` approach, modifying default behaviour of angular, improving and enable cache by default or other possibilities, for example.

```javascript
// Creating a new module for enable cache by default
angular.module('perf.rootScope', [])
  // $rootScope modified
  .decorate('$rootScope', function($delegate){
    $delegate.__proto__.$watch = function() {
      ...
    };

    $delegate.__proto__.$apply = function() {
      ...
    };

    return $delegate;
  });

...
angular.module('myApp', 'perf.rootScope']);
```


## CONCLUSION

In this first post, was approached the Real-time concept and some simple aspects about microtunnings, such best practices about angular core components, javascript optimizations, functional and async patterns usage. In next step the target are concepts about immutable data structure, how to use in app, libraries for help in this work.

Do you use other methods? Comment and share your experience here.

Thanks and see you very soon!

Links:

* Hollywood Principle: [http://en.wikipedia.org/wiki/Hollywood_principle][hollywood-principle]
* JsPerf comparison: Object.freeze, Object.seal and object with default behaviour: [http://jsperf.com/freeze-vs-seal-vs-normal/19][jsperf-object-freeze]

[hollywood-principle]:http://en.wikipedia.org/wiki/Hollywood_principle
[jsperf-object-freeze]: http://jsperf.com/freeze-vs-seal-vs-normal/19
