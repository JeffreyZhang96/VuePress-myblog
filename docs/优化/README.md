
## **首屏优化**

1. 渲染优化

- CCSS 放在 header，js 放在 body 尾部，不阻塞渲染
- defer async 资源懒加载
- 图片懒加载，视频或音频禁止自动播放

2. 网络优化

- 减少 HTTP 请求
- 合并资源文件（CSS, JS, 雪碧图）
- webpack 打包压缩资源文件（tree shaking gzip）
- 后端开启 gzip 静态文件压缩
- 合理设置 HTTP 缓存
- dns 预解析，CDN 缓存增加并发数
- 代码分割，路由懒加载

## **网络优化**

### DNS 预解析

DNS 解析也是需要时间的，可以通过预解析的方式来预先获得域名所对应的 IP。

```html
<link rel="dns-prefetch" href="//yuchengkai.cn" />
```

## **文件加载优化**

### async defer

1. 脚本没有 defer 或 async，浏览器会立即加载并执行指定的脚本，也就是说不等待后续载入的文档元素，读到就加载并执行。

2. defer 属性表示延迟执行引入的 JavaScript，即这段 JavaScript 加载时 HTML 并未停止解析，这两个过程是并行的。当整个 HTML 解析完毕后再执行脚本文件，在 DOMContentLoaded 事件触发之前完成。多个脚本按顺序执行。

3. async 属性表示异步执行引入的 JavaScript，与 defer 的区别在于，如果已经加载好，就会开始执行，也就是说它的执行仍然会阻塞 HTML 的解析，只是它的加载过程不会阻塞。多个脚本的执行顺序无法保证。

### 懒加载

懒加载也叫延迟加载，指的是在长网页中延迟加载图片的时机，当用户需要访问时，再去加载，这样可以提高网站的首屏加载速度，
提升用户的体验，并且可以减少服务器的压力。它适用于图片很多，页面很长的电商网站的场景。

懒加载实现原理：先将 img 标签的 src 链接设为同一张图片（比如空白图片），然后给 img 标签设置自定义属性（比如 data-src）,然后将真正的图片地址存储在 data-src 中，当 JS 监听到该图片元素进入可视窗口时，将自定义属性中的地址存储到 src 属性中。达到懒加载的效果。

![](/assets/img/图片懒加载实现原理.jpg)

`offsetTop-scrollTop<clientHeight`，则图片进入了可视区内，则被请求

### 预加载 preload

预加载指的是将所需的资源提前请求加载到本地，这样后面在需要用到时就直接从缓存取资源。通过预加载能够减少用户的等待时
间，提高用户的体验。

```html
<link rel="preload" href="http://example.com" />
```

预加载可以一定程度上降低首屏的加载时间，因为可以将一些不影响首屏但重要的文件延后加载，唯一缺点就是兼容性不好。

### 预渲染 prerender

可以通过预渲染将下载的文件预先在后台渲染，可以使用以下代码开启预渲染

```html
<link rel="prerender" href="http://example.com" />
```

预渲染虽然可以提高页面的加载速度，但是要确保该页面百分百会被用户在之后打开，否则就白白浪费资源去渲染

### 图片优化

1. 用 CSS 去代替。
2. 用 CDN 加载，计算出适配屏幕的宽度，然后去请求相应裁剪好的图片。
3. 小图使用 base64 格式
4. 将多个图标文件整合到一张图片中 CSS sprites
5. 选择正确的图片格式：
   - 尽量使用 WebP 格式。因为 WebP 格式具有更好的图像数据压缩算法，能带来更小的图片体积，而且拥有肉眼识别无差异的图像质量。
   - 小图使用 PNG，其实对于大部分图标这类图片，完全可以使用 SVG 代替
   - 照片使用 JPEG

### CDN

静态资源尽量使用 CDN 加载，由于浏览器对于单个域名有并发请求上限，可以考虑使用多个 CDN 域名，实现分流。对于 CDN 加载静态资源需要注意 CDN 域名要与主站不同，否则每次请求都会带上主站的 Cookie。

CDN 是一台加速服务器，带宽很大，其次他会对文件做缓存，加速服务器都会对文件设置 `cache-control:max-age=86400`,

## **渲染过程优化**

### 重绘和回流（重排）

