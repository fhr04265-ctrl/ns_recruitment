import fs from "node:fs";
import path from "node:path";

const root = "C:\\Users\\user\\Documents\\Codex";
const reviewPath = process.argv[2] || path.join(root, "outputs", "official_source_facility_match_manual_review_20260605.csv");
const expectedRows = Number(process.argv[3] || 8);

function parseCsv(text){
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  for(let i = 0; i < text.length; i++){
    const c = text[i];
    const n = text[i + 1];
    if(quoted){
      if(c === '"' && n === '"'){ cell += '"'; i++; }
      else if(c === '"') quoted = false;
      else cell += c;
    }else{
      if(c === '"') quoted = true;
      else if(c === ","){ row.push(cell); cell = ""; }
      else if(c === "\n"){ row.push(cell); rows.push(row); row = []; cell = ""; }
      else if(c !== "\r") cell += c;
    }
  }
  if(cell || row.length){ row.push(cell); rows.push(row); }
  return rows.filter(r => r.some(v => String(v || "").trim()));
}

const parsed = parseCsv(fs.readFileSync(reviewPath, "utf8"));
const header = parsed[0] || [];
const rows = parsed.slice(1).map(cells => Object.fromEntries(header.map((h, i) => [h, cells[i] ?? ""])));
const allowedDecisions = new Set(["needs_review", "needs_more_evidence", "confirmed_match", "rejected_match"]);
const required = [
  "job_id",
  "readable_facility_label",
  "readable_area_label",
  "source_url",
  "auto_match_status",
  "auto_best_score",
  "top_candidate_uid",
  "top_candidate_no",
  "manual_decision",
  "manual_facility_uid",
  "manual_facility_no",
  "reviewer_note",
  "reviewed_at"
];

const checks = {
  reviewPath,
  rows: rows.length,
  expectedRows,
  missingColumns: required.filter(col => !header.includes(col)),
  duplicateJobIds: rows.map(r => r.job_id).filter((id, index, all) => id && all.indexOf(id) !== index),
  badDecisionRows: rows.filter(r => !allowedDecisions.has(r.manual_decision)).map(r => r.job_id),
  prematureConfirmedRows: rows
    .filter(r => r.manual_decision === "confirmed_match" && (!r.manual_facility_uid || !r.manual_facility_no || !r.reviewed_at))
    .map(r => r.job_id),
  readableLabelMissingRows: rows.filter(r => !r.readable_facility_label || !r.readable_area_label).map(r => r.job_id)
};

checks.ok = checks.rows === expectedRows &&
  checks.missingColumns.length === 0 &&
  checks.duplicateJobIds.length === 0 &&
  checks.badDecisionRows.length === 0 &&
  checks.prematureConfirmedRows.length === 0 &&
  checks.readableLabelMissingRows.length === 0;

console.log(JSON.stringify(checks, null, 2));
if(!checks.ok) process.exit(1);
