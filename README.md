## 使用 Next.js 14，服务器操作，React，Prisma，Stripe，Tailwind 和 PostgreSQL 构建的 Trello 克隆

这是一个使用 Next.js 14，服务器操作，React，Prisma，Stripe，Tailwind 和 PostgreSQL 构建的 Trello 克隆项目的仓库。

### 主要功能：

- **认证**: 使用 Clerk 进行用户认证
- **组织 / 工作区**: 创建和管理组织或工作区
- **看板创建**: 创建新的看板，并使用 Unsplash API 获取随机的精美封面图片
- **活动日志**: 记录整个组织的活动
- **看板管理**: 重命名和删除看板
- **列表管理**: 创建、重命名、删除、拖放排序和复制列表
- **卡片管理**: 创建、添加描述、重命名、删除、拖放排序和复制卡片
- **卡片活动日志**: 记录卡片的活动历史
- **看板限制**: 每个组织的看板数量限制
- **Stripe 订阅**: 每个组织可以通过 Stripe 订阅解锁无限看板
- **登录页面**: 项目首页
- **PostgreSQL**: 使用 PostgreSQL 数据库
- **Prisma ORM**: 使用 Prisma ORM 进行数据库操作
- **shadcnUI & TailwindCSS**: 使用 shadcnUI 和 TailwindCSS 构建用户界面

### 前提条件

**Node 版本 20.x.x**

### 克隆仓库

```shell
git clone 
```

### 安装依赖

```shell
bun i
```

### 配置 .env 文件

```js
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY= 
CLERK_SECRET_KEY= 
NEXT_PUBLIC_CLERK_SIGN_IN_URL= 
NEXT_PUBLIC_CLERK_SIGN_UP_URL= 
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL= 
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL= 

DATABASE_URL= 

NEXT_PUBLIC_UNSPLASH_ACCESS_KEY= 

STRIPE_API_KEY= 

NEXT_PUBLIC_APP_URL= 

STRIPE_WEBHOOK_SECRET= 
```

### 配置 Prisma

添加 SQL 数据库 

```shell
bunx --bun prisma generate
bunx --bun prisma db push
```

### 启动应用程序

```shell
bun run dev
```
