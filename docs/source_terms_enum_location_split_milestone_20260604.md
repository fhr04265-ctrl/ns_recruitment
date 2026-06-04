# 利用条件enum・勤務地分割CSV マイルストーン 2026-06-04

## 実装内容

- 左側のCSV出力に `利用条件enum CSV` と `勤務地分割CSV` を追加。
- `job_source_terms_enum_mvp.csv` 出力を追加。
- `job_location_split_mvp.csv` 出力を追加。
- 複数勤務地求人を `job_id` と `job_location_id` に分け、勤務地行が求人件数として水増しされないよう `count_policy` と `analysis_weight` を追加。

## enum定義

`source_terms_status`

- `confirmed_allowed`
- `confirmed_restricted`
- `confirmed_prohibited`
- `unknown`
- `not_applicable`
- `prohibited`

`reuse_scope`

- `analysis_only`
- `display_allowed`
- `export_allowed`
- `internal_review_only`
- `prohibited`
- `unknown`

## 勤務地分割CSVの主な列

- `job_id`
- `job_location_id`
- `location_index`
- `location_count`
- `is_primary_location`
- `job_location_type`
- `original_job_location_text`
- `location_parse_status`
- `location_source_type`
- `location_confidence`
- `matched_facility_uid`
- `matched_facility_name`
- `salary_inherited_from_job_flag`
- `salary_applies_to_all_locations`
- `facility_specific_salary_confirmed`
- `analysis_weight`
- `count_policy`
- `warning`

## 計画修正

サブエージェント評価を踏まえ、次の優先順位を少し修正する。

1. `source_terms_status` / `reuse_scope` のenum固定と、勤務地分割CSVを今回実装。
2. 次マイルストーンでは、分析利用可求人だけに絞る表示・集計モードを優先する。
3. その後、実求人追加投入を増やす。

理由は、複数勤務地分割で行数が増える前に、分析利用可否と件数カウントの境界を明確にする必要があるため。

## 修正した不具合

- 単一住所に含まれる「区」「町」を複数勤務地と誤認しうる判定を修正。
- 複数勤務地判定は `pilot_area` と区切り記号、および求人票の「複数」「分割」「営業所別」注記を中心に扱う。

## 検証

- `check_nurse_map_phase05.mjs`: pass
- `check_nurse_map_terms_enum_location_split_ui.mjs`: pass
- `check_nurse_map_match_quality_metrics_ui.mjs`: pass
- `check_nurse_map_review_decisions_import.mjs`: pass
- `check_nurse_map_unmatched_reason_ui.mjs`: pass
- スクリーンショット: `outputs/tokyo_metropolitan_nurse_recruitment_map_mvp_preview_v23_terms_location_split.png`

## 次の候補

- UIに `全件 / 分析利用可のみ` の切替を追加。
- 集計カードに `全求人件数` と `分析利用可求人件数` の母数を併記。
- 分析利用可のみモードでは、媒体条件未確認・突合未完了・保留/除外求人を給与集計から分離する。
