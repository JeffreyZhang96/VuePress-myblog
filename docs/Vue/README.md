## **单页面应用程序 SPA**

### 定义

单页面应用程序通常通过前端框架（angular、react、vue）进行开发

单页面应用程序将所有的活动局限于一个 Web 页面中，仅在该 Web 页面初始化时加载相应的 HTML、JavaScript 和 CSS。

一旦页面加载完成了，SPA 不会因为用户的操作而进行页面的重新加载或跳转。取而代之的是利用 JavaScript 动态的变换 HTML 的内容，从而实现 UI 与用户的交互。

由于避免了页面的重新加载，SPA 可以提供较为流畅的用户体验。

### 优点

1. 良好的交互体验

   单页应用的内容的改变不需要重新加载整个页面，获取数据也是通过 Ajax 异步获取，没有页面之间的切换，就不会出现“白屏现象”,也不会出现假死并有“闪烁”现象，页面显示流畅，web 应用更具响应性和更令人着迷。

2. 良好的前后端工作分离模式

   后端不再负责模板渲染、输出页面工作，后端 API 通用化，即同一套后端程序代码，不用修改就可以用于 Web 界面、手机、平板等多种客户端。

3. 减轻服务器压力

   单页应用相对服务器压力小，服务器只用出数据就可以，不用管展示逻辑和页面合成，吞吐能力会提高几倍。

### 缺点

1. **首屏加载慢**

   - 如果不对路由进行处理，在加载首页的时候，就会将所有组件全部加载，并向服务器请求数据，这必将拖慢加载速度；

   - 通过查看 Network，发现整个网站加载试讲长达 10 几秒，加载时间最长的就是 js、css 文件和媒体文件及图片

解决方案：

- 使用 CDN 加速

在做项目时，我们会用到很多库，采用 cdn 加载可以加快加载速度。

- 异步加载组件

这里可以参考别人的介绍（https://segmentfault.com/a/1190000012138052）

- 服务端渲染

服务端渲染还能对 seo 优化起到作用，有利于搜索引擎抓取更多有用的信息（如果页面纯前端渲染，搜索引擎抓取到的就只是空页面）

2. **不利于 SEO**

seo 本质是一个服务器向另一个服务器发起请求，解析请求内容。但一般来说搜索引擎是不会去执行请求到的 js 的。也就是说，搜索引擎的基础爬虫的原理就是抓取 url，然后获取 html 源代码并解析。 如果一个单页应用，html 在服务器端还没有渲染部分数据数据，在浏览器才渲染出数据，即搜索引擎请求到的 html 是模型页面而不是最终数据的渲染页面。 这样就很不利于内容被搜索引擎搜索到。

解决方案：

    - 服务端渲染

服务器合成完整的 html 文件再输出到浏览器

    - 页面预渲染

    - 路由采用 h5 history 模式

3. **不适合开发大型项目**

   大型项目中可能会涉及大量的 DOM 操作、复杂的动画效果，也就不适合使用 Vue、react 框架进行开发。

### 单页面应用框架刷新 404 问题

项目打包部署到服务器上,可以正常跳转,但是不能刷新;
项目在本地可以正常运行,在测试服务器也可以正常显示,刷新;
从服务器配置上查看,发现运维忘记配置了一项.

问：出现了什么问题。现象是什么？

答：比如你在浏览器中直接访问 www.lyy.com/demo/login 会 404。但如果你先访问 www.lyy.com/demo/index.html 后再点“登录" 跳转到 www.lyy.com/demo/login 是正常显示登录页面的。这时你 f5”刷新“又会出现 404 了。。

问：为什么会出现 404 呢，第一次访问这个 url 就没问题啊？

答：这就是 web 单页面开发模式造成的。现在主流的前端框架基本都是单页面的。如：react、vue 等。

单页面简单来说就是访问所有资源路径、其实页面内容只有一个（一般是 index.html）。

这个页面中引入的 js 框架会根据当前访问的 url 去路由到相应的子页面组件（可以理解为页面片段）进行逻辑处理和页面渲染。

所以当你访问 www.lyy.com/demo/login 其实 web 站中并没 login 这个页面资源（login 就是让框架路由用的）。所以就报 404

问：那刷新时我们怎么处理才能不让他 404、又能让 js 框架正确路由呢？

答：其实理解了为什么出现这个问题就很好解决了：

保证 2 点就行：

刷新时要保证 url 路径不变。言外之意就是不能用重定向去访问 index.html，因为 url 会变。变了 js 框架就没法路由。因为不知道你上次是哪个 url 了。

服务器响应的内容一定要是 index.html，因为 index 这里加载了 js 框架和初始化一些东西

总结：不改变 url 的情况下响应 index.html 资源的内容。 好办！ 用 nginx 配置下就好了嘛。

location /demo/ {
rewrite .\* /index.html break;
root /data/build;
}
location /static {
alias /data/build/static;
index index.html;
}

这里有个很重要的点：break

break 并不是重定向说告诉浏览器你重新去访问 XXX.html 。。而是说内部去找 /index.html 页面。去 /data/build 目前下找就好。找到就返回页面内容（这不就是我们要的 index.html 的内容啊），浏览器是无感知的。这样就保证了在 url 不变的情况 下固定返回 index.html 内容啦。。如果在/data/build 中没找到 index.html 就会 404 了。

## **MVC、MVP、VVM**

### MVC

- M（Model）：数据保存

- V（View）：用户页面

- C（Controller）：业务逻辑

所有通信都是单向的。

1. View 传指令到 Controller。
2. Controller 完成业务逻辑后，要求 Model 改变状态。
3. Model 将新的数据发送到 View，用户得到反馈。

### MVP

- M（Model）是业务逻辑层，主要负责数据，网络请求等操作

- V（View）是视图层，负责绘制 UI 元素、与用户进行交互

- P（Presenter）是 View 与 Model 交互的中间纽带，处理与用户交互的逻辑

MVP 模式将 Controller 改名为 Presenter，同时改变了通信方向。

