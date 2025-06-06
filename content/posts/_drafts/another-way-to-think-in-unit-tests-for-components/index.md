---
status: "active"
title: "Another way of thinking about frontend tests - Unit tests"
layout: post
author: Wilson Mendes
description: >-
  This time I'll share a quick code tip. Usually, when writing unit tests on components there's a common usage/pitfal. Some teams can start describing only and exclusively what the code does instead of the intentions around the code exists.
date: '2025-04-28T09:13:00.419Z'
path: /posts/another-way-to-think-in-unit-tests-for-components/
category: "post"
lang: en
tags: ['frontend', 'javascript', 'nodejs', 'tips', 'architecture', 'tests', 'unit']
---

This time I'll share a quick code tip. Usually, when writing unit tests on components there's a common usage/pitfal. Some teams can start describing only and exclusively what the code does instead of the intentions around the code exists.

> ⚠️ This post will talk only and exclusively about the way of writing tests that makes sense to humans, so we it won't cover Test Driven Development - AKA TDD. TDD is not just a design tool, but also a software development workflow that has prompts for code improvement in its lifecycle. ⚠️

<hr/>

## The problem

If you're looking at unit tests content on the web, eventually you might find some posts, articles and such mentioning phrases like "tests are a way of documenting your code". But, are they really?

They should, of course! However, I rarely heard about some deep and technical discussions around standards, clarifications or any matter to read the tests and understand what's happening in there.

## Writing unit tests that are real and live documentation of your code

This time I'll share a quick code tip. Usually, when writing unit tests on components there's a common usage/pitfal. Some teams can start describing only and exclusively what the code does instead of the intentions around the code exists.

For this example, we'll play with some test cases for a component called "Quick Search", a fancy name for another search component 😜

### Less focus on component internals


Nobody cares if your callback has been called, but everybody cares about component behaviors working as expected

```
With registered links
  #hasAny
    ✅ is true
  #all
    ✅ is a list of all registered links
Without registered links
  #hasAny
    ✅ is false
  #all
    ✅ is an empty array

```

### Main focus on what, how and why the feature exists

Instead of focusing on the nitty-gritty details of how a component or hook works internally, shift your focus to testing its observable behavior and the user's interaction with it. Think about what the component *does* and *why* it does it, rather than how specific functions are called or state variables are mutated.

Consider a scenario where you have a custom hook, `useRegisteredLinks()`, that checks if a given list of URLs are registered within your application. A less effective way to test this might involve checking if a specific internal filtering method was called. A more behavior-driven approach would be to test the hook's output based on different inputs:

```
`useRegisteredLinks()`
    ✅ should display registered search results if any are found
    ✅ should display a "No relevant results found" message if no registered links are present
    ✅ should handle an empty searchResults array correctly
```

Notice how these test descriptions clearly articulate the expected *behavior* of the `useRegisteredLinks()` hook under various conditions. They don't delve into the internal implementation details of how the hook determines if a link is registered. This makes the tests more resilient to code changes; if the internal implementation is refactored but the behavior remains the same, the tests will still pass.

**The Key: Focus on Behavior, Not Implementation**

Your test descriptions and assertions should primarily revolve around the observable behavior of the unit you're testing. For a component, this means testing how it renders under different props, how it responds to user interactions (like clicks or input changes), and what side effects it might trigger. For a hook, focus on the values it returns and any side effects it initiates based on its inputs. For utilities or helpers, concentrate on the output they produce for given inputs.

**When Internal Details Matter (Rarely)**

There might be rare cases where testing internal methods or state becomes necessary. This usually happens when the internal logic is complex and has observable side effects that are crucial to the unit's functionality. However, strive to minimize these cases as they can make your tests brittle and harder to maintain. If you find yourself frequently testing internals, it might be a sign that your unit is doing too much and could benefit from being broken down into smaller, more focused units.

<hr />

### Example: Quick Search Component with `useRegisteredLinks()`

Let's illustrate this with a `QuickSearch` React component that utilizes our `useRegisteredLinks()` hook. Assume this component takes a list of potential search result URLs and displays only the ones that are registered within the application.

First, let's define a simplified version of the `useRegisteredLinks()` hook:

