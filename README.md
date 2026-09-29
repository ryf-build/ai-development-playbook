# AI Development Playbook

**Practical patterns for AI-native software delivery, review, QA, and automation.**

This repository collects reusable engineering patterns for working with AI as part of a software development system — without turning AI output into automatic authority.

> Public by design: no private product source, customer information, production credentials, internal endpoints, or proprietary implementation is copied here.

## Core loop

```text
Intent
  ↓
Plan
  ↓
Implement
  ↓
Review
  ↓
Test
  ↓
Independent verification when risk requires it
  ↓
Human decision
  ↓
Ship
```

## Topics

- Planning and task decomposition
- Prompt and context boundaries
- AI-assisted implementation
- Code review
- Risk-based QA
- Independent verification
- CI/CD
- Agent handoffs
- Evidence and reproducibility
- Human approval boundaries
- Failure recovery
- Automation without silent authority escalation

## Planned structure

```text
planning/
implementation/
review/
qa/
ci/
agents/
templates/
```

## Design principle

AI can propose, implement, inspect, and automate.

**Authority should remain explicit.**

---

Built by [ryf-build](https://github.com/ryf-build).
