# Full App Upload Plan

作成日: 2026-06-03

## 背景

現在のMVP本体はローカルの以下にあります。

- `C:\Users\user\Documents\Codex\outputs\tokyo_metropolitan_nurse_recruitment_map_mvp.html`
- `C:\Users\user\Documents\Codex\outputs\national_homecare_data\`

HTML本体は約100KB、首都圏に必要なデータJSだけでも約24MBあります。Codex GitHub Connectorは小さなテキストファイルの作成・更新には向いていますが、このサイズのデータ一式を安全にまとめて格納する用途には向いていません。

## GitHubに入れるべき最小セット

首都圏MVPとして動かすには、少なくとも以下が必要です。

```text
app/tokyo_metropolitan_nurse_recruitment_map_mvp.html
app/national_homecare_data/manifest.js
app/national_homecare_data/pref_11.js
app/national_homecare_data/pref_12.js
app/national_homecare_data/pref_13.js
app/national_homecare_data/pref_14.js
app/national_homecare_data/mesh_11_500m.js
app/national_homecare_data/mesh_12_500m.js
app/national_homecare_data/mesh_13_500m.js
app/national_homecare_data/mesh_14_500m.js
app/national_homecare_data/mesh_supply_11_500m.js
app/national_homecare_data/mesh_supply_12_500m.js
app/national_homecare_data/mesh_supply_13_500m.js
app/national_homecare_data/mesh_supply_14_500m.js
```

## 推奨手順

Git / GitHub CLI が使える環境で、以下を実行します。

```powershell
git clone https://github.com/fhr04265-ctrl/ns_recruitment.git
cd ns_recruitment
mkdir app
Copy-Item C:\Users\user\Documents\Codex\outputs\tokyo_metropolitan_nurse_recruitment_map_mvp.html app\
Copy-Item C:\Users\user\Documents\Codex\outputs\national_homecare_data app\national_homecare_data -Recurse
# 必要であれば全国分ではなく、首都圏ファイルだけ残す
git add app data docs scripts README.md
git commit -m "Add phase 0.5 nurse recruitment dashboard app"
git push origin main
```

## 注意

- このリポジトリはpublicです。個人情報、自社職員情報、非公開の応募・採用実績は入れないでください。
- 現MVPの求人CSVサンプルは検証用であり、実在求人ではありません。
- 採用確率や入職率の予測モデルは未実装です。スコアは求人条件競争力と調査優先度のproxyです。
