---
title: 浏览器
---

[(1.6w 字)浏览器灵魂之问，请问你能接得住几个？](https://juejin.im/post/6844904021308735502#heading-24)

## **内核**

### 浏览器内核的理解

主要分成两部分：

1. 渲染引擎：负责渲染，即在浏览器窗口中显示所请求的内容。默认情况下，渲染引擎可以显示 html、xml 文档及图片，它也
   可以借助插件（一种浏览器扩展）显示其他类型数据，例如使用 PDF 阅读器插件，可以显示 PDF 格式。

2. JS 引擎：解析和执行 javascript 来实现网页的动态效果

最开始渲染引擎和 JS 引擎并没有区分的很明确，后来 JS 引擎越来越独立，内核就倾向于只指渲染引擎。

### 浏览器内核种类

Trident：这种浏览器内核是 IE 浏览器用的内核，因为在早期 IE 占有大量的市场份额，所以这种内核比较流行，以前有很多
网页也是根据这个内核的标准来编写的，但是实际上这个内核对真正的网页标准支持不是很好。但是由于 IE 的高市场占有率，微
软也很长时间没有更新 Trident 内核，就导致了 Trident 内核和 W3C 标准脱节。还有就是 Trident 内核的大量 Bug 等
安全问题没有得到解决，加上一些专家学者公开自己认为 IE 浏览器不安全的观点，使很多用户开始转向其他浏览器。

Gecko：这是 Firefox 和 Flock 所采用的内核，这个内核的优点就是功能强大、丰富，可以支持很多复杂网页效果和浏览器扩
展接口，但是代价是也显而易见就是要消耗很多的资源，比如内存。

Presto：Opera 曾经采用的就是 Presto 内核，Presto 内核被称为公认的浏览网页速度最快的内核，这得益于它在开发时的
天生优势，在处理 JS 脚本等脚本语言时，会比其他的内核快 3 倍左右，缺点就是为了达到很快的速度而丢掉了一部分网页兼容性。

Webkit：Webkit 是 Safari 采用的内核，它的优点就是网页浏览速度较快，虽然不及 Presto 但是也胜于 Gecko 和 Trid
ent，缺点是对于网页代码的容错性不高，也就是说对网页代码的兼容性较低，会使一些编写不标准的网页无法正确显示。WebKit
前身是 KDE 小组的 KHTML 引擎，可以说 WebKit 是 KHTML 的一个开源的分支。

Blink：谷歌在 Chromium Blog 上发表博客，称将与苹果的开源浏览器核心 Webkit 分道扬镳，在 Chromium 项目中研发 B
link 渲染引擎（即浏览器核心），内置于 Chrome 浏览器之中。其实 Blink 引擎就是 Webkit 的一个分支，就像 webkit 是
KHTML 的分支一样。Blink 引擎现在是谷歌公司与 Opera Software 共同研发，上面提到过的，Opera 弃用了自己的 Presto
内核，加入 Google 阵营，跟随谷歌一起研发 Blink。

### 常见浏览器

    （1） IE 浏览器内核：Trident 内核，也是俗称的 IE 内核；

    （2） Chrome 浏览器内核：统称为 Chromium 内核或 Chrome 内核，以前是 Webkit 内核，现在是 Blink内核；

    （3） Firefox 浏览器内核：Gecko 内核，俗称 Firefox 内核；

    （4） Safari 浏览器内核：Webkit 内核；

    （5） Opera 浏览器内核：最初是自己的 Presto 内核，后来加入谷歌大军，从 Webkit 又到了 Blink 内核；

    （6） 360浏览器、猎豹浏览器内核：IE + Chrome 双内核；

    （7） 搜狗、遨游、QQ 浏览器内核：Trident（兼容模式）+ Webkit（高速模式）；

    （8） 百度浏览器、世界之窗内核：IE 内核；

    （9） 2345浏览器内核：好像以前是 IE 内核，现在也是 IE + Chrome 双内核了；

    （10）UC 浏览器内核：这个众口不一，UC 说是他们自己研发的 U3 内核，但好像还是基于 Webkit 和 Trident ，还有说
         是基于火狐内核。

### 主流浏览器内核私有属性 css 前缀

mozilla 内核 （irefox,flock 等） -moz
webkit 内核 （safari,chrome 等） -webkit
opera 内核 （opera 浏览器） -o
trident 内核 （ie 浏览器） -ms

### 浏览器线程

浏览器内核是多线程，在内核控制下各线程相互配合以保持同步，一个浏览器通常由以下常驻线程组成：

- GUI 渲染线程
- JavaScript 引擎线程
- 定时触发器线程
- 事件触发线程
- 异步 http 请求线程

#### GUI 渲染线程

- 主要负责页面的渲染，解析 HTML、CSS，构建 DOM 树，布局和绘制等。
- 当界面需要重绘或者由于某种操作引发回流时，将执行该线程。
- 该线程与 JS 引擎线程互斥，当执行 JS 引擎线程时，GUI 渲染会被挂起，当任务队列空闲时，主线程才会去执行 GUI 渲染。

#### JS 引擎线程

- 该线程当然是主要负责处理 JavaScript 脚本，执行代码。
- 也是主要负责执行准备好待执行的事件，即定时器计数结束，或者异步请求成功并正确返回时，将依次进入任务队列，等待 JS 引擎线程的执行。
- 当然，该线程与 GUI 渲染线程互斥，当 JS 引擎线程执行 JavaScript 脚本时间过长，将导致页面渲染的阻塞。

#### 定时器触发线程

- 负责执行异步定时器一类的函数的线程，如： setTimeout，setInterval。
- 主线程依次执行代码时，遇到定时器，会将定时器交给该线程处理，当计数完毕后，事件触发线程会将计数完毕后的事件加入到任务队列的尾部，等待 JS 引擎线程执行。

#### 事件触发线程

- 主要负责将准备好的事件交给 JS 引擎线程执行。

比如 setTimeout 定时器计数结束， ajax 等异步请求成功并触发回调函数，或者用户触发点击事件时，该线程会将整装待发的事件依次加入到任务队列的队尾，等待 JS 引擎线程的执行。

#### 异步 http 请求线程

- 负责执行异步请求一类的函数的线程，如： Promise，axios，ajax 等。
- 主线程依次执行代码时，遇到异步请求，会将函数交给该线程处理，当监听到状态码变更，如果有回调函数，事件触发线程会将回调函数加入到任务队列的尾部，等待 JS 引擎线程执行。

## **V8 引擎**

[认识 V8 引擎](https://zhuanlan.zhihu.com/p/27628685)

V8 是使用 C++ 编写的高性能 JavaScript 和 WebAssembly 引擎

V8 的发布周期：
大约每隔六周，就会有一个新的 V8 版本推出
V8 版本与 Chrome 版本对应，如 V8 v7.8 对应 Chrome 78

V8 的竞品：
Chakra（前 Edge JavaScript 引擎）
JavaScript Core（Safari）
SpiderMonkey（Firefox）

V8 的重要部件：
Ignition（基线编译器）
TurboFan（优化编译器）
Orinoco（垃圾回收器）
Liftoff（WebAssembly 基线编译器）

## **从输入 URL 到页面加载完成的过程**

### 网络请求

[第 3 篇: 说一说从输入 URL 到页面呈现发生了什么？——网络篇](https://juejin.im/post/6844904021308735502#heading-24)

1. 构建请求

浏览器会构建请求行:

```js
// 请求方法是 GET，路径为根路径，HTTP 协议版本为 1.1
GET / HTTP / 1.1;
```

2. 查找强缓存

先检查强缓存，如果命中直接使用，否则进入下一步

3. DNS 解析

4. 三次握手建立 TCP 连接

5. 发送 HTTP 请求

6. 网络响应

响应完成之后怎么办？TCP 连接就断开了吗？
不一定。这时候要判断 Connection 字段, 如果请求头或响应头中包含 Connection: Keep-Alive，表示建立了持久连接，这样 TCP 连接会一直保持，之后请求统一站点的资源会复用这个连接。
否则断开 TCP 连接, 请求-响应流程结束。

### 解析

[第 4 篇: 说一说从输入 URL 到页面呈现发生了什么？——解析算法篇](https://juejin.im/post/6844904021308735502#heading-33)
完成了网络请求和响应，如果响应头中 Content-Type 的值是 text/html，那么接下来就是浏览器的解析和渲染工作了

1. 构建 DOM 树

2. 构建 CSSOM 树

3. 生成布局树

通过浏览器的布局系统确定元素的位置，生成布局树

### 渲染

[第 5 篇: 说一说从输入 URL 到页面呈现发生了什么？——渲染过程篇](https://juejin.im/post/6844904021308735502#heading-46)

## **Event Loop**

[JavaScript——从 setTimeout()的执行了解 js 的单线程和异步](https://blog.csdn.net/searchin_r/article/details/82935866)

[Event Loop 这个循环你晓得么？(附 GIF 详解)-饿了么前端](https://zhuanlan.zhihu.com/p/41543963)

因为 js 是单线程运行的，在代码执行的时候，通过将不同函数的执行上下文压入执行栈中来保证代码的有序执行。在执行同步代码
的时候，如果遇到了异步事件，js 引擎并不会一直等待其返回结果，而是会将这个事件挂起，继续执行执行栈中的其他任务。当异步
事件执行完毕后，再将异步事件对应的回调加入到与当前执行栈中不同的另一个任务队列中等待执行。任务队列可以分为宏任务对列和
微任务对列，当当前执行栈中的事件执行完毕后，js 引擎首先会判断微任务对列中是否有任务可以执行，如果有就将微任务队首的事
件压入栈中执行。当微任务对列中的任务都执行完成后再去判断宏任务对列中的任务。

微任务：

1. promise 的回调
2. node 中的 process.nextTick
3. 对 Dom 变化监听的 MutationObserver。

宏任务：

1. script 脚本的执行
2. setTimeout ，setInterval ，setImmediate 一类的定时事件
3. I/O 操作
4. UI 渲染

#### Micro-Task 与 Macro-Task

浏览器端事件循环中的异步队列有两种：macro（宏任务）队列和 micro（微任务）队列。**宏任务队列可以有多个，微任务队列只有一个**。

- 常见的 macro-task 比如：setTimeout、setInterval、script（整体代码）、 I/O 操作、UI 渲染等。
- 常见的 micro-task 比如: new Promise().then(回调)、MutationObserver(html5 新特性) 等。

#### Event Loop 过程解析

一个完整的 Event Loop 过程，可以概括为以下阶段：

![](https://camo.githubusercontent.com/875c5b741e008b6cfbf92958bce1819f6cb51770/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031392f312f31302f313638333836333633333538363937343f773d33393426683d34343926663d706e6726733d3838343433)

- 一开始执行栈空,我们可以把**执行栈认为是一个存储函数调用的栈结构，遵循先进后出的原则**。micro 队列空，macro 队列里有且只有一个 script 脚本（整体代码）。

- 全局上下文（script 标签）被推入执行栈，同步代码执行。在执行的过程中，会判断是同步任务还是异步任务，通过对一些接口的调用，可以产生新的 macro-task 与 micro-task，它们会分别被推入各自的任务队列里。同步代码执行完了，script 脚本会被移出 macro 队列，这个过程本质上是队列的 macro-task 的执行和出队的过程。

- 上一步我们出队的是一个 macro-task，这一步我们处理的是 micro-task。但需要注意的是：当 macro-task 出队时，任务是**一个一个**执行的；而 micro-task 出队时，任务是**一队一队**执行的。因此，我们处理 micro 队列这一步，会逐个执行队列中的任务并把它出队，直到队列被清空。

- **执行渲染操作，更新界面**

- 检查是否存在 Web worker 任务，如果有，则对其进行处理

- 上述过程循环往复，直到两个队列都清空

我们总结一下，每一次循环都是一个这样的过程：

![](https://camo.githubusercontent.com/877fe5d0b39d2696b12844b04f3d134cc9f957b1/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031392f312f31302f313638333837376261396161623035363f773d36323826683d31333226663d706e6726733d3530303238)

当某个宏任务执行完后,会查看是否有微任务队列。如果有，先执行微任务队列中的所有任务，如果没有，会读取宏任务队列中排在最前的任务，执行宏任务的过程中，遇到微任务，依次加入微任务队列。栈空后，再次读取微任务队列里的任务，依次类推

接下来我们看道例子来介绍上面流程：

```js
Promise.resolve().then(() => {
  console.log('Promise1');
  setTimeout(() => {
    console.log('setTimeout2');
  }, 0);
});
setTimeout(() => {
  console.log('setTimeout1');
  Promise.resolve().then(() => {
    console.log('Promise2');
  });
}, 0);
```

最后输出结果是 Promise1，setTimeout1，Promise2，setTimeout2

- 一开始执行栈的同步任务（这属于宏任务）执行完毕，会去查看是否有微任务队列，上题中存在(有且只有一个)，然后执行微任务队列中的所有任务输出 Promise1，同时会生成一个宏任务 setTimeout2
- 然后去查看宏任务队列，宏任务 setTimeout1 在 setTimeout2 之前，先执行宏任务 setTimeout1，输出 setTimeout1
- 在执行宏任务 setTimeout1 时会生成微任务 Promise2 ，放入微任务队列中，接着先去清空微任务队列中的所有任务，输出 Promise2
- 清空完微任务队列中的所有任务后，就又会去宏任务队列取一个，这回执行的是 setTimeout2

## **渲染机制**

浏览器的渲染机制一般分为以下几个步骤

1. 处理 HTML 并构建 DOM 树[浏览器将标签转成 DOM 的过程](https://segmentfault.com/a/1190000018730884)
2. 处理 CSS 构建 CSSOM 树
3. 将 DOM 与 CSSOM 合并成一个渲染树
4. 根据渲染树来布局，计算每个节点的位置
5. 调用 GPU 绘制，合成图层，显示在屏幕上

![](https://yck-1254263422.cos.ap-shanghai.myqcloud.com/blog/2019-06-01-042733.png)

在构建 CSSOM 树时，会阻塞渲染，直至 CSSOM 树构建完成。并且构建 CSSOM 树是一个十分消耗性能的过程，所以应该尽量保证层级扁平，减少过度层叠，越是具体的 CSS 选择器，执行速度越慢。

JavaScript 的加载、解析与执行会阻塞文档的解析，也就是说，在构建 DOM 时，HTML 解析器若遇到了 JavaScript，那么它会暂停文档的解析，将控制权移交给 JavaScript 引擎，等 JavaScript 引擎运行完毕，浏览器再从中断的地方恢复继续解析文档。也就是说，如果你想首屏渲染的越快，就越不应该在首屏就加载 JS 文件，这也是都建议将 script 标签放在 body 标签底部的原因。当然在当下，并不是说 script 标签必须放在底部，因为你可以给 script 标签添加 defer 或者 async 属性

![](https://yck-1254263422.cos.ap-shanghai.myqcloud.com/blog/2019-06-01-042734.png)

![](https://yck-1254263422.cos.ap-shanghai.myqcloud.com/blog/2019-06-01-042735.png)

### Load 和 DOMContentLoaded

当初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，而无需等待样式表、图像和
子框架的加载完成。

Load 事件是当所有资源加载完成后触发的。

### 图层

一般来说，可以把普通文档流看成一个图层。特定的属性可以生成一个新的图层。**不同的图层渲染互不影响**，所以对于某些频繁需要渲染的建议单独生成一个新图层，提高性能。**但也不能生成过多的图层，会引起反作用。**

通过以下几个常用属性可以生成新图层

- 3D 变换：`translate3d`、`translateZ`
- `will-change`
- `video`、`iframe` 标签
- 通过动画实现的 `opacity` 动画转换
- `position: fixed`

### 渲染页面时常见不良现象

    FOUC：主要指的是样式闪烁的问题，由于浏览器渲染机制（比如firefox），在 CSS 加载之前，先呈现了 HTML，就会导致展示
          出无样式内容，然后样式突然呈现的现象。会出现这个问题的原因主要是 css 加载时间过长，或者 css 被放在了文档底
          部。

    白屏：有些浏览器渲染机制（比如chrome）要先构建 DOM 树和 CSSOM 树，构建完成后再进行渲染，如果 CSS 部分放在 HTML
         尾部，由于 CSS 未加载完成，浏览器迟迟未渲染，从而导致白屏；也可能是把 js 文件放在头部，脚本的加载会阻塞后面
         文档内容的解析，从而页面迟迟未渲染出来，出现白屏问题。

### setTimeout 与 requestAnimationFrame

- 引擎层面：

setTimeout 属于 JS 引擎，存在事件轮询，任务队列中的任务只有在主线程任务执行完毕后才会被执行。会在指定的时间 n 毫秒后，将指定的回调函数 fn 放进任务队列中，因此并不是 n 秒后就会执行回调函数。

requestAnimationFrame 属于 GUI 引擎

- 性能层面：

当页面被隐藏或最小化时，定时器 setTimeout 仍在后台执行动画任务。

当页面处于未激活的状态下，该页面的屏幕刷新任务会被系统暂停，requestAnimationFrame 也会停止。

- 应用层面：

利用 setTimeout，这种定时机制去做动画，模拟固定时间刷新页面。

requestAnimationFrame 由浏览器专门为动画提供的 API，在运行时浏览器会自动优化方法的调用，在特定性环境下可以有效节省了 CPU 开销。一般显示器刷新频率为 60HZ，即 16.6ms 刷新一次屏幕。setTimeout 可能会掉帧。

## **垃圾回收机制**

### 垃圾回收

垃圾回收是一种自动的内存管理机制。当一个电脑上的动态内存不再需要时,就应该予以释放,以让出内存,这种内存资源管理,称为垃圾回收

1. 标记清除

工作原理:是当变量进入环境时,将这个变量标记为“进入环境”。当变量离开环境时,则将其标记为“离开环境”。标记“离开环境”的就回收内存

1. GC 标记所有的变量
2. 访问所有变量的引用,标记它们
3. 标记所有引用链上的对象,已标记的对象不再被访问
4. 最后删除所有未被标记的对象

```js
function test(){
var a = 10; *//*被标记*"*进入环境*"*
var b = "hello"; *//*被标记*"*进入环境*"*
test(); *//*执行完毕后之后，*a*和*b*又被标记*"*离开环境*"*，被回收
```

2. 引用计数

工作原理:跟踪记录每个值被引用的次数。

1. 声明了一个变量并将一个引用类型的值赋值给这个变量,这个引用类型值的引用次数就是 1
2. 同一个值又被赋值给另一个变量,这个引用类型值的引用次数加 1
3. 当包含这个引用类型值的变量又被赋值成另一个值了,那么这个引用类型值的引用次数减 1
4. 当引用次数变成 0 时,说明没办法访问这个值了
5. 当垃圾收集器下一次运行时,它就会释放引用次数是 0 的值所占的内存

缺点：相互引用造成内存泄漏

### 内存溢出

一种程序运行出现的错误

当程序运行需要的内存超过了剩余的内存时，就会抛出内存移除错误

### 内存泄漏

占用的内存没有及时被释放

内存泄露积累多了就容易导致内存泄漏

垃圾回收器定期扫描对象，并计算引用了每个对象的其他对象的数量。如果一个对象的引用数量为 0（没有其他对象引用过该对象），或对该对象的惟一引用是循环的，那么该对象的内存即可回收。

1. setTimeout 的第一个参数使用字符串而非函数的话，会引发内存泄漏。

2. 闭包可能会导致内存泄漏

3. 控制台日志

4. 相互引用（在两个对象彼此引用且彼此保留时，就会产生一个循环）

5. 删除 DOM 时，还存在 DOM 的引用，比如，我们给 DOM 绑定点击事件，之后删除 DOM 节点。因为还存在引用，所以内存没有被释放。

比如，我们给 DOM 绑定点击事件，之后删除 DOM 节点。因为还存在引用，所以内存没有被释放。

6. 意外的全局变量的内存泄漏

```js
// 意外的声明了全局的变量，在页面关闭前a变量都不会被回收
(function A() {
  a = '123';
})();
```

7. 没有及时清理计时器或回调函数

```js
var intervalId = setInterval(function() {
  console.log('-');
}, 1000);

//clearInterval(intervalId);
```

[深入了解 JavaScript 内存泄露](https://segmentfault.com/a/1190000020231307)

## **错误监控**

[如何优雅处理前端异常？](http://jartto.wang/2018/11/20/js-exception-handling/)

[JS 异步错误捕获二三事](https://juejin.im/post/6844903830409183239)

[前端开发中的 Error 以及异常捕获](https://juejin.im/post/6844903751271055374)

### 即时运行错误

代码错误

1. try...catch

```js
try {
  var a = 1;
  var b = a + c;
} catch (e) {
  //捕获处理
  console.log(e); //ReferenceError:c is not defined
}
```

不过对于异步代码，使用 try...catch 是无法捕捉其内部发生的错误，比如：

```js
try {
  setTimeout(() => {
    throw new Error('222');
  });
} catch (e) {
  console.log(2);
}
//未能捕获到异常，不输出2
```

可以通过 async/await 和 promise 来解决此问题，当 await 后面的 promise 状态为 reject 时，会抛出错误。所以我们可以搭配 async/await 和 promisse 来进行异步的错误捕捉。

```js
async function A() {
  try {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('222'));
      });
    });
  } catch (e) {
    console.log(e);
  }
}
```

2. window.onerror

```js
window.onerror = function(errorMessage, scriptURI, lineNo, columnNo, error) {
  console.log('errorMessage: ' + errorMessage); // 异常信息
  console.log('scriptURI: ' + scriptURI); // 异常文件路径
  console.log('lineNo: ' + lineNo); // 异常行号
  console.log('columnNo: ' + columnNo); // 异常列号
  console.log('error: ' + error); // 异常堆栈信息
};
```

### 资源加载错误

图片、JS、CSS 加载失败

1. object.onerror

img 标签、script 标签都可以添加 onerror 事件，用来捕获资源加载错误

2. performance.getEntries

可以获取所有已加载资源的加载时间，通过这种方式，可以间接的拿到没有加载的资源错误

## **cookie**

[HTTP cookies|MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies)

HTTP Cookie 是服务器发送到用户浏览器并保存在本地的一小块数据,它会在浏览器下次向同一服务器再发起请求时被携帯并发送到服务器上。

通常,它用于告知服务端两个请求是否来自同一浏览器,如保持用户的登录状态。Cookie 使基于无状态的 HTTP 协议记录稳定的状态信息成为了可能。

### cookie 作用

1. 会话状态管理（如用户登录状态、购物车、游戏分数或其它需要记录的信息）
2. 个性化设置（如用户自定义设置、主题等）
3. 浏览器行为跟踪（如跟踪分析用户行为等）

### cookie 设置

1. 当服务器收到 HTTP 请求时，服务器可以在响应头里面添加一个 `Set-Cookie` 选项。
2. 浏览器收到响应后通常会保存下 Cookie
3. 之后对该服务器每一次请求中都通过 `Cookie` 请求头部将 Cookie 信息发送给服务器

会带来额外的性能开销（尤其是在移动环境下）。新的浏览器 API 已经允许开发者直接将数据存储到本地，如使用 Web storage API （本地存储和会话存储）或 IndexedDB

Cookie 的过期时间、域、路径、有效期、适用站点都可以根据需要来指定。

### cookie 类型

1. 会话期 cookie

浏览器关闭之后它会被自动删除,也就是说它仅在会话期内有效会话期 Cookie 不需要指定过期时间( Expires)或者有效期(Max-Age)。需要注意的是,有些浏览器提供了会话恢复功能,这种情况下即使关闭了浏览器,会话期 Cookie 也会被保留下来,就好像浏览器从来没有关闭一样

2. 持久性 Cookie

和关闭浏览器便失效的会话期 Cookie 不同,持久性 Cookie 可以指定一个特定的过期时间( Expires)或有效期(Max-Age)提示:当 Cookie 的过期时间被设定时,设定的日期和时间只与客户端相关,而不是服务端。

3. 第三方 Cookie

每个 Cookie 都会有与之关联的域( Domain),如果 Cookie 的域和页面的域相同,那么我们称这个 Cookie 为第一方 Cookie( first-party cookie),如果 Cookie 的域和页面的城不同,则称之为第三方 Cookie( third-party cookie)。一个页面包含图片或存放在其他域上的资源(如图片广告)时,第方的 Cookie 也只会发送给设置它们的服务器。通过第三方组件发送的第三方 Cookie 主要用于广告和网络追踪。这方面可以看谷歌使用的 Cookie 类型( types of cookies used by Google)。大多数浏览器默认都允许第三方 Cookie,但是可以通过附加组件来阻止第三方 Cookie(如 EF 的 PrivacyBadger)。

### cookie 属性

![](cookie.jpg)

#### Name/Value

用 JavaScript 操作 Cookie 的时候注意对 Value 进行编码处理

#### Expires

Expires 用于设置 Cookie 的过期时间

```
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT;

```

当 Expires 属性缺省时，表示是会话性 Cookie

会话性 Cookie:值保存在客户端内存中，浏览器关闭之后它会被自动删除，也就是说它仅在会话期内有效。会话期 Cookie 不需要指定过期时间（Expires）或者有效期（Max-Age），会被设置为 Session

持久性 Cookie:会保存在用户的硬盘中，直至过期或者清除 Cookie。这里值得注意的是，设定的日期和时间只与客户端相关，而不是服务端。可以指定一个特定的过期时间（Expires）或有效期（Max-Age）

#### Max-Age

Max-Age 用于设置在 Cookie 失效之前需要经过的秒数

```
Set-Cookie: id=a3fWa; Max-Age=604800;
```

- Max-Age 为正数，浏览器会将其持久化，即写到对应的 Cookie 文件中
- Max-Age 为负数，则表示该 Cookie 只是一个会话性 Cookie
- Max-Age 为 0 时，则会立即删除这个 Cookie

假如 Expires 和 Max-Age 都存在，Max-Age 优先级更高

#### Domain

Domain 指定了 Cookie 可以送达的主机名。假如没有指定，那么默认值为当前文档访问地址中的主机部分（但是不包含子域名）。

像淘宝首页设置的 Domain 就是 .taobao.com，这样无论是 a.taobao.com 还是 b.taobao.com 都可以使用 Cookie。

在这里注意的是，不能跨域设置 Cookie，比如阿里域名下的页面把 Domain 设置成百度是无效的：

```
Set-Cookie: qwerty=219ffwef9w0f; Domain=baidu.com; Path=/; Expires=Wed, 30 Aug 2020 00:00:00 GMT
```

#### Path

Path 指定了一个 URL 路径，这个路径必须出现在要请求的资源的路径中才可以发送 Cookie 首部

比如设置 Path=/docs，/docs/Web/ 下的资源会带 Cookie 首部，/test 则不会携带 Cookie 首部

Domain 和 Path 标识共同定义了 Cookie 的作用域：即 Cookie 应该发送给哪些 URL

#### Secure

标记为 Secure 的 Cookie 只应通过被 HTTPS 协议加密过的请求发送给服务端。使用 HTTPS 安全协议，可以保护 Cookie 在浏览器和 Web 服务器间的传输过程中不被窃取和篡改

#### HttpOnly

防止客户端 JS 通过 document.cookie 等方式访问 Cookie，有助于避免 XSS 攻击

#### SameSite

[浏览器系列之 Cookie 和 SameSite 属性](https://github.com/mqyqingfeng/Blog/issues/157)

让 Cookie 在跨站请求时不会被发送，从而可以阻止跨站请求伪造攻击（CSRF）

1. None

无论是否跨站都会发送 Cookie

2. Strict

浏览器将只发送相同站点请求的 cookie(即当前网页 URL 与请求目标 URL 完全一致)。如果请求来自与当前 location 的 URL 不同的 URL，则不包括标记为 Strict 属性的 cookie。

3. Lax

在新版本浏览器中，为默认选项，Same-site cookies 将会为一些跨站子请求保留，如图片加载或者 frames 的调用，但只有当用户从外部站点导航到 URL 时才会发送。如 link 链接

之前默认是 None 的，Chrome80 后默认是 Lax

![](SameSite.png)

对大部分 web 应用而言，Post 表单，iframe，AJAX，Image 这四种情况从以前的跨站会发送三方 Cookie，变成了不发送。

Post 表单

iframe：iframe 嵌入的 web 应用有很多是跨站的，都会受到影响

AJAX：可能会影响部分前端取值的行为和结果

Image：图片一般放 CDN，大部分情况不需要 Cookie，故影响有限。但如果引用了需要鉴权的图片，可能会受到影响

除了这些还有 script 的方式，这种方式也不会发送 Cookie，像淘宝的大部分请求都是 jsonp，如果涉及到跨站也有可能会被影响。

问题

1. 天猫和飞猪的页面靠请求淘宝域名下的接口获取登录信息，由于 Cookie 丢失，用户无法登录，页面还会误判断成是由于用户开启了浏览器的“禁止第三方 Cookie”功能导致而给与错误的提示

2. 淘宝部分页面内嵌支付宝确认付款和确认收货页面、天猫内嵌淘宝的登录页面等，由于 Cookie 失效，付款、登录等操作都会失败

3. 阿里妈妈在各大网站比如今日头条，网易，微博等投放的广告，也是用 iframe 嵌入的，没有了 Cookie，就不能准确的进行推荐

4. 一些埋点系统会把用户 id 信息埋到 Cookie 中，用于日志上报，这种系统一般走的都是单独的域名，与业务域名分开，所以也会受到影响。

5. 一些用于防止恶意请求的系统，对判断为恶意请求的访问会弹出验证码让用户进行安全验证，通过安全验证后会在请求所在域种一个 Cookie，请求中带上这个 Cookie 之后，短时间内不再弹安全验证码。在 Chrome80 以上如果因为 Samesite 的原因请求没办法带上这个 Cookie，则会出现一直弹出验证码进行安全验证。

6. 天猫商家后台请求了跨域的接口，因为没有 Cookie，接口不会返回数据

解决

解决方案就是设置 SameSite 为 none。

1. HTTP 接口不支持 SameSite=none
   如果你想加 SameSite=none 属性，那么该 Cookie 就必须同时加上 Secure 属性，表示只有在 HTTPS 协议下该 Cookie 才会被发送。

2. 需要 UA 检测，部分浏览器不能加 SameSite=none
   IOS 12 的 Safari 以及老版本的一些 Chrome 会把 SameSite=none 识别成 SameSite=Strict，所以服务端必须在下发 Set-Cookie 响应头时进行 User-Agent 检测，对这些浏览器不下发 SameSite=none 属性

### cookie 缺点

1. 容量缺陷。Cookie 的体积上限只有 4KB，只能用来存储少量的信息。

2. 性能缺陷。Cookie 紧跟域名，不管域名下面的某一个地址需不需要这个 Cookie ，请求都会携带上完整的 Cookie，这样随着请求数的增多，其实会造成巨大的性能浪费的，因为请求携带了很多不必要的内容。但可以通过 Domain 和 Path 指定作用域来解决。

3. 安全缺陷。由于 Cookie 以纯文本的形式在浏览器和服务器中传递，很容易被非法用户截获，然后进行一系列的篡改，在 Cookie 的有效期内重新发送给服务器，这是相当危险的。另外，在 HttpOnly 为 false 的情况下，Cookie 信息能直接通过 JS 脚本来读取。

Cookie 曾一度用于客户端数据的存储,因当时并没有其它合适的存储办法而作为唯一的存储手段,但现在随着现代浏览器开始支持各种各样的存储方式, Cookie 新渐被淘汰。由于服务器指定 ookie 后,浏览器的每次请求都会携带 Cookie 数据,会带来额外的性能开销(尤其是在移动环境下)。新的浏览器 API 已经允许开发者直接将数据存储到本地,如使用 Web storage Apl(本地存储和会话存储)或 Indexeddb。

### 实现登录状态保持的两种方法 cookie、session 和 token

实现登录状态保持的两种方法：

第一种，cookie 和 session 的配合使用

实现原理：当用户请求页面，一般需要先登录，用户第一次输入用户名和密码之后，前台发送 post 请求，后台获取用户信息，通过查询数据库来验证用户信息是否正确，如果验证通过，则会开辟一块 session 空间来储存用户数据，并且同时生成一个 cookie 字符串，由后台返回给前台，前台接收后，会把这个 cookie 字符串储存到浏览器的 cookie 空间中，这个 cookie 就相当于一把钥匙，可以打开后台存储对应用户信息的锁，当用户下一次请求的时候，客户端便会自动携带这个 cookie 去请求服务器，服务器识别后，就会读取 session 中的用户信息，这样用户就可以直接访问，就不需要再输入用户名密码来验证身份了。
优缺点： 优点是：提升了用户体验，cookie 和 session 的结合使用，比直接在客户端保存用户信息要相对安全；缺点是：当服务器向浏览器传送 cookie 的时候，很容易被劫持，并不是绝对的安全，还有一点就是，在大型的项目中，服务器往往不只一台，如果第一次请求，用户信息被保存在了服务器 1 的 session 空间中，但是第二次请求被分流到了服务器 2，这样就获取不到用户信息了，依然要重新登录，所以又引出了另一种方法：token 来实现。

第二种，使用 token 安全令牌

实现原理：当用户请求页面，输入用户信息，服务端经过验证后，会生成一个 token 安全令牌（随机字符串），并返回给客户端，当客户端发送下一次请求的时候，直接携带这个 token，服务端识别后，就可以直接访问页面，不需要再次登录了
优点：token 只是以字符串的形式存在，不要服务器再开辟空间，并且相对更安全，即使在传输的过程中被劫持，别人也并不能破解内容，并且减少了服务器压力，减少频繁的查询数据库。

### document.cookie

[document.cookie](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie)

1. 得到 cookie

```js
docCookies.getItem(name);
```

读取一个 cookie。如果 cookie 不存在返回 null。

name:读取的 cookie 名 (string).

2. 移除 cookie

```js
   docCookies.removeItem(name[, path],domain)
```

删除一个 cookie。

name:要移除的 cookie 名(string).

path:例如 '/', '/mydir'。 如果没有定义，默认为当前文档位置的路径。(string or null)。路径必须为绝对路径（参见 RFC 2965）。关于如何在这个参数使用相对路径的方法请参见这段。

domain:例如 'example.com'， '.example.com' (包括所有子域名), 'subdomain.example.com'。如果没有定义，默认为当前文档位置的路径的域名部分 (string 或 null)。

3. 检测 cookie

```js
docCookies.hasItem(name);
```

检查一个 cookie 是否存在

name:要检查的 cookie 名 (string).

4. 得到所有 cookie 的列表

```js
docCookies.keys();
```

返回一个这个路径所有可读的 cookie 的数组。

示例用法:

```js
docCookies.setItem('test0', 'Hello world!');
docCookies.setItem(
  'test1',
  'Unicode test: \u00E0\u00E8\u00EC\u00F2\u00F9',
  Infinity
);
docCookies.setItem('test2', 'Hello world!', new Date(2020, 5, 12));
docCookies.setItem('test3', 'Hello world!', new Date(2027, 2, 3), '/blog');
docCookies.setItem('test4', 'Hello world!', 'Sun, 06 Nov 2022 21:43:15 GMT');
docCookies.setItem(
  'test5',
  'Hello world!',
  'Tue, 06 Dec 2022 13:11:07 GMT',
  '/home'
);
docCookies.setItem('test6', 'Hello world!', 150);
docCookies.setItem('test7', 'Hello world!', 245, '/content');
docCookies.setItem('test8', 'Hello world!', null, null, 'example.com');
docCookies.setItem('test9', 'Hello world!', null, null, null, true);
docCookies.setItem('test1;=', 'Safe character test;=', Infinity);

alert(docCookies.keys().join('\n'));
alert(docCookies.getItem('test1'));
alert(docCookies.getItem('test5'));
docCookies.removeItem('test1');
docCookies.removeItem('test5', '/home');
alert(docCookies.getItem('test1'));
alert(docCookies.getItem('test5'));
alert(docCookies.getItem('unexistingCookie'));
alert(docCookies.getItem());
alert(docCookies.getItem('test1;='));
```

## **session**

[详解 Cookie，Session，Token](https://juejin.im/post/6844903864810864647)

## **token**

JWT JSON Web Token

access_token 15mins

refresh_token 14days

## **SessionStorage LocalStorage**

SessionStorage， LocalStorage， Cookie 这三者都可以被用来在浏览器端存储数据，而且都是字符串类型的键值对。区别
在于前两者属于 HTML5 WebStorage，创建它们的目的便于客户端存储数据。而 cookie 是网站为了标示用户身份而储存在用户
本地终端上的数据（通常经过加密）。cookie 数据始终在同源（协议、主机、端口相同）的 http 请求中携带（即使不需要），会
在浏览器和服务器间来回传递。

存储大小：
cookie 数据大小不能超过 4 k 。
sessionStorage 和 localStorage 虽然也有存储大小的限制，但比 cookie 大得多，可以达到 5M 或更大。

有期时间：
localStorage 存储持久数据，浏览器关闭后数据不丢失除非主动删除数据。
sessionStorage 数据在页面会话结束时会被清除。页面会话在浏览器打开期间一直保持，并且重新加载或恢复页面仍会
保持原来的页面会话。在新标签或窗口打开一个页面时会在顶级浏览上下文中初始化一个新的会话。
cookie 设置的 cookie 过期时间之前一直有效，即使窗口或浏览器关闭。

作用域：
sessionStorage 只在同源的同窗口（或标签页）中共享数据，也就是只在当前会话中共享。
localStorage 在所有同源窗口中都是共享的
cookie 在所有同源窗口中都是共享的

cookie 其实最开始是服务器端用于记录用户状态的一种方式，由服务器设置，在客户端存储，然后每次发起同源请求时，发送给服
务器端。cookie 最多能存储 4 k 数据，它的生存时间由 expires 属性指定，并且 cookie 只能被同源的页面访问共享。

上面几种方式都是存储少量数据的时候的存储方式，当我们需要在本地存储大量数据的时候，我们可以使用浏览器的 indexDB 这是浏
览器提供的一种本地的数据库存储机制。它不是关系型数据库，它内部采用对象仓库的形式存储数据，它更接近 NoSQL 数据库

```js
const STORAGE_KEY = 'mall';
export default {
  // 存储值
  setItem(key, value, module_name) {
    if (module_name) {
      let val = this.getItem(module_name);
      val[key] = value;
      this.setItem(module_name, val);
    } else {
      let val = this.getStorage();
      val[key] = value;
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val));
    }
  },
  // 获取某一个模块下面的属性user下面的userName
  getItem(key, module_name) {
    if (module_name) {
      let val = this.getItem(module_name);
      if (val) return val[key];
    }
    return this.getStorage()[key];
  },
  getStorage() {
    return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '{}');
  },
  clear(key, module_name) {
    let val = this.getStorage();
    if (module_name) {
      if (!val[module_name]) return;
      delete val[module_name][key];
    } else {
      delete val[key];
    }
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val));
  },
};
```

## **缓存**

[彻底理解浏览器的缓存机制|掘金](https://juejin.im/entry/5ad86c16f265da505a77dca4)

浏览器请求资源时

1. 先判断本地有没有缓存，如果没有缓存则向服务器请求资源

2. 若有缓存，根据 [Cache-Control](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cache-Control): max-age 或是 Expires 判断资源是否过期。

   1. 如果资源没过期，则直接从缓存读取（强制缓存），此时在 Network 一栏可以看到资源对应的状态码为 200（from disk cache）或者是 200 （from memory cache）

   比如，资源没过期的时候我们打开新的页面，资源会从硬盘缓存中读取（from disk cache）；如果我们此时又刷新页面，资源会从内存缓存中读取（from memory cache）

   2. 如果资源过期了

      1. 查看上次资源的响应头是否有 Etag 头部， 有的话发送请求，请求头为 If-None-Match

      2. 没有 Etag 的话，看上次资源的响应头是否有 Last-Modified，有的话发送请求，请求头为 If-Modified-Since。

      3. 如果命中了缓存，或者说资源没有发生改变，服务器会发送状态码为 304（Not Modify） 的响应，告诉浏览器读取缓存中的资源。

      如果未命中缓存，或者说资源发生了改变，服务器会发送状态码为 200（OK）的响应，并把资源作为响应的内容发送给浏览器。

### Catch-Control

public: 客户端和代理服务器都可以缓存。因为一个请求可能要经过不同的代理服务器最后才到达目标服务器，那么结果就是不仅仅浏览器可以缓存数据，中间的任何代理节点都可以进行缓存。

private： 这种情况就是只有浏览器能缓存了，中间的代理服务器不能缓存。

no-cache: 跳过当前的强缓存，发送 HTTP 请求，即直接进入协商缓存阶段。

no-store: 不进行任何形式的缓存。

s-maxage：这和 max-age 长得比较像，但是区别在于 s-maxage 是针对代理服务器的缓存时间

### ETag

1. 一些文件也许会周期性的更改，但内容并不改变(仅仅改变的修改时间)，这个时候我们并不希望客户端认为这个文件被修改了，而重新 GET
2. 某些文件修改非常频繁，比如在秒以下的时间内进行修改，(比方说 1s 内修改了 N 次)，If-Modified-Since 能检查到的粒度是 s 级的，这种修改无法判断(或者说 UNIX 记录 MTIME 只能精确到秒)；
3. 某些服务器不能精确的得到文件的最后修改时间
4. 在性能上，Last-Modified 优于 ETag，Last-Modified 仅仅只是记录一个时间点，而 Etag 需要根据文件的具体内容生成哈希值

## **跨域**

跨域的访问会带来许多安全性的问题，比如，cookie 一般用于状态控制，常用于存储登录的信息，如果允许跨域访问，那么别的网站只需要一段脚本就可以获取你的 cookie，从而冒充你的身份去登录网站，造成非常大的安全问题，因此，现代浏览器均推行同源策略。

### 同源策略限制范围

- Cookie、LocalStorage 和 IndexDB 无法读取
- DOM 无法获得
- AJAX 请求不能发送

[再也不学 AJAX 了！（三）跨域获取资源 ② - JSONP & CORS](https://juejin.im/post/6844903519380570120)
[再也不学 AJAX 了！（三）跨域获取资源 ③ - WebSocket & postMessage](https://juejin.im/post/6844903520647266318)

### JSONP

[JSONP 解决 JS 跨域问题](https://juejin.im/post/6844904167262126087)

[40 行封装一个 jsonp 包](https://juejin.im/post/6844903790760427528#comment)

1. 客户端需要在自己这边有一个定义好的接收服务端数据的函数

2. 使用 script 标签发起一个服务端地址的请求

3. 服务端响应，对应的函数执行，传参完成

### CORS

[HTTP 访问控制（CORS）|MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)

[跨域资源共享 CORS 详解](http://www.ruanyifeng.com/blog/2016/04/cors.html)

需要浏览器和服务器同时支持,基本思想为使用自定义的 HTTP 头部让浏览器和服务器通信

只需要后端在响应头设置 `Access-Control-Allow-Origin: *`， `*`为任意 `Origin`，也可以指定 `Origin`

使用 `CORS` 时默认不发送 `Cookie`，想要发送 `Cookie` 需要:

1. 设置 `Access-Control-Allow-Credentials: true`
2. `Access-Control-Allow-Origin` 不能设置为 `*` ，必须指定 `Origin`

浏览器把请求分为简单请求与非简单请求

简单请求必须满足以下两大条件

1. 请求方法为 HEAD / GET / POST
2. HTTP 头部不超过以下几种
   `Accept`
   `Accept-Language`
   `Content-Language`
   `Last-Event-ID`
   `Content-Type`：只限于三个值 `application/x-www-form-urlencoded`、`multipart/form-data`、`text/plain`
   不满足的就为非简单请求。

非简单请求的 CORS 请求，会在正式通信之前，增加一次 HTTP 查询请求，称为"预检"请求。

这个请求的请求方法为 OPTIONS ，预检请求的头部还会包括以下几个字段

`Origin`

`Access-Control-Request-Method` 用来表示非简单请求的请求方法

`Access-Control-Request-Headers` 用来表示非简单请求的额外头部，例如自定义头部

#### 为什么要预检

对那些可能对服务器数据产生副作用的 HTTP 请求方法（特别是 GET 以外的 HTTP 请求，或者搭配某些 MIME 类型的 POST 请求），浏览器必须首先使用 OPTIONS 方法发起一个预检请求（preflight request），从而获知服务端是否允许该跨域请求。服务器确认允许之后，才发起实际的 HTTP 请求。在预检请求的返回中，服务器端也可以通知客户端，是否需要携带身份凭证（包括 Cookies 和 HTTP 认证相关数据）。

### proxy 接口代理

### location.hash

这个方法也是主要用于父窗口和 iframe 窗口的通信。

特点：如果只是改变片段标识符(fragment/hash)，页面不会重新刷新。

实现跨域：

父窗口修改 iframe 窗口的 src

```js
// 父窗口
let src = `${originUrl}##${data}`;
document.querySelector('iframe').src = src;
```

iframe 窗口的页面不会刷新，但是能知道 hash 的变化

```js
// iframe 窗口
window.onhashchange = function() {};
```

同理，iframe 窗口也可以改变父窗口的 hash 来实现通信。

### postMessage

[window.postMessage|MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage)

```js
// 窗口A中
window.postMessage('data', 'http://A.com');
// 窗口B中
window.addEventListener('message', function(event) {
  console.log(event.origin); // http://A.com
  console.log(event.source); // A 对象window引用
  console.log(event.data); // 数据
});
```

### WebSocket 跨域通信

```js
var ws = new WebSocket('wss://echo.websoket.org'); //这个是后端端口

ws.onopen = function(evt) {
  ws.send('some message');
};

ws.onmessage = function(evt) {
  console.log(evt.data);
};

ws.onclose = function(evt) {
  console.log('连接关闭');
};
```

### document.domain

该方式只能用于二级域名相同的情况下，比如 a.test.com 和 b.test.com 适用于该方式。

只需要给页面添加 document.domain = 'test.com' 表示二级域名都相同就可以实现跨域

### window.name

这个方法主要用于父窗口和 iframe 窗口的通信。

如果父窗口和 iframe 窗口是不同源的，则通常无法进行通信。

```html
<html>
  <body>
    <!-- 我是父窗口 -->
    <iframe src="xxx.com">
      <!-- 我是子窗口 -->
    </iframe>
  </body>
</html>
```

window.name 特点：无论是否同源，只要在同一个窗口里，前一个网页设置了这个属性，后一个网页可以读取它。

例如，我们在 a.com 页面下设置

```js
window.name = '123';
location.href = 'b.com';
```

然后在 b.com 也能获取到 window.name 的值。

实现跨域：

使用时，先设置 iframe 的 src 为我们想要通信的目标页面。当目标页面的 window.name 修改时，将我们的 iframe 的 src 修改为一个和父窗口同源的页面。

本质：

iframe 内的目标页面 <=> iframe 内的一个和父窗口同源的页面 <=> 父窗口

## **SEO**

### SEO

1. 合理的 title、description、keywords：搜索对着三项的权重逐个减小，title 值强调重点即可，重要关键词出现不要超过 2 次，而且要靠前，不同页面 title 要有所不同；description 把页面内容高度概括，长度合适，不可过分堆砌关键词，不同页面 description 有所不同；keywords 列举出重要关键词即可
2. 语义化的 HTML 代码，符合 W3C 规范：语义化代码让搜索引擎容易理解网页
3. 重要内容 HTML 代码放在最前：搜索引擎抓取 HTML 顺序是从上到下，有的搜索引擎对抓取长度有限制，保证重要内容一定会被抓取重要内容不要用 js 输出：爬虫不会执行 js 获取内容
4. 少用 iframe：搜索引擎不会抓取 iframe 中的内容
5. 非装饰性图片必须加 alt
6. 提高网站速度：网站速度是搜索引擎排序的一个重要指标

## **webSocket**

### 实现浏览器内多个标签页之间的通信

1. 使用 WebSocket，通信的标签页连接同一个服务器，发送消息到服务器后，服务器推送消息给所有连接的客户端。

2. 使用 SharedWorker （只在 chrome 浏览器实现了），两个页面共享同一个线程，通过向线程发送数据和接收数据来实现标
   签页之间的双向通行。

3. 可以调用 localStorage、cookies 等本地存储方式，localStorge 另一个浏览上下文里被添加、修改或删除时，它都会触
   发一个 storage 事件，我们通过监听 storage 事件，控制它的值来进行页面信息通信；

4. 如果我们能够获得对应标签页的引用，通过 postMessage 方法也是可以实现多个标签页通信的。

## **场景**

### 页面上实现一个圆形的可点击区域

1. 纯 html 实现，使用 <area> 来给 <img> 图像标记热点区域的方式，<map> 标签用来定义一个客户端图像映射，<area>标签用来定义图像映射中的区域，area 元素永远嵌套在 map 元素内部，我们可以将 area 区域设置为圆形，从而实现可点击的圆形区域。

2. 纯 css 实现，使用 border-radius ，当 border-radius 的长度等于宽高相等的元素值的一半时，即可实现一个圆形的点击区域。

3. 纯 js 实现，判断一个点在不在圆上的简单算法，通过监听文档的点击事件，获取每次点击时鼠标的位置，判断该位置是否在我们规定的圆形区域内。

### 一个列表，假设有 100000 个数据

解决办法：

（1）将数据分页，利用分页的原理，每次服务器端只返回一定数目的数据，浏览器每次只对一部分进行加载。

（2）使用懒加载的方法，每次加载一部分数据，其余数据当需要使用时再去加载。

（3）使用数组分块技术，基本思路是为要处理的项目创建一个队列，然后设置定时器每过一段时间取出一部分数据，然后再使用定
时器取出下一个要处理的项目进行处理，接着再设置另一个定时器。

### 渲染几万条数据并不卡住界面

执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行

在不卡住页面的情况下渲染数据，也就是说不能一次性将几万条都渲染出来，而应该一次渲染部分 DOM，那么就可以通过 `requestAnimationFrame` 来每 16 ms 刷新一次。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    <ul>
      控件
    </ul>
    <script>
      setTimeout(() => {
        // 插入十万条数据
        const total = 100000;
        // 一次插入 20 条，如果觉得性能不好就减少
        const once = 20;
        // 渲染数据总共需要几次
        const loopCount = total / once;
        let countOfRender = 0;
        let ul = document.querySelector('ul');
        function add() {
          // 优化性能，插入不会造成回流
          const fragment = document.createDocumentFragment();
          for (let i = 0; i < once; i++) {
            const li = document.createElement('li');
            li.innerText = Math.floor(Math.random() * total);
            fragment.appendChild(li);
          }
          ul.appendChild(fragment);
          countOfRender += 1;
          loop();
        }
        function loop() {
          if (countOfRender < loopCount) {
            window.requestAnimationFrame(add);
          }
        }
        loop();
      }, 0);
    </script>
  </body>
</html>
```

## **WebAssembly**

WebAssembly 有一套完整的语义，实际上 wasm 是体积小且加速快的二级制格式，其目标就是充分发挥硬件能力以达到原生的执行效率

WebAssembly 是一种可以使用非 Javascript 编程语言编写代码并且能在浏览器上运行的技术方案，实际上，是一种新的字节码格式

![](/WebAssembly.png)

### WebAssembly 的优势

文件加载：WebAssembly 文件体积更小，所以下载速度更快

解析：解码 WebAssembly 比解析 Javascript 更快

编译和优化：编译优化所需的时间更小，因为再将文件推送的服务器端之前已经进行了优化，Javascript 需要为动态类型多次编译代码

重新优化：WebAssembly 代码不需要重新优化，因为编译器有足够的信息可以在第一次运行时获得正确的代码

执行：执行可以更快，WebAssembly 指令更接近机器码

垃圾回收：目前 WebAssembly 不直接支持垃圾回收，垃圾回收都是手动控制的，所以比自动垃圾回收效率更高

安全：可以放 hash 和签名等等

### WebAssembly 的应用

视频和音频的解编码器，图形和 3D，多媒体和游戏，密码计算或便携式语言实现
