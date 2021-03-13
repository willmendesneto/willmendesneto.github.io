---
status: "active"
title: Dark Side Is In Our Blood — Dark mode in you pages using CSS Filters
description: "TL;DR; use these tips and get a dark mode in your web app. You can find a pull request adding the changes in this link Enjoy! \U0001F389"
date: '2020-07-06T19:49:10.124Z'
categories: []
keywords: []
path: >-
  /posts/dark-side-is-in-our-blood-dark-mode-in-you-pages-using-css-filters

category: "post"
lang: en
layout: post
author: Wilson Mendes
tags: ['frontend', 'css', 'javascript']
---

![](https://cdn-images-1.medium.com/max/2560/1*wVLiNqxa4OyomTMG8VaGbg.png)

> TL;DR; use these tips and get a dark mode in your web app. You can find a pull request adding the changes in [this link](https://github.com/willmendesneto/willmendesneto.github.io/commit/da46a0e4a22791861231cbbd481124367769e352) Enjoy! 🎉

### Dark mode and Web Accessibility: respecting the user's choice

We can see several pages with the dark-mode theme available for the users. This approach is more than design-only purposes but also covers usability and accessibility.

One of the most popular responses when you ask someone who is using dark-mode option on their web apps and/or their OS — operational systems — is that "it helps my eyes," or even "it’s elegant/neat/beautiful." However, Dark Mode developer documentation explicitly writes: "The choice of whether to enable light or dark appearance is an aesthetic one for most users, and might not relate to ambient lighting conditions."

Besides that, people with low vision can have some benefits having the option as well, preferring light text on a dark background by inverting the colors on the display, except for images, media, and some apps that use dark color styles. So that means your web app should support dark-mode if you're thinking and targeting accessibility.

> It’s more than a choice, it’s about to build a web for everybody.

![](https://cdn-images-1.medium.com/max/800/1*T4yacXhMVUhfCKpcgFrJAg.gif)

### Dark mode via CSS media query

Thinking about the web as a powerful platform it is, we should expect an easy and simple integration. In this section, we'll dive into the [**prefers-color-scheme**](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) media query and how we can use CSS to support dark mode.

The [**prefers-color-scheme**](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) media feature can detect if the user has requested the page to use a light or dark color theme via operational system configuration. It accepts _light_ or _dark_ as values to notify the page if the current user chooses a page that has a light or dark theme.

One of the common approaches used to implement this feature is by adding a CSS Filter in your page. When you add the _invert()_ CSS filter when it's dark and your background is white and your text is black, it inverts the colors.

> Please check the [**browser support for CSS Filter**](https://caniuse.com/#search=css%20filter) based in your browser support list before use it

`gist:willmendesneto/34f501c84d8562cbbce165af9f0094dd`

At the end, when the user system is with using dark-mode enabled, the page applies the rules added inside the media query content, so the background will be turned into black and the text will be white.

![](https://cdn-images-1.medium.com/max/800/1*5gGJBP_1RjhyIg-jQvtn1w.gif)

### Dynamic Dark-Mode Javascript

Your pages can integrate dark-mode using Javascript as a combination to do so. It's important to understand that CSS and Javascript will use different memory partitions in your browser, so your users could have some benefits in performance and usability by combining both approaches.

### Changing the theme by adding CSS classes

First of all, let's add a switch on the page to give the user the choice to toggle between light and dark modes. So when it's clicked, the page will be dark and by default, it will be using the light theme.

This is the HTML markup for the toggle that will be added in your page

`gist:willmendesneto/68cd8926941a6d5657c31de40627997c`

Besides that, we need to apply some changes in our CSS. Now it also has classes to define if the current theme on the page is light or dark by adding **light-mode** and **dark-mode** classes and the styles for Switch Toggle Element into our HTML element. This will be the CSS with these changes.

`gist:willmendesneto/344f4226cfd30e24027b7d8f6b96020d`

After these changes, let's write the Javascript to manipulate and add the class to our page. Firstly, we should check if window.matchMedia is available on the user’s browser. If it is, we can start the javascript manipulation.

Secondly, it should check if dark mode is enabled via OS on page load, so it can add the dark-mode class and trigger the toggle on the switch. If it's supported we'll check if the HTML element already has any class (on page-load it won't have any class on it) so it adds or switches between light and dark mode classes and triggers a change on the switch to keep aligned with the current theme state.

Another good point in this step is that it should change the Switch Toggle content to be visible in case the browser supports it. Otherwise, it will be hidden via CSS.

This is the final state for the Javascript integration.

`gist:willmendesneto/9e5b57e68b2b032de8212a6083b07019`

And this is the result of the switch to turn on and off your dark-mode in your page.

![](https://cdn-images-1.medium.com/max/800/1*dIp1YtdPuHqlU6NQ0XdsAA.gif)

### Listening for dark mode changes in OS

Now we can change slightly our javascript file to Adds a listener for dark mode changes via user system preferences. We can reuse the previous value for [**matchMedia**](https://caniuse.com/#search=matchMedia) method and add a listener to the changes.

`gist:willmendesneto/eb5e53905582757f982aa836b453c363`

### Adding better events

Another improvement you can apply is to use the better event listener for the current user device by using **touchstart** if is a mobile device. Otherwise, it will trigger based on the **click** event.

With all these changes, this will be the final version of the Javascript file.

`gist:willmendesneto/fe150b05fda7a6ced2624c1254305515`

<hr/>

### That’s all for now

It was great to write this blog post and see the evolution of the Web as Platform and how quick you can do amazing things like that — and even more if you like — in your pages.

If you like to know more about it, I'm applying this and other experiments on my personal website [**https://willmendesneto.github.io**](https://willmendesneto.github.io/), or check the pull request adding this feature on the [**Github repository of my personal website**](https://github.com/willmendesneto/willmendesneto.github.io/commit/da46a0e4a22791861231cbbd481124367769e352).

Last, but not least, this is one of the various approaches that can be used to support dark-mode in your app. In the end, most important than the approach is to add it, keeping in mind that:

> It can be Light or Dark mode, but more than this: let the users choose what’s best for them

<hr/>
I hope you enjoyed this reading as much as I enjoyed writing it. Thank you so much for reading until the end and see you soon!

![](https://cdn-images-1.medium.com/max/800/1*tT2KIJkX4dhynNYipnVNmg.gif)

### Cya 👋