1. 各部分之间的通信，都是双向的。
2. View 与 Model 不发生联系，都通过 Presenter 传递。
3. View 非常薄，不部署任何业务逻辑，称为“被动视图”，即没有任何主动性，而 Presenter 非常厚，所有业务逻辑都部署在那里。

### MVVM

数据驱动视图

Model 层代表数据模型，也可以在 Model 中定义数据修改和操作的业务逻辑

View 代表 UI 组件，它负责将数据模型转换成 UI 展现出来

ViewModel 是一个同步 View 和 Model 的对象

在 MVVM 架构下，View 和 Model 之间并没有直接的联系，而是通过 ViewModel 进行交互，Model 和 ViewModel 之间的交互是双向的，因此 View 数据的变化会同步到 Model 中，而 Model 数据的变化也会立即反应到 View 上。

ViewModel 通过双向数据绑定把 View 层和 Model 层连接了起来，而 View 和 Model 之间的同步工作完全是自动的，无需人为干涉，因此开发者只需关注业务逻辑，不需要手动操作 DOM，不需要关注数据状态的同步问题，复杂的数据状态维护完全由 MVVM 来统一管理。

对于 MVVM 来说，其实最重要的并不是通过双向绑定或者其他的方式将 View 与 ViewModel 绑定起来，而是通过 ViewModel 将视图中的状态和用户的行为分离出一个抽象，这才是 MVVM 的精髓

### mvvm 和 mvc 区别

mvc 和 mvvm 其实区别并不大。都是一种设计思想。

主要就是 mvc 中 Controller 演变成 mvvm 中的 viewModel。

mvvm 主要解决

1. mvc 只是静态渲染，更新还要依赖于操作 DOM，使页面渲染性能降低，加载速度变慢，影响用户体验。

2. 当 Model 频繁发生变化，开发者需要主动更新到 View 。

## **路由原理**

