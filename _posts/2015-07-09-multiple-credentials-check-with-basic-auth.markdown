---
layout: post
title: "Multiple credentials check with Basic Auth"
categories: "nodejs, javascript, backend"
tags: "nodejs, javascript, backend"
status: publish
lang: "us"
type: post
published: true
meta: {}
author: Will Mendes
---

## INTRODUCTION

The idea of this post is be simple, but helpful. In a specific app was needed a first check based in http authentication via browser based in first page load and in some user operations.

There are a lot of node package that give for us a API with certain contracts, but jus based in only one user credentials.


## BASIC-AUTH MIDDLEWARE

This idea uses the [HTTP Basic access authentication][basic-access-authentication] implementation, that is a simplest technique for enforce access controls to web resource. This approach uses static and standard fields passed in requests via HTTP headers. Because this doesn't require cookies, session identifier or login pages.

For attend this specifications, we will use the [basic-auth node package][basic-auth]. This is very simple, but not attend our specs by default, so one approach is create an abstraction for this module.

For this case we will use this abstraction, passing via callback for requests that need check user(s).

{% gist willmendesneto/5af17f5ef8f1c3957a2c %}


## CONCLUSION

This approach is very simple and it's not recommended if you need of a high level of security. But in some cases that you need check user credentials in one more layer (checking in other layers/ways too) can be very useful.

Thanks and see you soon!

Links:

* Basic-Auth: [http://github.com/jshttp/basic-auth][basic-auth]
* Basic Access Authentication: [https://en.wikipedia.org/wiki/Basic_access_authentication][basic-access-authentication]

[basic-auth]:http://github.com/jshttp/basic-auth
[basic-access-authentication]:https://en.wikipedia.org/wiki/Basic_access_authentication
