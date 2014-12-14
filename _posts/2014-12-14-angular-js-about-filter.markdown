---
layout: post
title: "AngularJS: About $filter"
categories: javascript angularjs frontend frameworks architecture
tags: javascript angularjs management version control frontend
status: publish
lang: "us"
image: http://i1098.photobucket.com/albums/g379/farazi482/AngularJS-filters.png
type: post
published: true
meta: {}
author:
---

<a class="page-link" href="{{ '/2014/12/08/angular-js-sobre-filter/' | prepend: site.baseurl | replace: '//', '/' }}">Read the Brazillian Portuguese version</a>


## INTRODUCTION

In this post we will talk about filter concepts and how is the interface `$filter` flux in AngularJS. Offcourse, this is the first, but the idea isn't make it something like the [Building your own AngularJS ][building-angularjs] (and I don't have this pretension), but in something that share initially some good tips, fundamentals and cool aspects, showing more than "overview" in some approaches with these points for only one simple reason:

> "Good knowledge is shared knowledge"



## ABOUT

The filters concept is something very cool that the framework already brings in your core. This is helpful for the interface provided by AngularJS can be used in all locations of your application, whether html templates, services, directives, controllers, etc. We can already use some filters previously created by default, such as:

- `currency`: for values. Formats a number for the currency format. When no symbol is supplied, uses the standard symbol for the site as standard;
- `date`: for date formatting. Based on the last parameter can return a date in a specific format;
- `filter`:  standard filter to search in string, JSON objects or ArrayObjects;
- `json`: to transform a value in json. used to transform Javascript objects in a JSON string;
- `limitTo`: Creates a new array / string with a specified number of elements previously. The elements are stripped from the beginning or the end of the source array, number or string, specified by the value and sign (positive or negative for order verification). If a number is used as input, it is converted to a string.
- `lowercase`: lowercase characters conversion;
- `number`: Formatting numbers;
- `orderBy`: Sort in alphabetical or numerical order. If numbers worth noting if they are actually being saved as numbers and not strings, as this may affect the ordering;
- `uppercase`: uppercase characters conversion;

When use in html template, the filter accept some verifications such as:

- `+`: Sum or concatenate. Uses the `additive` method;
- `-`: Decreases. Uses the `additive` method;
- `*`: Multiplies. Uses the `multiplicative` method;
- `/` : Divide. Uses the `multiplicative` method;
- `%`: Returns the remainder of the division. Uses the `multiplicative` method;
- `===`:  Compares with typing check. Uses the `equality`;
- `!==`: ompares with typing check. Uses the `equality`;
- `==`: Compares without typing check. Uses the `equality`;
- `!=`: Compares without typing check. Uses the `equality`;
- `<`: Less than. Uses the `relational`;
- `>`: Greater than. Uses the `relational`;
- `<=`: Less than or equal. Uses the `relational`;
- `>=`: Greater than or equal. Uses the `relational`;
- `&&`: AND. Uses the `logicalAND`;
- `||`: OOR. Uses the `logicalOR`;
- `!`:  Changes the value (force for boolean type). Uses the `unary`;
- `=`: Assign the value of the second to first. Uses the `assignment`;
- `|`: Returns the boolean `true`;

All these operators are configured in `OPERATORS` variable. If you would like to know more about comparation operators, the AngularJS project references the [MDN documentation "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators"][mdn-comparison-operators]


And escape some special characters , as:

- `\n`;
- `\f`;
- `\r`;
- `\t`;
- `\v`;
- `'`;
- `"`;

All these operators are configured in `ESCAPE` variable. If you would like to know more please take a look in angularjs final code and search for this variable.

## ARCHITECTURE AND DESIGN PATTERN

Some design patterns are implemented in angularjs, some these aren't so well known. Conceptually speaking, a filter receives a flow (data stream) as input and produces a characters stream as output. Further filters can be parameterized. The Official definition for filters found on the official site AngularJS is:

> "Selects a subset of items from array and returns it as a new array."

