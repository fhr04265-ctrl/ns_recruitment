# Loaded Jobs Tab Milestone

- Date: 2026-06-05
- Artifact: `outputs/tokyo_metropolitan_nurse_recruitment_map_mvp.html`
- Validation: `scripts/check_nurse_map_loaded_jobs_tab.mjs`

## What Changed

- Added a new `取込求人` tab next to the existing `求人` review tab.
- The new tab focuses only on currently imported job rows, so users can see what data is actually present at the current stage.
- Added city and status filters for imported jobs.
- Added city-level storage summary with job count, matched count, review count, analysis-usable count, annual salary median, and daily salary median.
- Added an imported-job row list with facility label, city, monthly salary, annual salary, daily salary, and match/review status.
- Added `取込求人一覧CSV` export for the currently filtered view.
- Changed CSV import behavior so the app opens the new `取込求人` tab immediately after a job salary CSV is imported.

## Why This Matters

The broader map can make areas look comparable even when job data is still sparse. This tab separates the current imported-job dataset from the wider market map, making it easier to answer:

- Which municipalities currently have job rows?
- How many imported jobs are matched, under review, or usable for analysis?
- What salaries are visible from the rows currently stored?
- Which areas are still missing data and should not be interpreted as having no jobs?

## Guardrail

The tab explicitly treats missing rows as `not yet imported or not yet researched`, not as evidence that jobs do not exist in that municipality.

## Validation

- `check_nurse_map_phase05.mjs`: passed
- `check_nurse_map_official_source_batch_import.mjs outputs/real_job_official_source_batch_matched_20260605.csv`: passed
- `check_nurse_map_loaded_jobs_tab.mjs outputs/real_job_official_source_batch_matched_20260605.csv`: passed

## Current Test Result

Using `real_job_official_source_batch_matched_20260605.csv`:

- Imported jobs: 8
- Stored areas shown in tab: 6
- Facility matched rows: 2
- Review-target rows: 6
- Analysis-usable rows: 0
- Export CSV rows: 8
