import fs from "node:fs";

const htmlPath = process.argv[2] || "outputs/tokyo_metropolitan_nurse_recruitment_map_mvp.html";
const html = fs.readFileSync(htmlPath, "utf8");
const scripts = [...html.matchAll(/<script(?: [^>]*)?>([\s\S]*?)<\/script>/g)]
  .map(match => match[1])
  .filter(script => script.includes("const PREFS"));
const js = scripts[0] || "";
new Function(js);

const requiredText = [
  "市場魅力度",
  "採用難易度",
  "求人条件競争力",
  "データ信頼度",
  "競合求人TOP10",
  "management_recruitment_proposal_mvp.csv",
  "management_recruitment_proposal_mvp.md",
  "area_score_v1_split_no_probability",
  "condition_score_v1_no_probability"
];
const missing = requiredText.filter(text => !html.includes(text));
const risky = ["〇〇%取れる", "獲得率", "勝率"].filter(text => html.includes(text));

const ok = missing.length === 0 && risky.length === 0;
console.log(JSON.stringify({
  ok,
  htmlPath,
  jsLength: js.length,
  missing,
  risky
}, null, 2));
if (!ok) process.exit(1);
