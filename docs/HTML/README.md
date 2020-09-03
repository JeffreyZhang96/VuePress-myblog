---
title: HTML
---

## **基础知识**

### DOCTYPE

`<!DOCTYPE>`声明一般位于文档的第一行，它的作用主要是告诉浏览器以什么文档类型规范来解析文档。

一般指定了之后会以标准模式来进行文档解析，否则就以兼容模式进行解析。在标准模式下，浏览器的解析规则都是按照最新的标准进行解析的。而在兼容模式下，浏览器会以向后兼容的方式来模拟老式浏览器的行为，以保证一些老的网站的正确访问。

HTML5 不基于 SGML，因此不需要对 DTD 进行引用，但是需要 doctype 来规范浏览器的行为
而 HTML4.01 基于 SGML,所以需要对 DTD 进行引用，才能告知浏览器文档所使用的文档类型

### 标准模式、兼容模式

标准模式:渲染方式和 JS 引擎的解析方式都是以该浏览器支持的最高标准运行。

兼容模式:页面以宽松的向后兼容的方式显示,模拟老式浏览器的行为以防止站点无法工作。

### 行内元素、块级元素

行内元素: a b span img strong sub sup button input label select textarea

块级元素: div ul ol li dl dt dd h1 h2 h3 h4 h5 h6 p

行内块元素:selection

1. 格式上，默认情况下，行内元素不会以新行开始，而块级元素会新起一行。
2. 内容上，默认情况下，行内元素只能包含文本和其他行内元素。而块级元素可以包含行内元素和其他块级元素。
3. 行内元素与块级元素属性的不同，主要是盒模型属性上：行内元素设置 width 无效，height 无效（可以设置 line-height），设置 margin 和 padding 的上下不会对其他元素产生影响,无法通过像块级元素一样使用 margin: 0 auto 做到水平居中

#### img 是 inline 可以设置宽高

img 是可替换元素，这类元素的展现效果不是由 CSS 来控制的。他们是一种外部对象，外观的渲染独立于 CSS。内容不受当前文档的样式影响，CSS 可以影响可替换元素的位置，但是不会影响到可替换元素自身的内容。（比如 iframe，可能有自己的样式表，不会继承父文档的样式）
可替换元素有内置宽高，性质同设置了 inline-block 一样。

#### img 和 background-image 的区别

解析机制：img 属于 html 标签，background-img 属于 css。img 先解析
SEO：img 标签有一个 alt 属性可以指定图像的替代文本，有利于 SEO，并且在图片加载失败时有利于阅读
语义化角度：img 语义更加明确

#### img 图片跟容器底部有一些空隙

原因：内联元素的对齐方式是按照文字基线对齐的，而不是文字底线对齐的。

基线对齐方式（默认值）： vertical-align:baseline
底线对齐方式：vertical-align:bottom

或者把内联变为块

#### inline-block 的间隙问题

两个 display：inline-block 元素放到一起会产生一段空白。

原因：此时两个元素间的回车/换行会被转换为空白符

```html
<body>
  <div class="a">
    1
  </div>
  <div class="a">
    2
  </div>
</body>
```

解决方案:

将子元素标签的结束符和下一个标签的开始符写在同一行或把所有子标签写在同一行

父元素设置 font-size: 0; 子元素重新设置正确的 font-size

### HTML 全局属性

全局属性是所有 HTML 元素共有的属性; 它们可以用于所有元素，即使属性可能对某些元素不起作用。

`class`:为元素设置类标识
`data-*`: 为元素增加自定义属性
`draggable`: 设置元素是否可拖拽
`id`: 元素 id，文档内唯一
`lang`: 元素内容的的语言
`style`: 行内 css 样式
`title`: 元素相关的建议信息

[全局属性 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes)

### property attribute

attribute 是 dom 元素在文档中作为 html 标签拥有的属性

property 就是 dom 元素在 js 中作为对象拥有的属性

对于 html 的标准属性来说，attribute 和 property 是同步的，是会自动更新的

但是对于自定义的属性来说，他们是不同步的

### iframe

iframe 元素会创建包含另外一个文档的内联框架（即行内框架）。