[从浏览器渲染原理，浅谈回流重绘与性能优化](https://www.cnblogs.com/xiahj/p/11777786.html)

- 重绘：当渲染树中的元素外观（如：颜色）发生改变，不影响布局时，产生重绘

- 回流：当渲染树中的元素的布局（如：尺寸、位置、显示隐藏）发生改变时，产生回流

- 回流必将引起重绘，而重绘不一定会引起回流

- 回流会导致渲染树需要重新计算，开销比重绘大，要尽量避免回流的产生

回流的产生：

1. 页面首次渲染
2. 浏览器窗口尺寸改变
3. 改变字体
4. 内容变化，比如用户在 input 框中输入文字
5. 激活 CSS 伪类，比如 :hover
6. JS 操作 DOM
7. 计算属性
   - `offsetTop`、`offsetLeft`、`offsetWidth`、`offsetHeight`
   - `scrollTop`、`scrollLeft`、`scrollWidth`、`scrollHeight`
   - `clientTop`、`clientLeft`、`clientWidth`、`clientHeight`
   - `width`、`height`
   - `getComputedStyle()`
   - `getBoundingClientRect()`

重绘的产生：

1. color,background-color
2. visibility
3. outline

4. CSS

   - **使用 `transform` 替代 `top`**

   - **使用 `visibility` 替换 `display: none`** ，因为前者只会引起重绘，后者会引发回流（改变了布局)

   - **避免使用`table`布局**，可能很小的一个小改动会造成整个 `table` 的重新布局。

   - **尽可能在`DOM`树的最末端改变`class`**，回流是不可避免的，但可以减少其影响。尽可能在 DOM 树的最末端改变 class，可以限制了回流的范围，使其影响尽可能少的节点。

   - **避免设置多层内联样式**，css 选择符**从右往左**匹配查找，避免节点层级过多,保证**层级扁平**。

   - **将动画效果应用到`position`属性为`absolute`或`fixed`的元素上**，避免影响其他元素的布局，这样只是一个重绘，而不是回流，同时，控制动画速度可以选择 `requestAnimationFrame`。

   - **避免使用`CSS`表达式**，可能会引发回流。

   - **CSS3 硬件加速**可以让`transform`、`opacity`、`filters`这些动画不会引起回流重绘 。但是对于动画的其它属性，比如`background-color`这些，还是会引起回流重绘的，不过它还是可以提升这些动画的性能。

5. JS

   - **避免频繁操作样式**，最好一次性重写`style`属性，或者将样式列表定义为`class`并一次性更改`class`属性。

   - **避免频繁操作`DOM`**，创建一个`documentFragment`，在它上面应用所有`DOM操作`，最后再把它添加到文档中。

   - **避免频繁读取会引发回流/重绘的属性**，如果确实需要多次使用，就用一个变量缓存起来。

   - **对具有复杂动画的元素使用绝对定位**，使它脱离文档流，否则会引起父元素及后续元素频繁回流。

### CSS 放在 header，js 放在 body 尾部

构建 Render 树需要 DOM 和 CSSOM，所以 HTML 和 CSS 都会阻塞渲染。所以需要让 CSS 尽早加载（如：放在头部），以缩短首次渲染的时间。

除此之外，由于 CSS 不会阻塞文档的解析，但是会阻塞文档渲染。把 CSS 放在头部可以先生成 CSSOM 树，后续渲染 DOM 的时候，可以一次性构建 Render 树，只需要渲染一次；如果把 CSS 放在后面，会先解析一次 DOM，加载 CSS 之后，会重新渲染之前的 DOM，需要两次渲染。

阻塞浏览器的解析，也就是说发现一个外链脚本时，需等待脚本下载完成并执行后才会继续解析 HTML。

普通的脚本会阻塞浏览器解析，加上 defer 或 async 属性，脚本就变成异步，可等到解析完毕再执行

async 异步执行，异步下载完毕后就会执行，不确保执行顺序，一定在 onload 前，但不确定在 DOMContentLoaded 事件的前后
defer 延迟执行，相当于放在 body 最后（理论上在 DOMContentLoaded 事件前）

执行 js 代码过长会卡住渲染，对于需要很多时间计算的代码可以考虑用 Web Worker,它可以让我们另开一个线程执行脚本，不影响渲染

## **防抖节流**

### 防抖是将多次执行变为最后一次执行

```js
//debounce是直接调用this指向window（不考虑严格模式）
function debounce(fn, delay) {
  let timer = null;
  //Input事件调用的函数，相当于obj调用函数，this指向Input arguments是隐式传入的
  return function() {
    if (timer) {
      clearTimeout(timer);
    }
    //此时的箭头函数的this和arguments都是从外部继承来的
    //如果用浦东函数就要用词法作用域var that = this var arg = arguments
    timer = setTimeout(() => {
      //使得传入的回调函数的this 指向Input这个元素对象 arguments是该事件的详情
      fn.apply(this, arguments);
      console.log(this);
      timer = null;
    }, delay);
  };
}
var input = document.getElementById("input");
input.addEventListener(
  "keyup",
  debounce(function() {
    //用普通函数可以用this.value，arguments可以用于获取集体按下键
    console.log(input.value);
    console.log(this);
    console.log(arguments);
  }, 1000)
);
```

应用场景：

- search 搜索联想，用户在不断输入值时，用防抖来节约请求资源
- window 触发 resize 的时候，不断的调整浏览器窗口大小会不断的触发这个事件，用防抖来让其只触发一次

### 节流是将多次执行变成每隔一段时间执行

```js
function throttle(fn, delay) {
  let timer = null;
  return function() {
    if (timer) {
      return;
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments); //this=>div arguements=>e
      timer = null;
    }, delay);
  };
}

div.addEventLisener(
  "keyup",
  throttle(function(e) {
    //e=>arguments
    console.log(e.offsetX, e.offsetY);
  })
);
```

应用场景：

1. 鼠标不断点击触发，mousedown(单位时间内只触发一次)
2. 监听滚动事件，比如是否滑到底部自动加载更多，用 throttle 来判断
