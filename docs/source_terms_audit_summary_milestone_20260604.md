# Source Terms Audit Summary Milestone

- Date: 2026-06-04
- Artifact: `outputs/tokyo_metropolitan_nurse_recruitment_map_mvp.html`
- Scope: Real job pilot data governance dashboard

## What Changed

- Added a dashboard-level source terms audit summary under the job data quality panel.
- Added visible metrics:
  - `source_terms_audit_warning_rate`
  - `source_terms_audit_ok`
  - `source_terms_audit_warning`
  - `source_terms_audit_not_required`
  - `source_terms_audit_target`
  - `source_terms_audit_warning_rate_all_rows`
  - `analysis_usable_with_audit_warning`
  - `source_terms_expires_within_30_days`
  - `source_terms_audit_top_issues`
- Kept the existing Job Quality CSV columns:
  - `source_terms_audit_status`
  - `source_terms_audit_issues`

## Design Notes

- `warning_rate` uses audit target rows as the primary denominator: `warning / (ok + warning)`.
- `warning_rate_all_rows` is shown separately to avoid hiding warning volume behind `not_required` rows.
- `ok` means review basis is recorded, not that the source is legally cleared.
- `warning` means the operational review record needs attention, not that the row is prohibited or noncompliant.
- `not_required` means outside the source terms audit target for this metric, not that source review is unnecessary in all contexts.

## Verification

- `scripts/check_nurse_map_source_terms_audit_warning_ui.mjs`
- `scripts/check_nurse_map_source_terms_review_ui.mjs`
- `scripts/check_nurse_map_source_terms_merge_import.mjs`
- `scripts/check_nurse_map_phase05.mjs`

All checks passed on 2026-06-04.

## Next Candidate

Add a source terms audit CSV export dedicated to governance work queues, so rows with missing basis URL, missing re-check date, expired review, and analysis-usable warning can be triaged outside the UI.
