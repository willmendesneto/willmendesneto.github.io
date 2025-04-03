---
status: "active"
title: "Leveling Up React Hooks with TypeScript: A Wizard's Journey"
description: ""
date: '2025-04-02T00:00:00.000Z'
path: /posts/leveling-up-react-hooks-with-typescript-a-wizards-journey
category: "post"
lang: en
layout: post
author: Wilson Mendes
tags: ['frontend', 'test', 'open-source', 'vite', 'vitest', 'tooling', 'performance', 'architecture']
---

### Introduction

I want to share a real-world example of how embracing TypeScript can significantly improve your React hooks and overall codebase. We'll be diving into the evolution of [react-sweet-wizard](https://github.com/willmendesneto/react-sweet-wizard), a package I built to simplify form wizards - eventually called as Form Stepper or Form steps - in React. Think of it as a guided tour through the land of forms, but with less frustration and more type safety!

> For more details about React Sweet Wizard, why it was created, benefits, usage and more, please check the post [Introducing React Sweet Wizard: Simplifying the Form Flow of Your React App](https://willmendesneto.com/posts/introducing-react-sweet-wizard-simplifying-the-form-flow-of-your-react-app)

If you've ever wrestled with complex forms or multi-step processes in React, you know the struggle. Managing state and navigation can quickly become a tangled mess. That's where [react-sweet-wizard](https://github.com/willmendesneto/react-sweet-wizard) comes in. But as the project  and evolved, so did the need for better type safety and code maintainability.

Let's take a close look at the "before" and "after" scenarios in this repository, and walk through the 🪄 TypeScript magic 🪄 that made a world of difference.

### Initial Scenario and Type-Challenges implementing Wizard

Here's a snippet of the original implementation:

```tsx
// Defining initial state
// ❌ `steps` prop is not even typed
const initialState: WizardStepperReducerState = {
  activeStepIndex: 0,
  steps: [],
};
//...
// Original Context Creation
// ❌ Forcing empty object to avoid runtime, even though 
// the code should use nullable pattern to cover that
const WizardStepperContext = createContext({});
//...
// Original useWizardContext
export const useWizardContext = <T, _P = never>() => {
  const context = useContext(WizardStepperContext);
  // ❌ Runtime error if `context` value returns as `null` - which is a real scenario in some apps, but not here
  // ❌ Instead of check if `context !== null` or `!context` 
  // it uses `Object.keys(context).length === 0` which uses way more resources
  if (Object.keys(context).length === 0) {
    throw new Error(
      `Please make sure you're wrapping all the steps in a 'WizardProvider' component`
    );
  }
  // ❌ forcing type using `as`
  return context as WizardStepperContextProps<T>;
};
// ...
const goTo = useCallback(   
  // ❌ At this stage, `stepId` was not even typed 😱
  stepId => {
    dispatch({ type: 'GOTO_PAGE', payload: { stepId } });
  },
  [dispatch]
);
```

At first glance, it works. But dig a little deeper, and you'll find some type-related gremlins lurking.

- **Generic Context without Specific Types**: The WizardStepperContext was created without specific type parameters, leading to potential any pitfalls.
- **Loose Type Definitions**: The WizardStepperReducerState and Action types lacked precision, making it harder to catch errors early.
- **Assumptions and Type Casting**: The useWizardContext hook relied on type casting, which can hide underlying type issues.

### Type-Safe Wizard: improving Developer Experience and ergonomics

Now, let's fast-forward to the improved version:

```tsx
// ✅ Context now is using nullable pattern
const WizardStepperContext = createContext<WizardStepperContextProps<any> | null>(null);

// Improved useWizardContext
// ✅ Now the code is using generics and returning a `Readonly` context
export const useWizardContext = <T extends DefaultWizardStepProps>(): Readonly<WizardStepperContextProps<T>> => {
  const context: Readonly<WizardStepperContextProps<T>> | null = useContext(WizardStepperContext);
  // ✅ Type guard in action 🎉
  // ✅ Perf++ by checking `!context` instead of `Object.keys()`
  if (!context) {
    throw new Error(
      `Please make sure you're wrapping all the steps in a 'WizardProvider' component`
    );
  }
  return context;
};

// Generic type used in State and Actions
interface WizardStepperReducerState<T> {
  activeStepIndex: number;
  steps: T[];
}

type Action<T> =
  | { type: 'NEXT_PAGE' }
  | { type: 'PREV_PAGE' }
  | { type: 'GOTO_PAGE'; payload: { stepId: number | string } }
  | { type: 'SET_STEP_COUNT'; payload: { steps: T[] } };

// Improved goTo
const goTo = useCallback(
  // ✅ typed `stepId`
  (stepId: number | string) => {
    dispatch({ type: 'GOTO_PAGE', payload: { stepId } });
  },
  [dispatch]
);
```

Ok, so... what changed really? A lot, actually! Here are the key improvements and their benefits:

#### Generic State and Actions

```tsx
// ✅ `steps` is now typed 🎉
interface WizardStepperReducerState<T> {
  activeStepIndex: number;
  steps: T[];
}

