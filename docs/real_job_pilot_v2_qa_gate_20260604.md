# Real job pilot v2 QA gate implementation note

Date: 2026-06-04

## Summary

Implemented the v2 audit columns locally for the nurse recruitment market map MVP. The goal is to make the next 30 to 50 real job postings auditable before they are used for salary benchmarks or recruitment-condition competitiveness analysis.

Local artifacts updated:

- `C:\Users\user\Documents\Codex\outputs\tokyo_metropolitan_nurse_recruitment_map_mvp.html`
- `C:\Users\user\Documents\Codex\scripts\build_real_job_pilot_seed.mjs`
- `C:\Users\user\Documents\Codex\scripts\check_real_job_pilot_seed.mjs`
- `C:\Users\user\Documents\Codex\outputs\real_job_pilot_seed_20260604.csv`
- `C:\Users\user\Documents\Codex\outputs\real_job_pilot_quality_report_20260604.md`
- `C:\Users\user\Documents\Codex\outputs\real_job_pilot_quality_issues_20260604.csv`
- `C:\Users\user\Documents\Codex\outputs\tokyo_metropolitan_nurse_recruitment_map_mvp_preview_v14.png`

## Implemented v2 columns

The existing 60-column CSV remains backward compatible. The following 15 v2 columns are appended after the existing columns:

- `source_terms_checked_at`
- `source_terms_status`
- `reuse_scope`
- `original_source_url`
- `job_number`
- `salary_raw_text`
- `salary_parse_status`
- `range_status`
- `bonus_status`
- `allowance_text`
- `facility_match_status`
- `facility_match_confidence`
- `facility_match_reason`
- `manual_review_required`
- `missing_reason`

## HTML changes

The local HTML importer now reads these v2 columns when present. Older CSV files continue to work because unknown or absent columns are tolerated.

The job quality export now includes the v2 audit fields, so source terms, reuse scope, salary parsing, and facility matching can be reviewed after import.

## QA script changes

`check_real_job_pilot_seed.mjs` now expects 75 columns for the v2 seed file and checks:

- structure and column count
- source URL
- collection date
- posting/update date
- source terms status
- reuse scope
- salary parse status
- salary range status
- bonus status
- facility match status
- manual review flag
- third-party media risk
- salary calculation warnings

## Current validation result

- seed rows: 5
- columns: 75/75
- structure: OK
- average quality score: 35
- rows under 80 points: 5
- third-party media rows: 2

The low score is intentional at this stage because all rows are still `needs_review`, `salary_parse_status=partial`, and `facility_match_status=unmatched`. The v2 QA gate is therefore correctly preventing premature use as a market conclusion.

## Sub-agent review incorporated

The review advised that v2 fields should not all become manual collection burdens. The implementation keeps older CSVs compatible and treats missing v2 fields as warnings rather than import failures.

For 30 to 50 job collection, the most important fields are:

- source/reuse status
- salary parse status
- facility match status
- manual review status

## Guardrail

The output remains recruitment-condition competitiveness and data-quality review, not hiring probability or expected hires.