[前端路由跳转基本原理](https://segmentfault.com/a/1190000018081475)

前端路由本质就是监听 URL 的变化，然后匹配路由规则，显示相应的页面，并且无须刷新。目前单页面使用的路由就只有两种实现方式

- hash 模式
- history 模式

### hash 模式

![](https://yck-1254263422.cos.ap-shanghai.myqcloud.com/blog/2019-06-01-042512.png)

- hash 变化会触发网页跳转，即浏览器的前进后退
- hash 变化不会刷新页面，SPA 必需的特点
- hash 永远不会提交到 server 端（前端自生自灭）

`www.test.com/##/` 就是 Hash URL，当 ## 后面的哈希值发生变化时，可以通过 `hashchange` 事件来监听到 URL 的变化，从而进行跳转页面，并且无论哈希值如何变化，服务端接收到的 URL 请求永远是 `www.test.com`

### history 模式

![](https://yck-1254263422.cos.ap-shanghai.myqcloud.com/blog/2019-06-01-042514.png)

history 模式是 HTML5 新推出的功能，主要使用 `history.pushState` 和 `history.replaceState` 改变 URL。`popstate`监听浏览器前进后退

通过 history 模式改变 URL 同样不会引起页面的刷新，只会更新浏览器的历史记录。

```js
// 新增历史记录
history.pushState(stateObject, title, URL);
// 替换当前历史记录
history.replaceState(stateObject, title, URL);
//当用户做出浏览器动作时，比如点击后退按钮时会触发 popState 事件
```

```js
window.addEventListener("popstate", e => {
  // e.state 就是 pushState(stateObject) 中的 stateObject
  console.log(e.state);
});
```

### 两种模式对比

1. Hash 模式只可以更改 ## 后面的内容，History 模式可以通过 API 设置任意的同源 URL
2. History 模式可以通过 API 添加任意类型的数据到历史记录中，Hash 模式只能更改哈希值，也就是字符串
3. Hash 模式无需后端配置，并且兼容性好。History 模式在用户手动输入地址或者刷新页面的时候会发起 URL 请求，后端需要配置 index.html 页面用于匹配不到静态资源的时候.

- to B(to Business，面向企业或者特定用户群体的产品)的系统推荐用 hash，简单易用，对 url 规范不敏感
- to C(to Customer,面向消费者的产品)的系统，可以考虑选择 H5 history，但需要服务端支持
- 考虑成本和收益

## **Virtual Dom**

[初步理解 Virtual DOM 和 diff 算法](https://www.imooc.com/article/44104)

DOM 引擎、JS 引擎 相互独立，但又工作在同一线程（主线程）。

JS 代码调用 DOM API 必须 挂起 JS 引擎、转换传入参数数据、激活 DOM 引擎，DOM 重绘后再转换可能有的返回值，最后激活 JS 引擎并继续执行若有频繁的 DOM API 调用，且浏览器厂商不做“批量处理”优化，引擎间切换的单位代价将迅速积累若其中有强制重绘的 DOM API 调用，重新计算布局、重新绘制图像会引起更大的性能消耗。

1. 虚拟 DOM 不会立马进行排版与重绘操作
2. 虚拟 DOM 进行频繁修改，然后一次性比较并修改真实 DOM 中需要改的部分，最后在真实 DOM 中进行排版与重绘，减少过多 DOM 节点排版与重绘损耗
3. 虚拟 DOM 有效降低大面积真实 DOM 的重绘与排版，因为最终与真实 DOM 比较差异，可以只渲染局部

### diff 算法

首先 DOM 是一个多叉树的结构，如果需要完整的对比两颗树的差异，那么需要的时间复杂度会是 O(n ^ 3)，这个复杂度肯定是不能接受的。

O(n^3):第一，遍历 tree1；第二，遍历 tree2；第三，排序

实现 O(n) 复杂度的关键就是只对比同层的节点，而不是跨层对比，这也是考虑到在实际业务中很少会去跨层的移动 DOM 元素。
优化时间复杂度：

1. 只比较同一层级，不跨级比较
2. tag 不相同，则直接删掉重建，不再深度比较
3. tag 和 key，两者都相同，则认为是相同节点，不再深度比较

所以判断差异的算法就分为了两步:

1. 首先从上至下，从左往右遍历对象，也就是树的深度遍历，这一步中会给每个节点添加索引，便于最后渲染差异
2. 一旦节点有子元素，就去判断子元素是否有不同

在第一步算法中，需要判断新旧节点的 tagName 是否相同，如果不相同的话就代表节点被替换了。如果没有更改 tagName 的话，就需要判断是否有子元素，有的话就进行第二步算法。

在第二步算法中，需要判断原本的列表中是否有节点被移除，在新的列表中需要判断是否有新的节点加入，还需要判断节点是否有移动。

举个例子来说，假设页面中只有一个列表，我们对列表中的元素进行了变更

```js
// 假设这里模拟一个 ul，其中包含了 5 个 li
[1, 2, 3, 4, 5];
// 这里替换上面的 li
[1, 2, 5, 4];
```

从上述例子中，我们一眼就可以看出先前的 ul 中的第三个 li 被移除了，四五替换了位置。

那么在实际的算法中，我们如何去识别改动的是哪个节点呢？这就引入了 key 这个属性。这个属性是用来给每一个节点打标志的，用于判断是否是同一个节点。

当然在判断以上差异的过程中，我们还需要判断节点的属性是否有变化等等。

当我们判断出以上的差异后，就可以把这些差异记录下来。当对比完两棵树以后，就可以通过差异去局部更新 DOM，实现性能的最优化。

### snabbdom

1. h 函数
2. vnode 数据结构
3. patch 函数

## **Vue 优势**

1. 通过 MVVM 思想实现数据的双向绑定，让开发者不用再操作 DOM 对象，有更多的时间去思考业务逻辑
2. 轻量高效，压缩之后 20KB 大小
3. 虚拟 DOM，基于高效的 diff 算法
4. 组件化开发，提高了开发效率，方便重复使用，提高项目的可维护性，便于协同开发

### Vue 和 React 的区别

1. Vue 的表单可以使用 v-model 支持双向绑定，相比于 React 来说开发上更加方便，当然了 v-model 其实就是个语法糖，本质上和 React 写表单的方式没什么区别
2. 改变数据方式不同，Vue 修改状态相比来说要简单许多，React 需要使用 setState 来改变状态，并且使用这个 API 也有一些坑点。并且 Vue 的底层使用了依赖追踪，页面更新渲染已经是最优的了，但是 React 还是需要用户手动去优化这方面的问题。
3. React 16 以后，有些钩子函数会执行多次，这是因为引入 Fiber 的原因
4. React 需要使用 JSX，有一定的上手成本，并且需要一整套的工具链支持，但是完全可以通过 JS 来控制页面，更加的灵活。Vue 使用了模板语法，相比于 JSX 来说没有那么灵活，但是完全可以脱离工具链，通过直接编写 render 函数就能在浏览器中运行。
5. 在生态上来说，两者其实没多大的差距，当然 React 的用户是远远高于 Vue 的

## **Vue 生命周期**

![](/assets/img/vue生命周期.png)

1. 挂载（初始化相关属性）

- `beforeCreate`在实例初始化之后，数据观测（data observer）和事件配置之前被调用
- `created` 在实例创建完成之后被立即调用。在这一步，实例已完成以下的配置：数据观测（data observer），属性和方法的运算，watch/event 事件回调。这里没有`$el`
- `beforeMount` 在挂载开始之前被调用：相关的 render 函数首次被调用
- `mounted` el 被新创建的 `vm.$el` 替换，并挂载到实例上去之后调用该钩子

2. 更新（元素或组件的变更操作）

- `beforeUpdate` 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。
- `updated` 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子

3. 销毁（销毁相关属性）

- `beforeDestory` 实例销毁之前被调用，在这一步，实例仍然完全可用
- `destroyed` Vue 实例销毁后调用，调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。该钩子在服务器渲染期间不被调用

使用场景：

- `created`实例已经创建完成，因为它是最早触发的原因，可以进行一些数据，资源的请求
- `mounted`实例已经挂载完成，可以进行一些 DOM 操作
- `beforeUpdate` 可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程
- `updated` 可以执行依赖于 DOM 的操作，然而在大多数情况下，你应该避免在此期间更新状态，因为这可能导致更新无限循环。该钩子在服务器端渲染期间不被调用
- `beforeDestory` 可能在当前页面中使用了\$on 方法，那需要在组件销毁前解绑，清除自己定义的定时器，解除时间的绑定 scroll mousemove

```js
a = 1;
update(){
  this.a = Math.random();
}
```

- `beforeDestory` 可以执行一些优化操作，清空定时器，解除绑定事件

### ajax 生命周期

created 时候，视图中的 DOM 并没有被渲染出来，所以此时如果直接去操作 DOM 节点，无法找到相关的元素

mounted，整个渲染和 DOM 构建已经完成，所以可以直接操作 dom 节点

放在 mounted 之前没有用，只会让逻辑更加混乱，保证了逻辑的统一性，因为生命周期是同步进行的，ajax 是异步的

服务端渲染不支持 mounted 方法，所以在服务端渲染的情况下统一放到 created 中

### Vue 父子组件生命周期调用顺序

#### 加载渲染过程

父 beforeCreate-父 created-父 beforeMounted-子 beforeCreate-子 created-子 beforeMount-子 mounted-父 mounted

#### 子组件更新过程

父 beforeUpdate-子 beforeUpdate-子 updated-父 updated

#### 父组件更新过程

父 beforeUpdate-父 updated

#### 销毁过程

父 beforeDestory-子 beforeDestory-子 destoryed-父子 destoryed

## **Vue 语法**

### computed

[计算属性和侦听器](https://cn.vuejs.org/v2/guide/computed.html)

#### computed 和方法的区别

计算属性基于依赖 data 进行缓存，方法不存在缓存

#### computed 和 watch 的区别

1. computed 是计算一个新的属性，并将该属性挂载到 Vue 实例上，而 watch 是监听已经存在且已挂载到 Vue 实例上的数
   据，所以用 watch 同样可以监听 computed 计算属性的变化。

2. computed 本质是一个惰性求值的观察者，具有缓存性，只有当依赖变化后，才会计算新的值。
   而 watch 则是当数据发生变化便会调用执行函数。

3. 从使用场景上说，computed 适用一个数据被多个数据影响，而 watch 适用一个数据影响多个数据。

## **Vue 指令**

指令的本质就是自定义属性

数据响应式：

- html5 中的响应式（屏幕尺寸的变化导致样式的变化）
- 数据的响应式（数据的变化导致页面内容的变化）

数据绑定：将数据填充到标签中

### v-cloak

解决插值表达式存在的问题：闪动

原理：

先通过样式隐藏内容，然后在内存中进行值的替换，替换好之后再显示最终的结果

```js
[v-cloak] {
  display: none;
}
```

```html
<div v-cloak>
  {{ message }}
</div>
```

### v-for

key 作用：diff 算法中通过 tag 和 key 来判断，是否是 sameNode，减少渲染次数，提升渲染性能

帮助 Vue 区分不同的元素，从而提升性能，vue 在处理 dom 元素的时候，要区分出兄弟节点是不一样的，给每一个兄弟元素节点标注一个唯一标识，唯一标识通过 key 实现的

v-for 会比 v-if 的优先级高一些，如果连用的话会把 v-if 给每个元素都添加一下，会造成性能问题

### v-model

v-model 实现原理:

![](//assets/img/v-model底层.png)

在表单控件和组件上创建双向绑定

限制：` <input>``<select>``<textarea> `、components

修饰符：

.lazy - 取代 input 监听 change 事件
.number - 输入字符串转为有效的数字
.trim - 输入首尾空格过滤

### v-on

.stop - 调用 event.stopPropagation()。

.prevent - 调用 event.preventDefault()。

.capture - 添加事件侦听器时使用 capture 模式。

.self - 只当事件是从侦听器绑定的元素本身触发时才触发回调。

.{keyCode | keyAlias} - 只当事件是从特定键触发时才触发回调。

.native - 监听组件根元素的原生事件。

.once - 只触发一次回调。

.left - (2.2.0) 只当点击鼠标左键时触发。

.right - (2.2.0) 只当点击鼠标右键时触发。

.middle - (2.2.0) 只当点击鼠标中键时触发。

.passive - (2.3.0) 以 { passive: true } 模式添加侦听器

```html
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>
```

### v-once

只编译一次，显示内容之后不再具有响应式功能，如果显示的信息后续不需要在修改，可以使用 v-once，这样能提高性能。

### v-text

填充纯文本，比插值表达式更简洁

### v-html

填充 HTML 字段，存在安全问题，本网站内部数据可以使用，来自第三方的数据不可用

可能会导致 XSS 攻击

v-html 会替换掉标签内部的子元素

### v-pre

显示原始信息，跳过编译过程（分析编译过程）

### v-show 与 v-if

v-if 控制元素是否渲染到页面

v-show 元素已经渲染到了页面，通过 CSS display 属性控制显示和隐藏

频繁切换显示状态用 v-show，否则用 v-if

## **Vue 响应式**

![](//assets/img/双向数据绑定.png)

Vue 是通过数据劫持配合发布者-订阅者模式的方式，通过 Object.defineProperty()来劫持各个属性的 setter 和 getter，在数据变动时，发布消息给依赖收集器，去通知观察者，做出对应的回调函数，去更新视图

MVVM 作为绑定的入口，整合 Observer，Compile 和 Watcher 三者

1. `Observer` 对数据的属性进行递归遍历，监听 Model 数据变化，使用 `Object.defineProperty` 进行数据劫持。
2. `Compile` 将模板编译为渲染函数，并渲染视图页面
   1. `parse` 使用正则等方式解析 `template` 中的指令，`class`，`style` 等数据，生成 `AST`（抽象语法树）
   2. `optimize` 进行优化，标记静态节点，该节点会跳过 `diff`
   3. `generate`，把 `AST` 转化为渲染函数，渲染函数用于生成虚拟 `DOM`
3. `Watcher` 是 `Observer` 和 `Compiler` 之间通信的桥梁
   1. 自身实例化的时候，调用 `getter` 函数，向 `deps` 添加 `watch`
   2. 当数据修改时，调用 `setter` 函数，调用 `deps.notify`，执行 `watch` 的 `update` 函数
   3. 执行 `watch` 的 `update` 函数，重新生成虚拟 `DOM`，并进行 `Diff` 对页面进行修改

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app">
      <h2>{{person.name}} -- {{person.age}}</h2>
      <h3>{{person.fav}}</h3>
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ul>
      <h3>{{msg}}</h3>
      <div v-text="msg"></div>
      <div v-text="person.name"></div>
      <div v-html="htmlStr"></div>
      <input type="text" v-model="msg" />
      <button v-on:click="handleClick">v-on</button>
      <button @click="handleClick">@</button>
      <img v-bind:src="img" v-bind:title="title" />
    </div>
    <script src="./Observer.js"></script>
    <script src="./myVue.js"></script>
    <script>
      let vm = new myVue({
        el: "##app",
        data: {
          person: {
            name: "zzf",
            age: 24,
            fav: "cjl"
          },
          msg: "data中的msg",
          htmlStr: "<h2>gogogo</h2>",
          img: "./test.png",
          title: "我是百度"
        },
        methods: {
          handleClick() {
            this.person.name = "jeffrey";
          }
        }
      });
    </script>
  </body>
</html>
```

```js
const compileUtil = {
  getVal(expr, vm) {
    return expr.split(".").reduce((data, cur) => data[cur], vm.$data);
  },
  setVal(expr, vm, inputVal) {
    expr.split(".").reduce((data, cur) => {
      data[cur] = inputVal;
    }, vm.$data);
  },
  getContentVal(expr, vm) {
    return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
      return this.getVal(args[1], vm);
    });
  },
  text(node, expr, vm) {
    let value;
    if (expr.indexOf("{{") !== -1) {
      value = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
        //绑定观察者，将来数据发生变化，触发这里的回调，进行更新
        new Watcher(vm, args[1], () => {
          this.updater.textUpdater(node, this.getContentVal(expr, vm));
        });
        return this.getVal(args[1], vm);
      });
    } else {
      value = this.getVal(expr, vm);
      new Watcher(vm, expr, newVal => {
        this.updater.textUpdater(node, newVal);
      });
    }
    this.updater.textUpdater(node, value);
  },
  html(node, expr, vm) {
    const value = this.getVal(expr, vm);
    new Watcher(vm, expr, newVal => {
      this.updater.htmlUpdater(node, newVal);
    });
    this.updater.htmlUpdater(node, value);
  },
  model(node, expr, vm) {
    const value = this.getVal(expr, vm);
    //绑定更新函数 数据=>视图
    new Watcher(vm, expr, newVal => {
      this.updater.modelUpdater(node, newVal);
    });
    //视图=>数据=>视图
    node.addEventListener("input", e => {
      //设置值
      this.setVal(expr, vm, e.target.value);
    });
    this.updater.modelUpdater(node, value);
  },
  on(node, expr, vm, eventName) {
    let fn = vm.$options.methods && vm.$options.methods[expr];
    node.addEventListener(eventName, fn.bind(vm), false);
  },
  bind(node, expr, vm, eventName) {
    const value = this.getVal(expr, vm);
    node[eventName] = value;
  },
  //更新的函数
  updater: {
    modelUpdater(node, value) {
      node.value = value;
    },
    textUpdater(node, value) {
      node.textContent = value;
    },
    htmlUpdater(node, value) {
      node.innerHTML = value;
    }
  }
};

class Compile {
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el);
    this.vm = vm;
    //1.获取文档碎片对象 放入内存中会减少页面的回流和重绘
    const fragment = this.node2Fragment(this.el);

    //2. 编译模板
    this.compile(fragment);

    //3. 追加子元素到根元素
    this.el.appendChild(fragment);
  }
  isElementNode(node) {
    return node.nodeType === 1;
  }
  node2Fragment(el) {
    //创建文档碎片
    const fragment = document.createDocumentFragment();
    let child;
    while ((child = el.firstChild)) {
      fragment.appendChild(child);
    }
    return fragment;
  }
  compile(fragment) {
    const childNodes = fragment.childNodes;
    [...childNodes].forEach(child => {
      if (this.isElementNode(child)) {
        this.compileElement(child);
      } else {
        this.compileText(child);
      }
      if (child.childNodes && child.childNodes.length) {
        this.compile(child);
      }
    });
  }
  compileElement(node) {
    const attributes = node.attributes;
    [...attributes].forEach(attr => {
      const { name, value } = attr;
      if (this.isDirective(name)) {
        const [, directive] = name.split("-");
        const [dirName, eventName] = directive.split(":");
        //更新数据，数据驱动视图
        compileUtil[dirName](node, value, this.vm, eventName);
        //删除有指令的标签上的属性
        node.removeAttribute("v-" + directive);
      } else if (this.isEventName(name)) {
        let [, eventName] = name.split("@");
        compileUtil["on"](node, value, this.vm, eventName);
      }
    });
  }
  isEventName(attrName) {
    return attrName.startsWith("@");
  }
  isDirective(attrName) {
    return attrName.startsWith("v-");
  }
  compileText(node) {
    //{{}}
    const content = node.textContent;
    if (/\{\{(.+?)\}\}/g.test(content)) {
      compileUtil["text"](node, content, this.vm);
    }
  }
}

class myVue {
  constructor(options) {
    this.$el = options.el;
    this.$data = options.data;
    this.$options = options;
    if (this.$el) {
      //1.实现一个数据观察者
      new Observer(this.$data);
      //2.实现一个指令解析器
      new Compile(this.$el, this);
      this.proxyData(this.$data);
    }
  }
  proxyData(data) {
    for (const key in data) {
      Object.defineProperty(this, key, {
        get() {
          return data[key];
        },
        set(newVal) {
          data[key] = newVal;
        }
      });
    }
  }
}
```

```js
class Watcher {
  constructor(vm, expr, cb) {
    this.vm = vm;
    this.expr = expr;
    this.cb = cb;
    //先把旧值保存起来
    this.oldVal = this.getOldVal();
  }
  getOldVal() {
    Dep.target = this;
    const oldVal = compileUtil.getVal(this.expr, this.vm);
    Dep.target = null;
    return oldVal;
  }
  update() {
    const newVal = compileUtil.getVal(this.expr, this.vm);
    if (newVal !== this.oldVal) {
      this.cb(newVal);
    }
  }
}

//依赖收集器
class Dep {
  constructor() {
    this.subs = [];
  }
  //收集观察者
  addSub(watcher) {
    this.subs.push(watcher);
  }
  //通知观察者去更新
  notify() {
    this.subs.forEach(w => w.update());
  }
}

class Observer {
  constructor(data) {
    this.observe(data);
  }
  observe(data) {
    if (data && typeof data === "object") {
      Object.keys(data).forEach(key => {
        this.defineReacive(data, key, data[key]);
      });
    }
  }
  defineReacive(obj, key, value) {
    //递归遍历
    this.observe(value);
    const dep = new Dep();
    //劫持并监听所有的属性
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: false,
      get() {
        //订阅数据变化时，往Dep中添加观察者
        Dep.target && dep.addSub(Dep.target);
        return value;
      },
      set: newVal => {
        this.observe(newVal);
        if (newVal !== value) {
          value = newVal;
        }
        //告诉Dep通知变化
        dep.notify();
      }
    });
  }
}
```

[观察者和发布订阅模式的区别](https://www.cnblogs.com/viaiu/p/9939301.html)

### Vue 监听数组变化

1. Object.defineProperty()不能监听数组变化
2. 重新定义原型，重写 push pop 方法，实现监听
3. Proxy 可以原生支持监听数组变化

### Proxy 与 Object.defineProperty 对比

`Object.defineProperty` 虽然已经能够实现双向绑定了，但是他还是有缺陷的。

1. 只能对属性进行数据劫持，所以需要深度遍历整个对象
2. 对于数组不能监听到数据的变化

虽然 Vue 中确实能检测到数组数据的变化，但是其实是使用了 hack 的办法，并且也是有缺陷的。

```js
const arrayProto = Array.prototype;
export const arrayMethods = Object.create(arrayProto);
// hack 以下几个函数
const methodsToPatch = [
  "push",
  "pop",
  "shift",
  "unshift",
  "splice",
  "sort",
  "reverse"
];
methodsToPatch.forEach(function(method) {
  // 获得原生函数
  const original = arrayProto[method];
  def(arrayMethods, method, function mutator(...args) {
    // 调用原生函数
    const result = original.apply(this, args);
    const ob = this.__ob__;
    let inserted;
    switch (method) {
      case "push":
      case "unshift":
        inserted = args;
        break;
      case "splice":
        inserted = args.slice(2);
        break;
    }
    if (inserted) ob.observeArray(inserted);
    // 触发更新
    ob.dep.notify();
    return result;
  });
});
```

反观 Proxy 就没以上的问题，原生支持监听数组变化，并且可以直接对整个对象进行拦截，所以 Vue 也将在下个大版本中使用 Proxy 替换 Object.defineProperty

```js
let onWatch = (obj, setBind, getLogger) => {
  let handler = {
    GET(target, property, receiver) {
      getLogger(target, property);
      return Reflect.GET(target, property, receiver);
    },
    set(target, property, value, receiver) {
      setBind(value);
      return Reflect.set(target, property, value);
    }
  };
  return new Proxy(obj, handler);
};