1. iframe 会阻塞主页面的 onload 事件。window 的 onload 事件需要在所有 iframe 加载完毕后（包含里面的元素）才
   会触发。在 Safari 和 Chrome 里，通过 JavaScript 动态设置 iframe 的 src 可以避免这种阻塞情况。
2. 搜索引擎的检索程序无法解读这种页面，不利于网页的 SEO 。
3. iframe 和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载。
4. 浏览器的后退按钮失效。
5. 小型的移动设备无法完全显示框架。

如果需要使用 iframe，最好是通过 javascript 动态给 iframe 添加 src 属性值，这样可以绕开以上两个问题。

### HTML 与 XHTML 的区别

1. DOCTYPE 文档及编码
2. 元素大小写
3. 属性布尔值
4. 属性引号
5. 图片的 alt 属性
6. 单标签写法
7. 双标签闭合

### 浏览器内多个标签页之间的通信

- WebSocket、SharedWorker；
- 也可以调用 localstorge、cookies 等本地存储方式；

localstorge 另一个浏览上下文里被添加、修改或删除时，它都会触发一个`storage`事件，

我们通过监听事件，控制它的值来进行页面信息通信；

注意 quirks：Safari 在无痕模式下设置 localstorge 值时会抛出 QuotaExceededError 的异常；

### 渐进增强和优雅降级的概念以及区别

渐进增强：针对低版本浏览器进行构建页面，保证最基本的功能，然后再针对高级浏览器进行效果、交互等改进和追加功能达到更好的用户体验。

优雅降级：一开始就构建完整的功能，然后再针对低版本浏览器进行兼容。
2

### meta

