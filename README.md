# 编年史档案馆 · 部署指南

纯静态站点（HTML + CSS + JS + JSON），无构建步骤，可直接部署到 Cloudflare Pages。
项目名默认为 `chronicle-archive`，如需改名，修改 `package.json` 的 deploy 脚本和
`.github/workflows/deploy.yml` 中的 `--project-name`。

## 方式一：Wrangler 命令行（推荐）

```bash
cd archive-site
npm install        # 只装 wrangler
npx wrangler login # 浏览器登录 Cloudflare
npm run deploy
```

首次部署 wrangler 会提示创建 Pages 项目，按提示确认即可。
之后每次更新内容，重新 `npm run deploy`。

## 方式二：Git 连接（自动部署）

1. 把本目录推到一个 GitHub 仓库（根目录即站点根）。
2. Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git，
   选择该仓库。
3. Framework preset 选 `None`；Build command 留空；Build output directory 填 `/`
   （或 `.`）。
4. 点 Save and Deploy。之后每次 push 到 main 分支自动重新部署。
   （仓库里已附 `.github/workflows/deploy.yml`，如用 Git 连接方式可删除该文件，
   避免重复部署；如想用 Action 部署，则在仓库 Secrets 里设置
   `CF_API_TOKEN`（需 Pages 编辑权限）和 `CF_ACCOUNT_ID`。）

## 方式三：Dashboard 直接上传

1. 把本目录打成 zip（或直接拖文件夹）。
2. Workers & Pages → Create → Pages → Upload assets，把 zip/文件夹拖进去，
   起个项目名，Deploy。

## 本地预览

```bash
cd archive-site
python3 -m http.server 8080
# 浏览器打开 http://localhost:8080
```

注意：直接用 `file://` 打开时，`fetch('data/...')` 会被浏览器拦截，
必须用本地 HTTP 服务预览。

## 目录结构

```
index.html      馆门（首页）
volume.html     案卷目录（?v=1/2）
read.html       阅览（?v=1&s=13）
search.html     全文检索
css/ js/        样式与脚本
data/           meta.json / vol1.json / vol2.json（正文数据）
appendix/       附录：大事记资料库、勃列日涅夫特辑
```

新增章节时：重新运行 `tools/extract.py`（已移至别处，见下）生成 data，
再重新部署即可。
