# 分析集計対象モード マイルストーン 2026-06-04

## 目的

実求人データを早く見られる状態にしつつ、媒体条件・突合・給与計算条件が未確認の行を、給与中央値・条件比較・市区町村CSVの分析値へ混ぜないための切替を追加した。

## 実装内容

- 左サイドバーに `全取込データ` / `集計対象のみ` の切替を追加。
- 給与集計、市区町村別給与表、競合求人TOP、条件比較シミュレーションの母集団を切替に連動。
- 求人レビュー画面に、取込件数・集計対象件数・集計対象外件数を表示。
- 求人レビュー行に `集計対象`、`条件未確認`、`突合未確定`、`給与集計対象外` のバッジと除外理由を表示。
- 市区町村CSVに `analysis_filter_mode` と `analysis_filter_label` を追加。
- 求人品質CSVの `analysis_use_allowed` と `excluded_from_analysis_reason` の出力位置をヘッダーと整合。
- UI検証スクリプト `scripts/check_nurse_map_analysis_scope_ui.mjs` を追加。

## サブエージェント評価の反映

- Descartes: 母数表示、除外理由表示、レビュー一覧と分析集計の分離が必要と指摘。今回のカード・バッジ・注記に反映。
- Rawls: 「正しい/不正」ではなく「集計対象/確認中」に寄せるべきと指摘。ラベルを `全取込データ` / `集計対象のみ` に変更し、未確認行を分析値から分離する注意書きを追加。

## 検証

- `scripts/check_nurse_map_phase05.mjs`
- `scripts/check_nurse_map_analysis_scope_ui.mjs`
- `scripts/check_nurse_map_review_decisions_import.mjs`
- `scripts/check_nurse_map_terms_enum_location_split_ui.mjs`

全て成功。禁止表現チェックも検出なし。

## 次の推奨ステップ

1. 媒体条件レビューの実入力欄を追加し、`source_terms_status=confirmed_allowed` へ更新できる運用フローを作る。
2. `集計対象のみ` で0件になる現在のパイロットデータに、確認済みサンプルを数件作り、分析値が切替で変わることを目視確認する。
3. その後、求人データ収集ソースごとの利用条件テンプレートと、媒体別インポート手順に進む。
