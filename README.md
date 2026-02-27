# 练习中心（React + Vite）

这是一个面向学习场景的前端工程，已迁移到 `React + Vite`，用于持续扩展数学、语文、英语等练习页面。

## 技术栈

- React 18
- React Router 6
- Vite 5
- html2canvas（导出 PNG）
- jsPDF（导出 PDF）

## 目录结构

```text
.
├── index.html
├── package.json
├── src
│   ├── App.jsx
│   ├── main.jsx
│   ├── data
│   │   └── modules.js
│   ├── pages
│   │   ├── HomePage.jsx
│   │   ├── VerticalCalcPage.jsx
│   │   └── PlaceholderPage.jsx
│   └── styles
│       ├── global.css
│       ├── home.css
│       ├── module.css
│       └── vertical-calc.css
├── legacy-static
│   ├── assets
│   └── pages
└── vite.config.js
```

## 当前模块

- ` / ` 练习中心首页
- ` /vertical-calc ` 竖式计算（100/1000 范围、导出 PNG/PDF、A4 打印）
- ` /literacy ` 识字练习（预留）
- ` /poetry ` 古诗背诵（预留）
- ` /english-words ` 英语单词（预留）

## 开发命令

```bash
npm install
npm run dev
```

## 构建命令

```bash
npm run build
npm run preview
```

## 如何新增一个学习模块

1. 在 `src/pages` 新建页面组件。
2. 在 `src/data/modules.js` 注册模块配置（`id/title/path/status/tags`）。
3. 在 `src/App.jsx` 增加路由。
4. 如需样式，新增对应 CSS 并在 `src/main.jsx` 引入。
