# シミュレーション入力給与の表示位置 マイルストーン 2026-06-04

## 目的

条件比較シミュレーションで入力した給与が、`全取込データ` と `集計対象のみ` の中でどの位置にあるかを確認できるようにした。

## 実装内容

- シミュレーション結果に `入力給与の表示位置` セクションを追加。
- `全取込データ` と `集計対象のみ` の両方について、比較求人件数、月給位置、年俸位置、月給 P50/P75/P90 を表示。
- `allSalaryValuesForCity()` と `salaryStatsForCity()` をスコープ指定可能に拡張。
- シミュレーションCSV `recruitment_condition_simulation_mvp.csv` に以下の列を追加。
  - `salary_analysis_scope`
  - `all_scope_jobs`
  - `all_scope_monthly_percentile`
  - `all_scope_annual_percentile`
  - `usable_scope_jobs`
  - `usable_scope_monthly_percentile`
  - `usable_scope_annual_percentile`
- UI検証スクリプト `scripts/check_nurse_map_sim_scope_position_ui.mjs` を追加。

## 安全表現

- 表示位置は、入力給与が取込求人データ内のどこに位置するかを見るためのもの。
- 地域の給与水準、採用確率、応募数、入職可能性を示すものではないことを明記。
- 既存の `全取込データ / 集計対象のみ` の母集団分離と整合。

## 検証

- `scripts/check_nurse_map_sim_scope_position_ui.mjs`
- `scripts/check_nurse_map_phase05.mjs`
- `scripts/check_nurse_map_salary_scope_comparison_ui.mjs`
- `scripts/check_nurse_map_source_terms_merge_import.mjs`

全て成功。禁止表現チェックも検出なし。

## 次の推奨ステップ

1. 媒体条件レビューに確認根拠URL、根拠タイプ、再確認期限を追加する。
2. 実求人ソース別の収集・確認テンプレートを整備する。
3. シミュレーション提案CSV/Markdownにも、全取込・集計対象の表示位置を反映する。
