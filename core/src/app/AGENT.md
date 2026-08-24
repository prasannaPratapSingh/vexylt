# Agent Module

## Overview

The `agent.ts` file implements an `Agent` class using the **Builder pattern**. It provides a fluent API to configure and create agent instances that can process queries.

---

## Files

- `src/app/agent.ts` — defines `AgentBuilder` and `Agent`
- `src/index.ts` — entry point that wires everything together

---

## Classes

### `AgentBuilder`

Responsible for constructing an `Agent` with optional configuration before instantiation.

| Member | Type | Description |
|---|---|---|
| `instructions` | `string \| undefined` | System prompt / persona for the agent |
| `setInstructions(instructions)` | method | Sets the instructions and returns `this` for chaining |
| `build()` | method | Creates and returns a new `Agent` instance |

### `Agent`

The main agent class that receives a query and processes it.

| Member | Type | Description |
|---|---|---|
| `constructor(builder)` | constructor | Receives the `AgentBuilder` instance |
| `static builder()` | factory method | Shorthand to start a new `AgentBuilder` chain |
| `run(query)` | async method | Entry point to execute the agent with a given query |

---

## How It Works

### Builder Pattern

Instead of calling `new Agent(...)` directly with a long list of arguments, the Builder pattern lets you configure the agent step by step using method chaining:

```ts
const agent = Agent.builder()
    .setInstructions("You are a philanthropist")
    .build();

agent.run("This is the query!");
```

1. `Agent.builder()` creates a new `AgentBuilder`
2. `.setInstructions(...)` sets the system prompt and returns the builder (enabling chaining)
3. `.build()` produces the final `Agent`
4. `.run(query)` executes the agent

---

## Current State (Scaffold)

The module is a **work-in-progress scaffold**. The structure and API are defined, but two things are not yet wired up:

### 1. Instructions are not passed to the Agent

The `Agent` constructor receives the builder but doesn't extract `instructions` from it:

```ts
// agent.ts — current
export class Agent {
    constructor(builder: AgentBuilder) { }  // instructions are ignored
}
```

It should be:

```ts
export class Agent {
    private instructions: string | undefined;

    constructor(builder: AgentBuilder) {
        this.instructions = builder['instructions']; // wire it up
    }
}
```

### 2. `run()` has no real logic

Currently `run()` just logs the query to the console:

```ts
public async run(query: string) {
    console.log(query);  // placeholder
}
```

The actual LLM call (e.g. sending `instructions` + `query` to an AI model) needs to be implemented here.

---

## Entry Point (`index.ts`)

```ts
import { Agent, AgentBuilder } from "./app/agent.js";

async function init() {
    const agent: Agent = Agent.builder()
        .setInstructions("Hey u are a philanthrophist")
        .build();

    agent.run("This is the query!");
}

init();
```

This bootstraps the agent with a persona and fires off a query when the app starts.