[meta 标签的作用及整理](https://blog.csdn.net/yc123h/article/details/51356143)

### label

label 标签来定义表单控制间的关系,当用户选择该标签时，浏览器会自动将焦点转到和标签相关的表单控件上。

```html
<!-- 显示关联： -->
<label for="Name">Number:</label>
<input type="text" id="Name" />
<!-- 隐式关联： -->
<label>Date:<input type="text"/></label>
```

### 重定向

1. meta 标签的 http-equiv="refresh"属性用来告诉浏览器进行页面的跳转，content 属性告知在多少秒后进行跳转，以及跳转的地址。此处为 2s 后重定向。

```html
<meta http-equiv="refresh" content="2;https://messiahhh.github.io/blog" />
```

2.

```js
location.href = 'https://messiahhh.github.io/blog';
```

3.

响应状态码为 301/302 的重定向

```js
res.statusCode = 301; // or 302
res.setHeader('Location', 'https://messiahhh.github.io/blog');
```

## **HTML5**

[HTML5|MDN](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5)

### HTML5 的改变

HTML5 现在已经不是 SGML 的子集，主要是关于图像，位置，存储，多任务等功能的增加。

新增的有：

1. 绘画 canvas;
2. 用于媒介回放的 video 和 audio 元素;
3. 本地离线存储 localStorage 长期存储数据，浏览器关闭后数据不丢失;sessionStorage 的数据在浏览器关闭后自动删除;
4. 语意化更好的内容元素，比如 article、footer、header、nav、section;
5. 表单控件，calendar、date、time、email、url、search;
6. 新的技术 webworker, websocket;
7. 新的文档属性 document.visibilityState

移除的元素有：

1. 纯表现的元素：basefont，big，center，font, s，strike，tt，u;
2. 对可用性产生负面影响的元素：frame，frameset，noframes；

[HTML5 新特性](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5)

### HTML5 语义化标签

[HTML5 标签列表](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5/HTML5_element_list)

1. html 语义化让页面的内容结构化，结构更清晰，便于对浏览器、搜索引擎解析;
2. 即使在没有样式 CSS 情况下也以一种文档格式显示，并且是容易阅读的;
3. 搜索引擎的爬虫也依赖于 HTML 标记来确定上下文和各个关键字的权重，利于 SEO ;
4. 使阅读源代码的人对网站更容易将网站分块，便于阅读维护理解。

`<header>`：页眉通常包括网站标志、主导航、全站链接以及搜索框。
`<nav>`：标记导航，仅对文档中重要的链接群使用。
`<main>`：页面主要内容，一个页面只能使用一次。如果是 web 应用，则包围其主要功能。
`<article>`：定义外部的内容，其中的内容独立于文档的其余部分。
`<section>`：定义文档中的节（section、区段）。比如章节、页眉、页脚或文档中的其他部分。
`<aside>`：定义其所处内容之外的内容。如侧栏、文章的一组链接、广告、友情链接、相关产品列表等。
`<footer>`：页脚，只有当父级是 body 时，才是整个页面的页脚。
`<small>`：呈现小号字体效果，指定细则，输入免责声明、注解、署名、版权。
`<strong>`：和 em 标签一样，用于强调文本，但它强调的程度更强一些。
`<em>`：将其中的文本表示为强调的内容，表现为斜体。

### HTML5 离线储存

[《HTML5 离线缓存-manifest 简介》](https://yanhaijing.com/html/2014/12/28/html5-manifest/)
[《有趣的 HTML5：离线存储》](https://segmentfault.com/a/1190000000732617)

#### 离线储存工作原理

在用户没有与因特网连接时，可以正常访问站点或应用，在用户与因特网连接时，更新用户机器上的缓存文件。

原理：HTML5 的离线存储是基于一个新建的 .appcache 文件的缓存机制（不是存储技术），通过这个文件上的解析清单离线存储资源，这些资源就会像 cookie 一样被存储了下来。之后当网络在处于离线状态下时，浏览器会通过被离线存储的数据进行页面
展示。

    如何使用：

    （1）创建一个和 html 同名的 manifest 文件，然后在页面头部像下面一样加入一个 manifest 的属性。

        <html lang="en" manifest="index.manifest">

    （2）在如下 cache.manifest 文件的编写离线存储的资源。
      	CACHE MANIFEST
      	##v0.11
      	CACHE:
      	js/app.js
      	css/style.css
      	NETWORK:
      	resourse/logo.png
      	FALLBACK:
      	/ /offline.html

        CACHE: 表示需要离线存储的资源列表，由于包含 manifest 文件的页面将被自动离线存储，所以不需要把页面自身也列出
               来。

        NETWORK: 表示在它下面列出来的资源只有在在线的情况下才能访问，他们不会被离线存储，所以在离线情况下无法使用这些
                 资源。不过，如果在 CACHE 和 NETWORK 中有一个相同的资源，那么这个资源还是会被离线存储，也就是说 C
                 ACHE 的优先级更高。

        FALLBACK: 表示如果访问第一个资源失败，那么就使用第二个资源来替换他，比如上面这个文件表示的就是如果访问根目录下
                  任何一个资源失败了，那么就去访问 offline.html 。

    （3）在离线状态时，操作 window.applicationCache 进行离线缓存的操作。


    如何更新缓存：

    （1）更新 manifest 文件
    （2）通过 javascript 操作
    （3）清除浏览器缓存

    注意事项：

    （1）浏览器对缓存数据的容量限制可能不太一样（某些浏览器设置的限制是每个站点 5MB）。
    （2）如果 manifest 文件，或者内部列举的某一个文件不能正常下载，整个更新过程都将失败，浏览器继续全部使用老的缓存。
    （3）引用 manifest 的 html 必须与 manifest 文件同源，在同一个域下。
    （4）FALLBACK 中的资源必须和 manifest 文件同源。
    （5）当一个资源被缓存后，该浏览器直接请求这个绝对路径也会访问缓存中的资源。
    （6）站点中的其他页面即使没有设置 manifest 属性，请求的资源如果在缓存中也从缓存中访问。
    （7）当 manifest 文件发生改变时，资源请求本身也会触发更新。

#### 离线存储管理与加载

在线的情况下，浏览器发现 html 头部有 manifest 属性，它会请求 manifest 文件，如果是第一次访问 app ，那么浏览器
就会根据 manifest 文件的内容下载相应的资源并且进行离线存储。如果已经访问过 app 并且资源已经离线存储了，那么浏览器
就会使用离线的资源加载页面，然后浏览器会对比新的 manifest 文件与旧的 manifest 文件，如果文件没有发生改变，就不做
任何操作，如果文件改变了，那么就会重新下载文件中的资源并进行离线存储。

离线的情况下，浏览器就直接使用离线存储的资源。

### shadow DOM

[shadow DOM](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_shadow_DOM)

### Performance API

[性能优化篇 - Performance（工具 & api）](https://juejin.im/post/6844903801518981133)
