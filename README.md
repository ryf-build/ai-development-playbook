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

## Zenn Book companion

This repository also hosts the public companion materials for the free Zenn Book:

**『AIは毎回違う。だからSkillを書く。』**

```text
skills/proof-before-done/
examples/eval-kit/
examples/final-lab/
examples/final-lab-oracle/
examples/reference-experiment/
```

The companion is designed around one principle:

```text
CLAIM != EVIDENCE
```

`proof-before-done` is versioned as **1.0.0**. The Book recommends previewing external skills first and pinning installation to the reviewed commit SHA rather than following `main` blindly.

## Topics

- Planning and task decomposition
- Prompt and context boundaries
- Agent Skills / Skill Engineering
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

---

Built by [ryf-build](https://github.com/ryf-build).
