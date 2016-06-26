---
layout: post
title: "Unit test in Johnny-Five nodebot apps"
categories: frontend nodebots nodejs
tags: nodebots arduino nodejs
status: publish
lang: "us"
image: "/assets/images/nodebots-unit-test.png"
type: post
published: true
meta: {}
author: Will Mendes
---

# Intro

This time something simple, but without good information about it is how to add unit tests in Nodebots apps.

> Unit test? But this is not a new thing

Yes, you're right, but you can find few contents about this topic in arduino, robots and open hardware apps.

But relax ... this is not a big deal ;)


# Unit tests

Unit test is only one way to test your software. Based in the [test pyramid][test-pyramid] this is the way that you can organize the tests your application.

![Pyramid tests](/assets/images/pyramid.png)

> In this post we will talk only of unit tests, if you like to know more about all the layers, please read ["TestPyramid" post of Martin Fowler][test-pyramid]

The idea of the unit test is validate your code, make sure that your code is doing what it suppose to do and give you feedback about the errors fast (before your deploy pipeline steps) when the assertion fails.

The validation of this concept was in the [Build Checker repository][build-checker] and was really easy.

> If you like to know more about the project, please read
<a href="{{ '/2016/05/15/checking-your-build-in-snap-ci-via-nodebots-using-nodejs-and-arduino' | prepend: site.baseurl | replace: '//', '/' }}">"Checking your build in SNAP-CI via nodebots using NodeJS and Arduino"</a>


# What about nodebots?

One aspect that nobody explain very well is about the tests in nodebots. The main goal in this case is create the electric mocks and stubs and simulate the communication between components.

One useful package is [mock-firmata][mock-firmata], created by Rick Waldron to make the tests in [Johnny-Five][johnny-five] easier. The integration is really simple, you just need to load and create your board component in the test.

```javascript
require('should');
var mockFirmata = require('mock-firmata');
var five = require('johnny-five');

var Board = five.Board;
var Accelerometer = five.Accelerometer;
var board = new Board({
  io: new mockFirmata.Firmata(),
  debug: false,
  repl: false
});
```

After the integration, the unit tests is using mocha test framework (but you can use others, if you like), [sinon js][sinon-js] in test spies, stubs and mocks and [should js][should-js]  for the assertions.

One simple way to validation is when the build checker should blink the led. Basically you have to create a stub for the request (in this case using [request package][node-request]) for validate the response by expected types (`success` and `error`) and spy the led components.

After this is create the scenario for validate this case. Nothing really hard, right? Some things that you need to remember about the test is that your `beforeEach` method should be a documentation about the steps to reproduce your scenario.

```javascript
require('should');
const request = require('request');
const sinon = require('sinon');

...
describe('When the CI server send success response', () => {
  beforeEach(() => {
    successResponseCI = `your awesome response`;

    this.clock = sinon.useFakeTimers();
    sinon.stub(request, 'get').yields(null, null, successResponseCI);
    sinon.spy(buildChecker.ledSuccess, 'on');
    sinon.spy(buildChecker.ledError, 'off');

    buildChecker.startPolling();
    this.clock.tick(CONFIG.INTERVAL);
  });

  afterEach(() => {
    request.get.restore();
    this.clock.restore();
  });

  it('should turn on the success led', () => {
    buildChecker.ledSuccess.on.calledOnce.should.be.true;
  });

  it('should turn off the error led', () => {
    buildChecker.ledError.off.calledOnce.should.be.true;
  });

});
...
```

After this you can add more tests and create your pipeline correctly, so you are sure that your code is covered. The final result is :

![Build Checker Code Coverage](/assets/images/build-checker-code-coverage.png)

*** This don't remove other validations, as validation with software, but it's another way to validate first the new features, updates, etc.


# Conclusion

As you can see the integration with unit tests is really easy and you can make sure that at least these cases are covered in your app. In this repository is integrated code coverage badge, code lint and more.

How about you? How you are using node js and unit tests? Are you testing your node js embedded applications? Share your experience!

Thank you and see you soon!

Links:

- Johnny-Five: [http://johnny-five.io][johnny-five]
- Test pyramid: [http://martinfowler.com/bliki/TestPyramid.html][test-pyramid]
- Mock Firmata: [https://github.com/rwaldron/mock-firmata][mock-firmata]
- Build Checker: [https://github.com/willmendesneto/build-checker][build-checker]
- Sinon JS: [http://sinonjs.org/][sinon-js]
- Should JS: [https://shouldjs.github.io/][should-js]
- Mocha JS: [https://mochajs.org/][mocha-js]

[johnny-five]:http://johnny-five.io
[test-pyramid]:http://martinfowler.com/bliki/TestPyramid.html
[mock-firmata]:https://github.com/rwaldron/mock-firmata
[build-checker]:https://github.com/willmendesneto/build-checker
[mocha-js]:https://mochajs.org/
[sinon-js]:http://sinonjs.org/
[should-js]:https://shouldjs.github.io/
[node-request]:https://github.com/request/request