The particular set of rules applied defines an architectural style known as [Pipe-and-Filter] [pipe-filter-pattern]. The Pipe-and-filter is based on flow/stream data, and filters that can operate concurrently or not. In other words, can or cannot wait for the producer end to the component that consumes the output of the producer start your operation.

In this architecture context, the pipe character (`|`) is one way to connect two filters, where the first filter output is connected in second input (which led to the architecture name). Knowing filters and pipes used can easily understand its operation and/or create other based on combinations.

Now a simple example using multiple filters combined. A given number, we want it to return your value as a Roman number. If we think that we have already created two filters can do the following combination. In our template its use would be as follows:

{% highlight html linenos %}

<tr>
    <!-- Returns "X" -->
    <td> { { '10' | returnOnlyNumbers | formatForRomanNumbers } }</td>
</tr>

{% endhighlight %}

We can see some methods of Angular that demonstrate the operation of this architecture, such as:

filterChain` ': Call combined filters using chainning mthods, which is a fluent API type and also uses the  `filter` method internally. If you want to know more about this concept, [I recommend Smashing Magazine article "Designing Better JavaScript APIs"] [fluent-api-smashing-magazine].

{% highlight javascript linenos %}

filterChain: function() {
    var left = this.expression();
    var token;
    while ((token = this.expect('|'))) {
      left = this.filter(left);
    }
    return left;
  },

{% endhighlight %}

`filter`: Method that deals with all passed values from filter and returns the final value.

{% highlight javascript linenos %}

filter: function(inputFn) {
    var fn = this.$filter(this.consume().text);
    var argsFn;
    var args;

    if (this.peek(':')) {
      argsFn = [];
      args = []; // we can safely reuse the array
      while (this.expect(':')) {
        argsFn.push(this.expression());
      }
    }

    var inputs = [inputFn].concat(argsFn || []);

    return extend(function $parseFilter(self, locals) {
      var input = inputFn(self, locals);
      if (args) {
        args[0] = input;

        var i = argsFn.length;
        while (i--) {
          args[i + 1] = argsFn[i](self, locals);
        }

        return fn.apply(undefined, args);
      }

      return fn(input);
    }, {
      constant: !fn.$stateful && inputs.every(isConstant),
      inputs: !fn.$stateful && inputs
    });
  },

{% endhighlight %}

Knowing that the filters are only functions which transform the input to some requested output. However filters need of a dependency injection. Because this, filters consist of a factory function (which is already provided internally by AngularJS) with annotations of your dependencies and this is where the `$ filterProvider` is presented to us from `$ filterProvider.register()` method.



## BEST PRACTICES

There are many style guides talking about it, but remember that everyone is walking side by side with the documentation of Angular and feedback based on their use in projects.

Recently was approached something that works on, but it wasn't right. In one of the issues openned on AngularJS Github repository was discussed a scenario which uses the concept of namespaces (like jQuery namespace "my.awesome.namespace"). This scenario was possible until the 1.3.2 version of the framework and beyond this format version did not work properly.

This issue raised a very interesting discussion, finished with something that was correct, but that wasn't included in filters documentation that we must be not use special characters to define the filter name. If you would like to track more information about the discussion [worth giving a look at issue #10110 addressing this topic] [ng-filter-issue].

If you use a $filter with another filter dependencies or use a filter with strategy pattern is simple as well, since you will have to test all filters and parameters. An example of a filter with this strategy pattern is dates. We know that the $filter already has a default filter by date, but in an app that supports multi-language, you could use the following format (it's just a example. We have better ways to use this functionality):

{% highlight javascript linenos %}

angular.module('filters', [])
    // Call all filters
    .filter('strategyMoneyFilter', function ($filter) {
        return function (attribute) {
            return $filter('moneyFormat' + (attribute.country.toUpper() || 'BR'))(attribute.value);
        };
    })
    // Brazillian format
    .filter('moneyFormatBR', function () {
        return function (val) {
            // trato e retorno o formato com base no país
        };
    })
    // US format
    .filter('moneyFormatUS', function () {
        return function (val) {
            // trato e retorno o formato com base no país
        };
    })
    // EU Format
    .filter('moneyFormatEU', function () {
        return function (val) {
            // trato e retorno o formato com base no país
        };
    });

{% endhighlight %}

This way, with only one parameter we can use the best of each parameter and this can be easily worked in javascript, since instead of if's what define the data stream output format is an information passed to your filter and this information may come from a database, for example!



## PERFORMANCE

Another nice aspect is the performance in your app. But i'm not speak about issues such as not using the two-way data binding in some application points that will not possess any kind of interaction/modification or more basic questions such as minimize the binds/watches.

The filter can be used in many places in your application, such as Controllers, Services and in your html files too. But we must think quite the best approach based on what our apps need. If the application will only have some interaction with the $filter based on some user interaction (a button click, for example) there is no why of we leave the filter on our html template. We could use events linked that are activated in the interactions, for example. So we would spend the values previously manipulated  for the format we expect and in any interaction on application it would be treated only in a single point of application, not to mention that we can use a better approach with code abstractions to do this. AngularJS uses the dependencie injection in a transparent way and we must use it the best way possible.



## TESTS

Testa ire importants in your application in many aspects. i'm not speak "why to tests your application", but if you want to delve advise [content produced for Caelum by Maurice Aniche, a Brazillian reference when it comes to Software Testing] [links-tests]. A test format for custom filters is shown in [tutorial provided by the official website's project] [ng-tutorial-filter]. In this tutorial we have the code example and your tests, respectively. Based on it we can have a north of how to test our filters.

{% highlight javascript linenos %}

// phonecatFilters.js
angular.module('phonecatFilters', []).filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
});

{% endhighlight %}

Based on the custom filter `phonecatFilter` previously created, now let's take a look at your test code.

{% highlight javascript linenos %}

// phonecatFiltersTest.js
describe('filter', function() {

  beforeEach(module('phonecatFilters'));

  describe('checkmark', function() {
    it('should convert boolean values to unicode checkmark or cross', inject(function(checkmarkFilter) {
      expect(checkmarkFilter(true)).toBe('\u2713');
      expect(checkmarkFilter(false)).toBe('\u2718');
    }));
  });
});

{% endhighlight %}


### CONCLUSION

We learned some cool architecture, patterns, best practices and performance aspects when using $filter in a AngularJS application.

I hope you enjoyed reading this and has been useful for you. Feedbacks are always welcome =)

Thanks and see you soon.

Links:

* Structure application proposal: [https://github.com/yeoman/generator-angular/issues/109][angularjs-structure-yeoman-issue]
* Pipe-and-filter pattern: [http://webcem01.cem.itesm.mx:8005/apps/s200911/tc3003/notes_pipes_and_filters/][pipe-filter-pattern]
* Building your own AngularJS: [http://teropa.info/build-your-own-angular][building-angularjs]
* AngularJS Issue #10110: [https://github.com/angular/angular.js/issues/10110][ng-filter-issue]
* MDN Documentation "Comparison Operators": [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators][mdn-comparison-operators]
* Tests: [http://tdd.caelum.com.br/][links-tests]
* Documentation [https://docs.angularjs.org/tutorial/step_09][ng-tutorial-filter]
* Smashing Magazine "Designing Better JavaScript APIs": [http://www.smashingmagazine.com/2012/10/09/designing-javascript-apis-usability/][fluent-api-smashing-magazine]


[gdg-salvador-link]: https://plus.google.com/109551746919819088573/posts
[angularjs-structure-yeoman-issue]: https://github.com/yeoman/generator-angular/issues/109
[pipe-filter-pattern]: http://webcem01.cem.itesm.mx:8005/apps/s200911/tc3003/notes_pipes_and_filters/
[building-angularjs]: http://teropa.info/build-your-own-angular
[ng-filter-issue]: https://github.com/angular/angular.js/issues/10110
[mdn-comparison-operators]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators
[links-tests]: http://tdd.caelum.com.br/
[ng-tutorial-filter]: https://docs.angularjs.org/tutorial/step_09
[fluent-api-smashing-magazine]: http://www.smashingmagazine.com/2012/10/09/designing-javascript-apis-usability/