```tsx
// hooks/useRegisteredLinks.ts
import { useState, useEffect } from 'react';

const registeredUrls = ['/products/1', '/blog/latest', '/about'];

interface UseRegisteredLinksResult {
  hasRegistered: boolean;
  registeredLinks: string[];
}

const useRegisteredLinks = (links: string[]): UseRegisteredLinksResult => {
  const [hasRegistered, setHasRegistered] = useState(false);
  const [registeredLinks, setRegisteredLinks] = useState<string[]>([]);

  useEffect(() => {
    const validLinks = links.filter(link => registeredUrls.includes(link));
    setRegisteredLinks(validLinks);
    setHasRegistered(validLinks.length > 0);
  }, [links]);

  return { hasRegistered, registeredLinks };
};

export default useRegisteredLinks;
```

Now, let's create the `QuickSearch` component:

```tsx
// components/QuickSearch.tsx
import React from 'react';
import useRegisteredLinks from '@/hooks/useRegisteredLinks';

export interface QuickSearchProps {
  searchResults: string[];
}

export const QuickSearch = ({ searchResults }: QuickSearchProps) => {
  const { registeredLinks } = useRegisteredLinks(searchResults);

  return (
    <div>
      <h3>Quick Search Results</h3>
      <ul>
        {registeredLinks.length > 0 ? (
          registeredLinks.map(link => (
            <li key={link}>
              <a href={link}>{link}</a>
            </li>
          ))
        ) : (
          <p>No relevant results found.</p>
        )}
      </ul>
    </div>
  );
};
```

And here's how we might write unit tests for the `QuickSearch` component, focusing on its behavior:

```tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { QuickSearch, QuickSearchProps } from '@/components/QuickSearch';
import useRegisteredLinks from '@/hooks/useRegisteredLinks';

// Mock the useRegisteredLinks hook to control its behavior in tests
vi.mock('@/hooks/useRegisteredLinks');
const mockedUseRegisteredLinks = useRegisteredLinks as vi.Mock;

interface SetupProps {
  searchResults?: string[];
  quickSearchProps?: QuickSearchProps;
}

const setup = ({
  searchResults = [],
  quickSearchProps = {
    hasRegistered: false,
    registeredLinks: [],
  }
}: SetupProps) => {
  mockedUseRegisteredLinks.mockReturnValue(quickSearchProps);

  const view = render(<QuickSearch searchResults={searchResults} />);
};

describe('<QuickSearch />', () => {
  it('should display registered search results if any are found', () => {
    setup({
      searchResults: ['/products/1', '/random', '/blog/latest'],
      quickSearchProps: {
        hasRegistered: true,
        registeredLinks: ['/products/1', '/blog/latest'],
      },
    });

    expect(screen.getByText('Quick Search Results')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '/products/1' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '/blog/latest' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: '/random' })).not.toBeInTheDocument();
    expect(screen.queryByText('No relevant results found.')).not.toBeInTheDocument();
  });

  it('should display "No relevant results found" message if no registered links are present', () => {
    setup({
      searchResults: ['/random1', '/another'],
    });

    expect(screen.getByText('Quick Search Results')).toBeInTheDocument();
    expect(screen.getByText('No relevant results found.')).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('should handle an empty searchResults array correctly', () => {
    setup();

    expect(screen.getByText('Quick Search Results')).toBeInTheDocument();
    expect(screen.getByText('No relevant results found.')).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
```

There are some cristal clear benefits of this approach. By writing tests focusing on the behavior instead of its internals, the tests shouldn't be affected in case of internal changes such as refactors, for example.

Also, the tests can be a clear documentation of what the component should do. In fact, it makes things even clear for maintenance and application evolution purposes. And this is massive!

<hr />

<!--  -->


## Thinking Beyond Isolation: User Journey Tests for Page Components

While traditional unit tests excel at verifying individual units in isolation, another valuable approach for testing React page components is to simulate user interactions. Using your unit testing infrastructure (like Vitest and React Testing Library), you can write tests that mimic how a user might interact with a specific page or a significant section of it.

**Key Principles:**

