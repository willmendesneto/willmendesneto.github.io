---
layout: post
title: "Why track loop is important in your angular apps"
categories: frontend javascript performance angularjs
tags: frontend javascript performance angularjs
status: publish
lang: "us"
type: post
published: true
meta: {}
author: Will Mendes
---

## Introduction

Hello everyone. This post will be something good and easy to read, but totally essential if you care about performance in you Angular App. The idea of this post is talk about why your loop should gave `track by` with some index information.

> But we already know about it because angular documentation already talk about that

I'm working as a consultant in biggest and medium angular projects and the problems around the teams forget about that approach creates a lot of problems. So what I'm writing here is basically an overview about the angular behaviours and why you need to take care about it.

So...let's go!

## About Angular apps and loops

Since angular borns the idea was (and still is): make the WebApps development easier. And the framework provide us lots of tools to make our life simple as possible and delivery business value fast.

Yeah! _delivery business value_! If your code doesn't delivery business value, so we have something wrong...but I will talk more about that in the next posts.

We have the concept of directives: a new way to handle with WebApps creating decoupled components with specific rules based in your application domain. All built in core directives use `ng*` pattern and that's the case of our `ngRepeat`.

If we take a look in ngRepeat documentation we can realise the main goal around this directive: render information iterating over a collection. Reading a little more we can realise that we have other patterns:

- You shouldn't use `$` or `$$` prefixes in your collection informations: Angular use this character for handle with public (`$`) and private (`$$`) properties. We have some public properties, such as `$index`, `$first`, `$last` and others;

The interest thing is around angular creates some private properties. One of them is created when `track by` rule is not added in your iteration/loop.


## Why we need to pass a index with a unique value

The rule around `track by` is pretty simple. It's used to avoid duplication in your repeater.

```javascript
var app = angular.module('plunker', []);

app.controller('MainCtrl', function() {
  ...
  this.items = [
    {_id: 1, name: 'Josh'},
    {_id: 2, name: 'Joseph'},
    {_id: 3, name: 'Kevin'}
  ];
});
```

```html
...
<div ng-repeat="item in items">
  {{item.name}}
</div>
...
```

So in this code example we are not tracking our collection and the angular creates a unique key to avoid [Duplicate Key in Repeater error][ng-repeat-dupes] in our code. This generated unique key is `$$hashKey`.

![Duplicate Key in Repeater error](/assets/images/ng-repeat-error-duplicate-key.png)

Simple and fast, but now we have a problem. If you change your collection information for any reason (a polling, for example) the way of the data is updated is totally different. If you are not using `track by`, your angular App creates the `$$hashKey` property for you and when you update the information you are **removing and creating a new element instead update the data**.

> But wait! This is a big performance issue in the framework!

No, it's not. This is the common "Read the documentation" error. You can [find all the details in ngRepeat documentation][ng-repeat-docs].

![Angular documentation: who ngRepeat approach with $$hashKey works](/assets/images/hashkey-ng-repeat.png)

So, the correct implementation is use the same code in your javascript and update your html to track your unique key.

```html
<div ng-repeat="item in items track by item._id">
  {{item.name}}
</div>
```

PS: If you like to see this code running, please access the [plunker with this example using Angular1][plunker-angular-1].


## Track by in Angular2 apps

In Angular2 apps you should use `trackBy` too. In the new syntax `ngRepeat` was replaced to `ngFor`, but the approach still simple.

```javascript
import { Component } from '@angular/core';

@Component({
  selector: 'demo-app',
  templateUrl: 'app/app.component.html',
  pipes: []
})

export class AppComponent {
  ...
  trackByItemId( index, item ) {
    console.log("TrackBy", item.item, "data using", index, "unique key.");
    return( item.id );
  }
  ...
}
```

```html
<div *ngFor="let item of items; trackBy:trackByItemId">
  {{item.name}}
</div>
```

PS: If you like to see this code running, please access the [plunker with this example using Angular2][plunker-angular-2].

## Conclusion

As you can see the benefits around start an application with simple best practices is really powerful. In some specific cases this change can decrease substantially the resource consumption.

Thank you and see you soon!

Links:

- Angular `ngRepeat` documentation: [https://docs.angularjs.org/api/ng/directive/ngRepeat][ng-repeat-docs]
- `Duplicate Key in Repeater` error: [https://docs.angularjs.org/error/ngRepeat/dupes][ng-repeat-dupes]
- Angular2 - If you are using Angular2, use `ngForTrackBy` in ngFor...PLEASE!: [http://embed.plnkr.co/oi0OIzoJA9o6ppiMEjQM/][plunker-angular-2]
- Angular1 - Use `track by` in ngRepeat...PLEASE!: [https://embed.plnkr.co/vIZP3U/][plunker-angular-1]

[ng-repeat-docs]:https://docs.angularjs.org/api/ng/directive/ngRepeat
[ng-repeat-dupes]:https://docs.angularjs.org/error/ngRepeat/dupes
[plunker-angular-2]:http://embed.plnkr.co/oi0OIzoJA9o6ppiMEjQM
[plunker-angular-1]:https://embed.plnkr.co/vIZP3U
