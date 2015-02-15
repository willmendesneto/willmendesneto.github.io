---
layout: post
title: Using ng-class and css for create an animated block widget
categories: javascript angularjs frontend frameworks architecture
tags: javascript angularjs management version control frontend
status: publish
image: http://www.bennadel.com/resources/uploads/2013/feelings_about_angularjs_over_time.png
type: post
lang: "us"
published: true
meta: {}
author:
---

<a class="page-link" href="{{ '/2014/09/20/usando-ng-class-e-css-para-criar-um-widget-de-bloco-animado/' | prepend: site.baseurl | replace: '//', '/' }}">Read the Brazillian Portuguese version</a>


## INTRODUCTION

This is a simple post, but based in a questioning. Who uses AngularJS know the "ngAnimate", a module for manage animations in applications that use the framework. However this time we will use animations CSS3 and "ngClass" directive only for create an animated block animated example.

Something simple, but usual and will show that not always we need use a full/complex module for improve the intereaction in application, reducing module management complexity and upgrading performance, since the animation module uses javascriot for animations and load one more module for application too, in other words, one more request in browser. But before we will talk more about the technologies used for finish with an practice example using them.



## HTML5

Um one of your posts with a title ["HTML5 – W3C versus WHATWG"][maujor-post], Maujor, one reference when we deal with CSS and web, cite a WHATWG content that defines HTML5 in a very nice way.

> The WHATWG works on a number of technologies that widely get referred to by the buzzword "HTML5". They are organised somewhat arbitrarily based on the preferences of those editing the specifications for those technologies.

In other words, HTML5 is nothing more, nothing less than a combination between HTML5 + CSS3 + Javascript API's technologies, giving more possibilities for the Frontend of your application.



## NG-CLASS

NG Class is a directive of the AngularJS core framework that enable insertion and remotion of CSS classes in DOM elements based in parameters, managed for framework via controller, service and other elements, accessing values via `$scope` interface.

The `ngClass` directive definition is, based in framework oficial documentation:

> The ngClass directive allows you to dynamically set CSS classes on an HTML element by databinding an expression that represents all classes to be added.



## A PRATIC EXAMPLE: ANIMATED WIDGET

Now that each one was properly presented, we can finish with a very simple example: the widget animated. This block should be initialize "invisible" and, in button click event it will be visible or invisible, based in last event ( understand like a toggle event).

In this example basically we will use the ngClass for insert or remove a class, and in this class is linked the animation used for widget.

`index.html`

{% highlight html %}
<!DOCTYPE html>
<html ng-app="plunker">

  <head>
    <meta charset="utf-8" />
    <title>AngularJS Plunker</title>
    <script>document.write('<base href="' + document.location + '" />');</script>
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="main.css">
  </head>

  <body class="fundo-form" ng-controller="PlunkerCtrl">
    <div class="container">
      <button ng-click="visible = !visible;">{{ !!visible ? 'Inv' : 'V' }}isible</button>
    </div>
    <div class="widget-content" ng-class="{'is-visible': visible}">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis, quam accusantium iure harum autem id ex sit nemo officiis veritatis earum voluptas perspiciatis dolor quaerat ipsum odio culpa similique alias.
    </div>

    <script data-require="angular.js@1.0.x" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.3/angular.min.js" data-semver="1.0.8"></script>
    <script src="app.js"></script>

  </body>

</html>
{% endhighlight %}

`main.css`
{% highlight css %}

[ng\:cloak], [ng-cloak], [data-ng-cloak], [x-ng-cloak], .ng-cloak, .x-ng-cloak {
    display: none !important;
}
.widget-content{
  position: fixed;
bottom: 0;
width: 100%;
height: 0px;
background: #251b15;
color: #CCCCCC;
font-size: 0.8em;
border: none;
  -webkit-transition: height 0.5s ease-in-out;
  -moz-transition: height 0.5s ease-in-out;
  -o-transition: height 0.5s ease-in-out;
  transition: height 0.5s ease-in-out;
}

.widget-content.is-visible {
  height: 300px;
    -webkit-transition: height 0.5s ease-in-out;
    -moz-transition: height 0.5s ease-in-out;
    -o-transition: height 0.5s ease-in-out;
    transition: height 0.5s ease-in-out;
}
{% endhighlight %}

`app.js`
{% highlight javascript %}
var app = angular.module('plunker', []);

app.controller('PlunkerCtrl', function ($scope) {
});
{% endhighlight %}

You can take a look an example with this code [in my plunker][plunker-example].



## CONCLUSION

The idea of this post is, first, to present the `ngClass` directive and show the power in combine technologies that together form what is called HTML5. Also an important point is to have critical sense when we use components, libraries and other elements in our application, as there are other important aspects of an application, such as performance, number of request and others.

Thanks and see you soon.

Links:

* Documentation of "ngClass" directive: [https://docs.angularjs.org/api/ng/directive/ngClass][ngclass-doc]
* CSS3 Animations: [http://www.w3.org/TR/css3-animations/][css3-doc]
* Post "HTML5 – W3C versus WHATWG" by Maujor:[http://www.maujor.com/blog/2014/08/05/html5-w3c-versus-whatwg/][maujor-post]

[css3-doc]:http://www.w3.org/TR/css3-animations/
[ngclass-doc]:https://docs.angularjs.org/api/ng/directive/ngClass
[plunker-example]:http://plnkr.co/edit/jrROjT?p=preview
[maujor-post]:http://www.maujor.com/blog/2014/08/05/html5-w3c-versus-whatwg/
