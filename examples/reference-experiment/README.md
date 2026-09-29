# Reference Experiment — Green Test != Requirement Complete

Bookの中心命題 `CLAIM != EVIDENCE` を、モデルのSamplingに依存せず再現するための決定論的な参照実験です。

- `buggy/` — local testはGreenだが、空白だけのtitleを受理する
- `correct/` — Requirementを満たす

```bash
node examples/reference-experiment/run.mjs
```

期待される本質的な結果:

```text
BUGGY
NAIVE_STATUS=PASS
ORACLE_RESULT=FAIL

CORRECT
NAIVE_STATUS=PASS
ORACLE_RESULT=PASS
```

このLabは「Skillありのモデルが必ず正解する」ことを証明するものではありません。`test green`だけを完了証拠にする設計がFalse Completionを生むことを、再現可能に示すものです。
