---
status: "active"
title: "Optimize Thread Usage in Vitest for CI/CD Environments"
description: "This is a test"
date: '2025-02-24T00:00:00.000Z'
path: /posts/optimize-thread-usage-in-vitest-for-ci-cd-environments
category: "post"
lang: en
layout: post
author: Wilson Mendes
tags: ['frontend', 'test', 'open-source', 'vite', 'vitest', 'tooling', 'performance', 'architecture']
---

![](./vitest-optimized.jpg)


### Introduction

When working with tests in a CI/CD environment, it’s common to face challenges related to performance and efficient resource usage. A recurring issue involves Vitest’s default configuration for the number of threads, which can cause memory problems, especially in virtualized or shared environments like Kubernetes runners. As a result of that, your test suite might be ending up failing intermentently.

In this article, we’ll explore a practical solution to this problem using Vitest’s `poolOptions` configuration, ensuring efficient and adaptable test execution regardless of the environment.

---

## The Problem with Default Thread Configuration

Vitest uses threads to parallelize test execution, with its default configuration based on the number of CPU cores available. While this works well in local environments, detecting the number of cores can be problematic in CI/CD runners.

Let's take a real scenario as example: for instance, in an [**m7i.2xlarge** AWS EC2 instance with 32 available cores](https://cloudprice.net/aws/ec2/instances/db.m7i.2xlarge), Node.js detects all cores even if the runner has only 3 cores allocated. This can lead to:

- Excessive memory usage
- Unexpected failures due to overloading
- Wasted time and resources troubleshooting the environment

---

## The Solution: Dynamically Configuring via `poolOptions`

The solution is to dynamically configure the number of threads used by Vitest based on the environment. Below is an example of how to adjust this configuration:

```javascript
import { defineConfig } from 'vitest';
import { loadEnv } from 'vite';
import os from 'os';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  // Read the number of available CPUs
  const cpus = os.cpus().length;

  /**
   * In CI environments, Node.js detects all cores in the Kubernetes node,
   * instead of just those allocated to the runner. This can cause memory
   * issues. The configuration below adjusts the number of threads to 1/4
   * of the detected cores in CI environments, optimizing performance.
   */
  const osThreads = env.CI ? cpus / 4 : undefined; // Locally, default behavior is used

  return {
    ...(env.CI && {
      pool: 'threads',
      poolOptions: {
        threads: {
          minThreads: osThreads,
          maxThreads: osThreads,
        },
      },
    }),
  };
});
```


### That’s all for now

As you can see, this configuration dynamically adjusts thread usage based on the environment, optimizing performance while preventing excessive memory consumption. So that, you won't need to worry which environment you're running your test suite since the test runner will adapt its own tasks based on available resources for it!

Thread configuration in Vitest might seem trivial, but it can lead to significant issues in CI/CD environments when misconfigured. By following the approach described in this article, you can optimize resource usage and ensure your tests run reliably and efficiently, regardless of the environment.

## References

- [Vitest Documentation: Default Pool and Pool Options](https://vitest.dev/guide/migration.html#default-pool-is-forks)
- [Discussion on Vitest Issue #1674](https://github.com/vitest-dev/vitest/issues/1674)

I hope you enjoyed this reading as much as I enjoyed writing it. Thank you so much for reading until the end and see you soon!

<hr />

### Cya 👋
