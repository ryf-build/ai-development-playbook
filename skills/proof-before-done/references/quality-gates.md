# Quality gates

Select gates from repository evidence. Do not blindly run every command.

## 1. Source and scope

Confirm:
- expected repository/worktree;
- current revision/branch when relevant;
- changed files match the requested scope;
- no unrelated or unexplained high-risk change is hidden in the diff.

## 2. Static correctness

When supported by the project:
- formatter check;
- lint;
- typecheck;
- compile/static analysis.

Prefer commands already defined by the repository, CI, Makefile, package scripts, task runner, or contributor documentation.

## 3. Behavioral verification

Prefer the narrowest test that proves the requested behavior, then widen only as needed:
1. focused unit/feature test;
2. integration/contract test;
3. end-to-end test;
4. broader suite.

A passing broad suite is useful, but it does not prove a behavior that has no relevant assertion.

## 4. Build and packaging

Use when the change affects compiled output, bundling, generated artifacts, packaging, or deployment assets.

Build success proves buildability, not runtime correctness.

## 5. Data and migrations

When schema/data changes exist, look for:
- forwards compatibility;
- backwards compatibility where rolling deploys are possible;
- migration ordering;
- safe defaults/nullability;
- rollback or recovery reasoning;
- test/readback evidence.

Do not run destructive production migrations as part of this skill.

## 6. Security-sensitive surface

Escalate checks when changes affect:
- authentication;
- authorization;
- session/token handling;
- secrets;
- untrusted input;
- command execution;
- file/path access;
- payments;
- destructive actions.

For a full security audit, use a dedicated security-review skill rather than pretending this checklist is sufficient.

## 7. Contracts and documentation

Check consistency when the change affects:
- public API/schema;
- CLI flags;
- configuration/environment variables;
- setup/deployment instructions;
- examples;
- user-visible behavior.

## 8. CI equivalence

If local checks differ from CI, state that limitation. Passing a subset locally must not be reported as equivalent to the entire CI pipeline.
