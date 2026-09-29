# Proof Before Done

`proof-before-done` は、AIや開発者の「実装完了」「merge可能」「production-ready」という自己申告を、そのまま完了証拠にしないためのVerification Skillです。

## Version

`1.0.0`

## Core principle

```text
CLAIM != EVIDENCE
```

## What it does

1. 完了主張（Completion Claim）を検証可能な単位へ分ける
2. 実際のRepository状態とDiffを見る
3. Repository自身が定義しているtest / lint / build等から必要なGateを選ぶ
4. ClaimごとにEvidenceを対応づける
5. 未確認を推測で埋めず、4つのStatusで返す

```text
PASS
PASS_WITH_RISK
BLOCKED
NOT_VERIFIED
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
- `VERSION` — 配布Version
- `LICENSE` — MIT License

## Review before install

外部Skillは、インストール前に必ず中身を確認してください。

```bash
gh skill preview ryf-build/ai-development-playbook proof-before-done
```

Bookでは、検証済みCommit SHAへPinして導入する方法を推奨しています。

```bash
gh skill install ryf-build/ai-development-playbook proof-before-done --pin <reviewed-commit-sha>
```

`main`を無条件に追従するのではなく、ReviewしたVersionと実行Versionを一致させるためです。

## Repository snapshot

Git Repositoryのrootから実行します。

```bash
python path/to/proof-before-done/scripts/repo_snapshot.py
```

このScript自身はbuild、test、install、migration、deployを実行しません。

## Companion labs

このSkillを題材にした再現可能なLabも同じRepositoryで公開します。

```text
examples/eval-kit/
examples/final-lab/
examples/final-lab-oracle/
examples/reference-experiment/
```

Book: **『AIは毎回違う。だからSkillを書く。』**
