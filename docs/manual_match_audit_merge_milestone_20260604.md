# 手動接続監査CSV マージ再取込マイルストーンログ

Date: 2026-06-04

## 実施内容

- `manual_match_audit_mvp.csv` を元の実求人CSVへ反映するマージスクリプトを追加した。
- テスト用監査CSV `manual_match_audit_sample_20260604.csv` を作成した。
- `real-saitama-001` を `訪問看護リベル西大宮` に手動接続する想定でマージ検証した。
- マージ後CSV `real_job_pilot_seed_manual_merged_20260604.csv` を作成した。
- マージ後CSVをHTMLへ再取込し、接続状態が再現されることを確認した。

## 追加ファイル

- `scripts/apply_manual_match_audit.mjs`
- `scripts/check_nurse_map_manual_merged_import.mjs`
- `outputs/manual_match_audit_sample_20260604.csv`
- `outputs/real_job_pilot_seed_manual_merged_20260604.csv`
- `outputs/manual_match_audit_merge_report_20260604.md`
- `outputs/tokyo_metropolitan_nurse_recruitment_map_mvp_preview_v18_manual_merged.png`

## マージ検証

- Seed rows: 12
- Audit rows: 1
- Applied: 1
- Unchanged: 11
- Audit issues: 0

対象行:

- `real-saitama-001`
- Before: `review_candidate`
- After: `matched`
- Facility UID: `11-1417`
- Facility No: `1166591861`
- Matched name: `訪問看護リベル西大宮`
- Match method: `manual_ui_review`

## 再取込検証

`real_job_pilot_seed_manual_merged_20260604.csv` をHTMLへ取り込んだ結果:

- 求人: 12件
- 対象: 12件
- 接続: 7件
- 施設: 7件
- 要確認候補: 2件
- 未突合: 3件
- 候補複数: 0件
- 対象外: 0件

## QA

- CSV構造: 75列OK
- `check_real_job_pilot_seed.mjs`: OK
- `check_nurse_map_phase05.mjs`: OK
- `check_nurse_map_manual_merged_import.mjs`: OK
- リスク語句チェック: OK

## 注意

- マージ済みの `matched` は、人間確認を経た公開情報上の接続候補であり、事業所による確認済み事実ではない。
- 本番利用前には、求人URL、事業所住所、電話、法人名を再確認する。
- マージスクリプトは、`next_import_*` 列を持つ監査CSVを入力前提にする。

## 次の計画

1. 監査CSVの実ダウンロードファイルを使った実運用テストを行う。
2. `review_candidate` 残り2件と `unmatched` 3件の扱いを、接続/保留/除外で管理する。
3. 実求人収集を20から30件へ拡張する。
4. 公開職員数と接続済み給与を組み合わせた施設単位の採用力推定へ進む。
