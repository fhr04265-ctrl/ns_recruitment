# 実求人CSV v2監査列追加計画 2026-06-04

## 結論

30〜50件へ増やす前に、現在の60列CSVを壊さず、後続列として監査・再利用可否・給与パース状態・突合状態を追加する。既存HTMLは現60列を読み込めるため、v2列は追加情報として扱う。

## 最優先で追加する列

- `source_terms_checked_at`: 媒体・公式サイトの利用条件を確認した日。
- `source_terms_status`: `ok_internal` / `ok_display` / `needs_review` / `do_not_reuse`。
- `reuse_scope`: `internal_only` / `dashboard_ok` / `csv_export_ok` / `do_not_reuse`。
- `original_source_url`: 第三者媒体の場合の原求人URL。未確認なら空欄。
- `job_number`: ハローワーク等の求人番号。
- `salary_raw_text`: 求人票の給与欄原文の短い要約。
- `salary_parse_status`: `parsed` / `partial` / `failed`。
- `range_status`: `range` / `single_bound` / `model_case` / `unknown`。
- `bonus_status`: `amount_parsed` / `months_only` / `exists_unknown_amount` / `unknown` / `none_stated`。
- `allowance_text`: 手当の内訳要約。
- `facility_match_status`: `matched` / `unmatched` / `ambiguous` / `excluded`。
- `facility_match_confidence`: `high` / `medium` / `low`。
- `facility_match_reason`: 電話一致、住所一致、事業所名一致など。
- `manual_review_required`: `true` / `false`。
- `missing_reason`: 欠損がある場合の理由。

## 30〜50件化前のゲート

- `source_url` と `job_id` の重複を禁止。
- `source_terms_status=do_not_reuse` は地図表示・CSV出力対象外にする。
- `source_terms_status=needs_review` は分析には入れても、外部共有レポートでは要注意扱い。
- 月給10万円未満または80万円超は警告。
- `monthly_total_min > monthly_total_max` はエラー。
- パート、時給、夜勤専従は常勤月給レンジと混ぜない。
- 法人名だけの突合は `ambiguous`。
- 住所、電話、事業所名のうち2要素以上が合わない場合は自動接続しない。

## 画面に残す警告

- 求人票給与であり、実支給額ではない。
- 手当・賞与・固定残業代の含み方は求人票ごとに異なる。
- 媒体規約上、再表示・再配布できない求人は内部検証のみ。
- 未突合・候補複数の求人は給与集計に含めない。
- 1日あたり給与は年俸÷業務日数の比較用換算であり、日給求人ではない。
- 採用成功率、応募可能性、採用人数の予測ではない。
