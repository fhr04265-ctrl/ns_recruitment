# Source Terms Audit Queue CSV Milestone

- Date: 2026-06-04
- Artifact: `outputs/tokyo_metropolitan_nurse_recruitment_map_mvp.html`
- Scope: Real job pilot data governance work queue

## What Changed

- Added a `媒体条件監査キューCSV` button to the job review panel.
- Added `exportSourceTermsAuditQueueCsv()` to export `source_terms_audit_queue_mvp.csv`.
- The queue includes:
  - rows with `source_terms_audit_status = warning`
  - rows whose source terms re-check date is within 30 days
- Added queue fields:
  - `queue_reason`
  - `queue_created_reason_label`
  - `queue_priority`
  - `queue_owner`
  - `due_date`
  - `next_action`
  - `source_terms_audit_status`
  - `source_terms_audit_issues`
  - `analysis_use_allowed`
  - `legal_review_required`
  - `legal_reuse_scope`
  - source terms basis URL/type/expires date
  - `basis_source`
  - `last_reviewed_at`
  - source URL, facility/job identifiers, and salary reference fields

## Queue Logic

- `high`: analysis-usable rows with audit warning, or expired source terms review.
- `medium`: missing re-check date, upcoming re-check date, or other source terms basis warning.
- `low`: fallback only; normal non-queue rows are not exported.

## Guardrails

- This CSV is an operational work queue.
- It does not imply legal advice, final rights clearance, source legality, or media terms compliance.
- `warning` means the review basis record needs attention, not that the job row is prohibited or invalid.

## Verification

- `scripts/check_nurse_map_source_terms_audit_warning_ui.mjs`
- `scripts/check_nurse_map_source_terms_review_ui.mjs`
- `scripts/check_nurse_map_source_terms_merge_import.mjs`
- `scripts/check_nurse_map_phase05.mjs`

All checks passed on 2026-06-04.

## Subagent Review

Subagent review supported the work queue direction and recommended owner, due date, basis source, last reviewed date, and human-readable reason labels. These were added before final verification.

## Next Candidate

Add a small sample workflow document: export queue CSV, fill missing basis/re-check fields, merge back through manual audit CSV, and confirm the warning count decreases.
