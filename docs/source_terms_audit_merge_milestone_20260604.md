# 媒体条件監査CSVマージ マイルストーン 2026-06-04

## 目的

画面上で実施した媒体条件レビューを、次回インポート用の実求人CSVへ反映できるようにした。これにより、レビュー結果がブラウザ上の一時操作で終わらず、`集計対象のみ` モードへ継続的に反映される。

## 実装内容

- `scripts/apply_manual_match_audit.mjs` を拡張。
- 既存の手動突合・保留/除外マージを維持。
- 監査CSVの `source_terms_status_after` と `reuse_scope_after` を実求人CSVへ反映。
- 媒体条件だけの監査行でもマージできるようにした。
- `source_terms_checked_at` に `terms_reviewed_at` または `generated_at` を反映。
- `collector_note` に `source_terms_review:*` を追記。
- マージレポートに媒体条件 before/after を表示。
- レポート出力先を第5引数で指定可能にした。
- 媒体条件マージ用サンプル `outputs/manual_source_terms_audit_sample_20260604.csv` を追加。
- 検証スクリプト `scripts/check_nurse_map_source_terms_merge_import.mjs` を追加。

## 生成物

- `outputs/real_job_pilot_seed_terms_merged_20260604.csv`
- `outputs/source_terms_audit_merge_report_20260604.md`
- `outputs/tokyo_metropolitan_nurse_recruitment_map_mvp_preview_v26_source_terms_merge.png`

## 検証

- `scripts/check_nurse_map_source_terms_merge_import.mjs`
- `scripts/check_nurse_map_phase05.mjs`
- `scripts/check_nurse_map_source_terms_review_ui.mjs`
- `scripts/check_nurse_map_manual_merged_import.mjs`
- `scripts/check_nurse_map_analysis_scope_ui.mjs`

全て成功。禁止表現チェックも検出なし。

## 確認できたこと

- 監査CSVの2件が実求人CSVへ反映された。
- マージ後CSVをHTMLへ読み込むと、`集計対象のみ` で2件が集計対象になった。
- 市区町村CSVは `analysis_filter_mode=usable` を保持した。
- 求人品質CSVの列数はヘッダーと全行で整合した。
- 既存の手動突合マージ検証も継続して成功した。

## 次の推奨ステップ

1. 求人レビュー画面に `確認待ち` / `集計対象` / `集計対象外` の表示フィルタを追加する。
2. 集計対象になった求人を使い、市区町村別給与中央値と条件比較の変化を見やすくする。
3. 媒体条件レビューに確認根拠URL、根拠タイプ、再確認期限を追加する。
