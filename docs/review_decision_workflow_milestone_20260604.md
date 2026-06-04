# 要確認求人 判断ワークフローマイルストーンログ

Date: 2026-06-04

## 実施内容

- 求人タブで、未接続求人を `接続`, `保留`, `除外` で管理できるようにした。
- `review_hold` と `review_excluded` を追加し、分析対象外の `excluded` とは分けた。
- 保留・除外の判断時刻と判断メモをUI状態に保持するようにした。
- `手動接続監査CSV` に `review_decision`, `review_decision_at`, `review_decision_note` を追加した。
- マージスクリプト `scripts/apply_manual_match_audit.mjs` を、`matched` だけでなく `review_hold` / `review_excluded` も反映できるようにした。
- 保留・除外のUI検証、マージ検証、再取込検証を追加した。

## 追加ファイル

- `scripts/check_nurse_map_review_decision_ui.mjs`
- `scripts/check_nurse_map_review_decisions_import.mjs`
- `outputs/manual_review_decision_audit_sample_20260604.csv`
- `outputs/real_job_pilot_seed_review_decisions_20260604.csv`
- `outputs/tokyo_metropolitan_nurse_recruitment_map_mvp_preview_v19_review_decisions.png`
- `outputs/tokyo_metropolitan_nurse_recruitment_map_mvp_preview_v20_review_decisions_import.png`

## UI検証

`real_job_pilot_seed_manual_merged_20260604.csv` 取込後、画面で1件を保留、1件を除外した。

- Before: 接続7件 / 要確認候補2件 / 保留0件 / 除外0件 / 未突合3件
- After hold: 接続7件 / 要確認候補1件 / 保留1件 / 除外0件 / 未突合3件
- After exclude: 接続7件 / 要確認候補0件 / 保留1件 / 除外1件 / 未突合3件
- 判断解除ボタン表示: OK

## マージ・再取込検証

`manual_review_decision_audit_sample_20260604.csv` をマージし、`real_job_pilot_seed_review_decisions_20260604.csv` を作成した。

- Applied: 2件
- `real-setagaya-005`: `review_hold`
- `real-funabashi-002`: `review_excluded`
- CSV構造: 75列OK

HTML再取込結果:

- 求人: 12件
- 対象: 12件
- 接続: 7件
- 施設: 7件
- 要確認候補: 0件
- 保留: 1件
- 除外: 1件
- 未突合: 3件
- 候補複数: 0件
- 対象外: 0件

## QA

- `scripts/check_nurse_map_phase05.mjs`: OK
- `scripts/check_nurse_map_review_decision_ui.mjs`: OK
- `scripts/check_nurse_map_review_decisions_import.mjs`: OK
- `scripts/check_real_job_pilot_seed.mjs`: OK
- リスク語句チェック: OK

## 注意

- `review_excluded` は、求人そのものが無効という意味ではなく、この事業所突合・施設単位分析に使わない判断である。
- `review_hold` は、追加確認待ちであり、接続・除外のどちらにも確定していない。
- どちらも公開情報上のレビュー状態であり、採用可能性や採用結果の予測ではない。

## 次の計画

1. `unmatched` 3件に対して、候補なし/複数勤務地/公開事業所未登録/求人側情報不足などの理由分類を追加する。
2. 実求人収集を20から30件へ拡張する。
3. 公開職員数と接続済み給与を組み合わせた施設単位の採用力推定へ進む。
