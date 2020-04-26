---
title: NodeJS
---

## **基础知识**

### NodeJS 特点

- 非阻塞式的异步 I/O
  - Node.js 中采用了非阻塞型 I/O 机制，因此在执行了访问文件的代码之后，Nodejs 不会阻塞在那里等待文件获取完成，而是把这件事交给底层操作系统，使用回调函数的方式来处理异步的 IO，立即转而执行其它的代码，
- 事件轮询
  - Nodejs 接收到的事件会放到事件队列中，而不是立即执行它，当 NodeJS 当前代码执行完后他会检查事件队列中是否有事件，如果有，他会取出来依次执行
- 单线程
  - Node.js 不为每个客户连接创建一个新的线程，而仅仅使用一个线程。当有用户连接了，就触发一个内部事件，通过非阻塞 I/O、事件驱动机制，让 Node.js 程序宏观上也是并行的
  - 优点：不会死锁、不用像多线程那样处处在意同步问题、没有线程切换带来的性能上的开销
  - 缺点：多核 CPU 需单独开子线程、错误会使得整个应用退出、大量计算会占用 CPU 从而无法调用异步 I/O
- 擅长 I/O 密集型
  - 主要体现在 Node 利用事件轮询的方式处理事件，而不是单开一个线程来为每一个请求服务
- 不擅长 CPU 密集型业务
  - 由于 Node 单线程，如果长时间运行计算将导致 CPU 不能释放，使得后续 I/O 无法发起。（解决办法是分解大型运算为多个小任务，不阻塞 I/O 发起）

#### global 对象

与在浏览器端不同，浏览器端将希望全局访问的对象挂到 window 上，而 nodejs 则将希望全局访问的对象挂到 global 对象上

- CommonJS
- Buffer、process、console
- timer 定时器相关

#### setImmediate()、setTimeout(fn, 0) 与 process.nextTick()

两个都是传入一个回调函数，当同步事件执行完之后马上执行。

执行顺序依次是：

- process.nextTick()
  - 将回调函数加入到 当前执行栈的尾部，任务队列之前
- setTimeout(fn, 0)
  - 回调函数加入到 任务队列尾部。即使是 0，也会又 4ms 的延时
- setImmediate()
  - 将回调函数插入到任务队列的最末尾，也不会造成阻塞，但不妨碍其他的异步事件

```js
setImmediate(() => {
  console.log('setImmediate');
});

setTimeout(() => {
  console.log('setImmediate');
}, 0);

process.nextTick(() => {
  console.log('next');
});
```

## **基本模块**

### global

JavaScript 有且仅有一个全局对象，在浏览器中，叫 window 对象。而在 Node.js 环境中，也有唯一的全局对象，但不叫 window，而叫 global，这个对象的属性和方法也和浏览器环境的 window 不同。进入 Node.js 交互环境，可以直接输入：

```js
> global.console
Console {
  log: [Function: bound ],
  info: [Function: bound ],
  warn: [Function: bound ],
  error: [Function: bound ],
  dir: [Function: bound ],
  time: [Function: bound ],
  timeEnd: [Function: bound ],
  trace: [Function: bound trace],
  assert: [Function: bound ],
  Console: [Function: Console] }
```

### process

process 也是 Node.js 提供的一个对象，它代表当前 Node.js 进程。通过 process 对象可以拿到许多有用信息：

```js
> process === global.process;
true
> process.version;
'v5.2.0'
> process.platform;
'darwin'
> process.arch;
'x64'
> process.cwd(); //返回当前工作目录
'/Users/michael'
> process.chdir('/private/tmp'); // 切换当前工作目录
undefined
> process.cwd();
'/private/tmp'
```

JavaScript 程序是由事件驱动执行的单线程模型，Node.js 也不例外。Node.js 不断执行响应事件的 JavaScript 函数，直到没有任何响应事件的函数可以执行时，Node.js 就退出了。

如果我们想要在下一次事件响应中执行代码，可以调用 process.nextTick()：

```js
// test.js

// process.nextTick()将在下一轮事件循环中调用:
process.nextTick(function() {
  console.log('nextTick callback!');
});
console.log('nextTick was set!');
```

用 Node 执行上面的代码 node test.js，你会看到，打印输出是：

```js
nextTick was set!
nextTick callback!
```

