# Source Terms Audit Warning Milestone

- Date: 2026-06-04
- Artifact: `outputs/tokyo_metropolitan_nurse_recruitment_map_mvp.html`
- Scope: Real job pilot data governance

## What Changed

- Added source terms audit warning logic for rows treated as usable under:
  - `source_terms_status = confirmed_allowed`
  - `reuse_scope = analysis_only`, `display_allowed`, or `export_allowed`
- Added warning checks for:
  - missing basis URL
  - missing basis type
  - unsupported basis type
  - missing re-check date
  - expired re-check date
  - invalid re-check date
- Added a source terms audit status pill and warning note to the job detail review UI.
- Added the following columns to `job_salary_quality_review_mvp.csv`:
  - `source_terms_audit_status`
  - `source_terms_audit_issues`
- Connected source terms audit issues to the job quality score as review penalties.

## Guardrails

- The warning means an operational review record is incomplete.
- It does not mean the source is legally usable or unusable.
- It does not imply legal advice, final rights clearance, or complete media terms compliance.
- Source terms status, reuse scope, and audit basis remain separate concepts.

## Verification

- `scripts/check_nurse_map_source_terms_audit_warning_ui.mjs`
- `scripts/check_nurse_map_source_terms_review_ui.mjs`
- `scripts/check_nurse_map_source_terms_merge_import.mjs`
- `scripts/check_nurse_map_phase05.mjs`

All checks passed on 2026-06-04.

## Next Candidate

Add a compact dashboard-level summary for source terms audit status, such as OK / warning / not required counts, so the user can see whether the real job pilot dataset is ready to scale before importing more job sources.
