# 実求人30〜50件収集ワークフロー 2026-06-04

## 結論

次は、`real_job_collection_queue_20260604.csv` の候補から、公式採用ページを優先して10件ずつv2 CSVへ追加する。第三者媒体は原求人確認または媒体利用条件確認が終わるまで `reuse_scope=internal_only` のままにする。

## 優先順位

1. 公式採用ページ
2. 公的・準公的ページ、PDF募集要項
3. ハローワーク求人は、求人番号・利用条件確認日・出典URLを残せる場合のみ
4. 第三者求人媒体は、原求人確認ができる場合を優先

## 収集者チェックリスト

- `source_url` が求人個別ページまたは募集要項ページを指している。
- `collected_at` を入力した。
- `source_terms_status` を `needs_review` 以上で入力した。
- `reuse_scope` を `internal_only` 以上で入力した。
- `facility_name_raw`、`address_raw`、可能なら `phone` を入力した。
- `monthly_total_min/max` を入力した。片側だけなら `range_status=single_bound`。
- 給与原文を `salary_raw_text` に短く残した。
- 手当・賞与・固定残業代の含み方を `salary_notes` と `allowance_text` に残した。
- `salary_parse_status` を `parsed` / `partial` / `failed` で入力した。
- 施設突合前は `facility_match_status=unmatched`、候補複数なら `ambiguous`。
- 人間確認が必要なものは `manual_review_required=true`。

## 30〜50件到達前の停止条件

- 75列構造チェックがNG。
- `source_url` 重複または `job_id` 重複が発生。
- `source_terms_status=do_not_reuse` が混ざっている。
- `monthly_total_min > monthly_total_max` がある。
- 第三者媒体由来が全体の50%を超える。
- `salary_parse_status=failed` が20%を超える。
- `facility_match_status=matched` が20%未満のまま給与相場として使おうとしている。

## 分析利用判定

- `dashboard_ok`: 公式または利用条件確認済み、給与パースが `parsed`、施設突合が `matched` または人間確認済み。
- `internal_only`: 収集・検証には使うが、外部共有や断定的な比較には使わない。
- `needs_review`: 品質レビュー対象。給与集計には入れても、管理提案では注意表示を付ける。
- `do_not_reuse`: 取込・表示・CSV再配布の対象外。

## サブエージェントレビュー反映

- 次の10件は、公式5、ハローワーク3、第三者媒体2のバランスがよい。
- 収集対象は件数集めではなく、75列v2が実運用に耐えるかの監査。
- 条件競争力の監査データとして使い、採用確率、応募予測、定着予測、媒体効果、法人採用力の断定には使わない。

## 次の実装候補

- HTMLに収集キューCSVの読込/表示タブを追加する。
- `check_real_job_pilot_seed.mjs` に重複チェックと第三者媒体比率チェックを追加する。
- v2列の値に応じて、求人品質レビューで `dashboard_ok` / `internal_only` / `needs_review` を色分けする。