1.  **Focus on User Interactions and Outcomes:** The tests should revolve around common user workflows on the page. What does a user do? What should happen as a result?
2.  **Simulate User Actions:** Utilize React Testing Library's `userEvent` API to simulate more realistic user interactions such as typing, clicking, focusing, and changing input values. `userEvent` handles details like focus changes and input dispatch more accurately than `fireEvent`.
3.  **Assert on Observable Outcomes:** Verify the changes in the rendered output that a user would perceive. This includes the presence/absence of elements, text changes, attribute changes, and (to a limited extent) the triggering of mocked callbacks.
4.  **Component-Centric Scope:** These tests focus on the page component and its direct children. External dependencies like API calls or higher-level state management are typically mocked.
5.  **Unit Test Infrastructure (Vitest) and User Interaction (`userEvent`):** You're still using your fast and isolated unit testing framework, Vitest, along with the more user-centric interaction simulation provided by `userEvent` from React Testing Library.


Let's revisit the feedback form example, now with Vitest and `userEvent`:

```tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest'; // Import Vitest-specific functions
import userEvent from '@testing-library/user-event'; // Import userEvent
import FeedbackFormPage from '@/pages/FeedbackFormPage';

// Mock the feedback submission function
const mockSubmitFeedback = vi.fn();

vi.mock('@/api/feedback', () => ({
  submitFeedback: mockSubmitFeedback,
}));

describe('<FeedbackFormPage /> - User Journey', () => {
  it('should allow a user to submit feedback and display a success message', async () => {
    render(<FeedbackFormPage />);
    const user = userEvent.setup(); // Setup user event

    // 1. User types feedback into the input field
    const feedbackInput = screen.getByLabelText('Your Feedback');
    await user.type(feedbackInput, 'This is great!');

    // 2. User clicks the submit button
    const submitButton = screen.getByRole('button', { name: 'Submit Feedback' });
    await user.click(submitButton);

    // 3. Assert that the submission function was called
    expect(mockSubmitFeedback).toHaveBeenCalledWith('This is great!');

    // 4. Assert that the success message is displayed
    await waitFor(() => screen.getByText('Thank you for your feedback!'));
  });

  it('should prevent submission if the feedback input is empty', async () => {
    render(<FeedbackFormPage />);
    const user = userEvent.setup(); // Setup user event

    const submitButton = screen.getByRole('button', { name: 'Submit Feedback' });
    await user.click(submitButton);

    // Assert that the submission function was NOT called
    expect(mockSubmitFeedback).not.toHaveBeenCalled();

    // Assert that an error message (if any) is displayed (optional)
    // expect(screen.getByText('Please enter your feedback.')).toBeInTheDocument();
  });
});
```

Key Changes for Vitest and userEvent:

Import userEvent: We now import userEvent from @testing-library/user-event.
userEvent.setup(): Inside each test that involves user interaction, we call userEvent.setup() to get a user object. This provides the API for simulating interactions.
Using user.type() and user.click(): Instead of fireEvent.change and fireEvent.click, we now use the asynchronous methods user.type() and user.click() from the user object. These methods more closely simulate actual browser events.
Benefits of User Journey Tests (Within Unit Infra with Vitest and userEvent for Page Components):

More Realistic Interactions: userEvent simulates user behavior more accurately, leading to tests that better reflect real-world usage.
Higher-Level Confidence: Provides even greater assurance that the page component functions correctly from a user's perspective due to more accurate interaction simulation.
Better Documentation: Test names and structure continue to resemble user stories.
Reduced Risk of Interaction Issues (Within the Component): Helps catch subtle issues related to focus, input dispatch, and other browser behaviors.
Fast Feedback Loop: Vitest's speed ensures these tests run quickly.
Limitations:

Still Isolated: Doesn't test real integrations with backend, routing, or global state. Integration/E2E tests are needed for that.
Reliance on Mocking: Heavily depends on accurate mocking of dependencies.
Potential Overlap: Can overlap with traditional unit tests; balance is key.
In conclusion, user journey tests for React page components using Vitest and userEvent offer an even more refined way to test the integrated behavior of a page from a user-centric standpoint, leveraging a fast unit testing framework and accurate user interaction simulation. They are a valuable complement to traditional unit tests.


<!--  -->
### That’s all for now

This was a quick one, but I hope you enjoyed this reading as much as I enjoyed writing it. Thank you so much for reading until the end and see you soon\!

<hr />

### Cya 👋