type Action<T> = { type: 'SET_STEP_COUNT'; payload: { steps: T[] } };
```

Apply these code changes also improved type safety, reduced runtime errors, and better code predictability. Generics can be heavily used in this scenario, leading to consumers the responsibility to define specific types. Since this will be done on their end already to map this data, is even better to enforce this validation between project and package.

#### Typed Context

```tsx
// ✅ Applying generics and also using nullable pattern 
const WizardStepperContext = createContext<WizardStepperContextProps<any> | null>(null);
```

Enhanced type checking, preventing accidental misuse of context values. Also, by using nullable pattern the code won't be checking for `Object.keys()` which is way costly than a simple `!context` runtime check.

#### Readonly Context

```tsx
export const useWizardContext = <T extends DefaultWizardStepProps>(): Readonly<WizardStepperContextProps<T>> => {
  const context: Readonly<WizardStepperContextProps<T>> | null = useContext(WizardStepperContext);
  // Type guard in action 🎉
  if (!context) {
    throw new Error(
      `Please make sure you're wrapping all the steps in a 'WizardProvider' component`
    );
  }
  return context;
};
```

`Readonly` is a builtin typescript type and prevents accidental modification of the context value, ensuring data integrity. In this case, it can also avoid misusage on the consumer's side.

#### Improved `goTo` function

```tsx

const goTo = useCallback(
  (stepId: number | string) => {
    dispatch({ type: 'GOTO_PAGE', payload: { stepId } });
  },
  [dispatch]
);
```

Increased flexibility and robustness, allowing steps to be identified by either `index` or `ID`, which can be a `number` or even a `string`.

#### Initial State Generic

```tsx
// ✅ Initial state now has `steps` as a generic type, which a game changer
const initialState = <
  T extends DefaultWizardStepProps
>(): WizardStepperReducerState<T> => ({
  activeStepIndex: 0,
  steps: [],
});
```

Improved type safety and reduced boilerplate. This is also taking advantage of direct generics usage in this codebase.

#### Explicit Inline Props Typing

```tsx
export const Step = ({ id, children }: { id: string; children: ReactNode | JSX.Element | JSX.Element[] }) => (
  <div id={id}>{children}</div>
);
```

This one is necessary for bundle size reasons, something to always be concerned when implementing packages, dependencies, etc. By applying this approach for such small component, the bundle is also decreased. 

> ⚠️ Good to mention this should NOT be applied in all scenarios due to maintenability implications. So keep that in mind if you find a scenario you can implement this technique. ⚠️ 

<hr />

### Benefits for Consumers and the Codebase

These TypeScript improvements aren't just show off. They directly benefit consumers of the react-sweet-wizard package and improve the codebase in several ways:

- **Enhanced Reliability**: Type safety catches errors early, reducing the likelihood of runtime issues.
- **Improved Maintainability**: Clearer type definitions make the code easier to understand and modify.
- **Better Developer Experience**: Type hints and autocompletion in IDEs make development smoother and faster.
- **Increased Code Confidence**: Knowing that the code is type-safe boosts confidence during development and deployment.

<hr />

### Tips and Tricks: Applying TypeScript Best Practices to React Hooks

Let's distill the lessons learned during react-sweet-wizard refactoring into actionable tips you can apply to your own React hooks:

#### Embrace Generics for Reusable Hooks

```tsx

const initialState = <T extends DefaultWizardStepProps>(): WizardStepperReducerState<T> => ({
  activeStepIndex: 0,
  steps: [],
});
```

By making `initialState()` generic, the code is also allowing it to work with various step types (T). This eliminates the need for type casting and ensures that the state is always initialized with the correct type. Apply this pattern to any hook that needs to handle different data structures.

#### Leverage Readonly for Context Integrity

```tsx

export const useWizardContext = <T extends DefaultWizardStepProps>(): Readonly<WizardStepperContextProps<T>> => {
  const context: Readonly<WizardStepperContextProps<T>> | null = useContext(WizardStepperContext);
  // Type guard in action 🎉
  if (!context) {
    throw new Error(
      `Please make sure you're wrapping all the steps in a 'WizardProvider' component`
    );
  }
  return context;
};
```

Returning `Readonly<WizardStepperContextProps<T>>` from `useWizardContext()` prevents consumers from accidentally modifying context values. This is crucial for maintaining state integrity and preventing unexpected side effects.

#### Explicit types for Action and State

```tsx
type Action<T> =
  | { type: 'NEXT_PAGE' }
  | { type: 'PREV_PAGE' }
  | { type: 'GOTO_PAGE'; payload: { stepId: number | string } }
  | { type: 'SET_STEP_COUNT'; payload: { steps: T[] } };

interface WizardStepperReducerState<T> {
  activeStepIndex: number;
  steps: T[];
}
```

Defining explicit types for actions and state in the reducer makes the data flow more predictable. It helps catch type-related errors during development and improves code readability. Always type your reducer's state and actions as precisely as possible.

#### Type guard and avoiding runtime errors

```tsx
  const context: Readonly<WizardStepperContextProps<T>> | null = useContext(WizardStepperContext);
  // Type guard in action 🎉
  if (!context) {
    throw new Error(
      `Please make sure you're wrapping all the steps in a 'WizardProvider' component`
    );
  }
```

Since the value can be `null`, having a type guard is a mandatory approach to make sure the app will keep running as expected. In this case, the approach defined was to make sure developers/consumers will be aware of the misusage of the package rightaway, throwing a runtime error.

#### Test Your Types in Your CI Pipeline

```bash
tsc --noEmit
```

Running `tsc --noEmit` in your CI pipeline ensures that your TypeScript code is free of type errors. This is a crucial step in preventing type-related bugs from reaching production. Integrate this command into your build process to catch errors early.


### That’s all for now

TypeScript is a powerful tool for improving the reliability and maintainability of your React code. By embracing its features, you can create more robust and scalable applications.

In the case of react-sweet-wizard, TypeScript has been a game-changer. It's made the codebase more predictable, easier to maintain, and safer to use.

I hope you enjoyed this reading as much as I enjoyed writing it. Thank you so much for reading until the end and see you soon!

<hr />

### Cya 👋
