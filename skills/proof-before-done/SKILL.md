---
name: proof-before-done
description: Verify software work before calling it complete. Use when an implementation, bug fix, refactor, pull request, release candidate, or AI-generated code change is claimed to be done, ready, safe to merge, or production-ready; when the user asks to prove a change works; or when a final engineering check is needed. Reconstruct the acceptance criteria, inspect the actual diff and repository state, run the strongest safe checks available, separate executed evidence from assumptions, and return PASS, PASS_WITH_RISK, BLOCKED, or NOT_VERIFIED instead of trusting self-reported completion.
---

# Proof Before Done

Treat completion as a claim that needs evidence.

The purpose of this skill is not to make software perfect. It is to stop `looks done`, `build passed`, or an agent's own summary from being treated as proof of completion.

## Core rule

Always preserve this distinction:

```text
CLAIM != EVIDENCE
```

Never mark a task complete only because code exists, a model says it is done, one test passed, a build succeeded, or an HTTP request returned 200.

## Safety boundary

Default to non-destructive verification.

Do not:
- deploy to production;
- mutate production data;
- rotate credentials;
- install or upgrade dependencies unless the user already authorized that action;
- run destructive database migrations;
- rewrite unrelated files;
- weaken tests or checks to obtain a passing result.

If a high-risk check would require mutation, report it as `NOT_VERIFIED` and state what evidence would be required.

## Workflow

Follow these phases in order.

### Phase 1 — Reconstruct the completion claim

Identify:
1. what the user asked to change;
2. what the implementation claims to have changed;
3. explicit acceptance criteria;
4. implicit engineering expectations that are directly relevant, such as tests, type safety, backwards compatibility, authorization, migration safety, or documentation.

Do not invent product requirements. Mark missing intent as an assumption or question.

Create a short claim list such as:

```text
C1 Login endpoint accepts valid credentials.
C2 Invalid credentials are rejected without leaking account existence.
C3 Existing sessions still work.
C4 Relevant tests pass.
```

### Phase 2 — Capture repository evidence

If a repository/worktree is available, run `scripts/repo_snapshot.py` from the target root.

Use its output to identify:
- repository root and current branch;
- tracked/untracked changes;
- changed paths;
- likely project manifests;
- test/build/CI configuration;
- files containing TODO/FIXME markers in the changed set.

Then inspect the actual diff and the files needed to understand the change.

Never infer the implementation from the agent's summary when the source is available.

### Phase 3 — Select the smallest sufficient gate set

Read `references/quality-gates.md`.

Choose checks based on the changed surface and repository authority. Prefer existing project commands and CI definitions over invented commands.

Typical gate order:

```text
repository state
-> focused static checks
-> focused tests
-> broader tests where justified
-> build/package
-> security-sensitive checks when relevant
-> documentation/contract consistency
```

Run only checks that are safe and reasonably bounded for the current environment.

### Phase 4 — Map evidence to claims

Read `references/evidence-rules.md`.

For every completion claim, record one of:
- `PROVED`: directly supported by executed checks or inspected authoritative source;
- `PARTIAL`: some evidence exists but an important path remains unverified;
- `FAILED`: observed evidence contradicts the claim;
- `UNTESTED`: no sufficient evidence was collected.

A command that was not run must never be described as passed.

### Phase 5 — Look for false-completion patterns

Before finalizing, explicitly check for relevant forms of false confidence:
- build success without behavioral verification;
- unit tests without integration/contract coverage;
- happy-path-only tests;
- changed API without updated callers/docs;
- authorization checks missing from a new route;
- migration added without backwards/rollback reasoning;
- new environment variables absent from examples/deployment config;
- generated files changed without source-of-truth change;
- unrelated diff mixed into the task;
- skipped/disabled tests;
- TODO, FIXME, placeholder, mock, fixture, or temporary bypass left in the completion path;
- evidence produced against a different revision than the claimed code.

Do not turn this into an exhaustive security audit unless the user asked for one.

### Phase 6 — Assign final status

Use exactly one status:

- `PASS` — all material acceptance claims are proved by sufficient evidence and no material unresolved risk was found.
- `PASS_WITH_RISK` — the requested behavior is proved, but a clearly bounded residual risk remains that does not invalidate the completion claim.
- `BLOCKED` — a material claim failed, required evidence contradicts completion, or a blocker prevents safe completion.
- `NOT_VERIFIED` — the available environment/evidence is insufficient to prove completion without guessing.

When uncertain between `PASS` and another state, do not choose `PASS`.

## Output contract

Use this exact top-level structure:

```markdown
# Proof Before Done

**Final status:** PASS | PASS_WITH_RISK | BLOCKED | NOT_VERIFIED

## Completion claim
- C1 ...
- C2 ...

## Evidence matrix
| Claim | Evidence | Result |
| --- | --- | --- |
| C1 | `<command/file/path>` — observed result | PROVED/PARTIAL/FAILED/UNTESTED |

## Checks executed
- `<command>` — PASS/FAIL and the meaningful result

## Not verified
- What was not checked and why

## Residual risk
- Only concrete remaining risk; write `None identified` if none

## Required next action
- `None` for PASS, otherwise the smallest action needed to remove the blocker or uncertainty
```

Keep the report concise. Evidence is more important than narrative.

## Completion language

Do not say `done`, `complete`, `ready to merge`, or `production-ready` outside the status rules above.

Prefer:
- `The implementation is present, but behavior is not yet verified.`
- `The focused tests passed; the migration path was not exercised.`
- `The claim is blocked by a failing integration test.`

Avoid:
- `Looks good.`
- `Should work.`
- `Everything is fixed.`
- `No issues.` when meaningful checks were not run.

## Supporting files

- Read `references/quality-gates.md` when selecting checks.
- Read `references/evidence-rules.md` when deciding whether evidence is strong enough.
- Run `scripts/repo_snapshot.py` from a repository root before a repository-wide completion assessment when Python and Git are available.
- Use `assets/report-template.md` only when a reusable report file is requested.
