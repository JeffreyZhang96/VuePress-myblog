---
title: CSS
---

## **基础知识**

### 默认样式

没有默认样式的：div、span

有默认样式的：

body->margin:8px

h1->margin:上下 21.440px

p->margin:上下 16px

ul、a....

#### 重置样式

```css
* {
  margin: 0;
  padding: 0;
}
```

优点：不用考虑那些标签有默认的 margin 和 padding
缺点：稍微影响性能 div、span
解决方法：

```css
body,
p,
h1,
ul {
  margin: 0;
  padding: 0;
}
```

#### CSS 样式统一问题

我们需要重置页面样式，因为在不同的手机浏览器上，默认的 css 样式不是统一的。 解决方法：使用 reset.css 重置所有元素的默认样式

### CSS sprites

将一个页面涉及到的所有图片都包含到一张大图中去，然后利用 CSS 的 background-image，background-repeat，background
-position 的组合进行背景定位。利用 CSS Sprites 能很好地减少网页的 http 请求，从而很好的提高页面的性能；CSS Sprites
能减少图片的字节。

好处：

1. 减少整体图片的质量，网页的图片加载速度快
2. 减少图片的请求次数，加快网页的打开

### DOM 层级顺序与 z-index

[DOM 层级顺序与 z-index](https://segmentfault.com/a/1190000014382426)

### src 与 href 的区别

src

下载资源并替换当前内容

src(source) 指向外部资源的位置，指向的内容将会嵌入到文档中当前标签所在位置；在请求 src 资源时会将其指向的资源下载并应用到文档内

```html
<img src="img/girl.jpg">
<iframe src="top.html">
<script src="show.js">
```

当浏览器解析到该元素时，会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕

href

用于在当前文档和指定资源间确定联系

href(Hypertext Reference)指向网络资源所在位置，建立和当前元素（锚点）或当前文档（链接）之间的链接

```html
<a href="http://www.baidu.com"></a>
<link type="text/css" rel="stylesheet" href="common.css" />
```

浏览器会识别该文档为 css 文件，就会并行下载资源并且不会停止对当前文档的处理。这也是为什么建议使用 link 方式来加载 css，而不是使用@import 方式。

### link @import

1.  从属关系区别。 @import 是 CSS 提供的语法规则，只有导入样式表的作用；link 是 HTML 提供的标签，不仅可以加
    载 CSS 文件，还可以定义 RSS、rel 连接属性、引入网站图标等。

2.  加载顺序区别。加载页面时，link 标签引入的 CSS 被同时加载；@import 引入的 CSS 将在页面加载完毕后被加载。

3.  兼容性区别。@import 是 CSS2.1 才有的语法，故只可在 IE5+ 才能识别；link 标签作为 HTML 元素，不存在兼容
    性问题。

4.  DOM 可控性区别。可以通过 JS 操作 DOM ，插入 link 标签来改变样式；由于 DOM 方法是基于文档的，无法使用 @i
    mport 的方式插入样式。

### rgba()和 opacity 的区别

1. opacity 作用于元素及元素中所有的内容（包括文字、图片） 有继承性
2. rgba()只用于元素的颜色及背景色

当 opacity 属性的值应用于某个元素上时，把这个元素和它内容当作一个整体来看待，即使这个值没有被子元素继承。因此一个元素和它包含的元素都会有与元素背景相同的透明度，哪怕父子元素由不同的 opacity 的值。

### CSS 继承属性

继承属性：

- font 系列，如 font-weight， font-style， color 等
- visibility
- line-height
  非继承属性：

- background
- opacity

[CSS 继承属性和非继承属性](https://www.cnblogs.com/wssjzw/p/9113896.html)

### 隐藏元素的方法

- visibility: hidden; 这个属性只是简单的隐藏某个元素，但是元素占用的空间任然存在
- opacity: 0; CSS3 属性，设置 0 可以使一个元素完全透明
- position: absolute; 设置一个很大的 left 负值定位，使元素定位在可见区域之外
- display: none; 元素会变得不可见，并且不会再占用文档的空间。
- transform: scale(0); 将一个元素设置为缩放无限小，元素将不可见，元素原来所在的位置将被保留
- `<div hidden="hidden">` HTML5 属性,效果和 display:none;相同，但这个属性用于记录一个元素的状态
- height: 0; 将元素高度设为 0 ，并消除边框
- [filter](https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter): blur(0); CSS3 属性，将一个元素的模糊度设置为 0

#### display: none; visibility: hidden; opacity: 0 的区别

结构：

- display:none
  - 会让元素完全从渲染树中消失，渲染的时候不占据任何空间, 不能点击，
- visibility: hidden
  - 不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，不能点击
- opacity: 0
  - 不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，可以点击

继承

- display: none 和 opacity: 0
  - 非继承属性，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示
- visibility: hidden
  - 继承属性，子孙节点消失由于继承了 hidden，通过设置 visibility: visible;可以让子孙节点可见

性能

- display:none
  - 会造成回流/重绘，性能影响大
- visibility:hidden
  - 会造成元素内部的重绘，性能影响相对小
- opacity: 0
  - 由于 opacity 属性启用了 GPU 加速，性能最好

相同点： 它们都能让元素不可见、他们都依然可以被 JS 所获取到

#### rgba() 和 opacity 的透明效果有什么不同？

- opacity 作用于元素以及元素内的所有内容（包括文字）的透明度
- rgba() 只作用于元素自身的颜色或其背景色，子元素不会继承透明效果

### CSS 硬件加速

[css:使用硬件加速以及注意项](https://blog.csdn.net/HUSHILIN001/article/details/88619609)

## **盒模型**

### marign 折叠

块级元素的上外边距（margin-top）与下外边距（margin-bottom）有时会合并为单个外边距

- 两个相邻的外边距都是正数时，折叠结果是它们两者之间较大的值
- 两个相邻的外边距都是负数时，折叠结果是两者绝对值的较大值
- 两个外边距一正一负时，折叠结果是两者的相加的和

而根据 w3c 规范，两个 margin 是邻接的必须满足以下条件：

- 必须是处于常规文档流（非 float 和绝对定位）的块级盒子，并且处于同一个 BFC 当中。
- 没有线盒，没有空隙，没有 padding 和 border 将他们分隔开
- 都属于垂直方向上相邻的外边距，可以是下面任意一种情况
- 元素的 margin-top 与其第一个常规文档流的子元素的 margin-top
- 元素的 margin-bottom 与其下一个常规文档流的兄弟元素的 margin-top
- height 为 auto 的元素的 margin-bottom 与其最后一个常规文档流的子元素的 margin-bottom
- 高度为 0 并且最小高度也为 0，不包含常规文档流的子元素，并且自身没有建立新的 BFC 的元素的 margin-top
  和 margin-bottom

1.  相邻兄弟元素 margin 合并。

    - 设置块状格式化上下文元素（BFC）

2.  父级和第一个/最后一个子元素的 margin 合并。
    对于 margin-top 合并，可以进行如下操作（满足一个条件即可）：

    - 父元素设置为块状格式化上下文元素；
    - 父元素设置 border-top 值；
    - 父元素设置 padding-top 值；
    - 父元素和第一个子元素之间添加内联元素进行分隔。

    对于 margin-bottom 合并，可以进行如下操作（满足一个条件即可）：

    - 父元素设置为块状格式化上下文元素；
    - 父元素设置 border-bottom 值；
    - 父元素设置 padding-bottom 值；
    - 父元素和最后一个子元素之间添加内联元素进行分隔；
    - 父元素设置 height、min-height 或 max-height。

3.  空块级元素的 margin 合并。

    - 设置垂直方向的 border；
    - 设置垂直方向的 padding；
    - 里面添加内联元素（直接 Space 键空格是没用的）；
    - 设置 height 或者 min-height。

## **选择器**

[CSS 选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Selectors)

### 选择器种类

1. id 选择器（ ##myid）
2. 类选择器（.myclassname）
3. 标签选择器（div, h1, p）
4. 后代选择器（h1 p）
5. 子代选择器（ul > li）
6. 兄弟选择器（li ~ a）
7. 相邻兄弟选择器（li + a）
8. 属性选择器（a[rel = "external"]）
9. 伪类选择器（a:hover, li:nth-child）
10. 伪元素选择器（::before、::after）
11. 通配符选择器（ \* ）

### a 标签上四个伪类的使用顺序

link > visited > hover > active

伪类的优先级是一样的，所以后出现的伪类会覆盖先出现的伪类（同时激活）

### 伪元素和伪类的区别

css 引入伪类和伪元素概念是为了格式化文档树以外的信息。也就是说，伪类和伪元素是用来修饰不在文档树中的部分，比如，一句
话中的第一个字母，或者是列表中的第一个元素。

伪类用于当已有的元素处于某个状态时，为其添加对应的样式，这个状态是根据用户行为而动态变化的。比如说，当用户悬停在指定的
元素时，我们可以通过 :hover 来描述这个元素的状态。

伪元素用于创建一些不在文档树中的元素，并为其添加样式。它们允许我们为元素的某些部分设置样式。比如说，我们可以通过 ::be
fore 来在一个元素前增加一些文本，并为这些文本添加样式。虽然用户可以看到这些文本，但是这些文本实际上不在文档树中。

有时你会发现伪元素使用了两个冒号 （::） 而不是一个冒号（:）。 这是 CSS3 的一部分，并尝试区分伪类和伪元素。大多数浏览
器都支持这两个值。按照规则应该使用（::）而不是（:），从而区分伪类和伪元素。但是，由于在旧版本的 W3C 规范并未对此进行
特别区分，因此目前绝大多数的浏览器都支持使用这两种方式表示伪元素。

### 选择器权重

- !important 优先级最高，但也会被权重高的 important 所覆盖（不能对继承的属性进行优先级提升）
- 行内样式总会覆盖外部样式表的任何样式(除了!important)
- 单独使用一个选择器的时候，不能跨等级使 css 规则生效
- 如果两个权重不同的选择器作用在同一元素上，权重值高的 css 规则生效
- 如果两个相同权重的选择器作用在同一元素上：以后面出现的选择器为最后规则
- 权重相同时，与元素距离近的选择器生

一句话总结：
!important > 行内样式 > ID 选择器 > (类选择器 | 属性选择器 | 伪类选择器 ) > (元素选择器|伪元素选择器) > `*`> 继承

## **position**

1. static：默认值。没有定位，元素出现在正常的流中（忽略 top, bottom, left, right 或者 z-index 声明）。

2. relative ：生成相对定位的元素，相对于其正常位置进行定位。

- 如果没有定位偏移量，对元素本身没有影响
- 不使元素脱离文档流
- 不影响其他元素的布局
- left、top、right、bottom 是相对于当前元素自身进行偏移的
- 其层叠通过 z-index 属性定义

一般给父层级添加 relative 属性值

元素设置：margin:0 auto 时：

（1）box 为相对定位时（相对自身），居中

（2）box 为绝对定位时（相对于根元素 HTML），向左

3. absolute：生成绝对定位的元素，相对于 static 定位以外的第一个父元素进行定位。

- 使元素完全脱离文档流
- 使内联元素支持宽高（让内联具备块特性）
- 使块元素默认宽根据内容决定（让块具备内联特性）
- 如果有 position 定位祖先元素则相对于定位祖先元素进行偏移，没有定位祖先元素相对于整个文档发生偏移（绝对、相对、固定）
- 绝对定位元素的宽高百分比是相对于临近的 position 不为 static 的祖先元素的 padding box 来计算的。非绝对定位元素的宽高百分比则是相对于父元素的 content box 来计算的。

4. fixed：固定定位,相对于浏览器窗口进行定位。

- 使元素完全脱离文档流
- 使内联元素支持宽高（让内联具备块特性）
- 使块元素默认宽根据内容决定（让块具备内联特性）
- 相对于整个浏览器窗口进行偏移，不受浏览器滚动条的影响

5. sticky：粘性定位

[**CSS 定位详解|阮一峰**](http://www.ruanyifeng.com/blog/2019/11/css-position.html)

## **display**

## **float**

### 解释下浮动和它的工作原理

float 特性:加浮动的元素，会脱离文档流，会延迟父容器靠左或靠右排列，如果之前已经有浮动的元素，会挨着浮动的元素进行排列。

嵌套浮动元素的父级要有高度，不然会高度塌陷，解决办法，添加 overflow:hidden;（注意不能与定位一起使用）设置元素浮动后，该

元素的 display 值自动变成 block

> 注意点

1. 只会影响后面的元素。
2. 内容默认提升半层。textnode
3. 默认宽根据内容决定,不跟据父元素了
4. 换行排列
5. 主要给块元素添加，但也可以给内联元素添加

### 清除浮动的方法

1. 上下排列：clear 属性，表示清楚浮动的，left、right、both

2. 嵌套排列：

- 固定宽高：不推荐，不能把高度固定死，不适合做自适应效果。
- 父元素浮动：不推荐，因为父容器浮动会影响后面的元素。
- overflow:hidden(BFC 规范)，如果有子元素想溢出，那么会受到影响。
- display:inline-block(BFC 规范)，不推荐，父容器会影响后面的元素。
- 设置空标签：不推荐，会多添加一个标签。
- ::after 伪元素 ：推荐，是空标签的加强版。(clear 属性只会操作块标签，对内联标签不起作用)
- before after 双伪元素 display:table

### 'display'、'position' 和 'float' 的相互关系

[《position 跟 display、margin collapse、overflow、float 这些特性相互叠加后会怎么样？》](https://www.cnblogs.com/jackyWHJ/p/3756087.html)

    （1）首先我们判断 display 属性是否为 none，如果为 none ，则 position 和 float 属性的值不影响元素最后的表现。

    （2）然后判断 position 的值是否为 absolute 或者 fixed ，如果是，则 float 属性失效，并且 display的值应该被
        设置为 table 或者 block，具体转换需要看初始转换值。

    （3）如果 position 的值不为 absolute 或者 fixed，则判断 float 属性的值是否为 none ，如果不是，则 display
        的值则按上面的规则转换。注意，如果 position 的值为 relative 并且 float 属性的值存在，则 relative 相对
        于浮动后的最终位置定位。

    （4）如果 float 的值为 none ，则判断元素是否为根元素，如果是根元素则 display 属性按照上面的规则转换，如果不是，
        则保持指定的 display 属性值不变。

    总的来说，可以把它看作是一个类似优先级的机制， "position:absolute" 和 "position:fixed" 优先级最高，有它存在
    的时候，浮动不起作用，'display' 的值也需要调整；其次，元素的 'float' 特性的值不是 "none" 的时候或者它是根元素
    的时候，调整 'display' 的值； 最后，非根元素，并且非浮动元素，并且非绝对定位的元素，'display' 特性值同设置值。

## **BFC**

[什么是 BFC](https://www.cnblogs.com/libin-1/p/7098468.html)

BFC 块级格式化上下文，它是一个独立的盒子，并且这个独立的盒子内部布局不受外界影响。

BFC 布局规则：

1. 内部的 Box 会在垂直方向，一个接一个地放置。
2. 属于同一个 BFC 的两个相邻的 Box 的 margin 会发生重叠
3. BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此, 文字环绕效果，设置 float
4. BFC 的区域不会与 float box 重叠。
5. 计算 BFC 的高度，浮动元素也参与计算

### 触发 BFC 的方式

1. html 根元素
2. float 属性不为 none
3. position 为 absolute 或 fixed。
4. display 为 inline-block, table-cell, table-caption, flex, inline-flex
5. overflow 不为 visible

### BFC 作用

1. 清除内部浮动
   原理: 触发父 div 的 BFC 属性，使下面的子 div 都处在父 div 的同一个 BFC 区域之内
2. 分属于不同的 BFC 时，可以阻止 margin 重叠
3. 阻止元素被浮动元素覆盖，可用来实现两列布局

## **居中**

[CSS 水平居中+垂直居中+水平/垂直居中的方法总结](https://blog.csdn.net/weixin_37580235/article/details/82317240)

### 水平居中  

#### 行内元素

1. 首先看它的父元素是不是块级元素，如果是，则直接给父元素设置 text-align: center;

2. 如果不是，则先将其父元素设置为块级元素，再给父元素设置 text-align: center;

#### 块级元素

1. 分宽度定不定两种情况

   - 定宽度：width:xxx; margin: 0 auto;

   - 不定宽度：父元素 text-align: center; 子元素 display: inline-block;

2. 使用定位

   首先设置父元素为相对定位，再设置子元素为绝对定位，设置子元素的 left:50%，即让子元素的左上角水平居中；

   - 定宽度：设置绝对子元素的 margin-left: -元素宽度的一半 px;

   - 不定宽度：利用 css3 新增属性 transform: translateX(-50%);

3. 使用 flexbox 布局实现（宽度定不定都可以）

   使用 flexbox 布局，只需要给待处理的块状元素的父元素添加属性 display: flex; justify-content: center;

### 垂直居中

#### 行内元素

    line-height:父元素height

#### 块级元素

1. 使用定位

   首先设置父元素为相对定位，再设置子元素为绝对定位，设置子元素的 top: 50%，即让子元素的左上角垂直居中；

   - 定高度：设置绝对子元素的 margin-top: -元素高度的一半 px; 或者设置 transform: translateY(-50%);

   - 不定高度：利用 css3 新增属性 transform: translateY(-50%);

2. 使用 flexbox 布局实现（宽度定不定都可以）

   - 父元素 display: flex; align-items: center;
   - 父元素 display:flex;子元素 margin:auto 0;

[探秘 flex 上下文中神奇的自动 margin](https://www.cnblogs.com/coco1s/p/10910588.html)

3. 使用给父元素设置 display:table-cell;vertical-align: middle;

### 水平垂直居中

#### 已知高度和宽度的元素

1. 设置父元素为相对定位，给子元素设置绝对定位，top: 0; right: 0; bottom: 0; left: 0; margin: auto;

2. 设置父元素为相对定位，给子元素设置绝对定位，left: 50%; top: 50%; margin-left: -元素宽度的一半 px; margin-top: -元素高度的一半 px;

3. 父元素设置 display:table-cell vertical-align:middle 子元素设置 margin:0 auto

#### 未知高度和宽度的元素

```css
.outer {
  position: relative;
}
.inner {
  position: absolute;
  width: 200px;
  height: 200px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

```css
.outer {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

```css
.outer {
  display: flex;
}
.inner {
  width: 200px;
  height: 200px;
  margin: auto;
}
```

## **单位**

### px

绝对单位。传统上一个像素对应于计算机屏幕上的一个点，而对于高清屏则对应更多。

### %

[各种百分比的指向|CSDN](https://blog.csdn.net/qq_33576343/article/details/81806035)

### em

相对单位。 不同的属性有不同的参照值。

1.  对于字体大小属性（font-size）来说，em 的计算方式是相对于父元素的字体大小
2.  border, width, height, padding, margin, line-height）在这些属性中，使用 em 单位的计算方式是参照该元素的 font-size，1em 等于该元素设置的字体大小。同理如果该元素没有设置，则一直向父级元素查找，直到找到，如果都没有设置大小，则使用浏览器默认的字体大小。

### rem

是相对于根元素 html 的 font-size 来计算的，所以其参照物是固定的。

1.  好处：rem 只需要修改 html 的 font-size 值即可达到全部的修改。

### vw, vh, vmin, vmax

相对单位，是基于视窗大小（浏览器用来显示内容的区域大小）来计算的。

1.  vw：基于视窗的宽度计算，1vw 等于视窗宽度的百分之一
2.  vh：基于视窗的高度计算，1vh 等于视窗高度的百分之一
3.  vmin：基于 vw 和 vh 中的最小值来计算，1vmin 等于最小值的百分之一
4.  vmax：基于 vw 和 vh 中的最大值来计算，1vmax 等于最大值的百分之一

## **CSS3**

### CSS3 新特性

- 新增选择器 p:nth-child(n)
- 弹性盒模型 display: flex;
- 多列布局 column-count: 5;
- 媒体查询 @media (max-width: 480px) {.box: {column-count: 1;}}
- 个性化字体 @font-face{font-family: BorderWeb; src:url(BORDERW0.eot);}
- 颜色透明度 rgba;
- 圆角 border-radius: 5px;
- 渐变 background:linear-gradient(red, green, blue);
- 阴影 box-shadow:3px 3px 3px rgba(0, 64, 128, 0.3);
- 倒影 box-reflect: below 2px;
- 文字装饰 text-stroke-color: red;
- 文字溢出 text-overflow:ellipsis;
- 背景效果 background-size: 100px 100px;
- 边框效果 border-image:url(bt_blue.png) 0 10;
- 平滑过渡 transition: all .3s ease-in .1s;
- 动画 @keyframes anim-1 {50% {border-radius: 50%;}} animation: anim-1 1s;
- 变形 transform
- 旋转 transform: rotate(20deg);
- 倾斜 transform: skew(150deg, -10deg);
- 位移 transform: translate(20px, 20px);
- 缩放 transform: scale(.5);
- 基点的位置 transform:origin();

## **动画**

### 前端动画

- animation 关键帧动画
- transition 过渡动画
- JS 原生控制 DOM 位置
- canvas 绘制动画

### transition 过渡动画

```css
.app {
  /* 规定设置过渡效果的 CSS 属性的名称 */
  transition-property: width;
  /* 规定完成过渡效果需要多少秒或毫秒 */
  transition-duration: 3s;
  /* 规定速度效果的速度曲线 */
  transition-timing-function: ease-in;
  /* 定义过渡效果何时开始 */
  transition-delay: 1s;
}
```

### animation 关键帧动画

相当于多个补间动画组合到一起

与 transition 不同的是，他可以让元素自己动，而不要求某值的改变来触发动画

`animation: name duration timing-function delay iteration-count direction;`

- animation-name
  - 规定需要绑定到选择器的 keyframe 名称。
- animation-duration
  - 规定完成动画所花费的时间，以秒或毫秒计
- animation-timing-function
  - 动画的速度曲线
- animation-delay
  - 动画开始之前的延迟
- animation-iteration-count
  - n | infinit
  - 动画应该播放的次数
- animation-direction
  - normal | alternate
  - 是否应该轮流反向播放动画
- animation-play-state
  - 可用于暂停动画
- animation-fill-mode
  - forwards 动画停了就保持最后的那个状态
  - backwards 动画停了还得反着做一遍回去
  - 在动画执行之前和之后如何给动画的目标应用样式。

```css
##one {
  width: 50px;
  height: 50px;
  background-color: orange;
  animation: run;
  animation-delay: 0.5s;
  animation-duration: 2s;
  animation-fill-mode: forwards;
}
@keyframes run {
  0% {
    width: 100px;
  }
  50% {
    width: 400px;
    background-color: blue;
  }
  100% {
    width: 800px;
  }
}
```

### transition(animation)-timing-function

| linear                | 动画从头到尾的速度是相同的。                                 |
| --------------------- | ------------------------------------------------------------ |
| ease                  | 默认 动画以低速开始，然后加快，在结束前变慢。                |
| ease-in               | 动画以低速开始。                                             |
| ease-out              | 动画以低速结束。                                             |
| ease-in-out           | 动画以低速开始和结束。                                       |
| cubic-bezier(n,n,n,n) | 在 cubic-bezier 函数中自己的值。可能的值是从 0 到 1 的数值。 |

[bezier 曲线在线效果网址](http://cubic-bezier.com)

### 逐帧动画

关键帧之间是有补间的，会选一个效果过渡过去，而逐帧动画则是每个 keyframe 之间没有过渡，直接切换过去
参考[猎豹奔跑](./animal.html)
关键是使用下面这行 CSS
`animation-timing-function: steps(1);`
这个 step 是指定关键帧之间需要有几个画面

### transition 和 animation 动画的区别

- transition 需要有状态变化,需要触发一个事件才能改变属性
- animation 不需要状态变化,不需要触发任何事件随时间改变属性
  -transition 为 2 帧，从 from……to ，animation 可以一帧一帧的

### CSS3 动画的实现种类

CSS3 属性中有关于制作动画的三个属性：

Transition（过渡）,Transform（转换）,Animataion（动画）

### animation 和 transition 的区别

**相同点：**都是随着时间改变元素的属性值。

**不同点：**transition 需要触发一个事件(hover 事件 target 事件或 click 事件等)才会随时间改变其 css 属性； 而 animation 在不需要触发任何事件的情况下也可以显式的随着时间变化来改变元素 css 的属性值，从而达到一种动画的效果，css3 的 animation 就需要明确的动画属性值。

transition 触发后只能运动一次，animation 可以设定运动的循环次数。

Animation-->在这个动画之前，先看 Keyframes 关键帧，支持 animation 动画的只有 webkit 内核的浏览器

(float 制作页面小结构上)[https://www.bilibili.com/video/av52670599?p=82]

(float 制作页面小结构下)[https://www.bilibili.com/video/av52670599?p=83]

### CSS 动画性能优化

1.尽量使用 transform 当成动画熟悉，避免使用 height,width,margin,padding 等；

2.要求较高时，可以开启浏览器开启 GPU 硬件加速。transform、opacity、filter

## **自适应与响应式**

[自适应设计与响应式网页设计](http://www.alloyteam.com/2015/04/zi-shi-ying-she-ji-yu-xiang-ying-shi-wang-ye-she-ji-qian-tan/)

### 响应式布局

响应式布局就是实现不同屏幕分辨率的终端上浏览网页的不同展示方式。通过响应式设计能使网站在手机和平板电脑上有更好的浏览阅读体验。换句话说就是一个网站能够兼容多个终端，而不是为了每一个终端做一个特定的版本。

自适应式布局：

自适应布局就是指能忘了使网页自适应的显示在不同大小终端设备上的新网页设计方式及技术，它需要开发多套界面来适应不同的终端。

[自适应网页设计](http://www.360doc.com/content/12/0814/19/21412_230183494.shtml)

## **CSS 预处理器**

### SCSS

1. 嵌套
2. 变量\$
3. mixin 混合宏

```scss
@mixin bgImg($w: 0, $h: 0, $img: '', $size: contain) {
  display: inline-block;
  width: $w;
  height: $h;
  background: url($img) no-repeat center;
  background-size: $size;
}

@include bgImg(55px, 55px, '/imgs/mi-logo.png', 55px);
```

## **布局**

### 两栏布局

左列定宽，右边自适应

float+margin-left 或者 float+overflow

```css
.aside {
  width: 30vw;
  height: 100vh;
  float: left;
  background: blue;
}

.main {
  margin-left: 30vw;
  // 或者换成 overflow: auto，使其成为BFC
}
```

flex ,三个 div,父元素 display flex; 右边 flex:1

```css
    body {
        display: flex;
    }
    .aside {
        flex: 0 0 25vw;
        <!-- or width: 25vw; -->
    }
    .main {
        flex: 1; // 等于flex-grow: 1;
    }
```

绝对定位。两个 div。左边 absolute 或者 fixed 右边 margin-left=width

table 布局。三个 div，父元素 display：table，width:100%,table-layout:fixed 子元素 display:table-cell

### 三栏布局

页面中一共有三栏，左右两栏宽度固定，中间自适应的布局。设左边宽度 100px，右边宽度 200px

#### 浮动

利用浮动的方式，左右两栏设置固定大小，并设置对应方向的浮动。中间一栏设置左右两个方向的 margin 值，注意这种方式，中间一栏必须放到最后

```html
<style>
  .left {
    float: left;
    width: 100px;
    height: 500px;
    background: red;
  }
  .right {
    float: right;
    width: 200px;
    height: 500px;
    background: green;
  }
  .center {
    height: 500px;
    margin-left: 100px;
    margin-right: 200px;
    background: blue;
  }
</style>
<div class="left">left</div>
<div class="right">right</div>
<div class="center">center</div>
```

#### 绝对定位

利用绝对定位的方式，左右两栏设置绝对定位，中间设置对应方向大小的 margin 值

```html
<style>
  .outer {
    position: relative;
  }
  .left {
    position: absolute;
    width: 100px;
    height: 500px;
    background: red;
  }
  .right {
    position: absolute;
    top: 0;
    right: 0;
    width: 200px;
    height: 500px;
    background: green;
  }
  .center {
    margin-left: 100px;
    margin-right: 200px;
    height: 500px;
    background: blue;
  }
</style>
<div class="outer">
  <div class="left">left</div>
  <div class="center">center</div>
  <div class="right">right</div>
</div>
```

#### flex 布局

```html
<style>
  .outer {
    display: flex;
    height: 500px;
  }
  .left {
    width: 100px;
    background-color: red;
  }
  .center {
    flex: 1;
    background-color: green;
  }
  .right {
    width: 200px;
    background-color: blue;
  }
  /* .outer {
    display: flex;
    height: 500px;
  }
  .left {
    flex: 0 0 100px;
    background: red;
  }
  .right {
    flex: 0 0 200px;
    background: green;
  }
  .center {
    flex: auto;
    background: blue;
  } */
</style>
<div class="outer">
  <div class="left">left</div>
  <div class="center">center</div>
  <div class="right">right</div>
</div>
```

#### 圣杯布局

利用浮动和负边距来实现。父级元素设置左右的 pedding，三列均设置向左浮动，中间一列放在最前面，宽度设置为父级元素的宽度，因此后面两列都被挤到了下一行，通过设置 margin 负值将其移动到上一行，再利用相对定位，定位到两边

优点：不需要添加 dom 节点

缺点：如果将浏览器无限放大时，「圣杯」将会「破碎」掉。当 main 部分的宽小于 left 部分时就会发生布局混乱。（main < left 即会变形）

```html
<style>
  .outer {
    height: 500px;
    padding-left: 100px;
    padding-right: 200px;
  }
  .left {
    position: relative;
    left: -100px;
    float: left;
    margin-left: -100%;
    width: 100px;
    height: 500px;
    background: red;
  }
  .right {
    position: relative;
    left: 200px;
    float: left;
    margin-left: -200px;
    width: 200px;
    height: 500px;
    background: green;
  }
  .center {
    float: left;
    width: 100%;
    height: 500px;
    background: blue;
  }
</style>
<div class="outer">
  <div class="center">center</div>
  <div class="left">left</div>
  <div class="right">right</div>
</div>
```

#### 双飞翼布局

双飞翼布局相对于圣杯布局来说，左右位置的保留是通过中间列的 margin 值来实现的，而不是通过父元
素的 pedding 来实现的。本质上来说，也是通过浮动和外边距负值来实现的

优点：不会像圣杯布局那样变形

缺点：多加了一层 dom 节点

```html
<style>
  .left {
    float: left;
    margin-left: -100%;
    width: 100px;
    height: 500px;
    background: red;
  }
  .right {
    float: left;
    margin-left: -200px;
    width: 200px;
    height: 500px;
    background: green;
  }
  .center {
    float: left;
    width: 100%;
    height: 500px;
    background: blue;
  }
  .inner {
    margin-left: 100px;
    margin-right: 200px;
  }
</style>
<div class="center"><div class="inner">center</div></div>
<div class="left">left</div>
<div class="right">right</div>
```

### 等高布局

[常用的多列等高布局收藏](https://juejin.im/post/5b0fb34151882515662238fd)

1. 利用 padding-bottom|margin-bottom 正负值相抵，不会影响页面布局的特点。设置父容器设置超出隐藏（overflow:
   hidden），这样父容器的高度就还是它里面的列没有设定 padding-bottom 时的高度，当它里面的任一列高度增加了，则
   父容器的高度被撑到里面最高那列的高度，其他比这列矮的列会用它们的 padding-bottom 补偿这部分高度差。

```css
##parent {
  overflow: hidden;
}
##left,
##right {
  width: 300px;
  float: left;
  padding-bottom: 9999px;
  margin-bottom: -9999px;
}
##left {
  background-color: ##c9394a;
}
##right {
  background-color: ##cccccc;
}
```

2. 利用 table-cell 所有单元格高度都相等的特性，来实现多列等高。

```css
##parent {
  display: table;
}
##left,
##right {
  width: 300px;
  /* 表格的单元格默认是等高的 */
  display: table-cell;
}
##left {
  background-color: ##c9394a;
}
##right {
  background-color: ##cccccc;
}
```

3. 利用 flex 布局中项目 align-items 属性默认为 stretch，如果项目未设置高度或设为 auto，将占满整个容器的高度的特性，来实现多列等高。

### Flex 弹性盒布局

设为 Flex 布局以后，子元素的 float、clear 和 vertical-align 属性将失效。

容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis），项目默认沿主轴排列。

#### 容器属性

flex-direction 主轴的方向，默认 row，从左到右

flex-wrap 是否换行，默认 nowrap，不换行

flex-flow 属性是 flex-direction 属性和 flex-wrap 属性的简写形式，默认值为 row nowrap。

justify-content 主轴的布局，默认为 flex-start

align-items 交叉轴的布局，默认为 flex-start

align-content 定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

#### 项目属性

order 项目的排列顺序。数值越小，排列越靠前，默认 0

flex-grow 项目的放大比例，默认 0，不占剩余空间

flex-shrink 项目的缩小比例，默认 1，如空间不足，该项目将缩小。

flex-basis 主轴上的宽度，默认 auto，即项目的本来大小。

flex 属性是 flex-grow， flex-shrink 和 flex-basis 的简写，默认值为 0 1 auto。

align-self 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖 align-items 属性。默认值为 auto ，表示继承父
元素的 align-items 属性，如果没有父元素，则等同于 stretch。

[《Flex 布局教程：语法篇》](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
[《Flex 布局教程：实例篇》](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)

### Grid 网格布局

[grid 网格布局](https://www.imooc.com/article/28513)