这说明传入 process.nextTick()的函数不是立刻执行，而是要等到下一次事件循环。

Node.js 进程本身的事件就由 process 对象来处理。如果我们响应 exit 事件，就可以在程序即将退出时执行某个回调函数：

```js
// 程序即将退出时的回调函数:
process.on('exit', function(code) {
  console.log('about to exit with code: ' + code);
});
```

判断 JavaScript 执行环境

有很多 JavaScript 代码既能在浏览器中执行，也能在 Node 环境执行，但有些时候，程序本身需要判断自己到底是在什么环境下执行的，常用的方式就是根据浏览器和 Node 环境提供的全局变量名称来判断：

```js
if (typeof window === 'undefined') {
  console.log('node.js');
} else {
  console.log('browser');
}
```

### fs

Node.js 内置的 fs 模块就是文件系统模块，负责读写文件。

和所有其它 JavaScript 模块不同的是，fs 模块同时提供了异步和同步的方法。

回顾一下什么是异步方法。因为 JavaScript 的单线程模型，执行 IO 操作时，JavaScript 代码无需等待，而是传入回调函数后，继续执行后续 JavaScript 代码。比如 jQuery 提供的 getJSON()操作：

```js
$.getJSON('http://example.com/ajax', function(data) {
  console.log('IO 结果返回后执行...');
});
console.log('不等待 IO 结果直接执行后续代码...');
```

而同步的 IO 操作则需要等待函数返回：

```js
// 根据网络耗时，函数将执行几十毫秒~几秒不等:
var data = getJSONSync('http://example.com/ajax');
```

同步操作的好处是代码简单，缺点是程序将等待 IO 操作，在等待时间内，无法响应其它任何事件。而异步读取不用等待 IO 操作，但代码较麻烦。

#### 异步读文件

按照 JavaScript 的标准，异步读取一个文本文件的代码如下：

```js
'use strict';

var fs = require('fs');

fs.readFile('sample.txt', 'utf-8', function(err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});
```

请注意，sample.txt 文件必须在当前目录下，且文件编码为 utf-8。

异步读取时，传入的回调函数接收两个参数，当正常读取时，err 参数为 null，data 参数为读取到的 String。当读取发生错误时，err 参数代表一个错误对象，data 为 undefined。这也是 Node.js 标准的回调函数：第一个参数代表错误信息，第二个参数代表结果。后面我们还会经常编写这种回调函数。

由于 err 是否为 null 就是判断是否出错的标志，所以通常的判断逻辑总是：

```js
if (err) {
  // 出错了
} else {
  // 正常
}
```

如果我们要读取的文件不是文本文件，而是二进制文件，怎么办？

下面的例子演示了如何读取一个图片文件：

```js
'use strict';

var fs = require('fs');

fs.readFile('sample.png', function(err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
    console.log(data.length + ' bytes');
  }
});
```

当读取二进制文件时，不传入文件编码时，回调函数的 data 参数将返回一个 Buffer 对象。在 Node.js 中，Buffer 对象就是一个包含零个或任意个字节的数组（注意和 Array 不同）。

Buffer 对象可以和 String 作转换，例如，把一个 Buffer 对象转换成 String：

```js
// Buffer -> String
var text = data.toString('utf-8');
console.log(text);
```

或者把一个 String 转换成 Buffer：

```js
// String -> Buffer
var buf = Buffer.from(text, 'utf-8');
console.log(buf);
```

#### 同步读文件

除了标准的异步读取模式外，fs 也提供相应的同步读取函数。同步读取的函数和异步函数相比，多了一个 Sync 后缀，并且不接收回调函数，函数直接返回结果。

用 fs 模块同步读取一个文本文件的代码如下：

```js
'use strict';

var fs = require('fs');

var data = fs.readFileSync('sample.txt', 'utf-8');
console.log(data);
```

可见，原异步调用的回调函数的 data 被函数直接返回，函数名需要改为 readFileSync，其它参数不变。

如果同步读取文件发生错误，则需要用 try...catch 捕获该错误：

```js
try {
  var data = fs.readFileSync('sample.txt', 'utf-8');
  console.log(data);
} catch (err) {
  // 出错了
}
```

#### 写文件

将数据写入文件是通过 fs.writeFile()实现的：

