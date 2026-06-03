# Phase 1 Progress: 競合求人ベンチマーク実用化

作成日: 2026-06-03

## 今回進めたこと

ローカルHTML MVPで、競合求人TOP10を単なる一覧から、入力した自社/想定条件との差分が見える比較表へ拡張した。

## ローカル実装内容

対象ファイル:

- `C:\Users\user\Documents\Codex\outputs\tokyo_metropolitan_nurse_recruitment_map_mvp.html`

追加内容:

- 条件タブに `競合TOP10との差分` を追加
- 入力条件と競合求人の差分を表示
  - 月給下限差
  - 年間休日差
  - オンコール有無
  - オンコール手当差
  - 土日祝休み
  - 直行直帰
  - 未経験可
  - 教育体制
  - 訪問件数上限
- 求人票不足項目の多い順を表示
- 経営提案CSVに `competitive_gap_summary` を追加
- 経営提案Markdownに `競合TOP10との差分` セクションを追加

## CSVスキーマ拡張

GitHub上の以下を更新済み。

- `data/job_salary_schema_mvp.csv`
- `data/job_salary_sample_mvp.csv`

追加・強化した列:

- `oncall`
- `oncall_monthly_count`
- `oncall_allowance_min`
- `oncall_allowance_max`
- `annual_holidays`
- `weekend_off`
- `direct_visit`
- `beginner_ok`
- `education`
- `visit_cap`
- `commute_station`
- `commute_minutes`
- `recording_time_policy`

## 検証

ローカルで以下を確認済み。

- JS構文チェック: OK
- 必須文言チェック: OK
- 危険表現チェック: OK
- CSV列数チェック: OK
- Edge headless screenshot生成: OK

## 注意

この差分表示は採用確率ではない。応募・面接・内定・承諾・入職・定着データが入るまでは、`何%取れる` ではなく、競合比較上の求人条件競争力として扱う。

## 次にやること

- 競合差分を `勝ち / 負け / 不明` の視覚ラベルへ整理する
- 求人票不足項目アラートをエリアタブ・求人タブにも展開する
- 経営提案Markdownをより会議資料向けに整える
- 本体HTMLと首都圏データJS一式をGit/GitHub CLI環境からpushする
