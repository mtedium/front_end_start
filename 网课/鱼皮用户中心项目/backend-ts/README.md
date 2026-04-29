# 用户中心后端 (User Center Backend)

TypeScript + Express + SQLite 构建的用户中心后端服务。

## 快速启动

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

项目会使用 `nodemon` + `ts-node` 监听文件变化热重载。

### 3. 生产构建

```bash
npm run build   # 编译 TypeScript 到 dist/
npm start       # 运行生产版本
```

## 技术栈

- **运行时**: Node.js
- **语言**: TypeScript
- **框架**: Express
- **数据库**: SQLite (sql.js)
- **热重载**: nodemon + ts-node

## 项目结构

```
src/
├── main.ts                    # 入口文件
├── model/                    # 数据模型
│   ├── User.ts
│   └── index.ts
├── common/                   # 公共响应结构
│   └── BaseResponse.ts
├── constant/                 # 常量定义
│   └── UserConstant.ts
├── middleware/               # 中间件
│   └── GlobalExceptionHandler.ts
├── utils/                    # 工具函数
│   └── string.ts
└── db/                       # 数据库
    └── Database.ts
```

## 接口说明

项目主要实现用户相关的 CRUD 接口，包括用户注册、登录、信息查询等。

（具体接口文档待补充）