let obj = { a: 1 };
let value;
let p = onWatch(
  obj,
  v => {
    value = v;
  },
  (target, property) => {
    console.log(`GET '${property}' = ${target[property]}`);
  }
);
p.a = 2; // bind `value` to `2`
p.a; // -> GET 'a' = 2
```

Proxy 兼容性不好，且无法 polyfill
Object.defineProperty 深度监听，需要递归到底，一次性计算量大

## **Vue 组件**

### 组件渲染更新的过程

### 组件注册注意事项

1. data 必须是一个函数

   Vue 组件 data 必须是函数，跟根实例可以用对象

   Vue 组件可能存在多个实例，如果使用对象形式定义 data，则会导致它们共用一个 data 对象，那么状态变更将会影响所有组件实例，这是不合理的,而在 Vue 根实例创建过程中则不存在该限制，因为根实例只能有一个

2. 组件模板内容必须是单个根元素

3. 组件模板内容可以是模板字符串

   模板字符串需要浏览器提供支持（ES6 语法）

### 父子组件

父组件通过 props 传递数据给子组件。

父组件对子组件的自定义事件使用 v-on:eventName=doSomething 进行监听，当子组件内部触发了该自定义事件时（使用\$emit('eventName')），父组件执行 doSomething，从而实现子组件向父组件的通信。

#### 父向子传值

1. 子组件内部通过 props 接受传递过来的值

```js
Vue.component("menu-item", {
  props: ["title"],
  template: "<div>{{title}}</div>"
});
```

props 属性名规则：

- 在 props 中使用驼峰形式，模板中需要用短横线的形式
- 字符串形式的模板中没有这个限制

2. 父组件通过属性将值传递给子组件

```html
<menu-item title="来自父组件的数据"></menu-item>
<menu-item :title="title"></menu-item>
```

#### 子向父传值

props 传递数据原则：单项数据流
如果子组件能直接操作 props 数据的话，数据的控制逻辑就会比较复杂，不太容易控制

1. 子组件通过自定义事件向父组件传递信息

```html
<button v-on:click="$emit('enlarge-text',0.1)">扩大字体</button>
```

2. 父组件监听子组件的事件

```html
<menu-item v-on:enlarge-text="fontSize+=$event"> </menu-item>
```

#### $parent $children

#### Provide inject

在父组件中提供数据子组件进行消费 Provide、inject 插件

### 非父子组件

#### 事件中心（EventBus）

1. 单独的事件中心管理组件间的通信

```js
//eventHub.js
var eventHub = new Vue();
```

2. 监听事件与销毁事件

```js
//A.vue

