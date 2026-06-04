# 媒体条件レビューUI マイルストーン 2026-06-04

## 目的

実求人CSVを取り込んだ後、媒体条件・再利用範囲を画面上で一時レビューし、`集計対象のみ` モードへ反映できるようにした。

## 実装内容

- 求人レビュー行に `媒体条件レビュー` 操作を追加。
- `集計対象にする`: `confirmed_allowed` + `analysis_only` として一時反映。
- `表示可として記録`: `confirmed_allowed` + `display_allowed` として一時反映。
- `CSV出力可として記録`: `confirmed_allowed` + `export_allowed` として一時反映。
- `条件未確認として分離`: `confirmed_restricted` + `internal_review_only` として一時反映。
- 手動レビュー値を `analysisUseAllowed()`、品質レビュー、集計対象モードに反映。
- 監査CSV `manual_match_audit_mvp.csv` に媒体条件レビューの before/after を追加。
- 次回CSVで before/after 列が戻ってきた場合に読み込める受け口を追加。
- `job_salary_quality_review_mvp.csv` の列ずれリスクを修正。
- UI検証スクリプト `scripts/check_nurse_map_source_terms_review_ui.mjs` を追加。

## サブエージェント評価の反映

- `集計対象` は画面表示・CSV出力可否とは別であることをUI注意書きに明記。
- 「利用許諾済み」「法務確認済み」「著作権クリア」などの断定表現を避けた。
- 監査CSVへ `source_terms_status_before/after` と `reuse_scope_before/after` を追加し、後から判断経緯を追えるようにした。

## 検証

- `scripts/check_nurse_map_phase05.mjs`
- `scripts/check_nurse_map_source_terms_review_ui.mjs`
- `scripts/check_nurse_map_analysis_scope_ui.mjs`
- `scripts/check_nurse_map_review_decisions_import.mjs`

全て成功。禁止表現チェックも検出なし。

## 次の推奨ステップ

1. `manual_match_audit_mvp.csv` を実CSVへマージするスクリプトを拡張し、媒体条件レビュー結果も次回インポートに反映する。
2. 確認済みサンプルを複数件作り、`集計対象のみ` の給与中央値・条件比較がエリア別に変わることを確認する。
3. 媒体別の確認根拠URL・確認期限・根拠タイプを持てる監査列へ拡張する。
