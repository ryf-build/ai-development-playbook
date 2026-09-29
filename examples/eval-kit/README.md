# Skill Eval Kit

『AIは毎回違う。だからSkillを書く。』第10章・付録Bの評価を、最小限のJSONLで集計する補助ツールです。

これは「Skill品質を1つの点数にする」ツールではありません。Routing、Invariant Coverage、Unsupported Claims、Outcomeを別々に表示します。

```bash
python3 summarize_eval.py cases.example.jsonl
```

出力例:

```text
CASES=4
ROUTING_ACCURACY=75.0%
INVARIANT_COVERAGE=83.3%
UNSUPPORTED_CLAIMS=1
OUTCOMES=FAIL:1,PARTIAL:1,PASS:2
```

## JSONL fields

- `case_id`
- `expected_trigger`
- `actual_trigger`
- `invariants_expected`
- `invariants_met`
- `unsupported_claims`
- `outcome`

実運用ではModel、Skill version、Repository revision、Tool authorityなども追加してください。

## Windows / PowerShell

```powershell
py -3 summarize_eval.py cases.example.jsonl
```
