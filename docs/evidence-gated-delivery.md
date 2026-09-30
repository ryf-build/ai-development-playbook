# Evidence-Gated AI Delivery

This is a public, clean-room reference model for teams that use AI in software delivery.

It is intentionally generic. It does not describe any private product, customer, production environment, internal repository, deployment topology, or proprietary workflow.

## Why this exists

AI can make implementation faster, but faster output is not the same as trustworthy delivery.

A useful operating model separates:

```text
claim
evidence
decision
release
```

A change can look correct and still lack enough evidence to ship.

## Reference lifecycle

```text
Intent
  ↓
Plan
  ↓
Implement
  ↓
Cheap deterministic checks
  ↓
Author review
  ↓
Independent verification when risk justifies it
  ↓
Human release decision
  ↓
Ship
  ↓
Post-release observation
```

The stages are deliberately distinct.

- **Intent** defines the outcome.
- **Plan** defines scope and constraints.
- **Implement** produces candidate bytes.
- **Cheap checks** catch obvious defects quickly.
- **Author review** confirms the implementation matches the intended change.
- **Independent verification** adds separation for higher-risk changes.
- **Human release decision** remains an explicit decision.
- **Ship** changes the released state.
- **Post-release observation** confirms the system behaves as expected after release.

## Evidence rules

### 1. Evidence belongs to a target

Evidence should identify what it actually verified.

Useful examples:

- commit SHA
- artifact digest
- test fixture version
- dependency lockfile state
- environment class
- test command
- timestamp

If the target changes materially, old evidence may no longer apply.

### 2. Claims should be machine-checkable when possible

Prefer:

```text
test command + exit code + exact target
```

over:

```text
"looks good"
```

Prefer:

```text
expected fixture == observed fixture
```

over:

```text
"probably compatible"
```

### 3. Risk changes the required evidence

A documentation correction and a database migration should not require identical qualification.

Example public model:

| Risk | Example | Suggested evidence |
| --- | --- | --- |
| Low | Copy or docs | lint / render / review |
| Medium | Normal product behavior | targeted tests + regression |
| High | auth, data migration, billing, deployment logic | targeted tests + regression + independent verification |
| Critical | irreversible or safety-sensitive action | explicit authority + independent evidence + rollback/recovery plan |

The categories are examples, not a universal standard.

## Independent verification

Independence does not require a large organization.

It means the final verification path should not merely repeat the same unchecked assumption that produced the change.

Possible forms:

- a separate reviewer
- a separate test harness
- a deterministic oracle
- a second environment
- a separately maintained acceptance fixture

The key question is:

> Could the same mistake produce both the implementation and the proof?

If yes, the evidence is weaker than it appears.

## Evidence packet

A small evidence packet can make delivery reproducible:

```yaml
change:
  id: sample-change-001
  target: <commit-or-artifact-id>

scope:
  summary: "Example change"
  risk: medium

checks:
  - name: unit-tests
    command: "npm test"
    result: pass

review:
  author_review: pass
  independent_verification: not-required

release:
  decision: pending
```

This example uses fictional data only.

## Failure classification

Before retrying a failed delivery, classify the failure.

Useful public categories:

- product defect
- test defect
- environment defect
- infrastructure defect
- stale target
- dependency drift
- insufficient authority
- unknown

Blind retries can hide real failures and waste CI capacity.

## Practical rule

```text
CLAIM != EVIDENCE
EVIDENCE != RELEASE DECISION
RELEASE DECISION != OBSERVED SUCCESS
```

Keeping those boundaries explicit makes AI-assisted engineering easier to scale without silently turning generated output into authority.