methods:{
  addTodo(){}
}
mounted(){
  //绑定自定义事件
eventHub.$on("add-todo", this.addTodo);
}
beforeDestroy(){
  //即使销毁，否则可能造成内存泄漏
eventHub.$off("add-todo",this.addTodo);
}
```

3. 触发事件

```js
//B.vue
//调用自定义事件
eventHub.$emit("add-todo", id);
```

#### Ref

Ref 获取实例的方式调用组件的属性或者方法

### 组件插槽

#### 具名插槽

#### 作用域插槽

让插槽内容能够访问子组件中才有的数据

### mixin

多个组件有相同的逻辑，抽离出来

1. 变量来源不明确
2. 多 mixin 可能会造成命名冲突
3. mixin 和组件可能出现多对多的关系，复杂度较高

### 异步组件

## **Vuex**

Vuex 是实现组件全局状态（数据）管理的一种机制，可以方便地实现组件之间数据的共享。

### Vuex 的好处

1. 能够在 vuex 中集中管理共享的数据，易于开发和后期维护
2. 能够高效地实现组件之间的数据共享，提高开发效率
3. 储存在 vuex 中的数据都是响应式的，能够实时保持数据和页面的同步

### Vuex 的使用

一般情况下，只有组件之间共享的数据，才有必要存储在 Vuex 中；对于组件的私有数据，依旧存储在组件自身的 data 中即可

```js
//store/index.js

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 99
  },
  mutations: {
    add(state) {
      state.count++;
    },
    addN(state, step) {
      state.count += step;
    },
    sub(state) {
      state.count--;
    },
    subN(state, step) {
      state.count -= step;
    }
  },
  actions: {
    addAsync(context) {
      setTimeout(() => {
        context.commit("add");
      }, 1000);
    },
    addNAsync(context, step) {
      setTimeout(() => {
        context.commit("addN", step);
      }, 1000);
    },
    subAsync(context) {
      setTimeout(() => {
        context.commit("sub");
      }, 1000);
    },
    subNAsync(context, step) {
      setTimeout(() => {
        context.commit("subN", step);
      }, 1000);
    }
  },
  getters: {
    //就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。
    showNum(state) {
      return "当前最新数量是【" + state.count + "】";
    }
  }
});

