# Evidence rules

## Evidence hierarchy

Stronger evidence is closer to the claimed behavior and the exact revision being assessed.

Typical order, strongest first:
1. observed end-to-end behavior on the exact target revision/environment;
2. focused integration/contract test with relevant assertions;
3. focused unit test with relevant assertions;
4. static checks/typecheck/build evidence;
5. source inspection;
6. documentation or an agent's description of what the code should do.

The order is contextual, not absolute. A source invariant may be the right proof for a static property; a build can be the right proof for buildability.

## Exact-target rule

Evidence from another branch, commit, generated artifact, environment, or configuration does not automatically prove the current target.

State the mismatch rather than silently transferring evidence.

## Negative evidence

One failing material check is enough to prevent `PASS` even if many unrelated checks pass.

Do not average failures away.

## Missing evidence

Missing evidence is not failure, but it is also not success.

Use `UNTESTED` or `NOT_VERIFIED` when the environment cannot establish the claim.

## Claim granularity

Split broad claims into verifiable statements.

Bad:
- `Authentication works.`

Better:
- valid credentials produce a session;
- invalid credentials are rejected;
- protected routes reject unauthenticated requests;
- authorization rules distinguish roles correctly.

## Reproducibility

For executed checks, record enough information to repeat the check:
- command;
- relevant path/scope;
- meaningful result;
- revision/environment when material.

Avoid dumping huge logs into the final report. Preserve the decisive evidence.
