# Source Terms Audit Queue Workflow

- Date: 2026-06-04
- Tool: `outputs/tokyo_metropolitan_nurse_recruitment_map_mvp.html`
- Purpose: Turn `source_terms_audit` warnings into reviewed records before scaling real job data.

## Goal

Use `source_terms_audit_queue_mvp.csv` as an operational work queue. The queue helps identify job rows where the source terms review basis is missing, stale, or close to re-check.

This workflow does not provide legal advice, final rights clearance, or proof of media terms compliance. It creates a reproducible operational review record for the MVP.

## Inputs

- Main HTML tool: `outputs/tokyo_metropolitan_nurse_recruitment_map_mvp.html`
- Current real job seed CSV, such as `outputs/real_job_pilot_seed_review_decisions_20260604.csv`
- Queue CSV exported from the HTML: `source_terms_audit_queue_mvp.csv`
- Resolution template: `outputs/source_terms_audit_resolution_template_20260604.csv`
- Merge script: `scripts/apply_manual_match_audit.mjs`

## Workflow

1. Import the current real job seed CSV into the HTML.
2. Open the job review panel and export `媒体条件監査キューCSV`.
3. Sort the queue by:
   - `queue_priority`
   - `analysis_use_allowed`
   - `due_date`
   - `queue_reason`
4. For each row, review the source page, media terms page, internal policy, or direct permission record.
5. Fill a manual audit CSV with:
   - `job_id`
   - `terms_reviewed_at`
   - `terms_review_note`
   - `terms_review_basis_url`
   - `terms_review_basis_type`
   - `terms_review_expires_at`
   - `source_terms_status_after`
   - `reuse_scope_after`
   - The fields above are required for queue resolution work. A row with only basis URL may not update the intended status/scope.
6. Run `scripts/apply_manual_match_audit.mjs` with the current seed and the completed audit CSV.
7. Import the merged seed back into the HTML.
8. Confirm:
   - `source_terms_audit_warning` decreases.
   - `analysis_usable_with_audit_warning` is zero or explicitly accepted.
   - `source_terms_audit_queue_mvp.csv` has fewer rows.
   - Queue row count, resolution template row count, and merge report Applied Rows count are reconciled.
   - Any changes in `legal_review_required` and `analysis_use_allowed` are understood.

## Required Basis Types

- `source_page`: source job page itself was reviewed.
- `media_terms`: media terms or robots/reuse policy was reviewed.
- `direct_permission`: direct permission record exists.
- `internal_policy`: internal data-use policy record was used.
- `manual_note`: temporary manual note; should be rechecked sooner.

## Priority Rules

- `high`: the row is analysis-usable but still has audit warning, or the re-check date is expired.
- `medium`: missing re-check date, re-check date within 30 days, or other basis warning.
- `low`: fallback only; normal non-queue rows should not appear.

## Completion Criteria

- Every row in the queue has a clear next action or has been resolved.
- Resolved rows have basis URL, basis type, and re-check date.
- Resolved rows have `source_terms_status_after` and `reuse_scope_after`.
- Worker/reviewer, review date, basis type, basis URL, and re-check date are not blank for resolved rows.
- The merged seed keeps `source_terms_basis_url`, `source_terms_basis_type`, and `source_terms_expires_at`.
- The HTML summary shows the expected reduction in warning count.
- `analysis_usable_with_audit_warning` is zero, or every remaining exception has a reason.

## Stop Conditions

- The source page is inaccessible and no terms or permission record can be found.
- The source terms appear to restrict analysis, display, or export beyond the intended scope.
- The row is important for analysis but basis cannot be recorded.
- A human legal or policy decision is needed.
- The media terms are ambiguous and the allowed scope cannot be determined.
- The only basis is a job page URL and no terms, policy, or permission basis can be confirmed.
- The row would be set to `export_allowed` but explicit redistribution permission is not recorded.
- A past-due review date would be extended without a fresh review.

In these cases, keep or set the row to a restricted review scope rather than treating it as cleared.

## Example Merge Command

```powershell
& 'C:\Users\user\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' '.\scripts\apply_manual_match_audit.mjs' '.\outputs\real_job_pilot_seed_review_decisions_20260604.csv' '.\outputs\source_terms_audit_resolution_template_20260604.csv' '.\outputs\real_job_pilot_seed_terms_resolved_20260604.csv' '.\outputs\source_terms_audit_resolution_report_20260604.md'
```

## Notes

- `ok` means a review basis is recorded. It does not mean the source is legally cleared.
- `warning` means the operational review record needs attention. It does not mean violation or invalid data.
- `not_required` means outside this audit target, not that source review is unnecessary in all contexts.
- Avoid treating `resolved` as "usable", "cleared", "compliant", or "permission granted". In this workflow it only means the operational audit record was completed.
