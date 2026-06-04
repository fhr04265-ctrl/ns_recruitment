# Official Source Job Batch Milestone

- Date: 2026-06-04
- Artifact: `outputs/real_job_official_source_batch_20260604.csv`
- Scope: Small real job data expansion before higher-volume collection

## What Changed

- Added an 8-row official-source visiting nurse job batch.
- Kept all rows as `source_terms_status = needs_review` and `reuse_scope = internal_only`.
- Kept all rows as `facility_match_status = unmatched` and `manual_review_required = true`.
- Preserved the 75-column pilot seed schema.
- Added a browser import validation:
  - `scripts/check_nurse_map_official_source_batch_import.mjs`

## Source Mix

- Tokyo:
  - 大泉学園訪問看護ステーション
  - GIVER訪問看護ステーション
  - ルージュ訪問看護ステーション
  - すみだ訪問看護ステーション
  - ロコ訪問看護ステーション
  - 調布訪問看護ステーション
- Kanagawa:
  - 訪問看護ステーション プルーブ
  - ラピス訪問看護ステーション

## Validation Results

- `scripts/check_real_job_pilot_seed.mjs outputs/real_job_official_source_batch_20260604.csv`
  - rows: 8
  - columns: 75
  - structureOk: true
  - thirdPartyRows: 0
  - duplicateJobIds: none
  - duplicateSourceUrls: none
  - doNotReuseRows: 0
  - averageScore: 38
  - needsReview: 8
- `scripts/check_nurse_map_official_source_batch_import.mjs`
  - HTML import succeeded.
  - Job Quality CSV exported 8 rows.
  - Source terms audit queue exported 0 rows because rows remain `needs_review/internal_only`.
  - CSV row widths aligned.

## Interpretation

The batch is intentionally conservative. It should not be used for market benchmarking yet because facility matching, source terms review, and salary decomposition review are not complete.

The value of this milestone is confirming that official-source rows can be collected into the existing 75-column schema and imported into the HTML without breaking the governance workflow.

## Guardrails

- This is a public-page collection batch, not proof of current hiring availability.
- Salary values are structured from public recruitment pages at collection time and are not actual paid salaries.
- `needs_review/internal_only` means the rows are not yet analysis-ready.
- All source pages need source terms review before analysis, display, or export scope is expanded.
- `source_terms_audit_queue` being empty does not mean governance is complete; these rows are outside the audit target until source terms status/scope are reviewed.
- Because all rows are currently unmatched, they should be used for field coverage and salary parsing checks, not facility-level competitiveness scoring.

## Subagent Review

Subagent review supported the direction and recommended:

- Do not interpret `third_party_rate = 0%` as reuse permission.
- Keep the batch as internal preparation data until source terms and facility matching are complete.
- Validate duplicate `job_id` / `source_url`, row width, required field fill rate, annual salary formula consistency, and salary warning classification.
- Proceed next with facility matching by address, phone, and name, then source terms review to `confirmed_allowed/analysis_only` where appropriate.

## Next Candidate

Run facility matching for the official batch, then run the source terms audit queue workflow for rows intended to become analysis-usable.
