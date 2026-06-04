# 手動接続監査CSV マイルストーンログ

Date: 2026-06-04

## 実施内容

- 求人タブに `手動接続監査CSV` ボタンを追加した。
- 候補比較UIで `接続` した求人に、手動接続時刻と接続メモを保持するようにした。
- 手動接続結果を `manual_match_audit_mvp.csv` として出力できるようにした。
- 監査CSVには、現在の接続状態だけでなく、次回CSV整形へ反映しやすい `next_import_*` 列を追加した。
- 手動接続の動作検証スクリプト `scripts/check_nurse_map_manual_audit_ui.mjs` を追加した。

## 検証結果

`real_job_pilot_seed_matched_20260604.csv` を取り込んだ状態から、候補を1件手動接続した。

- 手動接続前: 接続6件 / 要確認候補3件 / 未突合3件
- 手動接続後: 接続7件 / 要確認候補2件 / 未突合3件
- `手動接続を解除` ボタン表示: OK
- `手動接続監査CSV` ボタン表示: OK

## 出力列の意図

- `manual_facility_uid`: UI上で手動接続した事業所UID。
- `matched_facility_*`: 接続先事業所の公開データ。
- `top_candidate_details`: 判断時に比較した候補情報。
- `next_import_*`: 次回の実求人CSV整形に戻すための推奨反映列。
- `notice_type`: 採用確率ではなく、突合監査であることを明示する分類。

## 検証

- `scripts/check_nurse_map_phase05.mjs`: OK
- `scripts/check_nurse_map_real_job_ui.mjs`: OK
- `scripts/check_nurse_map_manual_audit_ui.mjs`: OK
- リスク語句チェック: OK
- スクリーンショット: `outputs/tokyo_metropolitan_nurse_recruitment_map_mvp_preview_v17_manual_audit.png`

## 注意

- 手動接続は、公開情報上の候補接続であり、事業所による確認済み事実ではない。
- 手動接続結果を本番データへ反映する前に、住所・電話・法人名・求人URLを人間が確認する。
- 現時点ではブラウザ内の一時状態であり、永続反映はCSV出力後の再整形で行う。

## 次の計画

1. 監査CSVを元の実求人CSVへ反映するマージスクリプトを作る。
2. 手動接続済みCSVを再取込して、接続状態が再現されることを確認する。
3. `review_candidate` 3件の実確認ワークフローを固める。
4. 実求人収集を20から30件へ拡張する。
