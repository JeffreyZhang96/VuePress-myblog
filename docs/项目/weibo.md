## **weibo**

### 技术选型

学习企业用的最广泛的技术，保证我能在企业中去应用。

#### 框架选型

koa2 vs express vs egg

express 基于回调

koa2 基于异步函数 支持 async await

egg 阿里开发企业级框架 比 koa2 更加上层

#### 数据库选型

mysql vs mongodb

mongodb 在中大型企业中应用没有 mysql 广泛 mysql 应用广泛

#### 登录技术

session vs jwt

jwt 适合前后端分离，域名不是很统一，分散型的项目

session 适用前后端同意，后端模板引擎的集中化的 webserver

#### 前端页面

ejs 后端模板引擎 vs vue/react 前端框架

主要是尝试做后台内容，不是全栈项目。

#### 缓存数据库

redis

#### 单元测试

jest

### koa2

安装：

```git
npm install -g koa-generator

koa2 -e koa2-weibo
```

### 功能列表

1. 用户管理（登录和注册）
2. 用户设置（修改基本信息，修改密码，退出登录）
3. 创建微博，暂不显示微博列表
4. 个人主页，显示个人微博列表和个人信息，暂不做关注功能
5. 广场页（使用缓存）
6. 关注和取消关注，显示粉丝和关注人
7. 首页
8. @和回复
9. @提到我的