```js
'use strict';

var fs = require('fs');

var data = 'Hello, Node.js';
fs.writeFile('output.txt', data, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('ok.');
  }
});
```

writeFile()的参数依次为文件名、数据和回调函数。如果传入的数据是 String，默认按 UTF-8 编码写入文本文件，如果传入的参数是 Buffer，则写入的是二进制文件。回调函数由于只关心成功与否，因此只需要一个 err 参数。

和 readFile()类似，writeFile()也有一个同步方法，叫 writeFileSync()：

```js
'use strict';

var fs = require('fs');

var data = 'Hello, Node.js';
fs.writeFileSync('output.txt', data);
```

#### stat

如果我们要获取文件大小，创建时间等信息，可以使用 fs.stat()，它返回一个 Stat 对象，能告诉我们文件或目录的详细信息：

```js
'use strict';

var fs = require('fs');

fs.stat('sample.txt', function(err, stat) {
  if (err) {
    console.log(err);
  } else {
    // 是否是文件:
    console.log('isFile: ' + stat.isFile());
    // 是否是目录:
    console.log('isDirectory: ' + stat.isDirectory());
    if (stat.isFile()) {
      // 文件大小:
      console.log('size: ' + stat.size);
      // 创建时间, Date 对象:
      console.log('birth time: ' + stat.birthtime);
      // 修改时间, Date 对象:
      console.log('modified time: ' + stat.mtime);
    }
  }
});
```

运行结果如下：

```js
isFile: true
isDirectory: false
size: 181
birth time: Fri Dec 11 2015 09:43:41 GMT+0800 (CST)
modified time: Fri Dec 11 2015 12:09:00 GMT+0800 (CST)
```

stat()也有一个对应的同步函数 statSync()，请试着改写上述异步代码为同步代码。

#### 异步还是同步

在 fs 模块中，提供同步方法是为了方便使用。那我们到底是应该用异步方法还是同步方法呢？

由于 Node 环境执行的 JavaScript 代码是服务器端代码，所以，绝大部分需要在服务器运行期反复执行业务逻辑的代码，必须使用异步代码，否则，同步代码在执行时期，服务器将停止响应，因为 JavaScript 只有一个执行线程。

服务器启动时如果需要读取配置文件，或者结束时需要写入到状态文件时，可以使用同步代码，因为这些代码只在启动和结束时执行一次，不影响服务器正常运行时的异步执行。

### stream

### http

### crypto

## **Event Loop**

Node 中的 Event Loop 和浏览器中的是完全不相同的东西。Node.js 采用 V8 作为 js 的解析引擎，而 I/O 处理方面使用了自己设计的 libuv，libuv 是一个基于事件驱动的跨平台抽象层，封装了不同操作系统一些底层特性，对外提供统一的 API，事件循环机制也是它里面的实现（下文会详细介绍）。

