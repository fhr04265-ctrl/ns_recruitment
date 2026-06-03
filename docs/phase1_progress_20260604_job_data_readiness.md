# Phase 1 progress: job data readiness milestone

Date: 2026-06-04

## Summary

The local MVP has moved from a market map into a recruitment-condition decision tool. The latest local HTML adds a job data quality review layer so real job CSVs can be piloted without treating incomplete data as a market conclusion.

Local artifact:

- `C:\Users\user\Documents\Codex\outputs\tokyo_metropolitan_nurse_recruitment_map_mvp.html`
- Preview screenshot: `C:\Users\user\Documents\Codex\outputs\tokyo_metropolitan_nurse_recruitment_map_mvp_preview_v11.png`

## Implemented locally

- Added a real job data quality review section in the Job tab.
- Added export for `job_salary_quality_review_mvp.csv`.
- The quality export includes source URL, collection/update dates, review status, data usage, matching status, salary fields, annual salary, daily salary, holidays, weekend off, on-call, education, visit cap, commute hints, missing fields, quality score, and review notes.
- Kept the simulator language as recruitment condition competitiveness and improvement priority, not hiring probability.

## Validation

- JavaScript syntax validation passed with `scripts/check_nurse_map_phase05.mjs`.
- Required UI/CSV markers are present.
- Risk phrases such as `〇〇%取れる`, `獲得率`, and `勝率` are not present in the MVP HTML.
- Headless Edge generated preview screenshot `tokyo_metropolitan_nurse_recruitment_map_mvp_preview_v11.png`.

## Sub-agent review

The review conclusion was that the MVP is ready for a small real-job pilot, but not yet for full-scale exhaustive ingestion.

Recommended first pilot:

- 3 to 5 municipalities in the Tokyo metropolitan area.
- 50 to 200 real job postings.
- Primary goal: verify schema durability, source traceability, matching rate, missing condition fields, competitive TOP10 behavior, and management proposal output.

## Revised next milestone

1. Select 3 to 5 pilot municipalities.
2. Collect or prepare 50 to 200 open/public job postings with source URL and collection date.
3. Import them into the current salary CSV schema.
4. Export and review `job_salary_quality_review_mvp.csv`.
5. Improve matching rules and field normalization for common job-posting wording variance.
6. Validate the management proposal Markdown against real postings.

## Guardrail

Do not present the output as hiring probability, win rate, acquisition rate, or `X% can be hired`. Until funnel data exists, the correct output is recruitment condition competitiveness and improvement priority.
