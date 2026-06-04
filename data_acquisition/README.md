# Nurse Recruitment Acquisition Kit - Curated Layer

This folder is the reviewed integration layer for the current HTML MVP.

The ZIP provided by GPT-2 contains useful planning assets, but several scripts and docs are not adopted as-is because:

- some documents are mojibake/encoding damaged
- the job CSV schema does not match the current 75-column HTML import schema
- GitHub scraping and private job-board collection should remain reference-only unless terms and contracts are confirmed
- Hellowork collection must use the official job information service/API after application, not unauthenticated scraping

## Adopted

- source catalog concept
- job URL candidate review workflow
- JobPosting JSON-LD extraction idea for corporate recruiting pages after per-site terms review
- official MHLW care-service open-data priority
- MVP job import template concept

## Not Adopted As-Is

- mojibake README/docs
- generic 48-column job template
- scraping-oriented Hellowork reference code as a production source
- search-query output that includes private job boards without terms review

## Current MVP Flow

1. Collect official/public or contract-authorized job rows.
2. Normalize them into the current 75-column schema with `scripts/normalize_acquisition_jobs_to_mvp.mjs`.
3. Import the resulting CSV into `outputs/tokyo_metropolitan_nurse_recruitment_map_mvp.html`.
4. Use the `取込求人` tab to inspect only the jobs currently stored.
5. Use facility match and source terms review before treating rows as analysis-ready.

## Source Guardrails

- MHLW care-service open data: usable as facility master and regional context with attribution.
- Hellowork: use official provider/API route after eligibility/application; no unauthenticated scraping for production.
- e-Stat: use official API after app ID/user registration.
- Corporate pages: use only after site-by-site terms/robots review; store features and source URL.
- Private job boards/ATS: use only formal exports or partner APIs under contract.