![](https://camo.githubusercontent.com/58779606d55020cd7c815402ccdaea48dcd94aec/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031392f312f31312f313638336438313637346630373665623f773d35343326683d32323326663d706e6726733d3831373535)

- V8 引擎解析 JavaScript 脚本。
- 解析后的代码，调用 Node API。
- libuv 库负责 Node API 的执行。它将不同的任务分配给不同的线程，形成一个 Event Loop（事件循环），以异步的方式将任务的执行结果返回给 V8 引擎。
- V8 引擎再将结果返回给用户。

### 六个阶段

其中 libuv 引擎中的事件循环分为 6 个阶段，它们会按照顺序反复运行。每当进入某一个阶段的时候，都会从对应的回调队列中取出函数去执行。当队列为空或者执行的回调函数数量到达系统设定的阈值，就会进入下一阶段。

![](https://camo.githubusercontent.com/992acfd5750f98c9a56a9a96e95111bdf7cc7669/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031392f312f31322f313638343162643938363063316565393f773d33353926683d33333126663d706e6726733d3130353037)

从上图中，大致看出 node 中的事件循环的顺序：

外部输入数据

轮询阶段(poll)

检查阶段(check)

关闭事件回调阶段(close callback)

定时器检测阶段(timer)

I/O 事件回调阶段(I/O callbacks)

闲置阶段(idle, prepare)

轮询阶段（按照该顺序反复运行）

- timers 阶段：这个阶段执行 timer（setTimeout、setInterval）的回调
- I/O callbacks 阶段：处理一些上一轮循环中的少数未执行的 I/O 回调
- idle, prepare 阶段：仅 node 内部使用
- poll 阶段：获取新的 I/O 事件, 适当的条件下 node 将阻塞在这里
- check 阶段：执行 setImmediate() 的回调
- close callbacks 阶段：执行 socket 的 close 事件回调

注意：**上面六个阶段都不包括 process.nextTick()**(下文会介绍)

接下去我们详细介绍`timers`、`poll`、`check`这 3 个阶段，因为日常开发中的绝大部分异步任务都是在这 3 个阶段处理的。

##### (1) timer

timers 阶段会执行 setTimeout 和 setInterval 回调，并且是由 poll 阶段控制的。  
同样，**在 Node 中定时器指定的时间也不是准确时间，只能是尽快执行**。

##### (2) poll

poll 是一个至关重要的阶段，这一阶段中，系统会做两件事情

1.回到 timer 阶段执行回调

2.执行 I/O 回调

并且在进入该阶段时如果没有设定了 timer 的话，会发生以下两件事情

- 如果 poll 队列不为空，会遍历回调队列并同步执行，直到队列为空或者达到系统限制
- 如果 poll 队列为空时，会有两件事发生
  - 如果有 setImmediate 回调需要执行，poll 阶段会停止并且进入到 check 阶段执行回调
  - 如果没有 setImmediate 回调需要执行，会等待回调被加入到队列中并立即执行回调，这里同样会有个超时时间设置防止一直等待下去

当然设定了 timer 的话且 poll 队列为空，则会判断是否有 timer 超时，如果有的话会回到 timer 阶段执行回调。

##### (3) check 阶段

setImmediate()的回调会被加入 check 队列中，从 event loop 的阶段图可以知道，check 阶段的执行顺序在 poll 阶段之后。  
我们先来看个例子:

    console.log('start')
    setTimeout(() => {
      console.log('timer1')
      Promise.resolve().then(function() {
        console.log('promise1')
      })
    }, 0)
    setTimeout(() => {
      console.log('timer2')
      Promise.resolve().then(function() {
        console.log('promise2')
      })
    }, 0)
    Promise.resolve().then(function() {
      console.log('promise3')
    })
    console.log('end')
    //start=>end=>promise3=>timer1=>timer2=>promise1=>promise2

- 一开始执行栈的同步任务（这属于宏任务）执行完毕后（依次打印出 start end，并将 2 个 timer 依次放入 timer 队列）,会先去执行微任务（**这点跟浏览器端的一样**），所以打印出 promise3
- 然后进入 timers 阶段，执行 timer1 的回调函数，打印 timer1，并将 promise.then 回调放入 microtask 队列，同样的步骤执行 timer2，打印 timer2；这点跟浏览器端相差比较大，**timers 阶段有几个 setTimeout/setInterval 都会依次执行**，并不像浏览器端，每执行一个宏任务后就去执行一个微任务（关于 Node 与浏览器的 Event Loop 差异，下文还会详细介绍）。

#### 3.Micro-Task 与 Macro-Task

Node 端事件循环中的异步队列也是这两种：macro（宏任务）队列和 micro（微任务）队列。

- 常见的 macro-task 比如：setTimeout、setInterval、 setImmediate、script（整体代码）、 I/O 操作等。
- 常见的 micro-task 比如: process.nextTick、new Promise().then(回调)等。

#### 4.注意点

##### (1) setTimeout 和 setImmediate

二者非常相似，区别主要在于调用时机不同。

- setImmediate 设计在 poll 阶段完成时执行，即 check 阶段；
- setTimeout 设计在 poll 阶段为空闲时，且设定时间到达后执行，但它在 timer 阶段执行

  setTimeout(function timeout () {
  console.log('timeout');
  },0);
  setImmediate(function immediate () {
  console.log('immediate');
  });

* 对于以上代码来说，setTimeout 可能执行在前，也可能执行在后。
* 首先 setTimeout(fn, 0) === setTimeout(fn, 1)，这是由源码决定的  
  进入事件循环也是需要成本的，如果在准备时候花费了大于 1ms 的时间，那么在 timer 阶段就会直接执行 setTimeout 回调
* 如果准备时间花费小于 1ms，那么就是 setImmediate 回调先执行了

但当二者在异步 i/o callback 内部调用时，总是先执行 setImmediate，再执行 setTimeout

    const fs = require('fs')
    fs.readFile(__filename, () => {
        setTimeout(() => {
            console.log('timeout');
        }, 0)
        setImmediate(() => {
            console.log('immediate')
        })
    })
    // immediate
    // timeout

在上述代码中，setImmediate 永远先执行。因为两个代码写在 IO 回调中，IO 回调是在 poll 阶段执行，当回调执行完毕后队列为空，发现存在 setImmediate 回调，所以就直接跳转到 check 阶段去执行回调了。

##### (2) process.nextTick

这个函数其实是独立于 Event Loop 之外的，它有一个自己的队列，当每个阶段完成后，如果存在 nextTick 队列，就会清空队列中的所有回调函数，并且优先于其他 microtask 执行。

    setTimeout(() => {
     console.log('timer1')
     Promise.resolve().then(function() {
       console.log('promise1')
     })
    }, 0)
    process.nextTick(() => {
     console.log('nextTick')
     process.nextTick(() => {
       console.log('nextTick')
       process.nextTick(() => {
         console.log('nextTick')
         process.nextTick(() => {
           console.log('nextTick')
         })
       })
     })
    })
    // nextTick=>nextTick=>nextTick=>nextTick=>timer1=>promise1

### Node 与浏览器的 Event Loop 差异

浏览器环境下，microtask 的任务队列是每个 macrotask 执行完之后执行。而在 Node.js 中，microtask 会在事件循环的各个阶段之间执行，也就是一个阶段执行完毕，就会去执行 microtask 队列的任务

![](https://camo.githubusercontent.com/71b607cd363565c5d61299d31d9fd72b889de645/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031392f312f31322f313638343162616431636461373431663f773d3130353126683d33343426663d706e6726733d3932363835)

接下我们通过一个例子来说明两者区别：

    setTimeout(()=>{
        console.log('timer1')
        Promise.resolve().then(function() {
            console.log('promise1')
        })
    }, 0)
    setTimeout(()=>{
        console.log('timer2')
        Promise.resolve().then(function() {
            console.log('promise2')
        })
    }, 0)

浏览器端运行结果：`timer1=>promise1=>timer2=>promise2`

浏览器端的处理过程如下：

![](https://camo.githubusercontent.com/b325e476f0336804b8bdbcd7e4e3674a52dfbd80/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031392f312f31322f313638343164363339326538663533373f773d36313126683d33343126663d67696626733d373232393739)

Node 端运行结果分两种情况：

- 如果是 node11 版本一旦执行一个阶段里的一个宏任务(setTimeout,setInterval 和 setImmediate)就立刻执行微任务队列，这就跟浏览器端运行一致，最后的结果为`timer1=>promise1=>timer2=>promise2`
- 如果是 node10 及其之前版本：要看第一个定时器执行完，第二个定时器是否在完成队列中。

  - 如果是第二个定时器还未在完成队列中，最后的结果为`timer1=>promise1=>timer2=>promise2`
  - 如果是第二个定时器已经在完成队列中，则最后的结果为`timer1=>timer2=>promise1=>promise2`(下文过程解释基于这种情况下)

    1.全局脚本（main()）执行，将 2 个 timer 依次放入 timer 队列，main()执行完毕，调用栈空闲，任务队列开始执行；

    2.首先进入 timers 阶段，执行 timer1 的回调函数，打印 timer1，并将 promise1.then 回调放入 microtask 队列，同样的步骤执行 timer2，打印 timer2；

    3.至此，timer 阶段执行结束，event loop 进入下一个阶段之前，执行 microtask 队列的所有任务，依次打印 promise1、promise2

Node 端的处理过程如下：  
![](https://camo.githubusercontent.com/34b3491060826045c67bd57c6dcf97222620a722/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031392f312f31322f313638343164356638353436383034373f773d35393826683d33333326663d67696626733d343637363635)

浏览器和 Node 环境下，microtask 任务队列的执行时机不同

- Node 端，microtask 在事件循环的各个阶段之间执行
- 浏览器端，microtask 在事件循环的 macrotask 执行完之后执行
