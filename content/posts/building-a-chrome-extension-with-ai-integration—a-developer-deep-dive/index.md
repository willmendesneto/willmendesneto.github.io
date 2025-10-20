---
status: "active"
title: "Building a Chrome Extension with AI Integration — A Developer Deep Dive"
layout: post
author: Wilson Mendes
date: '2025-10-09T09:13:00.419Z'
path: /posts/building-a-chrome-extension-with-ai-integration—a-developer-deep-dive/
category: "post"
lang: en
tags: ['frontend', 'chrome-extension', 'javascript', 'ai', 'gemini', 'manifest-v3', 'prompt-engineering']
---
![](./chrome-extension.png)


> TL;DR; Feel free to check the repo [PDP AI: LLM-generated for Merchandisers](https://github.com/willmendesneto/pdp-ai-chrome-extension)🎉

### Introduction

This project combines two of my favorite areas — **frontend architecture** and **applied AI** — to create something genuinely useful: a Chrome extension that uses **Gemini AI** to analyze and optimize **Product Detail Pages** (the meaning of the acronym _PDPs_ used in this blogpost) for both SEO and UX.

If you've worked on e-commerce before, you know PDPs can make or break conversions. They're also notorious for being hard to optimize efficiently: changing metadata requires SEO and dev alignment, and UX improvements often demand multiple review loops.

The extension, **"PDP AI: LLM-generated for Merchandisers,"** aims to reduce this friction by using an LLM as a live consultant — it reads the current page, generates optimized content, and applies it instantly to the DOM so merchandisers can preview improvements in context.

---

### Motivation & Core Problem

In e-commerce, few things move slower than merchandising feedback loops. Optimizing a Product Detail Page (PDP) typically requires back-and-forth cycles between copywriters, SEO teams, and developers. Every iteration can take days.

> The main goal here is to **optimize** that cycle using the best tools for it.


The project — [PDP AI: LLM-generated for Merchandisers](https://github.com/willmendesneto/pdp-ai-chrome-extension) — is a Chrome extension that uses [Google Gemini](https://gemini.google.com/app) to analyze a live PDP, suggest optimizations for both SEO (metadata) and CX (content clarity), and apply those suggestions instantly to the DOM.

It’s a deep experiment in bridging three complex systems:

- The restrictive security model of Manifest V3
- The analytical power of LLMs
- The unpredictable structure of e-commerce frontends

The architectural challenge: perform high-stakes operations (network calls, content rewriting, DOM mutation) within Chrome’s isolation rules — without leaking API keys or violating MV3’s sandboxing.

### Architecture Breakdown: A Layered Communication Model 🔐

Manifest V3 enforces strong process isolation, which means your extension can’t just "fetch" from the page. Each file has to own a single responsibility. Here’s how this one’s wired:

| Component          | File(s)                               | Responsibility                                                                                                                                                                           |
| :----------------- | :------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Service Worker** | `background.js`                       | The brain. Handles Gemini API requests, parses structured responses, and manages API keys via `chrome.storage.local`. Never touches the DOM.                                             |
| **Content Script** | `content.js`                          | The bridge. Listens for messages from the injected script and forwards HTML to the service worker via `chrome.runtime.sendMessage`. Receives AI results and sends them back to the page. |
| **DOM Updater**    | `dom-updater.js`                      | The executor. Runs in the **main world**, applying AI-generated updates directly to the live DOM. Operates on selectors returned by the model.                                           |
| **Popup UI**       | `popup.html`, `popup.js`, `popup.css` | The control center. Lets users trigger the process, shows loading states, and visualizes before/after content with reasons for each suggestion.                                          |
| **Settings Vault** | `options.html`, `options.js`          | Securely stores the Gemini API key; it’s never shared with page scripts.                                                                                                                 |

This message-passing pattern ensures a clear separation of trust boundaries — inspired by Chrome’s own [Extension Architecture](https://developer.chrome.com/docs/extensions/mv3/architecture-overview) guidelines.

---

### Prompt Engineering: Making Gemini a Structural Analyst 🧠

> You can know more about Prompt Engineering usage, best practices, validation and more by checking [Prompt Engineering for Developers](https://developers.google.com/machine-learning/prompt-engineering) link

The **prompt** inside `background.js` is arguably the real "code." It defines what the model does, how it should format its output, and what constraints it must follow.

We didn’t just want *creative text*. We wanted **machine-composable output** — JSON objects with selectors and reasons.

**Example excerpt:**

```json
"body": {
  "originalDescription": {
    "text": "…",
    "selectors": [".product-description", "#pdp-desc"]
  },
  "newDescription": {
    "text": "Optimized, detailed text with feature highlights",
    "reason": "Adds clarity and key phrases for SEO"
  }
}
```
This is the _Machine-Composable Response Format_ — a predictable JSON schema designed to make the AI’s output safe for programmatic consumption. The idea of the contract was to apply something similar to Model Context Protocol (MCP) server response approach. So that we can also add this flexibility on the product to move into different directions and integrations, if relevant - and it will!

> To know more about MCP's please check the [Model Context Protocol Documentation](https://modelcontextprotocol.io/docs/getting-started/intro)

Key rules enforced through prompt constraints:

1. **Delegated scraping:** Instead of writing brittle DOM extraction logic, the model receives the entire HTML and returns both extracted data and CSS selectors. This makes it resilient to different PDP layouts. It will also enable us to enrich the AI model context in a short future as soon as the project grows
2. **Length & clarity constraints:**
   * `<head>` fields respect SEO standards — *title ≤ 60 chars*, *meta description ≤ 160 chars*.
   * `<body>` content prioritizes completeness and persuasion — no summarizing away details.
3. **Explainability:** Each suggestion carries a `reason`, improving transparency for merchandisers.

<hr />

### The JSON Contract & Security Design

The JSON schema doubles as the **API contract** between AI and code. The service worker expects this structure, validates it, and passes it down through `chrome.tabs.sendMessage`.

The DOM updater (`dom-updater.js`) then safely loops through the selectors to replace content — updating `<title>`, `<meta>` tags, and customer-facing text nodes.

Because only the updater runs in the main world, the API key and AI logic never cross into unsafe territory — crucial for compliance with Manifest V3’s [Content Script Isolation](https://developer.chrome.com/docs/extensions/mv3/content_scripts/#execution-environment).

---

### UI Feedback Loop: Closing the Human-in-the-Loop Circle

The popup UI acts as a **visual diff viewer**. It shows:

* Original vs. AI-suggested text
* The reasoning for each recommendation
* Real-time updates applied to the live page

The HTML/CSS implementation (`popup.html` + `popup.css`) keeps everything compact and responsive, emphasizing clarity for non-technical users while staying developer-friendly for debugging.

---

### Lessons Learned

1. **Your prompt *is* the software contract.**
   A well-defined schema transforms generative AI from "black box" to "deterministic API." We treated prompt engineering like interface design.

2. **Separation of concerns beats convenience.**
   Each script has one clear boundary. This made debugging trivial — we could trace data from page → service worker → Gemini → page without crossing trust zones.

3. **LLMs can be reliable scrapers — if you guide them.**
   By providing context ("analyze HTML, return selectors"), the model performed robust structural analysis that would take hundreds of regexes to reproduce.

4. **Manifest V3’s restrictions are features, not bugs.**
   They forced a cleaner, message-driven architecture that’s more secure and modular.


<hr />

### References & Further Reading

* [Chrome Extensions Manifest V3 Docs](https://developer.chrome.com/docs/extensions/mv3/)
* [Google Gemini API Reference](https://ai.google.dev/api/rest/v1beta/models/gemini-2.0-flash)
* [Prompt Engineering for Developers](https://developers.google.com/machine-learning/prompt-engineering)
* [PDP AI: LLM-generated for Merchandisers](https://github.com/willmendesneto/pdp-ai-chrome-extension)

With this structure and the hyphotesis raised for this experiment, the initial validation for the extension was a success, turning **days of merchandising iteration into seconds** integrating both of worlds: all the power of AI with and the real visualization of the changes via PDP extension.

Take that as some food for though! What started as an experiment in Chrome’s sandbox evolved into a modular AI-powered workflow — one that lives entirely client-side, yet feels like a co-pilot for every product manager and SEO specialist.

### That’s all for now

I hope you enjoyed this reading as much as I enjoyed writing it. Thank you so much for reading until the end and see you soon!

🚀🚀🚀🚀🚀🚀

<hr />

### Cya 👋
