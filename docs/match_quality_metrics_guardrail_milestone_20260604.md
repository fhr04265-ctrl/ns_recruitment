# 突合品質メトリクス・ガードレール マイルストーン 2026-06-04

## 実装内容

- 求人タブに「突合品質メトリクス」を追加。
- `job_match_quality_metrics_mvp.csv` 出力を追加。
- レビュー対象行に `next_action` を表示。
- 未突合CSV、手動監査CSV、品質レビューCSVに次アクションと媒体条件ガードレール列を追加。

## 追加した主な指標

- `auto_facility_match_rate`
- `manual_confirmed_facility_match_rate`
- `primary_analysis_usable_rate`
- `facility_match_manual_review_rate`
- `false_match_found_count`
- `auto_matched_but_unreviewed_count`
- `legal_review_required`
- `unmatched_reason_counts`

## ガードレール

- `analysis_use_allowed` は自動算出。
- `source_terms_status` が `confirmed_allowed` 相当で、`reuse_scope` が分析利用可能、かつ URL と取得日がある場合のみ分析利用可。
- 媒体条件未確認・利用禁止・突合未完了の行は `excluded_from_analysis_reason` に理由を残す。
- UIには、メトリクスが採用成果予測ではなくデータ品質管理指標であることを明記。

## 追加CSV列

- `next_action`
- `next_action_priority`
- `next_action_owner`
- `legal_reuse_scope`
- `legal_review_required`
- `analysis_use_allowed`
- `excluded_from_analysis_reason`

## サブエージェント評価の反映

- `auto_match_rate` を `auto_facility_match_rate` に変更。
- `analysis_usable_rate` を `primary_analysis_usable_rate` に変更。
- 媒体条件未確認データを分析利用可にしないよう判定を厳格化。
- 自動接続済みだが人間未確認の `auto_matched_but_unreviewed_count` を追加。

## 検証

- `check_nurse_map_phase05.mjs`: pass
- `check_nurse_map_unmatched_reason_ui.mjs`: pass
- `check_nurse_map_match_quality_metrics_ui.mjs`: pass
- `check_nurse_map_review_decisions_import.mjs`: pass
- スクリーンショット: `outputs/tokyo_metropolitan_nurse_recruitment_map_mvp_preview_v22_match_quality_metrics.png`

## 次の候補

- `source_terms_status` と `reuse_scope` のenumをテンプレートCSVへ正式追加。
- 複数勤務地求人を `job_id` / `job_location_id` に分ける分割CSVを出力。
- 分析利用可求人だけに絞る表示・集計モードを追加。