export default store;
```

第一个种使用方式

```html
<template>
  <div id="app">
    <!-- <h3>当前最新的count的值为:{{this.$store.state.count}}</h3> -->
    <h3>{{this.$store.getters.showNum}}</h3>
    <button @click="btnHandler1">+1</button>
    <button @click="btnHandler2">+N</button>
    <button @click="btnHandler3">+1 Async</button>
    <button @click="btnHandler4">+N Async</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {};
    },
    methods: {
      btnHandler1() {
        this.$store.commit("add");
      },
      btnHandler2() {
        this.$store.commit("addN", 3);
      },
      btnHandler3() {
        this.$store.dispatch("addAsync");
      },
      btnHandler4() {
        this.$store.dispatch("addNAsync", 3);
      }
    }
  };
</script>
```

第二种使用方式:

```html
<template>
  <div id="app">
    <!-- <h3>当前最新的count的值为:{{count}}</h3> -->
    <h3>{{showNum}}</h3>
    <button @click="sub">-1</button>
    <button @click="subN(3)">-N</button>
    <button @click="subAsync">-1 Async</button>
    <button @click="subNAsync(3)">-N Async</button>
  </div>
</template>

<script>
  import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
  export default {
    data() {
      return {};
    },
    computed: {
      ...mapState(["count"]),
      ...mapGetters(["showNum"])
    },
    methods: {
      ...mapMutations(["sub", "subN"]),
      ...mapActions(["subAsync", "subNAsync"])
    }
  };
