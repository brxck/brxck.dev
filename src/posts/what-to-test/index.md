---
title: What To Unit Test
date: 2021-05-30
tags: [Testing]
---

It's worth watching [this talk by Sandi Metz](https://www.youtube.com/watch?v=URSWYvyc42M). It was given at a Ruby conference, but the concepts are language independent. Really, watch it; it will be more effective than just trying to read the below.

|                  | Query                 | Commmand              |
| ---------------- | --------------------- | --------------------- |
| **Incoming**     | _Assert Return Value_ | _Assert Side Effect_  |
| **Self to Self** | Don't Test            | Don't Test            |
| **Outgoing**     | Don't Test            | _Assert Message Sent_ |

## To Summarize

It is important to be selective with what we test! A set of unit tests should a single, contained object, and nothing else. If our tests are too broad, then we begin testing _other objects_ or _implementation details_, and our tests become fragile and interdependent.

#### Don't Test Implementation

We should only test the messages sent to and from the object. We do not want to test how the object is implemented, because it really does not matter. As long as the object behaves correctly, our tests should pass.

#### Do Test Messages

We are testing two types of messages:

- **Query:** Returns a value
- **Command:** Effects/changes something
- It is possible to be both, e.g. `Array.pop()` returns a value _and_ removes it from the array.

It matters where these messages come from in relation to the object:

- **Incoming:** Directed at the object from the external world
- **Outgoing:** Originating from the object

#### Which Messages To Test

Again, the chart:

|                  | Query                 | Commmand              |
| ---------------- | --------------------- | --------------------- |
| **Incoming**     | _Assert Return Value_ | _Assert Side Effect_  |
| **Self to Self** | Don't Test            | Don't Test            |
| **Outgoing**     | Don't Test            | _Assert Message Sent_ |

Notice how one object's _incoming message_ must be another object's _outgoing message_. This has some implications for which messages we should test.

It doesn't make sense to test an object's _outgoing query_, because we are already testing the same message as an _incoming query_ in the tests for the object that actually generates the response.

We do want to test that _outgoing commands_ are sent, but we don't need to test what their effects are. This is because we will test any _incoming command's_ effects in the tests for the affected object.
