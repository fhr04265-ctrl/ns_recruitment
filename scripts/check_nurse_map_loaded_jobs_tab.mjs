import path from "node:path";
import fs from "node:fs";
import { chromium } from "file:///C:/Users/user/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/.pnpm/playwright@1.60.0/node_modules/playwright/index.mjs";

const root = "C:\\Users\\user\\Documents\\Codex";
const htmlPath = path.join(root, "outputs", "tokyo_metropolitan_nurse_recruitment_map_mvp.html");
const csvPath = process.argv[2] || path.join(root, "outputs", "real_job_official_source_batch_matched_20260605.csv");
const expectedRows = Number(process.argv[3] || 8);
const edgeCandidates = [
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe"
];
const executablePath = edgeCandidates.find(p => fs.existsSync(p));
if(!executablePath) throw new Error("Microsoft Edge executable was not found.");

const browser = await chromium.launch({ headless: true, executablePath });
const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
await page.goto(`file:///${htmlPath.replace(/\\/g, "/")}`);
await page.locator("#salaryCsv").setInputFiles(csvPath);
await page.waitForFunction(() => document.querySelector("#loadedJobsPanel")?.classList.contains("active"), null, { timeout: 20000 });
await page.waitForTimeout(500);

const result = await page.evaluate(() => {
  const captured = [];
  const originalDownload = window.download;
  window.download = (name, rows) => captured.push({ name, rows });
  window.exportLoadedJobsCsv();
  window.download = originalDownload;
  const loadedCsv = captured.find(x => x.name === "loaded_job_salary_current_view_mvp.csv");
  const panelText = document.querySelector("#loadedJobsDetail")?.innerText || "";
  const header = loadedCsv?.rows?.[0] || [];
  const rows = loadedCsv?.rows || [];
  return {
    activeLoadedJobsTab: document.querySelector("#loadedJobsPanel")?.classList.contains("active"),
    panelText,
    cityFilterOptions: [...document.querySelectorAll("#loadedJobsCityFilter option")].map(o => o.textContent),
    statusFilterOptions: [...document.querySelectorAll("#loadedJobsStatusFilter option")].map(o => o.textContent),
    exportName: loadedCsv?.name || "",
    exportRowCount: Math.max(0, rows.length - 1),
    exportHeader: header,
    badRows: rows.slice(1).filter(row => row.length !== header.length).length,
    containsOfficialRows: rows.flat().join("|").includes("official-tokyo-sumida-001") && rows.flat().join("|").includes("official-kanagawa-lapis-001")
  };
});

const screenshotPath = path.join(root, "outputs", "tokyo_metropolitan_nurse_recruitment_map_mvp_preview_loaded_jobs_tab.png");
await page.screenshot({ path: screenshotPath, fullPage: false });
await browser.close();

const checks = {
  screenshotPath,
  activeLoadedJobsTab: result.activeLoadedJobsTab,
  hasLoadedCount: /8/.test(result.panelText),
  hasCitySummary: result.panelText.includes("市区町村") || result.panelText.includes("city"),
  hasFilters: result.cityFilterOptions.length >= 2 && result.statusFilterOptions.length >= 5,
  exportName: result.exportName,
  exportRowsExpected: result.exportRowCount === expectedRows,
  rowsAligned: result.badRows === 0,
  containsOfficialRows: result.containsOfficialRows
};

console.log(JSON.stringify(checks, null, 2));
if(!checks.activeLoadedJobsTab || !checks.hasLoadedCount || !checks.hasCitySummary || !checks.hasFilters || checks.exportName !== "loaded_job_salary_current_view_mvp.csv" || !checks.exportRowsExpected || !checks.rowsAligned){
  process.exit(1);
}
