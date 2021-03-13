---
status: "active"
title: Practical Chrome Devtools — Common commands & Debugging
description: >-
  Chrome DevTools is a set of tools that can help you edit, measure and audit
  pages, diagnosing problems quickly, which ultimately helps you…
date: '2019-09-02T06:09:22.005Z'
path: >-
  /posts/practical-chrome-devtools-common-commands-debugging
category: "post"
lang: en
layout: post
author: Wilson Mendes
tags: ['frontend', 'debugging', 'chrome', 'tips']
---

![](https://cdn-images-1.medium.com/max/2560/1*MjtZabdd0xkWLT-i9HxmAw.png)

Part 2: [Practical Chrome Devtools — Performance](http://willmendesneto.com/posts/practical-chrome-devtools-performance)

<hr/>

Chrome DevTools is a set of tools that can help you edit, measure and audit pages, diagnosing problems quickly, which ultimately helps you build better websites, faster. This is a summary of the most useful features of this powerful toolset that will help you in your daily basis work.

### Command palette for the rescue

The Command Menu palette will give you a fast way to navigate the Chrome DevTools UI and choose the task. With the Devtools open, type **cmd + shift + p** to activate it and start typing in the bar to find the command you want to run or type `?` to see all the available commands.

![](https://cdn-images-1.medium.com/max/800/1*KsF6UxnHMi0u4iSV3O9GfQ.gif)

Some useful commands:

`> performance monitor` will show the performance monitor with relevant information such as CPU, JS Heap size and DOM nodes.

`>show frames per second` adds a display with Frame Rate, CPU Memory and GPU Raster

![](https://cdn-images-1.medium.com/max/800/1*wm4m8azhDaEO1UoqX5dIPw.gif)

### Debugging strategies

The most common options are the line of code breakpoints which is used when you know the exact region of code that you need to investigate and the XHR having the debugger triggered when the Request matches with your specified string content.

I'll talk more about other options to debug your code, and sometimes third-parties (E.G. widgets, ADS and other external contents loaded in your web app).

### DOM Changes

This option can be used when you want to check for some changes in the DOM for a specific element. These are the types of DOM change breakpoints:

*   **Subtree modifications**. Triggered when a child of the currently-selected node is removed or added, or the contents of a child are changed.
*   **Attributes modifications**: Triggered when an attribute is added or removed on the currently-selected node, or when an attribute value changes.
*   **Node Removal**: Triggered when the currently-selected node is removed.

![](https://cdn-images-1.medium.com/max/800/1*CHsvoTw_IHn5GumY-WC_qg.gif)

### Blackbox scripts

Useful in case you need to debug something in your application, but it shows the trace in non-relevant files, such as third-parties (Stack Traces coming from Javascript frameworks and libraries, Advertisements, etc.). To avoid that and keep your focus on the code you care about, open the file in sources or network tabs, right-click and choose **Blackbox Script**.

![](https://cdn-images-1.medium.com/max/800/1*DnFr33FxVAvod0dBM50e2w.gif)

### Event listener

Use event listener breakpoints when you want to pause on the event listener code that runs after an event is fired. You can select specific events, such as `click`, or categories of events, such as all mouse events.

1.  Click the **Sources** tab.
2.  Expand the **Event Listener Breakpoints** pane. DevTools shows a list of event categories, such as **Animation**.
3.  Check one of these categories to pause whenever any event from that category is fired, or expand the category and check a specific event.

![](https://cdn-images-1.medium.com/max/800/1*n1G6DcUvEUhovwp3Nzz0Kw.gif)

### Local overrides

Local Overrides allows you to make the changes made locally **persistent**. It's really useful in case you want to check for changes in your code, try using **prefetch**/**preload** techniques and other improvements without sending your code to production.

*   Create a folder to add your override content locally;
*   Open **Sources > Overrides > Enable Local Overrides**, choose your local folder for your overrides
*   Open **Network**, chose the file you want to override. Right-click and chose the option **save for override**
*   Back to **Sources** tab, check your file, apply the changes and enjoy 🎉

![](https://cdn-images-1.medium.com/max/800/1*PSzusa7pJnnI4RD_6ltyYA.gif)

<hr/>

### Conclusion

These are some of the features there are really useful for debugging purposes. For sure there are lots of other features in Chrome Devtools that can be used to improve our web apps, resulting in better and faster pages.

What about you? It’s time to share what are you doing to improve your debugging flow. Next post will share some tips and tricks about performance (measurement and improvements) using Devtools.

I hope you enjoyed this reading. Thank you so much for reading until the end and see you soon!

**Cya** 👋