</script>
```

### action 和 mutation 区别

1. Action 提交的是 mutation，而不是直接变更状态。
2. Action 可以包含任意异步操作，Mutation 只能包括同步操作

Vuex 中所有的状态更新的唯一途径都是 mutation，异步操作通过 Action 来提交 mutation 实现，这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。

每个 mutation 执行完成后都会对应到一个新的状态变更，这样 devtools 就可以打个快照存下来，然后就可以实现 time-travel 了。如果 mutation 支持异步操作，就没有办法知道状态是何时更新的，无法很好的进行状态的追踪，给调试带来困难。

我们正在 debug 一个 app 并且观察 devtool 中的 mutation 日志。每一条 mutation 被记录，devtools 都需要捕捉到前一状态和后一状态的快照。然而，在上面的例子中 mutation 中的异步函数中的回调让这不可能完成：因为当 mutation 触发的时候，回调函数还没有被调用，devtools 不知道什么时候回调函数实际上被调用——实质上任何在回调函数中进行的状态的改变都是不可追踪的

### map...

## **Vue-Router**

### 动态路由匹配

```js
const User = {
  template: "<div>User {{ $route.params.id }}</div>"
};
const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: "/user/:id", component: User }
  ]
});
```

### 嵌套路由

在实际项目中我们会碰到多层嵌套的组件组合而成，但是我们如何实现嵌套路由呢？因此我们需要在 VueRouter 的参数中使用 children 配置，这样就可以很好的实现路由嵌套。
index.html，只有一个路由出口

```js
const User = {
  template: `
<div class="user">
  <h2>User {{ $route.params.id }}</h2>
  <!-- router-view 路由出口, 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
</div>
`
};
```

```js
const router = new VueRouter({
  routes: [
    {
      path: "/user/:id",
      component: User,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: "profile",
          component: UserProfile
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: "posts",
          component: UserPosts
        }
      ]
    }
  ]
});
```

home.vue，点击显示就会将子路由显示在出来，子路由的出口必须在父路由里面，否则子路由无法显示。

### 路由导航

- 声明式（标签跳转） `<router-link :to="index">`
- 编程式（ js 跳转） `router.push('index')`

```js
// 字符串
router.push("home");
// 对象
router.push({ path: "home" });
// 命名的路由
router.push({ name: "user", params: { userId: "123" } });
// 带查询参数，变成 /register?plan=private
router.push({ path: "register", query: { plan: "private" } });
```

### 路由模式

Hash 模式的 URL 结构类似：`https://example.com/##user/name`

History 模式的 URL 结构类似：`https://example.com/user/name`

无论哪种模式，本质都是使用的 history.pushState，每次 pushState 后，会在浏览器的浏览记录中添加一个新的记录，但是并不会触发页面刷新，也不会请求新的数据。

```js
// 使用history模式
const router = new VueRouter({
  mode: 'history',
  routes: [...]
})
```

不过使用 History 模式需要后端进行配置，要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面

### 路由按需懒加载

当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。

结合 Vue 的异步组件和 Webpack 的代码分割功能，轻松实现路由组件的懒加载。

首先，可以将异步组件定义为返回一个 Promise 的工厂函数 (该函数返回的 Promise 应该 resolve 组件本身)：

```js
const Foo = () =>
  Promise.resolve({
    /* 组件定义对象 */
  });
```

第二，在 Webpack 2 中，我们可以使用动态 import 语法来定义代码分块点 (split point)：

```js
import("./Foo.vue"); // 返回 Promise
```

注意

如果您使用的是 Babel，你将需要添加 syntax-dynamic-import 插件，才能使 Babel 可以正确地解析语法。

结合这两者，这就是如何定义一个能够被 Webpack 自动代码分割的异步组件。

```js
const Foo = () => import("./Foo.vue");
```

## **Vue 前后端交互**

1. 接口调用模式

- 原生 ajax
- 基于 jQuery 的 ajax
- [fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API)
- axios

## **vue-axios**

