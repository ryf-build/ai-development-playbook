# Final Lab

『AIは毎回違う。だからSkillを書く。』第17章用の最小Repositoryです。

## 初期状態

Node.js標準ライブラリだけで動くHTTP Serverです。

```bash
npm test
npm start
```

初期実装には`GET /health`だけがあります。

## AIへ渡す課題

```text
POST /notes を追加してください。

Requirements:
- JSON body の title は必須
- 空文字または空白だけの title は 400
- 正常時は 201
- 保存された note を JSON で返す
- note は process 内メモリに保持してよい
- 既存 test を壊さない
- 必要な test を追加する
```

実装後、第17章の手順で「Skillなし」と`proof-before-done`ありを比較してください。

## Windows / PowerShell

```powershell
Copy-Item -Recurse examples/final-lab ./skill-final-lab
Set-Location skill-final-lab
npm test
```
