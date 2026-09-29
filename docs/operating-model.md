# AI development operating model

AI works best as part of a system with explicit roles, evidence, and authority boundaries.

## The model

```text
Human intent
    ↓
Plan
    ↓
AI implementation
    ↓
Automated verification
    ↓
Independent review when warranted
    ↓
Human decision
    ↓
Release
```

## What AI is good at

- drafting implementation plans
- exploring a codebase
- producing candidate code
- generating tests
- comparing alternatives
- summarizing failures
- writing documentation
- checking consistency

## What should remain explicit

- product intent
- acceptance criteria
- security exceptions
- credential changes
- production mutation
- irreversible operations
- financial decisions
- final approval for consequential releases

## Evidence over confidence

Replace:

> "The agent says it is done."

with:

> "Here is the exact change, the checks that ran, the observed result, and the remaining uncertainty."

That distinction is the core of reliable AI-assisted engineering.
