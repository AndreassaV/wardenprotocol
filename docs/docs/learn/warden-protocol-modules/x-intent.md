---
sidebar_position: 2
---

# x/intent

## Abstract

`x/intent` is a Cosmos SDK module that, similar to `x/gov`, is capable of
executing other messages.

The messages are executed if and when certain conditions are met.


## Concepts

### Intent

The Intent struct represents the conditions that must be met before "something"
can be executed.

The `x/intent` module doesn't dictate what "something" is, other modules can
implement their own objects and plug their logic.

### Expression

The expression is a short program written in the ISL, that represents the set
of conditions that must be met for an intent to be satisfied.

The `x/intent` module only stores and reasons about the AST of the expression,
rather than the string input from the user.

### Action

An Action wraps one message and an Intent. When the Intent conditions are met,
the message will be executed.


## State

### Intent

Intent is mainly composed of `id`, `name`, and `expression`. The `id` uniquely
identifies an intent on-chain, and `expression` is the ISL's AST.

### Action

Action is composed of `id`, `creator`, `msg`, `status`, `result`, `approvers`,
`btl`, `intent`.

`msg` has Any type and represents the message that will be executed by the
`x/intent` module account, when `intent` is satisfied.

Instead of referencing an Intent by its ID, we store a copy of it at the time
the Action is created. This way we ensure that the Intent can't be changed
after the Action is created, preventing unexpected behaviours.



--------

The user submits a `MsgNewAction` containing the message to be wrapped. The
module responsible for handling that message should provide the Intent to be
applied.

