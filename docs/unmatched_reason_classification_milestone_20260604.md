# 未突合理由分類マイルストーン 2026-06-04

## 実装内容

- 求人突合レビューに「未突合理由サマリー」を追加。
- レビュー対象行に「未突合理由」と理由詳細を追加。
- `unmatched_job_salary_mvp.csv`、`manual_match_audit_mvp.csv`、`job_salary_quality_review_mvp.csv` に `unmatched_reason` と `unmatched_reason_detail` を追加。
- 分類名は断定を避け、求人票と公開事業所データの照合上の観測として表現。

## 現在の分類

- 求人票に複数勤務地記載
- 求人票の照合情報不足
- 検索条件内に候補なし
- 候補はあるが一致度不足
- 人手確認推奨
- 手動保留
- 手動除外

## サブエージェント評価の反映

- `公開事業所未登録/低一致` は、事業所が未登録であると断定して見えるため廃止。
- 注意書きに「事業所の実在有無や求人の正確性を判定するものではない」旨を追加。
- 求人媒体や紹介会社由来の住所・電話である可能性を理由詳細に残すようにした。

## 検証

- `check_nurse_map_phase05.mjs`: pass
- `check_nurse_map_review_decisions_import.mjs`: pass
- `check_nurse_map_unmatched_reason_ui.mjs`: pass
- スクリーンショット: `outputs/tokyo_metropolitan_nurse_recruitment_map_mvp_preview_v21_unmatched_reason.png`

## 次の候補

- 未突合理由別に、次のアクションをCSVに追加する。
- 複数勤務地求人を勤務地単位に分割する下書きCSVを出力する。
- 実求人データの追加投入時に、媒体別の突合成功率ではなく「照合成功率」と「人手確認率」を分けて管理する。
