# ns_recruitment

訪問看護師採用・市場競合分析ツールのMVPリポジトリです。

## 現在の位置づけ

このプロジェクトは、首都圏の訪問看護採用を強化するために、公開データと求人CSVを使って以下を可視化するダッシュボードを作るものです。

- 市区町村別の市場魅力度
- 採用難易度
- 求人条件競争力
- データ信頼度
- 事業所単位の採用環境 proxy
- 求人給与、年俸、1日あたり給与
- 競合求人TOP10比較
- 経営提案用CSV / Markdown出力

重要: 現MVPのスコアは採用確率ではありません。応募率、面接率、内定率、承諾率、入職率、定着率の実績データが入るまでは、`何%取れる` という表現は使わず、求人条件競争力として扱います。

## ローカル成果物

現在の主要成果物は Codex ワークスペース上の以下です。

- `outputs/tokyo_metropolitan_nurse_recruitment_map_mvp.html`
- `outputs/visit_nurse_recruitment_os_next_plan_20260603.md`
- `outputs/job_salary_schema_mvp.csv`
- `outputs/job_salary_sample_mvp.csv`
- `scripts/check_nurse_map_phase05.mjs`

GitHub Connectorでは大容量のHTML本体・首都圏データJS一式を直接アップロードしにくいため、まず設計・スキーマ・検証方針を格納し、Git/GitHub CLI が使える環境で本体をpushする方針です。

## 次の実装ステップ

1. 求人CSV標準スキーマを強化する
2. 競合求人TOP10比較を実用化する
3. 求人票の不足項目アラートを強化する
4. 給与以外の条件改善提案を精緻化する
5. 首都圏データ同梱版をGitHubへpushする
