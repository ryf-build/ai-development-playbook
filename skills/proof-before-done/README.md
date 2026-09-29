# Proof Before Done

AIや開発者が「実装完了」「merge可能」「production-ready」と主張したとき、その自己申告だけで完了扱いせず、実際のRepository状態・Acceptance Criteria・実行Evidenceを照合するためのSkillです。

## Core principle

```text
CLAIM != EVIDENCE
```

## Default safety

このSkillはVerificationを目的とし、Production Deploy、Production Data Mutation、Credential Rotation、Destructive Migrationなどを自動実行しません。

## Included files

- `SKILL.md` — Workflow / Safety Boundary / Output Contract
- `references/quality-gates.md` — 変更内容に応じたVerification Gate
- `references/evidence-rules.md` — ClaimへEvidenceを対応させる基準
- `scripts/repo_snapshot.py` — Git Repositoryのread-only snapshot
- `assets/report-template.md` — Report Template
- `agents/openai.yaml` — ChatGPT向けUI metadata

## Install

GitHub CLIのAgent Skills対応環境では、次のようにインストールできます。

```bash
gh skill install ryf-build/ai-development-playbook proof-before-done
```

インストール前に必ず内容を確認してください。

```bash
gh skill preview ryf-build/ai-development-playbook proof-before-done
```

## Repository snapshot

Git Repositoryのrootから実行します。

```bash
python path/to/proof-before-done/scripts/repo_snapshot.py
```

このScript自身はbuild、test、install、migration、deployを実行しません。

## Status

最終状態は次の4つです。

- `PASS`
- `PASS_WITH_RISK`
- `BLOCKED`
- `NOT_VERIFIED`

不十分なEvidenceを推測で埋めて`PASS`へ寄せないことを重視しています。

## Book

Zenn Book『AIは毎回違う。だからSkillを書く。』の読者特典として公開しています。