方便把 axios 挂载到 vue 实例上，过去用 vue-resource 的时候很方便，因为它直接挂载到 vue 实例上，可以通过 this.\$get 方法发请求，axios 不一样，必须要在每个组件里面去通过 axios.get 方式去发请求同时需要引入 improt "axios" 如果通过 vue-axios，简化了导入组件的步骤

### axios 的参数传递

1. GET 传递参数(DELETE 类似)

```js
axios.get("/data?id=123").then(ret => {
  console.log(ret.data);
});
```

```js
axios.get("/data/123").then(ret => {
  console.log(ret.data);
});
```

```js
axios
  .get("/data", {
    params: {
      id: 123
    }
  })
  .then(ret => {
    console.log(ret.data);
  });
```

2. POST 传递参数(PUT 类似)

通过选项传递参数(默认传递的是 json 格式的数据)

```js
axios
  .post("/data", {
    uname: "tom",
    pwd: 123
  })
  .then(ret => {
    console.log(ret.data);
  });
```

通过 URLSearchParams 传递参数(application/x-www-form-urlencoded)

```js
const params = new URLSearchParams();
params.append("param1", "value1");
params.append("param2", "value2");
axios.post("/api/test/", params).then(ret => {
  console.log(ret.data);
});
```

### axios 的响应结果

1. data：实际响应回来的数据

2. headers：响应头信息

3. status：响应状态码

4. statusText：响应状态信息

### axios 的全局配置

1. axios.defaults.timeout=3000; //超时时间

2. axios.defaults.baseURL = "http://localhost:3000/app" //默认地址

3. axios.defaults.headers["mytoken"]= "asdfadfaf" //设置请求头

### axios 拦截器

1. 请求拦截器

```js
axios.interceptors.request.use(
  function(config) {
    //在请求发出之前进行一些信息设置
    console.log(config.url);
    config.headers.mytoken = "nihao";
    return config;
  },
  function(err) {
    //处理响应错误信息
  }
);
```

2. 响应拦截器

```js
axios.interceptors.response.use(
  function(res) {
    //在这里对返回的数据进行处理
    var data = res.data;
    return data;
  },
  function(err) {
    //处理响应的错误信息
  }
);
```

## **scoped**

当 style 标签具有该 scoped 属性时，其 CSS 将仅应用于当前组件的元素

```html
<style scoped>
  .example {
    color: red;
  }
</style>

<template>
  <div class="example">hi</div>
</template>
```

vue 中 style 标签中设置 scoped 的原理:

这个局部样式是通过 PostCSS 给组件中所有的 DOM 添加了一个独一无二的动态属性，然后通过 CSS 属性选择器来选择组件中的 DOM

## **vue.config.js**

[vue.config.js 配置参考](https://cli.vuejs.org/zh/config/##vue-config-js)

## **Vue3.0**

1. 全部用 ts 重写（响应式、vdom、模板编译等）
2. 性能提升，代码量减少
3. 支持 Composition API
4. 响应式数据原理改成 proxy
5. vdom 算法更新，只更新 vdom 的绑定了动态数据的部分

### Proxy

Vue 不能检测对象属性的添加或删除

```js
var vm = new Vue({
  data: {
    a: 1
  }
});
// `vm.a` 现在是响应式的

vm.b = 2;
// `vm.b` 不是响应式的
```

对于已经创建的实例，Vue 不能动态添加根级别的响应式属性。但是，可以使用 Vue.set(object, key, value) 方法向嵌套对象添加响应式属性。例如，对于：

```js
var vm = new Vue({
  data: {
    userProfile: {
      name: "Anika"
    }
  }
});
```

你可以添加一个新的 age 属性到嵌套的 userProfile 对象：

```js
Vue.set(vm.userProfile, "age", 27);
```

你还可以使用 vm.\$set 实例方法，它只是全局 Vue.set 的别名：

```js
vm.$set(vm.userProfile, "age", 27);
```

虽然数组也是对象，Object.defineProperty 却不支持数组。

为了解决这种情况，Vue 重写了数组的很多方法，如 push，pop，shift，unshift，splice，sort，reverse。所以这些方法也将会触发视图更新。

尽管如此，由于 JavaScript 的限制，Vue 不能检测以下变动的数组：

当你利用索引直接设置一个项时，例如：vm.items[indexOfItem] = newValue
当你修改数组的长度时，例如：vm.items.length = newLength
为了解决第一类问题，以下两种方式都可以实现和 vm.items[indexOfItem] = newValue 相同的效果，同时也将触发状态更新

```js
// Vue.set
Vue.set(example1.items, indexOfItem, newValue)

// Array.prototype.splice
example1.items.splice(indexOfItem, 1, newValue)
为了解决第二类问题，你可以使用 splice：

example1.items.splice(newLength)
```

## **vue 性能优化**

### 编码优化

1. 不要将所有数据都放到 data 中，data 的数据都会增加 getter 和 setter，会收集对应的 watcher
2. vue 在 v-for 时给每项元素绑定事件需要使用代理
3. SPA 页面采用 keep-alive 缓存组件
4. 拆分组件（提高复用性，增加代码的可维护性，减少不必要的渲染）
5. v-if 当值为 false 时内部指令不会执行，具有阻断功能，很多情况下使用 v-if 替代 v-show
6. key 保证唯一性（默认 vue 会采用就地复用策略）
7. Object.freeze 冻结数据
8. 合理使用路由懒加载、异步组件
9. 尽量采用 runtime 运行时版本
10. 数据持久化的问题（防抖、节流）

### vue 加载性能优化

1. 第三方模块按需导入（babel-plugin-component）
2. 滚动到可是区域动态加载
3. 图片懒加载

### 用户体验

1. app-skeleton 骨架屏
2. app-shell app 壳
3. pwa serviceworker

### SEO 优化

1. 预渲染插件 prerender-spa-plugin
2. 服务端渲染 ssr

### 打包优化

1. 使用 cdn 的方式加载第三方模块
2. 多线程打包 happypack
3. splitChunks 抽离公共文件
4. sourceMap 生成

### 缓存压缩

1. 客户端缓存，服务端缓存
2. 服务端 gzip 压缩
