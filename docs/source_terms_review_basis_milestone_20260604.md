# Source Terms Review Basis Milestone

- Date: 2026-06-04
- Artifact: `outputs/tokyo_metropolitan_nurse_recruitment_map_mvp.html`
- Scope: Visiting nurse recruitment map MVP, real job pilot data governance

## What Changed

- Added source terms review basis fields to the job detail review UI:
  - `terms_review_basis_url`
  - `terms_review_basis_type`
  - `terms_review_expires_at`
- Added the same fields to `manual_match_audit_mvp.csv`.
- Added current-state carry fields to merged seed CSV:
  - `source_terms_basis_url`
  - `source_terms_basis_type`
  - `source_terms_expires_at`
  - `source_terms_review_note`
- Updated `scripts/apply_manual_match_audit.mjs` so source terms review basis fields are retained after audit merge.
- Updated the source terms review sample CSV to a lightweight terms-review-specific fixture.

## Why This Matters

The MVP can now keep an operational review trail for why a job row was included in analysis, display, or CSV export scope. This improves later source re-checks and prevents source terms decisions from becoming hidden UI-only state.

## Guardrails

- These fields are operational review records for MVP data handling.
- They do not imply legal advice, final rights clearance, or complete media terms compliance.
- `analysis_only`, `display_allowed`, and `export_allowed` remain separate reuse scopes.
- Re-check dates should be used to refresh source terms assumptions before wider operational use.

## Verification

- `scripts/check_nurse_map_source_terms_review_ui.mjs`
- `scripts/check_nurse_map_source_terms_merge_import.mjs`
- `scripts/check_nurse_map_phase05.mjs`

All checks passed on 2026-06-04.
