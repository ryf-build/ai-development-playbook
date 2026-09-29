# Final Lab Oracle

第17章の外部評価用Oracleです。

`examples/final-lab/`をAIへ渡すとき、このDirectoryはAIの作業Contextへ含めないでください。実装・自己検証が終わった後、人間側から実行します。

```bash
node examples/final-lab-oracle/oracle.mjs /path/to/skill-final-lab
```

成功時:

```text
ORACLE_RESULT=PASS
```

失敗時はNode.jsのAssertionErrorで、満たしていないRequirementが分かります。

Oracleは「AIより正しい存在」ではありません。Bookの実験条件を固定するための外部評価器です。Requirementを変更した場合はOracleもReviewしてください。
