# Source Terms Audit Resolution Workflow Milestone

- Date: 2026-06-04
- Artifact:
  - `outputs/source_terms_audit_queue_workflow_20260604.md`
  - `outputs/source_terms_audit_resolution_template_20260604.csv`
  - `scripts/check_nurse_map_source_terms_resolution_workflow.mjs`
- Scope: Real job pilot source terms governance workflow

## What Changed

- Added an operational workflow document for resolving `source_terms_audit` queue rows.
- Added a minimal resolution template CSV that can be passed to `scripts/apply_manual_match_audit.mjs`.
- Added an end-to-end validation script that:
  - merges the resolution template into the current seed,
  - imports the resolved seed into the HTML,
  - exports the source terms audit queue,
  - confirms the queue rows are resolved,
  - confirms Job Quality CSV retains `ok` audit status and review basis fields.

## Generated Outputs

- `outputs/real_job_pilot_seed_terms_resolved_20260604.csv`
- `outputs/source_terms_audit_resolution_report_20260604.md`
- `outputs/tokyo_metropolitan_nurse_recruitment_map_mvp_preview_v31_source_terms_resolution_workflow.png`

## Key Workflow Rules

- `source_terms_status_after` and `reuse_scope_after` are required for queue resolution work.
- Queue row count, resolution template row count, and merge report Applied Rows count should be reconciled.
- `analysis_usable_with_audit_warning` should become zero, or every remaining exception should have a reason.
- Resolved rows must keep basis URL, basis type, and re-check date in the merged seed.

## Guardrails

- The workflow creates operational audit records only.
- It does not provide legal advice, final rights clearance, source legality, or proof of media terms compliance.
- `resolved` means the operational audit record was completed. It does not mean usable, cleared, compliant, or permission granted.

## Verification

- `scripts/check_nurse_map_source_terms_resolution_workflow.mjs`
- `scripts/check_nurse_map_source_terms_audit_warning_ui.mjs`
- `scripts/check_nurse_map_phase05.mjs`

All checks passed on 2026-06-04.

## Subagent Review

Subagent review supported the workflow and recommended stronger completion and stop conditions. The workflow was updated to require status/scope fields, row-count reconciliation, exception handling, and explicit stop conditions for ambiguous terms or unsupported export scope.

## Next Candidate

Move from governance scaffolding to real job data expansion: add a small official-source collection batch and run it through the queue workflow before increasing volume.
