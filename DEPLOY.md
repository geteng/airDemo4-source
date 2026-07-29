# airDemo4 源码 — Figma Make 原版

线上地址：https://gtt666.cn/airDemo4/
服务器路径：/home/ubuntu/airDemo4/

## 项目结构

```
airDemo4-source/
├── src/
│   ├── app/
│   │   ├── App.tsx                    ← 主应用（所有页面逻辑都在这一个文件里）
│   │   ├── components/ui/             ← shadcn/ui 组件库（一般不用动）
│   │   └── components/figma/          ← Figma 辅助组件
│   ├── styles/                        ← 全局样式、字体、主题
│   └── main.tsx                       ← 入口
├── vite.config.ts                     ← Vite 配置（base 已设为 /airDemo4/）
├── package.json
└── dist/                              ← 构建产物（可删，npm run build 会重新生成）
```

## 核心文件

**`src/app/App.tsx`** 是唯一需要关注的文件，所有页面和交互都在里面：
- `HomePage` — 首页（今日推荐、直播预约、VIP 权益）
- `WardrobePage` — 我的衣橱（分类、单品网格、上传入口）
- `RecommendPage` — 老师推荐（场景切换、Look 卡片、一键购买）
- `MinePage` — 我的（VIP 信息、订单/收藏/优惠券菜单）
- `LivePage` — 直播日历 + 历史回放
- `ProductPage` — 商品详情（董洁推荐、适合理由、购买）
- `App` — 根组件（Tab 切换 + Framer Motion 动画）

常量定义在文件顶部：
- `ACCENT` / `BG` / `TEXT` 等 — 配色（当前：米白底 + 棕金 #b8874a）
- `IMG` — 所有图片 URL（Unsplash 图源）
- `font` — 字体

## 本地开发

```bash
cd airDemo4-source
npm install          # 首次需要
npm run dev          # 启动开发服务器，浏览器打开 localhost:5173/airDemo4/
```

## 构建并部署

```bash
# 1. 构建
npm run build        # 产出 dist/ 目录

# 2. 部署到服务器（需要服务器密码）
#    方式一：用 scp
scp -r dist/* ubuntu@106.54.38.207:/home/ubuntu/airDemo4/

#    方式二：用 rsync（增量同步，更快）
rsync -avz --delete dist/ ubuntu@106.54.38.207:/home/ubuntu/airDemo4/
```

## 常见修改速查

| 需求 | 改哪里 |
|------|--------|
| 换配色 | `App.tsx` 顶部的 `ACCENT` / `BG` / `TEXT` 常量 |
| 换图片 | `App.tsx` 顶部的 `IMG` 对象 |
| 改文案 | 直接在对应组件函数里搜索关键词 |
| 加页面 | 在 `App.tsx` 新增组件，在 `App` 根组件里加入路由 |
| 改 Tab | `tabs` 数组 |
| 换达人名 | 全局搜索「董洁」替换 |
