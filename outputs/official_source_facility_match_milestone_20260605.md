# Official Source Facility Match Milestone

- Date: 2026-06-05
- Scope: official/public recruitment source batch for Tokyo metropolitan MVP
- Input: `outputs/real_job_official_source_batch_20260604.csv`
- Matched output: `outputs/real_job_official_source_batch_matched_20260605.csv`
- Review output: `outputs/official_source_facility_match_review_20260605.csv`
- Manual review table: `outputs/official_source_facility_match_manual_review_20260605.csv`
- Match report: `outputs/official_source_facility_match_report_20260605.md`

## What Changed

- Reused the public visiting-nursing facility dataset for Tokyo, Kanagawa, Saitama, and Chiba.
- Added argument support to `scripts/match_real_job_pilot_facilities.mjs`, so the same matching workflow can run against later batches without overwriting the pilot outputs.
- Generated facility-linkage candidates for the 8 official-source job rows.
- Added an encoding-safe manual review table for the 8 rows, with ASCII facility labels, source URLs, automatic match status, candidate IDs, and human decision fields.
- Updated the HTML import check so it can validate both the original official batch and the matched official batch.
- Added `scripts/check_official_facility_manual_review.mjs` to prevent premature confirmed matches.

## Result

- Jobs processed: 8
- Public visiting-nursing facilities loaded: 4,390
- Automatic matched candidates: 2
- Review candidates: 3
- Unmatched: 3
- Facility matched rate: 25%

These are public-data linkage candidates, not confirmed facility facts. The matched output should be used for analysis staging, while the review CSV remains the source for manual confirmation.

## Why This Matters

This step starts connecting job salary data to the facility-level view needed for the map:

- facility bubble size and hiring-strength proxy can later combine public facility attributes and job offer strength
- salary comparisons can move from row-level job listings toward facility-level benchmarking
- unmatched and review-candidate rows expose the exact cases where name, address, or phone normalization needs improvement

## Validation

- `check_real_job_pilot_seed.mjs outputs/real_job_official_source_batch_matched_20260605.csv`: passed
- `check_nurse_map_official_source_batch_import.mjs outputs/real_job_official_source_batch_matched_20260605.csv`: passed
- `check_official_facility_manual_review.mjs outputs/official_source_facility_match_manual_review_20260605.csv 8`: passed
- `check_nurse_map_phase05.mjs`: passed

## Guardrails

- Do not treat automatic matches as facility-confirmed records.
- Keep all rows as review-required until source terms and facility linkage are manually reviewed.
- Do not use official-source status as a substitute for reuse permission.
- Keep third-party scraped job boards outside the reusable analysis dataset unless terms review explicitly allows the intended use.

## Recommended Next Step

Improve match precision before scaling the batch. A sub-agent review recommended not moving to nationwide comparison yet, because 25% automatic facility matching would create a biased comparison base.

1. Add a manual review merge table for `official_source_facility_match_review_20260605.csv`.
2. Promote reviewed rows from `matched/review_candidate/unmatched` into `confirmed_match/rejected_match/needs_more_evidence`.
3. Add phone/address/name normalization improvements for the 3 unmatched and 3 review-candidate rows.
4. Once at least 80% of the official batch has reviewed facility linkage, expand to 20-30 official job rows and rerun the same workflow.

## Gate Before Nationwide Comparison

- Reviewed facility linkage: at least 80% of the current official batch.
- Analysis-use source terms: at least half of reviewed linked rows classified as `confirmed_allowed` or an explicit internal-analysis equivalent.
- Salary quality: separate handling for `single_bound`, bonus-month estimates, and allowance-included annual salary.
- Encoding/readability: manual review artifacts must show readable facility names and source URLs.
