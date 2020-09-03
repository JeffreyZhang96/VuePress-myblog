---
title: 安全
---

## **跨站和跨域**

首先要理解的一点就是跨站和跨域是不同的。同站(same-site)/跨站(cross-site)」和第一方(first-party)/第三方(third-party)是等价的。但是与浏览器同源策略（SOP）中的「同源(same-origin)/跨域(cross-origin)」是完全不同的概念。

同源策略的同源是指两个 URL 的协议/主机名/端口一致。例如，https://www.taobao.com/pages/...，它的协议是 https，主机名是 www.taobao.com，端口是 443。

同源策略作为浏览器的安全基石，其「同源」判断是比较严格的，相对而言，Cookie 中的「同站」判断就比较宽松：只要两个 URL 的 eTLD+1 相同即可，不需要考虑协议和端口。其中，eTLD 表示有效顶级域名，注册于 Mozilla 维护的公共后缀列表（Public Suffix List）中，例如，.com、.co.uk、.github.io 等。eTLD+1 则表示，有效顶级域名+二级域名，例如 taobao.com 等。

举几个例子，www.taobao.com 和 www.baidu.com 是跨站，www.a.taobao.com 和 www.b.taobao.com 是同站，a.github.io 和 b.github.io 是跨站(注意是跨站)。

## **XSS 跨站脚本攻击**

[前端安全系列（一）：如何防止 XSS 攻击？](https://juejin.im/post/5bad9140e51d450e935c6d64)

[寒冬求职之你必须要懂的 Web 安全](https://juejin.im/post/5cd6ad7a51882568d3670a8e#heading-1)

XSS(Cross-Site Scripting，跨站脚本攻击)是一种代码注入攻击。攻击者在目标网站上注入恶意代码，当被攻击者登陆网站时就会执行这些恶意代码，这些脚本可以读取 cookie，session tokens，或者其它敏感的网站信息，对用户进行钓鱼欺诈，甚至发起蠕虫攻击等。

### 反射型(非持久型)

原理：通过 url 参数直接注入

发出请求时，XSS 代码出现在 URL 中，作为输入提交到服务器端，服务端解析后返回，XSS 代码随响应内容一起传回给浏览器，最后浏览器执行 XSS 代码。这个过程像一次反射，故叫做反射型 XSS。

一个链接，里面的 query 字段中包含一个 script 标签，这个标签的 src 就是恶意代码，用户点击了这个链接后会先向服务器发送请求，服务器返回时也携带了这个 XSS 代码，然后浏览器将查询的结果写入 Html，这时恶意代码就被执行了。

并不是在 url 中没有包含 script 标签的网址都是安全的，可以使用短网址来让网址变得很短。

### 存储型(持久型)

原理：攻击者在页面上插入 XSS 代码，服务端将数据存入数据库，当用户访问到存在 XSS 漏洞的页面时，服务端从数据库中取出数据展示到页面上，导致 XSS 代码被执行。

比如攻击者在一篇文章的评论中写入了 script 标签，这个评论被保存数据库，当其他用户看到这篇文章时就会执行这个脚本。

### DOM 型

DOM 型指的是攻击者构建了特殊的 URL，用户打开网站后，js 脚本从 URL 中获取数据，从而导致了恶意代码的执行。

### XSS 防御

1. 转义字符

对需要插入到 HTML 中的代码做好充分的转义

2. [CSP 内容安全策略](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy)

CSP 本质上就是建立白名单，开发者明确告诉浏览器哪些外部资源可以加载和执行。我们只需要配置规则，如何拦截是由浏览器自己实现的

通常可以通过两种方式来开启 CSP：

- 设置 HTTP Header 中的 `Content-Security-Policy`
- 设置 meta 标签的方式 `<meta http-equiv="Content-Security-Policy">`

3. cookie 使用 HttpOnly ，使得脚本 document.cookie 无法获取

4. 验证码，避免脚本伪装成用户执行一些操作

5. 输入内容长度控制，对于不受信任的输入，都应该限定一个合理的长度。虽然无法完全防止 XSS 发生，但可以增加 XSS 攻击的难度。

6. 输入内容限制，对于部分输入，可以限定不能包含特殊字符或者仅能输入数字等。

## **CSRF 跨站请求伪造**

攻击者诱导用户进入一个第三方网站，然后该网站向被攻击网站发送跨站请求。如果用户在被攻击网站中保存了登录状态，那么攻击者就可以利用这个登录状态，绕过后台的用户验证，冒充用户向服务器执行一些操作。

![原理](csrf.png)

1. 登录受信任网站 A，并在本地生成 Cookie
2. 受害者访问危险网站 B，网站 B 中发送请求给网站 A，请求会自动带上 Cookie

### CSRF 防御

1. 验证码（因为 CSRF 的攻击往往在受害者不知情的时候成功）

2. 检查请求的 Referer 头部

通常网站的页面与页面之间有一定的逻辑联系，例如想要发送登录的请求 example.com/api/login 时，通常用户在登录的页面 example.com/login 下。那么我们只需要验证请求的 Referer 是否为 example.com/login 即可。

缺陷：某些情况下浏览器不会发送 Referer

3. Cookie 的 SameSite

CSRF 攻击中重要的一环就是自动发送目标站点下的 Cookie,然后就是这一份 Cookie 模拟了用户的身份。因此在 Cookie 上面下文章是防范的不二之选。
恰好，在 Cookie 当中有一个关键的字段，可以对请求中 Cookie 的携带作一些限制，这个字段就是 SameSite。

SameSite 可以设置为三个值，Strict、Lax 和 None。

a. 在 Strict 模式下，浏览器完全禁止第三方请求携带 Cookie。比如请求 sanyuan.com 网站只能在 sanyuan.com 域名当中请求才能携带 Cookie，在其他网站请求都不能。
b. 在 Lax 模式，就宽松一点了，但是只能在 get 方法提交表单况或者 a 标签发送 get 请求的情况下可以携带 Cookie，其他情况均不能。
c. 在 None 模式下，也就是默认模式，请求会自动携带上 Cookie。

4. CSRF Token

CSRF 的本质在于请求的参数可以被攻击者猜到

Token 是一个随机数，同时存放在表单和用户的 Cookie 中，发送请求后服务器对请求实体的 token 和 cookie 中的 token 进行对比
