# 実求人×公開事業所マッチング マイルストーンログ

Date: 2026-06-04

## 実施内容

- 実求人パイロットCSV 12件を、公開訪問看護事業所データとオフライン突合するスクリプトを追加した。
- 対象の公開事業所データは `pref_13.js`, `pref_14.js`, `pref_11.js`, `pref_12.js`。
- 訪問看護グループの公開事業所 4,390件を候補母集団にした。
- 求人名、法人名、住所、電話番号、都県、市区町村ヒントを使ってスコアリングした。
- 自動マッチ結果だけでなく、候補確認用CSVに上位候補を残す設計にした。

## 出力

- `scripts/match_real_job_pilot_facilities.mjs`
- `outputs/real_job_pilot_seed_matched_20260604.csv`
- `outputs/real_job_facility_match_review_20260604.csv`
- `outputs/real_job_facility_match_report_20260604.md`

## 結果

- 求人件数: 12
- 公開訪問看護事業所候補: 4,390
- matched: 6
- review_candidate: 3
- unmatched: 3
- matched rate: 50%

## ステータス定義

- `matched`: 75点以上で、競合候補が近接していない。
- `review_candidate`: 55点以上75点未満。自動確定せず、人間確認に回す。
- `ambiguous`: 75点以上の候補が複数あり、上位差が8点以内。
- `unmatched`: 55点未満、または候補なし。

## ガードレール

- マッチ結果は、公開情報上の接続候補であり、事業所による確認済み事実ではない。
- `review_candidate`, `ambiguous`, `unmatched` は施設単位分析に使う前に手動確認を前提にする。
- 電話番号一致は強い根拠だが、求人用番号・代表番号・法人本部番号が混在し得るため、名称・住所・法人名も併用する。
- 同一法人の複数拠点や複数勤務地求人は誤マッチしやすいため、候補レビューCSVを併せて確認する。

## 検証

- HTML検証: OK
- リスク語句チェック: OK
- matched seed CSV: 75列構造OK
- `check_real_job_pilot_seed.mjs` による品質チェック: OK

## 次の計画

1. `review_candidate` 3件を人間確認し、しきい値・スコア重みを調整する。
2. マップ側のCSVインポート後に、`matched`, `review_candidate`, `unmatched` をUIで明示する。
3. 施設単位の採用力推定に、実求人給与・公開職員数・公開事業所属性を接続する。
4. 実求人収集を20から30件へ拡張し、媒体別の再利用条件・更新日・給与分解の監査を継続する。
