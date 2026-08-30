# How to Add New Features to the Vexylt SDK (Builder Pattern)

Whenever you want to add a new feature to the SDK (like Output Guardrails, Handoffs, new configurations, etc.), follow this exact 6-step flow.

## Step 1: Define the Type or Interface
First, decide what data this feature needs. Create an `interface`, `type`, or `enum` for it.
*Example for Output Guardrails:*
```typescript
export type OutputGuardrail = "no-profanity" | "json-only";
```

## Step 2: Add it to the `AgentBuilder` State
The builder acts as a temporary configuration desk. You need to give it a place to hold the item. Add a public property to `AgentBuilder` and initialize it in the constructor.
```typescript
export class AgentBuilder {
    // ... existing properties
    public outputGuardrails: OutputGuardrail[]; // <-- 1. Add property

    constructor() {
        // ... existing setup
        this.outputGuardrails = []; // <-- 2. Initialize it
    }
}
```

## Step 3: Add a Chaining Method to `AgentBuilder`
Create a method that developers will call to add this feature to their agent. It must save the data and then `return this;` to keep the method chain alive.
```typescript
public withOutputGuardrail(guardrail: OutputGuardrail) {
    this.outputGuardrails.push(guardrail);
    return this; // <-- ALWAYS return this in the builder!
}
```

## Step 4: Add it to the `Agent` State
Now move over to the `Agent` class. The `Agent` is the engine that actually does the work, so it needs a private property to store the feature configuration permanently.
```typescript
export class Agent {
    // ... existing properties
    private outputGuardrails: OutputGuardrail[]; // <-- 1. Add property
```

## Step 5: Transfer from Builder to Agent
Inside the `Agent` constructor, grab the data from the temporary builder and save it to the actual engine (the agent instance).
```typescript
constructor(builder: AgentBuilder) {
    // ... existing setup
    this.outputGuardrails = builder.outputGuardrails; // <-- Transfer it!
}
```

## Step 6: Use it in `Agent.run()`
Finally, go into your `run()` method (or a helper function called by `run`) and write the actual logic that uses this new property.
```typescript
public async run(query: string) {
    // ... your existing code
    
    // Example: Check output guardrails before returning
    if (this.outputGuardrails.includes("no-profanity")) {
        // run profanity check logic...
    }
}
```

---

### Summary Checklist:
- [ ] 1. Did I define what it looks like? (Type/Interface)
- [ ] 2. Can the user add it to the builder? (`AgentBuilder` property & initialization)
- [ ] 3. Did I add a chaining method? (`return this;`)
- [ ] 4. Does the `Agent` class have a property for it?
- [ ] 5. Did the builder pass it to the engine? (`Agent` constructor)
- [ ] 6. Does the engine use it? (Logic in `Agent.run()`)
