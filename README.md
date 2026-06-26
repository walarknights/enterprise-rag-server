# 企业知识库 RAG 后端服务-46组


面向企业制度、产品手册、技术文档、售后文档等场景的后端 API 服务。项目提供知识库管理、文档上传解析、BM25 全文检索、模型服务商管理和 OpenAI 兼容聊天代理能力。

当前实现仍然是 **基于 SQLite FTS5 的 BM25 检索**，没有做文档切片、向量化索引和重排模型。

## 技术栈

| 层 | 技术 |
| --- | --- |
| 运行时 | Bun |
| API 框架 | Hono |
| 鉴权 | better-auth（邮箱密码 + admin 插件） |
| 数据库 | drizzle-orm + `bun:sqlite` + SQLite FTS5 |
| 文件解析 | mammoth(docx) / unpdf(pdf) / xlsx-republish(xlsx) / fflate(pptx) |

## 目录结构

```text
src-server/
  auth/            better-auth 配置与路由
  routes/          knowledge-bases / documents / search / providers / models / settings / ai
  schema/          drizzle schema（业务表 + 鉴权表）
  utils/           db / file-parser / auth-guard / seed / config / id / functions / types
  index.ts         服务入口
```

## 快速开始

### 1. 安装依赖

```bash
bun install
```

### 2. 配置环境变量

```bash
cp .env.example .env
```

| 变量 | 说明 |
| --- | --- |
| `SITE_NAME` | 服务名称 |
| `BETTER_AUTH_SECRET` | 鉴权密钥，生产环境必须替换 |
| `PORT` | 服务监听端口，默认 `3000` |
| `SERVER_URL` | 服务对外基础 URL |
| `TRUSTED_ORIGINS` | better-auth 可信来源，多个来源用逗号分隔 |
| `DB_PATH` | SQLite 数据库文件路径 |
| `UPLOAD_DIR` | 原始文件存储目录 |

### 3. 启动开发服务

```bash
bun run dev
```

默认地址：`http://localhost:3000`

系统启动时会自动初始化全局设置，并在知识库为空时创建一个“默认知识库”。

## 常用脚本

```bash
bun run dev
bun run typecheck
bun run lint
bun run build
```

构建产物输出到 `dist/server`。

## API 概览

所有业务接口统一挂在 `/api` 下：

| 路径 | 说明 |
| --- | --- |
| `/api/auth/*` | better-auth 认证接口 |
| `/api/knowledge-bases` | 知识库管理 |
| `/api/documents` | 文档上传、详情、下载、批量获取 |
| `/api/search` | FTS5 检索 |
| `/api/providers` | 模型服务商管理 |
| `/api/models` | 模型管理 |
| `/api/settings` | 全局设置与首位管理员领取 |
| `/api/v1/chat/completions` | OpenAI 兼容聊天代理 |

## 初始化建议流程

1. 调用 better-auth 注册首个账号。
2. 登录后调用 `POST /api/settings/acquire-admin` 领取管理员角色。
3. 创建服务商和模型。
4. 创建知识库并上传文档。
5. 通过 `/api/search` 和 `/api/v1/chat/completions` 接入上层客户端或 Agent。

## 设计要点

- `document` 表通过 FTS5 外部内容表和触发器同步到 `document_fts`。
- 检索结果中的 `url` 指向文档详情接口 `/api/documents/:id`。
- 聊天代理会根据模型名找到服务商配置，并把上游响应流式透传出去。
