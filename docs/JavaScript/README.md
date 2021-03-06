---
title: JavaScript
---

## **基础知识**

### js 浮点类型的精确计算

[为什么 0.1+0.2 不等于 0.3](https://segmentfault.com/a/1190000012175422)

0.1 和 0.2 在转换成二进制后会无限循环，由于标准位数的限制后面多余的位数会被截掉，此时就已经出现了精度的损失，相加后因浮点数小数位的限制而截断的二进制数字在转换为十进制就会变成 0.30000000000000004

### js 中整数的安全范围

安全整数指的是，在这个范围内的整数转化为二进制存储的时候不会出现精度丢失，能够被“安全”呈现的最大整数是 2^53 - 1，
即 9007199254740991，在 ES6 中被定义为 Number.MAX_SAFE_INTEGER。最小整数是-9007199254740991，在 ES6 中
被定义为 Number.MIN_SAFE_INTEGER。

如果某次计算的结果得到了一个超过 JavaScript 数值范围的值，那么这个值会被自动转换为特殊的 Infinity 值。如果某次
计算返回了正或负的 Infinity 值，那么该值将无法参与下一次的计算。判断一个数是不是有穷的，可以使用 isFinite 函数
来判断。

### 严格模式

目的：

1. 消除 js 语法中不合理，不严谨的地方
2. 保证安全性
3. 为未来的 js 版本做铺垫

[严格模式的限制](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode/Transitioning_to_strict_mode)

- 全局变量显式声明

在正常模式中，如果一个变量没有声明就赋值，默认是全局变量。严格模式禁止这种用法，全局变量必须显式声明。

- 禁止 this 关键字指向全局对象：

```js
var foo = function() {
  console.log(this);
};

foo();
```

上方代码中，普通模式打印的是 window。严格模式下打印的是 undefined。

- 构造函数必须通过 new 实例化对象

构造函数必须通过 new 实例化对象，否则报错。因为 this 为 undefined，此时无法设置属性。

```js
var Cat = function(name) {
  this.name = name;
};

Cat('haha');
```

上方代码中，如果在严格模式下，则会报错。

- 属性相关

普通模式下，如果对象有多个重名属性，最后赋值的那个属性会覆盖前面的值。严格模式下，这属于语法错误。

普通模式下，如果函数有多个重名的参数，可以用 arguments[i]读取。严格模式下，多个重名的参数属于语法错误。

比如下面这样的代码：

```js
    var obj = {
    	username: 'smyh';
    	username: 'vae'
    }
```

上面的代码，在严格模式下属于语法错误，因为有重名的属性。

- 函数必须声明在顶层

将来 Javascript 的新版本会引入"块级作用域"。为了与新版本接轨，严格模式只允许在全局作用域或函数作用域的顶层声明函数。也就是说，不允许在非函数的代码块内声明函数。

- 新增关键字

为了向将来 Javascript 的新版本过渡，严格模式新增了一些保留字：implements, interface, let, package, private, protected, public, static, yield。

## **数据类型**

JS 中有 7 种原始值，分别是：

1. `boolean`
2. `number`
3. `string`
4. `undefined`
5. `symbol`[理解和使用 ES6 中的 Symbol](https://www.jianshu.com/p/f40a77bbd74e)
6. `null` 主要用于赋值给一些可能会返回对象的变量，作为初始化
7. `bigInt`

引用类型：

1. 对象 `Object`
2. 数组 `Array`
3. 函数 `Function`

原始数据类型直接存储在栈（stack）中的简单数据段，占据空间小、大小固定，属于被频繁使用数据，所以放入栈中存储。

引用数据类型存储在堆（heap）中的对象，占据空间大、大小不固定。如果存储在栈中，将会影响程序运行的性能；引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体。

虽然 typeof null 会输出 object，但是这只是 JS 存在的一个悠久 Bug。在 JS 的最初版本中使用的是 32 位系统，为了性能考虑使用低位存储变量的类型信息，000 开头代表是对象然而 null 表示为全零，所以将它错误的判断为 object

#### 值传递 引用传递

值传递：(形式参数类型是基本数据类型)：方法调用时，实际参数把它的值传递给对应的形式参数，形式参数只是用实际参数的值初始化自己的存储单元内容，是两个不同的存储单元，所以方法执行中形式参数值的改变不影响实际参数的值。

引用传递：(形式参数类型是引用数据类型参数)：也称为传地址。方法调用时，实际参数是对象(或数组)，这时实际参数与形式参数指向同一个地址，在方法执行中，对形式参数的操作实际上就是对实际参数的操作，这个结果在方法结束后被保留了下来，所以方法执行中形式参数的改变将会影响实际参数

ECMAScript 中所有函数的参数都是按值传递的

```js
function changeAgeAndReference(person) {
  person.age = 25;
  person = {
    name: 'John',
    age: 50,
  };

  return person;
}
var personObj1 = {
  name: 'Alex',
  age: 30,
};
var personObj2 = changeAgeAndReference(personObj1);
console.log(personObj1); // -> ?
console.log(personObj2); // -> ?
```

#### 基本包装类型

```js
'1'.toString();

var s = new Object('1');
s.toString();
s = null;
```

第一步: 创建 Object 类实例。注意不是 String。由于 Symbol 和 BigInt 的出现，对它们调用 new 都会报错，目前 ES6 规范也不建议用 new 来创建基本类型的包装类
第二步: 调用实例方法
第三步: 执行完方法立即销毁这个实例

整个过程体现了基本包装类型的性质，而基本包装类型恰恰属于基本数据类型，包括 Boolean, Number 和 String。

#### BigInt

BigInt 是一种新的数据类型，用于当整数值大于 Number 数据类型支持的范围时。这种数据类型允许我们安全地对大整数执行算术操作，表示高分辨率的时间戳，使用大整数 id，等等，而不需要使用库。

在 JS 中，所有的数字都以双精度 64 位浮点格式表示,这导致 JS 中的 Number 无法精确表示非常大的整数，它会将非常大的整数四舍五入，确切地说，JS 中的 Number 类型只能安全地表示-9007199254740991(-(2^53-1))和 9007199254740991（(2^53-1)），任何超出此范围的整数值都可能失去精度。

```js
console.log(999999999999999); //=>10000000000000000
```

复制代码同时也会有一定的安全性问题:

```js
9007199254740992 === 9007199254740993; // → true
```

创建 BigInt

```js
console.log(9007199254740995n); // → 9007199254740995n
console.log(9007199254740995); // → 9007199254740996
BigInt('9007199254740995'); // → 9007199254740995n
```

简单使用

```js
10n + 20n; // → 30n
10n - 20n; // → -10n
+10n; // → TypeError: Cannot convert a BigInt value to a number
-10n; // → -10n
10n \* 20n; // → 200n
20n / 10n; // → 2n
23n % 10n; // → 3n
10n \*\* 3n; // → 1000n

const x = 10n;
++x; // → 11n
--x; // → 9n
console.log(typeof x); //"bigint"
```

复制代码值得警惕的点

BigInt 不支持一元加号运算符, 这可能是某些程序可能依赖于 + 始终生成 Number 的不变量，或者抛出异常。另外，更改 + 的行为也会破坏 asm.js 代码。

因为隐式类型转换可能丢失信息，所以不允许在 bigint 和 Number 之间进行混合操作。当混合使用大整数和浮点数时，结果值可能无法由 BigInt 或 Number 精确表示。

```js
10 + 10n; // → TypeError
```

复制代码
不能将 BigInt 传递给 Web api 和内置的 JS 函数，这些函数需要一个 Number 类型的数字。尝试这样做会报 TypeError 错误。

```js
Math.max(2n, 4n, 6n); // → TypeError
```

当 Boolean 类型与 BigInt 类型相遇时，BigInt 的处理方式与 Number 类似，换句话说，只要不是 0n，BigInt 就被视为 truthy 的值。

```js
if (0n) {
  //条件判断为 false
}
if (3n) {
  //条件为 true
}
```

元素都为 BigInt 的数组可以进行 sort

BigInt 可以正常地进行位运算，如|、&、<<、>>和^

#### instanceof

通过判断 instanceof 的左侧在其原型链中是否存在右侧的 prototype 属性

[instanceof 判断基本数据类型:hasInstance](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/hasInstance)

#### typeof

typeof 对于原始类型来说，除了 null 都可以显示正确的类型

typeof 对于对象来说，除了函数都会显示 object

```js
console.log(typeof 2); // number
console.log(typeof true); // boolean
console.log(typeof 'str'); // string
console.log(typeof []); // object     []数组的数据类型在 typeof 中被解释为 object
console.log(typeof function() {}); // function
console.log(typeof {}); // object
console.log(typeof undefined); // undefined
console.log(typeof null); // object     null 的数据类型被 typeof 解释为 object
```

#### 判断 Array

- `Array.isArray(obj)`
- `obj instanceof Array`
- `Object.prototype.toString.call(obj) == '[object Array]'`
- `obj.constructor === Array`

#### isNaN 和 Number.isNaN 函数

```
 函数 isNaN 接收参数后，会尝试将这个参数转换为数值，任何不能被转换为数值的的值都会返回 true，因此非数字值传入也会
 返回 true ，会影响 NaN 的判断。

 函数 Number.isNaN 会首先判断传入参数是否为数字，如果是数字再继续判断是否为 NaN ，这种方法对于 NaN 的判断更为
 准确。
```

#### undefined 与 undeclared 的区别

已在作用域中声明但还没有赋值的变量，是 undefined 的。相反，还没有在作用域中声明过的变量，是 undeclared 的。

对于 undeclared 变量的引用，浏览器会报引用错误，如 ReferenceError: b is not defined 。但是我们可以使用 typeof 的安全防范机制来避免报错，因为对于 undeclared（或者 not defined ）变量，typeof 会返回 "undefined"。

### 类型转换

#### ToString

1. null 转换为 "null"，undefined 转换为 "undefined"

2. true 转换为 "true"，false 转换为 "false"

3. Number 直接转换，不过那些极小和极大的数字会使用指数形式

4. Symbol 类型的值直接转换，但是只允许显式强制类型转换，使用隐式强制类型转换会产生错误。

5. 对普通对象来说，除非自行定义 toString() 方法，否则会调用 toString()（Object.prototype.toString()）
   来返回内部属性 [[Class]] 的值，如"[object Object]"。如果对象有自己的 toString() 方法，字符串化时就会
   调用该方法并使用其返回值。

#### ToNumber

1.  undefined 类型的值转换为 NaN

2.  null 类型的值转换为 0

3.  true 转换为 1，false 转换为 0

4.  String 类型的值转换如同使用 Number() 函数进行转换，如果包含非数字值则转换为 NaN，空字符串为 0

5.  Symbol 类型的值不能转换为数字，会报错

6.  对象（包括数组）会首先 ToPrimitive 被转换为相应的基本类型值，如果返回的是非数字的基本类型值，则再遵循以上规则将其强制转
    换为数字

#### ToPrimitive

对象在转换类型的时候，会调用内置的 [[ToPrimitive]] 函数

1. 如果 Symbol.toPrimitive()方法，优先调用再返回
2. 调用 valueOf()，如果转换为原始类型，则返回
3. 调用 toString()，如果转换为原始类型，则返回
4. 如果都没有返回原始类型，就会报错 TypeError

![](/toStringvalueOf.jpg)

#### ==和===

![](/==.png)
![](/宽松相等.jpg)

注意，只要出现 NaN，就一定是 false，因为就连 NaN 自己都不等于 NaN
对于 NaN，判断的方法是使用全局函数 `isNaN()`

[(a==1&&a==2&&a==3)的实现和原理](https://blog.csdn.net/weixin_39856066/article/details/95483680)

#### [] == ![]

1. !优先于==，且[]为真值(转成 boolean，结果为 true 的就为真值，包括{}；转成 false 的就为假值)，![]结果为 false，所以当前表达式转化为 []==false
2. 任何类型与 boolean 类型比较，所以[]==false 转化为 []==0 比较
3. 此时变为 object 与 0 比较，调用 object 的转换成原始类型的方法 valueOf 其结果还是 valueOf
4. 再调用 toString 结果为''，再进行 string 转成 number，则[]转成数字类型 0
5. 表达式进一步转换成 0==0，结果为 true。

#### Object.is ===

[Object.is()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is) 与===基本相同，不同点在于 Object.is 判断+0 不等于-0，NaN 等于自身

```js

function is(x, y) {
  if (x === y) {
    //运行到1/x === 1/y的时候x和y都为0，但是1/+0 = +Infinity， 1/-0 = -Infinity, 是不一样的
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    //NaN===NaN是false,这是不对的，我们在这里做一个拦截，x !== x，那么一定是 NaN, y 同理
    //两个都是NaN的时候返回true
    return x !== x && y !== y;
  }

```

#### 技巧

```js
// 强制转换为Boolean 用 !!
var bool = !!'c';
console.log(typeof bool); // boolean

// 强制转换为Number 用 +
var num = +'1234';
console.log(typeof num); // number

// 强制转换为String 用 ""+
var str = '' + 1234;
console.log(typeof str); // string
```

## **引用类型**

[JavaScript 标准内置对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects)

### String

[JS 中"hello"与 new String("hello")引出的问题详解|脚本之家](https://www.jb51.net/article/145610.htm)

### Array

[Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array##%E6%95%B0%E7%BB%84%E5%AE%9E%E4%BE%8B)

[JS 判断数组的六种方法详解](https://segmentfault.com/a/1190000017790888?utm_source=tag-newest)

#### 类数组与数组的区别与转换

类数组：

1. 具有`length`属性，其他属性（索引）为非负整数（对象中的索引会被当作字符串来处理）
2. 不具有数组所具备的方法。
3. 类数组是一个普通的对象，而数组是`Array`类型

常见的类数组：函数的参数`arguments`，`DOM`对象列表（比如通过`document.querySelectorAll()`得到的列表）

类数组转换为数组：

```js
Array.prototype.slice.call(arrayLike,start)
[...arrayLike]
Array.from(arrayLike)
```

> 任何定义了`iterator`遍历器借口的对象，都可以用扩展运算符转为真正的数组。

`Array.from()`可以将两类对象转为真正的数组：`array-like Object`类似数组的对象和`iterable`可遍历对象。

[Array.from() 五个超好用的用途](https://segmentfault.com/a/1190000020221170)

[JS 数组基本操作——数组遍历到底有多少种方式？](https://segmentfault.com/a/1190000020233039)

### RegExp

#### 使用正则表达式的方法

- exec 一个在字符串中执行查找匹配的 RegExp 方法，它返回一个数组（未匹配到则返回 null）。

```js
var str =
  'Visit W3School, W3School is a place to study web technology.W3School';
var patt = new RegExp('W3School', 'g');
var result;

while ((result = patt.exec(str)) != null) {
  document.write(result);
  document.write(patt.lastIndex);
}
//W3School 14 W3School 24 W3School 68
```

- test 一个在字符串中测试是否匹配的 RegExp 方法，它返回 true 或 false。
- match 一个在字符串中执行查找匹配的 String 方法，它返回存放匹配结果的数组或者在未匹配到时返回 null。
- search 一个在字符串中测试匹配的 String 方法，它返回匹配到的位置索引，或者在失败时返回-1。
- replace 一个在字符串中执行查找匹配的 String 方法，并且使用替换字符串替换掉匹配到的子字符串。
- split 一个使用正则表达式或者一个固定字符串分隔一个字符串，并将分隔后的子字符串存储到数组中的 String 方法。

[RegExp](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp)

### 拷贝

浅拷贝：仅仅是指向被复制的内存地址，如果原地址发生改变，那么浅复制出来的对象也会相应的改变。

创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是内存地址 ，所以如果其中一个对象改变了这个地址，就会影响到另一个对象。

深拷贝：在计算机中开辟一块**新的内存地址**用于存放复制的对象。

将一个对象从内存中完整的拷贝一份出来,从堆内存中开辟一个新的区域存放新对象,且修改新对象不会影响原对象

深拷贝和浅拷贝最根本的区别在于是否是真正获取了一个对象的复制实体，而不是引用

![](深浅拷贝.png)

[彻底讲明白浅拷贝与深拷贝](https://www.jianshu.com/p/35d69cf24f1f)

浅拷贝实现方法

1. Object.assign

   - Object.assign 是一个浅拷贝,它只是在根属性(对象的第一层级)创建了一个新的对象，但是对于属性的值是仍是对象的话依然是浅拷贝

   - 不会拷贝对象继承的属性

   - 不可枚举的属性

   - 可以拷贝 Symbol 类型

2. .../slice/concat

   - 和 assgin 一样只拷贝一层

深拷贝实现方法

1. 循环+递归

   - 只能实现 object、array 的深拷贝
   - for...in 无法获得 Symbol 类型的键，而 Reflect 可以获取

2. JSON.stringify

   - 拷贝的对象的值中如果有函数,undefined,symbol 则经过 JSON.stringify()序列化后的 JSON 字符串中这个键值对会消失

   - 无法拷贝不可枚举的属性， 无法拷贝对象的原型链

   - 拷贝 Date 引用类型会变成字符串

   - 拷贝 RegExp 引用类型会变成空对象

   - 对象中含有 NaN、 Infinity 和 - Infinity， 则序列化的结果会变成 null

   - 无法拷贝对象的循环应用(即 obj[key] = obj)

3. lodash([第三方库](https://github.com/lodash/lodash/blob/master/.internal/baseClone.js)）

## **函数**

### 作用域

作用域是储存和访问变量的规则

![](/assets/img/JS执行过程.png)

编译阶段

由编译器完成，将代码翻译成可执行代码，这个阶段作用域规则会确定，编译阶段经历以下三个步骤：

- 分词/词法分析：将由字符组成的字符串分解成（对编程语言来说）有意义的代码块，这些代码块被称为词法单元（token）;
- 解析/语法分析：将词法单元流（数组）转换成一个由元素逐级嵌套所组成的代表了程序语法结构的树——“抽象语法树”（AST）
- 代码生成：将 AST 转换为可执行代码的过程称被称为代码生成。

### 执行上下文

[执行上下文及其生命周期](https://www.jianshu.com/p/a6e8d2bf1ca0)
[JavaScript 进阶-执行上下文](https://juejin.im/post/5db85b866fb9a0207d4cbf92)

当 JS 引擎解析到可执行代码片段（通常是函数调用阶段）的时候，就会先做一些执行前的准备工作，这个 “准备工作”，就叫做 "执行上下文(execution context 简称 EC)" 或者也可以叫做执行环境。

执行上下文为我们的可执行代码块提供了执行前的必要准备工作

1. 变量对象的定义
2. 作用域链的扩展
3. 提供调用者的对象引用等信息

每个执行上下文都有 3 个重要属性：

- 变量对象
- 作用域链
- this

在 js 中，执行上下文分为以下三种：

- 全局执行上下文：只有一个，也就是浏览器对象(即 window 对象)，this 指向的就是这个全局对象。
- 函数执行上下文：有无数个，只有在函数被调用时才会被创建，每次调用函数都会创建一个新的执行上下文。
- Eval 函数执行上下文：js 的 eval 函数执行其内部的代码会创建属于自己的执行上下文, 很少用而且不建议使用。

### 执行上下文栈

1. 全局代码执行前，JS 引擎就会创建一个栈来存储管理所有的执行上下文对象
2. 在全局执行上下文(window)确定后，将其添加到栈中
3. 在函数执行时，函数执行上下文创建后，将其添加到栈中
4. 在当前函数执行完后，将栈顶的对象移除出栈
5. 当所有的代码完成后，栈只剩下 window

### 作用域链

一般情况下变量取值回到创建这个变量函数的作用域中取值，但是如果当前作用域中没有查到值，就会向上级作用域去查，直到查到全局作用域，这个查找过程形成的链条就叫作用域链

### 闭包

闭包是指有权访问另一个函数作用域中变量的函数

#### 闭包的产生

当一个嵌套的内部函数引用了嵌套的外部函数的变量（函数）时，就产生了闭包

1. 函数嵌套
2. 内部函数引用了外部函数的数据（变量、函数）
3. 外部函数执行

```js
function fn1() {
  var a = 1;
  function fn2() {
    console.log(a);
  }
}
fn1();
```

#### 常见的闭包

1. 将函数作为另一个函数的返回值

```js
function fn1() {
  var a = 1;
  function fn2() {
    a++;
    console.log(a);
  }
}
var f = fn1();
f();
f();
```

2. 将函数作为实参传递给实参调用

```js
function showDelay(msg, time) {
  setTimeout(function() {
    alert(msg);
  }, time);
}
showDelay();
```

#### 用途

1. 使函数内部的变量在函数执行完后，仍然存活在内存中（延长了局部变量的生命周期）
2. 让函数外部可以操作（读写）到函数内部的数据（变量、函数）
3. 定义 JS 模块

#### 缺点

1. 函数执行完后，函数内的局部变量没有释放，占用内存的时间会延长
2. 容易造成内存泄漏

解决

1. 能不用闭包就不用
2. 及时释放

#### 生命周期

产生：
在嵌套函数内部定义执行完成时就产生了（不是在调用）
死亡：
在嵌套的内部函数成为垃圾对象时

```js
function fn1() {
  //此时闭包就已经产生了（函数提升，内部函数对象已经创建了）
  var a = 1;
  function fn2() {
    a++;
    console.log(a);
  }
}
var f = fn1();
f();
f();
f = null; //闭包死亡（包含闭包的函数对象成为垃圾对象）
```

#### 计数器

实现一个 foo 函数 可以这么使用:

```js
a = foo();
b = foo();
c = foo();
// a === 1;b === 2;c === 3;
foo.clear();
d = foo(); //d === 1;
```

```js
function myIndex() {
  var index = 1;

  function foo() {
    return index++;
  }

  foo.clear = function() {
    index = 1;
  };
  return foo;
}

var foo = myIndex();
```

#### 封装私有变量

```js
function Counter() {
  let count = 0;
  this.plus = function() {
    return ++count;
  };
  this.minus = function() {
    return --count;
  };
  this.getCount = function() {
    return count;
  };
}

const counter = new Counter();
counter.puls();
counter.puls();
console.log(counter.getCount());
```

### 作用域与变量声明提升

- 在 JavaScript 中，函数声明与变量声明会被 JavaScript 引擎隐式地提升到当前作用域的顶部
- 声明语句中的赋值部分并不会被提升，只有名称被提升
- 函数声明的优先级高于变量，如果变量名跟函数名相同且未赋值，则函数声明会覆盖变量声明
- 如果函数有多个同名参数，那么最后一个参数（即使没有定义）会覆盖前面的同名参数

### 函数柯里化

柯里化（英语：Currying），又称为部分求值，是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回一个新的函数的技术，新函数接受余下参数并返回运算结果。

实现一个 add 方法，使计算结果能够满足如下预期：

```js
add(1)(2)(3) = 6;
add(1, 2)(3) = 10;
```

实现方法： 做一个闭包，返回一个函数，这个函数每次执行会改写闭包里面记录参数的数组。当这个函数判断参数个数够了，就去执行它。

```js
function curry(func) {
  // 存储已传入参数
  let _args = [];

  // 做一个闭包
  function _curry(...args) {
    // 把参数合并
    _args = _args.concat(args);

    // 如果参数够了就执行
    if (_args.length >= func.length) {
      const result = func(..._args);
      _args = [];
      return result;
    }
    // 继续返回此函数
    else {
      return _curry;
    }
  }
  return _curry;
}
```

```js
// 测试代码
function add1(a, b, c) {
  return a + b + c;
}
let testAdd = curry(add1);
console.log(testAdd(1)(2)(3));
console.log(testAdd(1, 2)(3));
console.log(testAdd(1)(2, 3));
```

### 立即执行函数（IIFE）

IIFE（ 立即调用函数表达式）是一个在定义时就会立即执行的 JavaScript 函数。

```js
(function() {
  statements;
})();
```

这是一个被称为 自执行匿名函数 的设计模式，主要包含两部分。

第一部分是包围在圆括号运算符 () 里的一个匿名函数，这个匿名函数拥有独立的词法作用域。这不仅避免了外界访问此 IIFE 中的变量，而且又不会污染全局作用域。

第二部分再一次使用 () 创建了一个立即执行函数表达式，JavaScript 引擎到此将直接执行函数。

当函数变成立即执行的函数表达式时，表达式中的变量不能从外部访问。

```js
(function() {
  var name = 'Barry';
})();
// 无法从外部访问变量 name
name; // 抛出错误："Uncaught ReferenceError: name is not defined"
```

将 IIFE 分配给一个变量，不是存储 IIFE 本身，而是存储 IIFE 执行后返回的结果。

```js
var result = (function() {
  var name = 'Barry';
  return name;
})();
// IIFE 执行后返回的结果：
result; // "Barry"
```

### 面向切片编程（AOP）

把一些与业务逻辑无关的功能抽取出来，然后通过“动态织入”的方式加入业务逻辑模块中。这样设计的好处是：首先可以保证业务逻辑模块的纯净和高内聚性；其次可以方便地复用模块

## **this**

[this 全面解析](https://muyiy.cn/blog/3/3.1.html##_1-%E8%B0%83%E7%94%A8%E4%BD%8D%E7%BD%AE)

[this/apply/call 问点](https://juejin.im/post/5e3e796d518825495b298878)

### 绑定方式

[40 道 this 面试题](https://juejin.im/post/5e6358256fb9a07cd80f2e70)

- 默认绑定：非严格模式下 this 指向全局对象，严格模式下 this 会绑定到 undefined
- 隐式绑定：当函数引用有上下文对象时，指向这个对象，obj.foo()
- 显示绑定：call/apply/bind
- new 绑定
- 箭头函数绑定：this 指向由外层作用域决定

开启了严格模式，只是说使得函数内的 this 指向 undefined，它并不会改变全局中 this 的指向

this 永远指向最后调用它的那个对象

如果 call、apply、bind 接收到的第一个参数是空或者 null、undefined 的话，则会忽略这个参数

匿名函数的 this 永远指向 window

它里面的 this 是由外层作用域来决定的，且指向函数定义时的 this 而非执行时。箭头函数中没有 this 绑定，必须通过查找作用域链来决定其值，如果箭头函数被非箭头函数包含，则 this 绑定的是最近一层非箭头函数的 this，否则，this 为 undefined。

#### 调用定时器的始终是 window

setTimeout()调用的代码运行在与所在函数完全分离的执行环境上。这会导致这些代码中包含的 this 关键字会指向 window (或全局)对象
解决方法：

1.使用局部变量：

```js
var self = this;
setTimeout(function() {
  console.log('Hi, my name is ' + self.name);
}, time);
```

2.使用箭头函数

```js
setTimeout(() => {
  console.log('Hi, my name is ' + this.name);
}, time);
```

3.bind 函数

```js
setTimeout(
  function() {
    console.log('hi,my name is' + this.name);
  }.bind(this),
  1000
);
```

#### 隐式绑定丢失

隐式丢失其实就是被隐式绑定的函数在特定的情况下会丢失绑定对象

有两种情况容易发生隐式丢失问题：

1. 使用另一个变量来给函数取别名
2. 将函数作为参数传递时会被隐式赋值，回调函数丢失 this 绑定

把一个函数当成参数传递到另一个函数的时候，也会发生隐式丢失的问题，且与包裹着它的函数的 this 指向无关。在非严格模式下，会把该函数的 this 绑定到 window 上，严格模式下绑定到 undefined

### 优先级

构造函数调用>call,apply,bind 函数>方法调用模式>函数调用模式

new 绑定>显式绑定>隐式绑定>默认绑定

### this 指向

#### 头条一面

请分别写出下面题目的答案。

```js
function Foo() {
  getName = function() {
    console.log(1);
  };
  return this;
}
Foo.getName = function() {
  console.log(2);
};
Foo.prototype.getName = function() {
  console.log(3);
};
var getName = function() {
  console.log(4);
};

function getName() {
  console.log(5);
}

//请写出以下输出结果：
Foo.getName();
//-> 2    Foo对象上的getName() ，这里不会是3，因为只有Foo的实例对象才会是3，Foo上面是没有3的
getName();
//-> 4    window上的getName，console.log(5)的那个函数提升后，在console.log(4)的那里被重新赋值
Foo().getName();
//-> 1    在Foo函数中，getName是全局的getName，覆盖后输出 1
getName();
//-> 1    window中getName();
new Foo.getName();
//-> 2    Foo后面不带括号而直接 '.'，那么点的优先级会比new的高，所以把 Foo.getName 作为构造函数
new Foo().getName();
//-> 3    此时是Foo的实例，原型上会有输出3这个方法
```

#### 箭头函数中的 this 判断

箭头函数里面的 this 是继承它作用域父级的 this， 即声明箭头函数处的 this

```js
let a = {
  b: function() {
    console.log(this);
  },
  c: () => {
    console.log(this);
  },
};
a.b(); // a
a.c(); // window
let d = a.b;
d(); // window
```

#### this 判断

```js
var name1 = 1;
function test() {
  let name1 = 'kin';
  let a = {
    name1: 'jack',
    fn: () => {
      var name1 = 'black';
      console.log(this.name1);
    },
  };
  return a;
}
test().fn();
```

因为 fn 处绑定的是箭头函数，箭头函数并不创建 this，它只会从自己的作用域链的上一层继承 this。这里它的上一层是 test()，非严格模式下 test 中 this 值为 window。

- 如果在绑定 fn 的时候使用了 function，那么答案会是 'jack'
- 如果第一行的 var 改为了 let，那么答案会是 undefind， 因为 let 不会挂到 window 上

## **对象**

[Js 是基于对象还是面向对象的](https://blog.csdn.net/qq_42615057/article/details/98732902)

### 属性值

[如何限制 JS 对象属性的配置](https://blog.csdn.net/weixin_38382659/article/details/92198715)

#### 数据属性

1. Configurable 表示能否通过 delete 删除属性从而重新定义属性，默认为 true

2. Enumerable 表示属性是否可以枚举，默认为 true

3. Writable 表示能否修改属性的值，默认为 true

4. Value 包含这个属性的数据值，默认为 undefined

修改属性默认值：

```js
var person={};
Object.defineProperty(person,"name",{
  writable:false,
  value:"xxxx",
  configurable:false;//一旦被设置为false，不可以更改
})

person.name="xx";
console.log(person.name);//xxxx,严格模式下会报错
delete person.name //无效，严格模式下会报错
```

#### 访问器属性

1. Configurable 表示能否通过 delete 删除属性从而重新定义属性，默认为 false

2. Enumerable 表示属性是否可以枚举，默认为 false

3. get 读取属性时调用函数，默认 undefined

4. set 写入属性时调用函数，默认为 undefined

```js
var person = {
  _age: 20, //下划线写法表示只能通过对象方法访问的属性
  state: 'young',
};
Object.defineProperty(person, 'age', {
  get: function() {
    return this._age;
  },
  set: function(newVal) {
    if (newVal > 50) {
      this._age = newVal;
      this.state = 'old';
    } else {
      this._age = newVal;
    }
  },
});
```

定于多个属性，使用`Object.defineProperties()`

#### 读取属性的特性

使用 `Object.getOwnPropertyDescriptor()`

```js
var person = {};
Object.defineProperties(person, {
  _age: {
    value: 20,
  },
  state: {
    value: 'young',
  },
  age: {
    get: function() {
      return this._age;
    },
    set: function(newVal) {
      if (newVal > 50) {
        this._age = newVal;
        this.state = 'old';
      } else {
        this._age = newVal;
      }
    },
  },
});

var descriptor = Object.getOwnPropertyDescriptor(person, '_age');
descriptor.value; //20
descriptor.configurable; //false

var descriptor = Object.getOwnPropertyDescriptor(person, 'age');
descriptor.value; //undefined
descriptor.configurable; //false
typeof descriptor; //function
```

### 遍历对象的方法

|                方法                 | 对象自身属性 | 继承属性 | 不可枚举属性 | Symbol 属性 | 返回值 |
| :---------------------------------: | :----------: | :------: | :----------: | :---------: | :----: |
|         `Object.keys(obj)`          |      O       |    X     |      X       |      X      |  数组  |
|             `for...in`              |      O       |    O     |      X       |      X      |        |
|  `Object.getOwnPropertyNames(obj)`  |      O       |    O     |      O       |      X      |  数组  |
|       `Reflect.ownKeys(obj)`        |      O       |    O     |      O       |      O      |  数组  |
| `Object.getOwnPropertySymbols(obj)` |      X       |    X     |      X       |      O      |  数组  |

以上的 5 种方法遍历对象的键名，都遵守同样的属性遍历的次序规则。

1. 遍历所有数值键，按照数值升序排列。
2. 遍历所有字符串键，按照加入时间升序排列。
3. 遍历所有 Symbol 键，按照加入时间升序排列。

```js
Reflect.ownKeys({ [Symbol()]: 0, b: 0, 10: 0, 2: 0, a: 0 });
// ['2', '10', 'b', 'a', Symbol()]
```

#### 判断对象是否为空对象

```js
//1
JSON.stringify(obj) == '{}';
//2
var b = function(obj) {
  for (let key in obj) {
    return false;
  }
  return true;
};
//3
Object.getOwnPropertyNames(obj).length == 0;
//4
Object.keys(data).length == 0;
```

### 私有实现

[JavaScript 如何实现私有变量私有方法](https://juejin.im/post/5c7e14fff265da2dd77403af)

最简单的方式是提前约定好私有变量

```js
class Person {
  constructor(age) {
    this._age = age;
  }
}
let p = new Person();
// 还是可以获取p._age
```

闭包 + Symbol

Symbol 值通过 Symbol 函数生成。这就是说，对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的 Symbol 类型。凡是属性名属于 Symbol 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突；类似与 UUID 的用法。

创建一个 Person 类，其包含公有属性 name 和私有属性 age 以及公有方法 setAge ；创建一个 Teacher 类，使其继承 Person ，并包含私有属性 studentCount 和私有方法 setStudentCount

```js
// 这里写在一个立即执行函数里，分开写也是可以的
const Person= (function() {
  const _age = Symbol("age");
  class Person {
    constructor(name, age) {
      this.name = name;
      this[_age] = age;
    }
    setAge(age) {
      this[_age] = age;
    }
  }
  return Person;
)();
const Teacher = (function(){
    const _studentCount = Symbol("studentCount");
    const _setStudentCount = Symbol("setStudentCount");
    class Teacher extends Person {
    constructor(name, age, count) {
      super(name, age);
      this[_studentCount] = count;
    }
    [_setStudentCount](count) {
      this[_studentCount] = count;
    }
    set(count) {
      this[_setStudentCount](count);
    }
  }
  return Teacher;
)();
```

## **BOM**

BOM 是 browser object model 的缩写， 简称浏览器对象模型。 主要处理浏览器窗口和框架，
描述了与浏览器进行交互的方法和接口， 可以对浏览器窗口进行访问和操作， 譬如可以弹出
新的窗口， 回退历史记录， 获取 url……

### BOM 与 DOM 的关系

1. javacsript 是通过访问 BOM 对象来访问、 控制、 修改浏览器
2. BOM 的 window 包含了 document， 因此通过 window 对象的 document 属性就可以访问、
   检索、 修改文档内容与结构。
3. document 对象又是 DOM 模型的根节点。

因此， BOM 包含了 DOM， 浏览器提供出来给予访问的是 BOM 对象， 从 BOM 对象再访
问到 DOM 对象， 从而 js 可以操作浏览器以及浏览器读取到的文档

### BOM 对象

- Window JavaScript 层级中的顶层对象， 表示浏览器窗口。
- Navigator 包含客户端浏览器的信息。
- History 包含了浏览器窗口访问过的 URL。
- Location 包含了当前 URL 的信息。
- Screen 包含客户端显示屏的信息。

### History 对象

History 对象包含用户（在浏览器窗口中） 访问过的 URL

| 方法/属性 | 描述                              |
| --------- | --------------------------------- |
| length    | 返回浏览器历史列表中的 URL 数量。 |
| back()    | 加载 history 列表中的前一个 URL。 |
| forward() | 加载 history 列表中的下一个 URL。 |
| go()      | 加载 history 列表中的某个具体页面 |

### Location 对象

[MDN|Location](https://developer.mozilla.org/zh-CN/docs/Web/API/Location)
Location 对象包含有关当前 URL 的信息。

| 属性     | 描述                                         |
| -------- | -------------------------------------------- |
| hash     | 设置或返回从井号 (##) 开始的 URL（锚） 。    |
| host     | 设置或返回主机名和当前 URL 的端口号。        |
| hostname | 设置或返回当前 URL 的主机名。                |
| href     | 设置或返回完整的 URL。                       |
| pathname | 设置或返回当前 URL 的路径部分。              |
| port     | 设置或返回当前 URL 的端口号。                |
| protocol | 设置或返回当前 URL 的协议。                  |
| search   | 置或返回从问号 (?) 开始的 URL（查询部分） 。 |

| 方法            | 描述                                                            |
| --------------- | --------------------------------------------------------------- |
| assign()        | 加载新的文档。                                                  |
| reload(‘force’) | 重新加载当前文档。参数可选，不填或填 false 则取浏览器缓存的文档 |
| replace()       | 用新的文档替换当前文档。                                        |

### Window 对象

Window 对象表示一个浏览器窗口或一个框架。 在客户端 JavaScript 中， Window 对象
是全局对象，所有的表达式都在当前的环境中计算。 例如，可以只写 document， 而
不必写 window.document。

| 属性                                                   | 描述                                                                                                                                                                            |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| closed                                                 | 返回窗口是否已被关闭。                                                                                                                                                          |
| defaultStatus                                          | 设置或返回窗口状态栏中的默认文本。 （仅 Opera 支持）                                                                                                                            |
| document                                               | 对 Document 对象的只读引用。 请参阅 Document 对象。                                                                                                                             |
| history                                                | 对 History 对象的只读引用。 请参数 History 对象。                                                                                                                               |
| innerheight                                            | 返回窗口的文档显示区的高度。                                                                                                                                                    |
| innerwidth                                             | 返回窗口的文档显示区的宽度。                                                                                                                                                    |
| length                                                 | 设置或返回窗口中的框架数量。                                                                                                                                                    |
| location                                               | 用于窗口或框架的 Location 对象。 请参阅 Location 对象。                                                                                                                         |
| name                                                   | 设置或返回窗口的名称。                                                                                                                                                          |
| Navigator                                              | 对 Navigator 对象的只读引用。 请参数 Navigator 对象。                                                                                                                           |
| opener                                                 | 返回对创建此窗口的窗口的引用。                                                                                                                                                  |
| outerheight                                            | 返回窗口的外部高度。                                                                                                                                                            |
| outerwidth                                             | 返回窗口的外部宽度。                                                                                                                                                            |
| pageXOffset                                            | 设置或返回当前页面相对于窗口显示区左上角的 X 位置。                                                                                                                             |
| pageYOffset                                            | 设置或返回当前页面相对于窗口显示区左上角的 Y 位置。                                                                                                                             |
| parent                                                 | 返回父窗口。                                                                                                                                                                    |
| Screen                                                 | 对 Screen 对象的只读引用。 请参数 Screen 对象。                                                                                                                                 |
| self                                                   | 返回对当前窗口的引用。 等价于 Window 属性。                                                                                                                                     |
| status                                                 | 设置窗口状态栏的文本。 (默认只支持 Opera)                                                                                                                                       |
| top                                                    | 返回最顶层的先辈窗口。                                                                                                                                                          |
| window                                                 | window 属性等价于 self 属性， 它包含了对窗口自身的引用。                                                                                                                        |
| screenLeft <br/> screenTop <br/> screenX <br/> screenY | 只读整数。声明了窗口的左上角在屏幕上的的 x 坐标和 y 坐标。 IE、 Safari、 Chrome 和 Opera 支持 screenLeft 和 screenTop， 而 Chrome、 Firefox 和 Safari 支持 screenX 和 screenY。 |

| 方法            | 描述                                                                                  |
| --------------- | ------------------------------------------------------------------------------------- |
| alert()         | 显示带有一段消息和一个确认按钮的警告框。                                              |
| blur()          | 把键盘焦点从顶层窗口移开。                                                            |
| confirm()       | 显示带有一段消息以及确认按钮和取消按钮的对话框。                                      |
| createPopup()   | 创建一个弹出窗口。 只有 ie 支持（不包括 ie11）                                        |
| focus()         | 把键盘焦点给予一个窗口。                                                              |
| moveBy()        | 可相对窗口的当前坐标把它移动指定的像素。                                              |
| moveTo()        | 把窗口的左上角移动到一个指定的坐标。                                                  |
| open()          | 打开一个新的浏览器窗口或查找一个已命名的窗口。 window.open(URL,name,features,replace) |
| print()         | 打印当前窗口的内容。                                                                  |
| prompt()        | 显示可提示用户输入的对话框。                                                          |
| resizeBy()      | 按照指定的像素调整窗口的大小。                                                        |
| resizeTo()      | 把窗口的大小调整到指定的宽度和高度。                                                  |
| scrollBy()      | 按照指定的像素值来滚动内容。                                                          |
| scrollTo()      | 把内容滚动到指定的坐标。                                                              |
| setInterval()   | 按照指定的周期（以毫秒计） 来调用函数或计算表达式。                                   |
| setTimeout()    | 在指定的毫秒数后调用函数或计算表达式。                                                |
| clearInterval() | 取消由 setInterval() 设置的 timeout。                                                 |
| clearTimeout()  | 取消由 setTimeout() 方法设置的 timeout。close() 关闭浏览器窗口                        |

### Navigator 对象

Navigator 对象包含的属性描述了正在使用的浏览器。 可以使用这些属性进行平台专用的配置。 虽然这个对象的名称显而易见的是 Netscape 的 Navigator 浏览器， 但其他实现了 JavaScript 的浏览器也支持这个对象。

| 属性            | 描述                                                                                                |
| --------------- | --------------------------------------------------------------------------------------------------- |
| appCodeName     | 返回浏览器的代码名。 以 Netscape 代码为基础的浏览器中， 它的值是 "Mozilla"。Microsoft 也是          |
| appMinorVersion | 返回浏览器的次级版本。 （IE4、 Opera 支持）                                                         |
| appName         | 返回浏览器的名称。                                                                                  |
| appVersion      | 返回浏览器的平台和版本信息。                                                                        |
| browserLanguage | 返回当前浏览器的语言。 （IE 和 Opera 支持）cookieEnabled 返回指明浏览器中是否启用 cookie 的布尔值。 |
| cpuClass        | 返回浏览器系统的 CPU 等级。 （IE 支持）                                                             |
| onLine          | 返回指明系统是否处于脱机模式的布尔值。                                                              |
| platform        | 返回运行浏览器的操作系统平台。                                                                      |
| systemLanguage  | 返回当前操作系统的默认语言。 （IE 支持）                                                            |
| userAgent       | 返回由客户机发送服务器的 user-agent 头部的值。                                                      |
| userLanguage    | 返回操作系统设定的自然语言。 （IE 和 Opera 支持）                                                   |
| plugins         | 返回包含客户端安装的所有插件的数组                                                                  |

| 方法           | 描述                                         |
| -------------- | -------------------------------------------- |
| javaEnabled()  | 规定浏览器是否支持并启用了 Java。            |
| taintEnabled() | 规定浏览器是否启用数据污点 (data tainting)。 |

### Screen 对象

Screen 对象包含有关客户端显示屏幕的信息。 每个 Window 对象的 screen 属性都引用一个 Screen 对象。 Screen 对象中存放着有关显示浏览器屏幕的信息。 JavaScript 程序将利用这些信息来优化它们的输出， 以达到用户的显示要求。 例如，一个程序可以根据显示器的尺寸选择使用大图像还是使用小图像，它还可以根据显示器的颜色深度选择使用 16 位色还是使用 8 位色的图形。 另外，JavaScript 程序还能根有关屏幕尺寸的信息将新的浏览器窗口定位在屏幕中间。

| 属性                 | 描述                                                                                             |
| -------------------- | ------------------------------------------------------------------------------------------------ |
| availHeight          | 返回显示屏幕的高度 (除 Windows 任务栏之外)。                                                     |
| availWidth           | 返回显示屏幕的宽度 (除 Windows 任务栏之外)。                                                     |
| bufferDepth          | 设置或返回调色板的比特深度。 （仅 IE 支持）colorDepth 返回目标设备或缓冲器上的调色板的比特深度。 |
| deviceXDPI           | 返回显示屏幕的每英寸水平点数。 （仅 IE 支持）                                                    |
| deviceYDPI           | 返回显示屏幕的每英寸垂直点数。 （仅 IE 支持）                                                    |
| fontSmoothingEnabled | 返回用户是否在显示控制面板中启用了字体平滑。 （仅 IE 支持）                                      |
| height               | 返回显示屏幕的高度。                                                                             |
| logicalXDPI          | 返回显示屏幕每英寸的水平方向的常规点数。 （仅 IE 支持）                                          |
| logicalYDPI          | 返回显示屏幕每英寸的垂直方向的常规点数。 （仅 IE 支持）                                          |
| pixelDepth           | 返回显示屏幕的颜色分辨率（比特每像素） 。                                                        |
| updateInterval       | 设置或返回屏幕的刷新率。 （仅 IE11 以下支持）                                                    |
| width                | 返回显示器屏幕的宽度。                                                                           |

### offsetWidth/offsetHeight,clientWidth/clientHeight 与 scrollWidth/scrollHeight 的区别

- offsetWidth/offsetHeight 返回值包含 content + padding + border，效果与 e.getBoundingClientRect()相同
- clientWidth/clientHeight 返回值只包含 content + padding，如果有滚动条，也不包含滚动条
- scrollWidth/scrollHeight 返回值包含 content + padding + 溢出内容的尺寸

## **DOM**

[DOM 操作](https://blog.csdn.net/Night_Emperor/article/details/78471051)

### DOM 事件级别

- DOM0
  - onXXX 类型的定义事件
  - element.onclick = function(e) { ... }
- DOM2
  - addEventListener 方式
  - element.addEventListener('click', function (e) { ... })
  - btn.removeEventListener('click', func, false)
  - btn.attachEvent("onclick", func);
  - btn.detachEvent("onclick", func);
- DOM3
  - 增加了很多事件类型
  - element.addEventListener('keyup', function (e) { ... })
  - eventUtil 是自定义对象，textInput 是 DOM3 级事件

### Event 对象常见应用

- event.target
  - 触发事件的元素
- event.currentTarget
  - 绑定事件的元素
- event.preventDefault()
  - 阻止默认行为
  - event.cancelBubble()和 event.preventBubble 都已经废弃
- event.stopPropagation()
  - 阻止在捕获阶段或冒泡阶段继续传播，而不是阻止冒泡
- event.stopImmediatePropagation()
  - 阻止事件冒泡并且阻止相同事件的其他侦听器被调用。

### 事件代理/委托

事件代理（Event Delegating），又称之为事件委托。是指将事件绑定到目标元素的父元素上，利用冒泡机制触发该事件

优点：

- 可以减少事件注册，节省大量内存占用
- 可以将事件应用于动态添加的子元素上

但使用不当会造成事件在不应该触发时触发

```html
<div id="div1">
  <a href="##">a1</a>
  <a href="##">a2</a>
  <a href="##">a3</a>
  <a href="##">a4</a>
</div>
```

```js
const div1 = document.getElementById('div1');
document.addEventListener(div1, 'click', (e) => {
  e.preventDefault(); //防止跳转
  const target = e.target;
  if (target.nodeName === 'A') {
    alert(target.innerHTML);
  }
});
```

### 如何阻止冒泡？

IE 只事件冒泡，不支持事件捕获

- 阻止事件冒泡：

W3C: stopPropagation();

IE: e.cancelBubble=true;

写法 :

window.event ? window.event.cancelBubble=true:e.stop(Propagation)

- 取消默认事件

W3C：preventDefault()

IE: e.returnValue:false;

- 阻止默认行为：

return false

原生的 js 会阻止默认行为，但会继续冒泡；

jquery 会阻止默认行为，并停止冒泡。

### JS 获取 dom 的 CSS 样式

```js
function getStyle(obj, attr) {
  if (obj.currentStyle) {
    return obj.currentStyle[attr];
  } else {
    return window.getComputedStyle(obj, false)[attr];
  }
}
```

[JS 实现鼠标拖拽](https://blog.csdn.net/qq_37746973/article/details/80748879)

### innerHTML、textContent、innerHTML

1. textContent 属性可以获取指定节点的文本及其后代节点中文本内容，也包括`<script>`和`<style>`元素中的内容 ，innerText 也是获取指定节点的文本及其后代节点中文本内容，但不能获取`<script>`和`<style>`元素中的内容，
   innerHTML 是获取 HTML 文本结构内容

2. textContent 会获取 display:none 的节点的文本；innerText 不作返回。

3. 由于  innerText  受  CSS 样式的影响，它会触发重排（reflow），但 textContent  不会

4. textContent 会显示空格和回车，innerText 只显示文本

## **原型与原型链**

JavaScript 是使用构造函数来新建一个对象的，每一个构造函数的内部都有一个 prototype 属性值，这个属性值是一个对象，这个对象包含了该构造函数的所有实例共享的属性和方法。当我们使用构造函数新建一个对象后，在这个对象的内部将包含一个 proto 指针，这个指针指向构造函数的 prototype。

当访问一个对象的属性 / 方法时，它不仅仅在该对象上查找，还会查找该对象的原型，以及该对象的原型的原型，一层一层向上查找，直到找到一个名字匹配的属性 / 方法或到达原型链的末尾（null）

[帮你彻底搞懂 JS 中的 prototype、proto 与 constructor（图解](https://blog.csdn.net/cc18868876837/article/details/81211729)

### 获取原型的方法

`p.__proto__`

`p.constructor.prototype`

`Object.getPrototypeOf(p)`

### instanceof 原理

判断实例对象的`__proto__`属性与构造函数的 `prototype` 是不是用一个引用。如果不是，沿着对象的`__proto__`向上查找的，直到顶端 Object

```js
function myInstanceof(a, b) {
  if (typeof a !== 'object' || a === null) return false;
  let proto = Object.getPrototypeOf(a);
  while (true) {
    if (proto === null) return false;
    if (proto === b.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}
```

### new 原理

1. 创建一个新的对象 obj;
2. 将这个空对象的`__proto__`指向了 fn 函数对象 prototype 成员对象
3. fn 函数对象的 this 指针替换成 obj, 相当于执行了 fn.call(obj);
4. 如果构造函数显示的返回一个对象，那么则这个实例为这个返回的对象。 否则返回这个新创建的对象

```js
function _new() {
  let constructor = [].shift.call(arguments);
  let obj = Object.create(constructor.prototype); // 创建一个空的对象并链接到构造函数的原型，使它能访问原型中的属性，等于 let obj = {};obj.__proto__ = constructor.prototype
  let result = constructor.apply(obj, arguments); // 使用apply改变构造函数中this的指向实现继承，使obj能访问到构造函数中的属性
  return result instanceof Object ? result : obj; // 优先返回构造函数返回的对象
}
```

```js
Object.create() = function(obj) {
  function Fn() {}
  Fn.prototype = obj;
  return new Fn();
};
```

### 求输出结果：

```js
Object.prototype.a = 'Object';
Function.prototype.a = 'Function';
function Person() {}
var child = new Person();

console.log(Person.a);
console.log(child.a);
console.log(child.__proto__);
console.log(child.__proto__.__proto__);
console.log(child.__proto__.__proto__.constructor);
console.log(child.__proto__.__proto__.constructor.constructor);
console.log(child.__proto__.__proto__.constructor.constructor.constructor);
```

## **继承**

### 原型链继承

原理：让父类的属性和方法在子类实例的原型链上
CHILD.prototype = new PARENT();
CHILD.prototype.constructor = CHILD;

```js
function A(x) {
  this.x = x;
}
A.prototype.getX = function() {
  console.log(this.x);
};
function B(y) {
  this.y = y;
}

////////////////////////
B.prototype = new A(100);
B.prototype.constructor = B;
////////////////////////

B.prototype.getY = function() {
  console.log(this.y);
};
let b = new B(200);
b.getX(); //100
b.getY(); //200
b.x; //100
b.y; //200
```

![](/原型链继承.png)

特点：

1. 不像其他语言中的继承一样（其它语言的继承一般是拷贝继承，也就是子类继承父类，会把父类的属性和方法拷贝到一份到子类中，供子类的实例调取使用），它是把父类的原型放到子类实例的原型链上，实例想调取这些方法，是基于`__proto__`原型链查找机制完成的
2. 子类可以重写父类的方法（这样会导致父类其它的实例也受到影响）
3. 父类中私有或公有的属性和方法，最后都会变为子类中公有的属性方法

### 构造继承

原理：CHILD 私有方法中把 PARENT 当作普通函数执行，让 PARENT 中的 THIS 指向 CHILD 实例，相当于给 CHILD 的实例设置了很多私有属性方法

```js
function A(x) {
  this.x = x;
}
A.prototype.getX = function() {
  console.log(this.x);
};
function B(y) {
  this.y = y;
  ////////////////////////
  A.call(this, 100);
  ////////////////////////
}
B.prototype.getY = function() {
  console.log(this.y);
};
let b = new B(200);
b.x; //100
b.y; //200
b.getX(); //TypeError: b.getX is not a function
b.getY(); //200
```

特点：

1. 子类没有继承父类的原型属性和方法，只继承了父类构造函数中的属性和方法
2. 父类私有的变为子类私有的

### 组合继承

可以继承实例属性和方法，也可以继承原型属性和方法 缺点: 调用两次父类构造函数

```js
function A(x) {
  this.x = x;
}
A.prototype.getX = function() {
  console.log(this.x);
};
function B(y) {
  this.y = y;
  ////////////////////////
  A.call(this, 100);
  ////////////////////////
}
////////////////////////
B.prototype = new A();
B.prototype.constructor = B;
////////////////////////
B.prototype.getY = function() {
  console.log(this.y);
};
let b = new B(200);
b.getX(); //100
b.getY(); //200
b.x; //100
b.y; //200
```

### 寄生组合继承

原理：
构造继承+类似于原型继承

```js
function A(x) {
  this.x = x;
}
A.prototype.getX = function() {
  console.log(this.x);
};

function B(y) {
  this.y = y;
  ////////////////////////
  A.call(this, 100);
  ////////////////////////
}
////////////////////////
B.prototype = Object.create(A.prototype);
B.prototype.constructor = B;
////////////////////////
B.prototype.getY = function() {
  console.log(this.y);
};
let b = new B(200);
b.getX(); //100
b.getY(); //200
b.x; //100
b.y; //200
```

![](/寄生组合继承.png)

特点：父类私有和公有的分别是子类实例的私有和公有属性方法（推荐）

```js
//Object.create(obj):创建一个空对象，让空对象__proto__指向obj
Object.create() = function(obj) {
  function Fn() {}
  Fn.prototype = obj;
  return new Fn();
};
```

new 关键字创建的对象会保留原构造函数的属性，而用 Object.create()创建的对象不会

### ES6 继承

```js
class A {
  constructor(x) {
    this.x = x;
  }
  getX() {
    console.log(this.x);
  }
}
//=>B.prototype.__proto__=A.prototype
class B extends A {
  constructor(y) {
    //子类只要继承父类，可以不写CONSTRUCTOR，一旦写了，则在CONSTRUCTOR中第一句话必须是SUPER()
    super(100); //=>A.call(this,100) 把父类当作普通方法执行，给方法传递参数，让方法中的THIS是子类的实例
    this.y = y;
  }
  getY() {
    console.log(this.y);
  }
}
let b = new B(200);
b.getX(); //100
b.getY(); //200
b.x; //100
b.y; //200
```

k

## **AJAX**

[XMLHttpRequest|MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)

[再也不学 AJAX 了！（二）使用 AJAX](https://juejin.im/post/6844903518055186445)

### 原生 AJAX

#### 手写 ajax

```js
function ajax(url) {
  const p = new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequester();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        } else if (xhr.status === 404) {
          reject(new Error('404 Not Found'));
        }
      }
    };
    xhr.send(null);
  });
  return p;
}

const url = '/';
ajax(url)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
```

### 基于 jQuery 的 AJAX

### Fetch

[Fetch|MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API)

#### AJAX 和 fetch 区别

1. AJAX 和 Fetch 发送同源请求时都默认携带 Cookie，跨域请求则都默认不携带 Cookie。

当我们使用 CORS 来进行跨域的时候，若想使其携带 Cookie。

服务端设置

```
Access-Control-Allow-Credentials: true
若想要使我们的 Ajax 或 Fetch 携带 Cookie，只需如此。
```

```js
// Ajax
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

// Fetch
fetch(url, {
  credentials: 'include',
});
```

Fetch 的 credentials 属性，默认值为 same-origin，想要跨域发送 Cookie 则设置为 include

- omit: 从不发送 cookies.
- same-origin: 只有当 URL 与响应脚本同源才发送 cookies、 HTTP Basic authentication 等验证信息.(浏览器默认值,在旧版本浏览器，例如 safari 11 依旧是 omit，safari 12 已更改)
- include: 不论是不是跨域的请求,总是发送请求资源域在本地的 cookies、 HTTP Basic authentication 等验证信息.

2. ajax 原生支持 abort，fetch 需要使用 AbortController 才能实现 abort

```js
// ajax
xhr.abort();

// fetch
let controller = new AbortController();
let signal = controller.signal;

fetch(url, {
  signal,
});

controller.abort();
```

3. fetch 不支持超时控制 timeout

```js
// ajax 的超时控制
xhr.timeout = 2000;
xhr.ontimeout = () => {};
```

我们如何实现 fetch 的超时控制

```js
Promise.race([
  fetch(url),
  new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('request timeout')), 2000);
  }),
])
  .then((data) => {}) // 请求成功
  .catch((reason) => {}); // 请求失败
```

4. fetch 无法检测请求的进度(onprogress)

### axios

[axios 中文说明](https://www.kancloud.cn/yunye/axios/234845)

#### axios 的参数传递

1. GET 传递参数(DELETE 类似)

```js
axios.get('/data?id=123').then((ret) => {
  console.log(ret.data);
});
```

```js
axios.get('/data/123').then((ret) => {
  console.log(ret.data);
});
```

```js
axios
  .get('/data', {
    params: {
      id: 123,
    },
  })
  .then((ret) => {
    console.log(ret.data);
  });
```

2. POST 传递参数(PUT 类似)

通过选项传递参数(默认传递的是 json 格式的数据)

```js
axios
  .post('/data', {
    uname: 'tom',
    pwd: 123,
  })
  .then((ret) => {
    console.log(ret.data);
  });
```

通过 URLSearchParams 传递参数(application/x-www-form-urlencoded)

```js
const params = new URLSearchParams();
params.append('param1', 'value1');
params.append('param2', 'value2');
axios.post('/api/test/', params).then((ret) => {
  console.log(ret.data);
});
```

#### axios 的响应结果

1. data：实际响应回来的数据

2. headers：响应头信息

3. status：响应状态码

4. statusText：响应状态信息

#### axios 的全局配置

1. axios.defaults.timeout=3000; //超时时间

2. axios.defaults.baseURL = "http://localhost:3000/app" //默认地址

3. axios.defaults.headers["mytoken"]= "asdfadfaf" //设置请求头

#### axios 拦截器

1. 请求拦截器

```js
axios.interceptors.request.use(
  function(config) {
    //在请求发出之前进行一些信息设置
    console.log(config.url);
    config.headers.mytoken = 'nihao';
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

[从 ajax 到 fetch、axios](https://juejin.im/post/5acde23c5188255cb32e7e76)
[ajax 和 axios、fetch 的区别](https://www.jianshu.com/p/8bc48f8fde75)

## **ES6\2015**

### 常用 ES6 新特性

- let、const
- 解构赋值
- 字符串 Unicode 扩展、模板字符串`${}`
- 箭头函数
- 参数默认值`function(value="default")`
- `for-of`和`for-in`
- `class`语法糖
- `Promise`

### let const

[let 和 const 命令|阮一峰](https://es6.ruanyifeng.com/?search=%E7%A7%81%E6%9C%89&x=0&y=0#docs/let)

- 全局声明的 var 变量会挂载在 window 上，而 let 和 const 不会
- var 声明变量存在变量提升，let 和 const 不会
- let、const 的作用范围是块级作用域，而 var 的作用范围是函数作用域
- 同一作用域下 let 和 const 不能声明同名变量，而 var 可以
- 同一作用域下在 let 和 const 声明前使用会存在暂时性死区
- const
  - 一旦声明必须赋值,不能使用 null 占位
  - 声明后不能再修改
  - 如果声明的是引用数据，可以修改其属性

### Set Map

#### Set

[Set](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)

Set 函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。

```js
// 去除数组的重复成员
[...new Set(array)]

[...new Set('ababbc')].join('')
// "abc"
```

Set 内部判断两个值是否不同，类似于精确相等运算符（===），主要的区别是向 Set 加入值时认为 NaN 等于自身，而精确相等运算符认为 NaN 不等于自身。

Set 结构的实例有以下属性:

`Set.prototype.constructor`：构造函数，默认就是 Set 函数。
`Set.prototype.size`：返回 Set 实例的成员总数。

Set 实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。

操作方法:

`Set.prototype.add(value)`：添加某个值，返回 Set 结构本身。
`Set.prototype.delete(value)`：删除某个值，返回一个布尔值，表示删除是否成功。
`Set.prototype.has(value)`：返回一个布尔值，表示该值是否为 Set 的成员。
`Set.prototype.clear()`：清除所有成员，没有返回值。

遍历方法:

`Set.prototype.keys()`：返回键名的遍历器
`Set.prototype.values()`：返回键值的遍历器
`Set.prototype.entries()`：返回键值对的遍历器
`Set.prototype.forEach()`：使用回调函数遍历每个成员

#### Map

[Map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)
类似于对象，是键值对的集合，但普通的对象的键只能是字符串，Map 的键可以不是

#### WeakSet / WeakMap

WeakSet 的成员只能是对象。其次，WeakSet 中的对象都是弱引用。

WeakMap 只接受对象作为键名。其次，WeakMap 中的键名所指向的对象都是弱引用。

弱引用指的是不被在引用计数中被计数的引用。

JavaScript 垃圾回收是一种内存管理技术。在这种技术中，不再被引用的对象会被自动删除，而与其相关的资源也会被一同回收。

Map 和 Set 中对象的引用都是强类型化的，并不会允许垃圾回收。这样一来，如果 Map 和 Set 中引用了不再需要的大型对象，如已经从 DOM 树中删除的 DOM 元素，那么其回收代价是昂贵的。

为了解决这个问题，ES6 还引入了另外两种新的数据结构，即称为 WeakMap 和 WeakSet 的弱集合。这些集合之所以是“弱的”，是因为它们允许从内存中清除不再需要的被这些集合所引用的对象。

[WeakMap 的学习与应用场景](https://blog.csdn.net/weixin_38382659/article/details/93386960)

### 数组扩展

[数组的扩展|阮一峰](https://es6.ruanyifeng.com/#docs/array)

扩展运算符
Array.from()
Array.of()
数组实例的 copyWithin()
数组实例的 find() 和 findIndex()
数组实例的 fill()
数组实例的 entries()，keys() 和 values()
数组实例的 flat()，flatMap()

### ES6 中箭头函数与普通函数的区别

- 函数体内的 this 对象，就是定义时所在的对象，而不是使用时所在的对象。

- 不可以当作构造函数，也就是说，不可以使用 new 命令，否则会抛出一个错误。

- 不可以使用 arguments 对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

- 不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数。

- 函数声明在变量提升中是最高的，箭头函数没有函数提升

- call 和 apply 方法只有参数，没有作用域

### for in 和 for of

[for in 和 for of 的区别](https://www.cnblogs.com/zjx304/p/10687017.html)

遍历数组

foreach:使用 foreach 遍历数组的话，使用 break 不能中断循环，使用 return 也不能返回到外层函数。

for in:

- index 索引为字符串型数字，不能直接进行几何运算
- 遍历顺序有可能不是按照实际数组的内部顺序
- 使用 for in 会遍历数组所有的可枚举属性，包括原型。例如上栗的原型方法 method 和 name 属性

for of:遍历的是数组元素值

遍历对象

for in:
for in 可以遍历到 myObject 的原型方法 method,如果不想遍历原型方法和属性的话，可以在循环内部判断一下,hasOwnPropery 方法可以判断某属性是否是该对象的实例属性,同样可以通过 ES5 的 Object.keys(myObject)获取对象的实例属性组成的数组，不包括原型方法和属性

for of:
for..of 适用遍历数/数组对象/字符串/map/set 等拥有迭代器对象的集合.但是不能遍历普通对象,因为没有迭代器对象

### Promise

[Promise|MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)
[Promises/A+规范](https://www.ituring.com.cn/article/66566)

### Generator 生成器

```js
function* foo(x) {
  let y = 2 * (yield x + 1);
  let z = yield y / 3;
  return x + y + z;
}
let it = foo(5);
console.log(it.next()); // => {value: 6, done: false}
console.log(it.next(12)); // => {value: 8, done: false}
console.log(it.next(13)); // => {value: 42, done: true}
```

- 首先 Generator 函数调用和普通函数不同，它会返回一个迭代器

- 当执行第一次 next 时，传参会被忽略，并且函数暂停在 yield (x + 1) 处，所以返回 5 + 1 = 6

- 当执行第二次 next 时，传入的参数等于上一个 yield 的返回值，如果你不传参，yield 永远返回 undefined。此时 let y = 2 _ 12，所以第二个 yield 等于 2 _ 12 / 3 = 8

- 当执行第三次 next 时，传入的参数会传递给 z，所以 z = 13, x = 5, y = 24，相加等于 42

### 生成器原理

当 yeild 产生一个值后，生成器的执行上下文就会从栈中弹出。但由于迭代器一直保持着队执行上下文的引用，上下文不会丢失，不会像普通函数一样执行完后上下文就被销毁

### Proxy

### 私有方法和私有属性

[阮老师 | ES6 入门](https://es6.ruanyifeng.com/?search=%E7%A7%81%E6%9C%89&x=0&y=0##docs/class##%E7%A7%81%E6%9C%89%E6%96%B9%E6%B3%95%E5%92%8C%E7%A7%81%E6%9C%89%E5%B1%9E%E6%80%A7)

#### 现有的解决方案

私有方法和私有属性，是只能在类的内部访问的方法和属性，外部不能访问。这是常见需求，有利于代码的封装，但 ES6 不提供，只能通过变通方法模拟实现。

一种做法是在命名上加以区别，即在函数名或属性名前加`_`，但这并不安全，只是一种团队规范。

另一种方法就是索性**将私有方法移出类，放到模块里**，因为模块内部的所有方法都是对外可见的。

```js
class Widget {
  foo(baz) {
    bar.call(this, baz);
  }

  // ...
}

function bar(baz) {
  return (this.snaf = baz);
}
```

上面代码中，foo 是公开方法，内部调用了 bar.call(this, baz)。这使得 bar 实际上成为了当前模块的私有方法。

还有一种方法是利用**Symbol 值的唯一性**，将私有方法的名字命名为一个 Symbol 值。

```js
const bar = Symbol('bar');
const snaf = Symbol('snaf');

export default class myClass {
  // 公有方法
  foo(baz) {
    this[bar](baz);
  }

  // 私有方法
  [bar](baz) {
    return (this[snaf] = baz);
  }

  // ...
}
```

上面代码中，bar 和 snaf 都是 Symbol 值，一般情况下无法获取到它们，因此达到了私有方法和私有属性的效果。但是也不是绝对不行，Reflect.ownKeys()依然可以拿到它们。

```js
const inst = new myClass();

Reflect.ownKeys(myClass.prototype);
// [ 'constructor', 'foo', Symbol(bar) ]
```

### 代码分析题

```js
function wait() {
  return new Promise((resolve) => setTimeout(resolve, 1000));
}

async function main() {
  console.time();
  const x = wait();
  const y = wait();
  const z = wait();
  await x;
  await y;
  await z;
  console.timeEnd();
}
main();
```

答案： 输出耗时： 1 秒多一点点。
原因： 3 个 wait 函数在赋值的时候就已经开始执行了。

稍微改造一下就可以得到 3 \* 1000 ms 以上的结果

```js
function wait() {
  return new Promise((resolve) => setTimeout(resolve, 1000));
}

async function main() {
  console.time();
  const x = await wait();
  const y = await wait();
  const z = await wait();
  console.timeEnd();
}

main();
```

[10 分钟学会 ES7+ES8](https://www.cnblogs.com/zhuanzhuanfe/p/7493433.html)

## **ES7\2016**

includes()

## **ES8\2017**

### async await

一个函数如果加上 async ，那么该函数就会返回一个 Promise

```js
async function test() {
  return '1';
}
console.log(test());
// -> Promise {<resolved>: "1"}
```

async 就是将函数返回值使用 Promise.resolve() 包裹了下，和 then 中处理返回值一样，并且 await 只能配套 async 使用。

```js
async function test() {
  let value = await sleep();
}
```

async 和 await 可以说是异步终极解决方案了，相比直接使用 Promise 来说，优势在于处理 then 的调用链，能够更清晰准确的写出代码，毕竟写一大堆 then 也很恶心，并且也能优雅地解决回调地狱问题。

当然也存在一些缺点，因为 **await 将异步代码改造成了同步代码**，如果多个异步代码没有依赖性却使用了 await 会导致性能上的降低。

```js
async function test() {
  // 以下代码没有依赖性的话，完全可以使用 Promise.all 的方式
  // 如果有依赖性的话，其实就是解决回调地狱的例子了
  await fetch(url);
  await fetch(url1);
  await fetch(url2);
}
```

看一个使用 await 的例子：

```js
let a = 0;
let b = async () => {
  a = a + (await 10);
  console.log('2', a);
};
b();
a++;
console.log('1', a);

//先输出  ‘1’, 1
//在输出  ‘2’, 10
```

- 首先函数 b 先执行，在执行到 await 10 之前变量 a 还是 0，因为 await 内部实现了 generator ，generator 会保留堆栈中东西，所以这时候 a = 0 被保存了下来
- 因为 await 是异步操作，后来的表达式不返回 Promise 的话，就会包装成 Promise.reslove(返回值)，然后会去执行函数外的同步代码
- 同步代码 a++ 与打印 a 执行完毕后开始执行异步代码，将保存下来的值拿出来使用，这时候 a = 0 + 10

上述解释中提到了 await 内部实现了 generator，其实 **await 就是 generator 加上 Promise 的语法糖，且内部实现了自动执行 generator**。

## **ES9\2018**

## **ES10\2019**

## **ES11\2020**

### globalThis

## **模块化**

[深入浅出 JavaScript 模块化](https://github.com/Nealyang/PersonalBlog/issues/61)

### 好处

1. 可维护性，每一个模块都是独立的。良好的设计能够极大的降低项目的耦合度。以便于其能独立于别的功能被整改。至少维护一个独立的功能模块，比维护一坨凌乱的代码要容易很多。

2. 减少全局变量污染，前端开发的初期，我们都在为全局变量而头疼，因为经常会触发一些难以排查且非技术性的 bug。当一些无关的代码一不小心重名了全局变量，我们就会遇到烦人的“命名空间污染”的问题。在模块化规范没有确定之前，其实我们都在极力的避免于此。（后文会介绍）

3. 可复用性，前端模块功能的封装，极大的提高了代码的可复用性。这点应该就不用详细说明了。想想从 npm 上找 package 的时候，是在干啥

4. 更好的分离，按需加载

### CommonJS

每个文件都可以当作一个模块

在服务器端：模块的加载是运行时同步加载的

在浏览器端：模块需要提前编译打包处理（require 浏览器不认识）

#### 语法

暴露模块

```js
module.exports = value;
exports.xxx = value;
```

[require 时，exports 和 module.exports 的区别你真的懂吗？](https://www.imooc.com/article/291145#comment)

引入模块

```js
//第三方模块,xxx为模块名
//自定义模块,xxx为模块文件路径
require(xxx);
```

#### 实现

服务器端

NodeJS

浏览器端

Browserify（CommonJS 的浏览器的打包工具）

### AMD

专门用于浏览器端, 模块的加载是异步的

#### 语法

定义暴露模块

```js
//定义没有依赖的模块
define(function() {
  return 模块;
});
//定义有依赖的模块
define(['module1', 'module2'], function(m1, m2) {
  return 模块;
});
```

引入使用模块

```js
require(['module1', 'module2'], function(m1, m2) {
  //使用m1,m2
});
```

#### 实现

[Require.js](http://www.requirejs.cn/)

[Javascript 模块化编程（三）：require.js 的用法](http://www.ruanyifeng.com/blog/2012/11/require_js.html)

### CMD

专门用于浏览器端, 模块的加载是异步的

模块使用时才会加载执行

#### 语法

定义暴露模块

```js
//定义没有依赖的模块
define(function(require, exports, module) {
  exports.xxx = value;
  module.exports = value;
});

//定义有依赖的模块
define(function(require, exports, module) {
  //引入依赖模块(同步)
  var module2 = require('./module2');
  //引入依赖模块(异步)
  require.async('./module3', function(m3) {});
  //暴露模块
  exports.xxx = value;
});
```

引入使用模块

```js
define(function(require) {
  var m1 = require('./module1');
  var m4 = require('./module4');
  m1.show();
  m4.show();
});
```

#### 实现

[Sea.js](http://www.zhangxinxu.com/sp/seajs/)

### ES6 Module

依赖模块需要编译打包处理

#### 语法

导出模块

```js
//分多次导出模块的多个部分

export class Emp {}

export function fun() {}

export var person = {};

//一次导出模块的多个部分

class Emp {}

function fun() {}

var person = {};

export { Emp, fun, person };

//default导出(只能有一个)

export default {};
```

引入模块

```js
import defaultModule from './myModule'; //导入默认的

import { Emp } from './myModule'; //导入指定的一个

import { Emp, person } from './myModule'; //导入指定的多个

import * as allFromModule from './myModule'; //导入所有
```

### AMD 和 CMD 区别

1. 对于依赖的模块，AMD 是提前执行，CMD 是延迟执行。不过 RequireJS 从 2.0 开始，也改成了可以延迟执行（根据写法不同，执行的方式不同）
2. CMD 推崇就近依赖，AMD 推崇依赖前置。

```js
//CMD 的方式
define(function(require, exprots, module) {
  var a = require('./a');
  a.dosmting();
  //省略 1W 行
  var b = require('./b');
  b.dosmting();
});

//AMD 的方式
define(['./a', './b'], function(a, b) {
  a.dosmting();
  //省略 1W 行
  b.dosmting();
});
```

以上 AMD 的写法是官方推崇的方式，但是同时也支持 CMD 的写法

3. AMD 支持全局 require、局部 require，但是 CMD 不支持全局 require，所以 CMD 没有全局 API 而 AMD 有

### CommonJS 和 ES6 Module 的区别

1. CommonJS : `module.exports(批量)，exports` 导出，`require` 导入
   ES6 : `export` 导出，`import` 导入

2. CommonJS：动态引入，执行时引入，可以写在判断里
   ES6 Module：静态引入，编译时引入；只有 ES6 Module 才能静态分析，实现 Tree-Shaking

3. CommonJS 不会提升 require
   ES6 在编译期间会将所有 import 提升到顶部，

4. CommonJS 导出的是一个值拷贝，会对加载结果进行缓存，一旦内部再修改这个值，则不会同步到外部，如果想更新值，必须重新导入一次
   ES6 是导出的一个引用，导入导出的值都指向同一个内存地址，所以导入值会跟随导出值变化

5. CommonJS ：顶层的 this 指向当前
   ES6 ：顶层 this 指向 undefined

6. CommonJS：同步导入，因为用于服务端，文件都在本地，同步导入即使卡住主线程影响也不大

   ES6 Module：异步导入，因为用于浏览器，需要下载文件，如果也采用同步导入会对渲染有很大影响

7. ES6 Module 兼容性不好，在 webpack 中会经过 Babel 编译成 require/exports 来执行的

## **事件**

### 事件触发三阶段

[事件流程]("./事件流程.html")

事件触发有三个阶段：

- 捕获阶段：windows 往事件触发处传播，遇到注册的捕获事件会触发
- 目标阶段：传播到事件触发处时触发注册的事件
- 冒泡阶段：从事件触发处往 windows 传播，遇到注册的冒泡事件会触发

事件触发一般来说会按照上面的顺序进行，但是也有特例，如果给一个 body 中的子节点同时注册冒泡和捕获事件，事件触发会按照注册的顺序执行。

### 注册事件

通常使用 addEventListener 注册事件，该函数的第三个参数可以是布尔值，也可以是对象。第三个参数默认值为 false，决定了注册的事件是捕获事件（ture 为）还是冒泡事件。

一般来说，如果我们只希望事件只触发在目标上，这时候可以使用 stopPropagation 来阻止事件的进一步传播。

通常我们认为 stopPropagation 是用来阻止事件冒泡的，其实该函数也可以阻止捕获事件。

GstopImmediatePropagation 同样也能实现阻止事件，但是还能阻止该事件目标执行别的注册事件。

### target 和 currentTarget

target 是触发事件的某个具体的对象，只会出现在事件机制的目标阶段，谁触发了事件，谁就是 target 。

currentTarget 是绑定事件的对象。

### onXXXX 事件与 addeventlistener 的区别

#### 用法

onXXXX：

1.

```js
obj.onclick = function() {
  //do Something...
};
```

2.

```js
obj.onclick=fn;
function fn = {
  //do Something...
}
```

3. 当函数 fn 有参数的情况下使用匿名函数来传参

```js
obj.onclick=function(){fn(param);}
function fn(param)={
  //doSomething
}
```

!> 错误写法：

```js
obj.onclick = fn(param);
```

这样写函数会立即执行，不会等待点击触发。

addEventListener:

```js
addEventListener(Event, functionName, useCapture);
//Event:事件的类型，如`click`
//functionName:方法名
//useCapture:布尔值，指定是在捕获或者冒泡阶段执行
//true-事件句柄在捕获阶段执行
//false-(默认)冒泡阶段
```

1.

```js
obj.addEventListener("click",function(){
//do something
}));
```

2. 没参数可以直接写函数名

```js
   obj.addEventListener("click",fn));
   funciton fn(){
   //do something..
   }
```

3. 函数有参数时需要使用匿名函数来传递参数

```js
   obj.addEventListener("click",function(){fn()param});
```

区别：

1. onXXXX 事件会被之后创建的相同的 onXXXX 事件覆盖,addEventListener 不会

2. onXXXX 不能设置捕获和冒泡那个优先，

3. onXXXX 无法自定义事件，addEventListener 可以

```js
obj.addEvent(event, funtionName);
//event:事件类型（需要写成“onclick”前面加 on，这个与 addEventListener 不同）
//funtionName:方法名（要参数是也是需要使用匿名函数来传参）
```

### 取消默认操作

[取消默认操作](https://wiki.jikexueyuan.com/project/brief-talk-js/event-cancellation-and-prevent-bubbles.html)

取消默认操作
w3c 的方法是 e.preventDefault()，IE 则是使用 e.returnValue = false;

```js
function cancelHandler(event) {
  var event = event || window.event; //用于IE
  if (event.preventDefault) event.preventDefault(); //标准技术
  if (event.returnValue) event.returnValue = false; //IE
  return false; //用于处理使用对象属性注册的处理程序
}
```

## **正则表达式**

[正则表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions)

## **设计模式**

[前端需要了解的 9 种设计模式](https://segmentfault.com/a/1190000022396503#item-4-3)

设计模式是对软件设计开发过程中反复出现的某类问题的通用解决方案

设计模式更多的是指导思想和方法论，而不是现成的代码，当然每种设计模式都有每种语言中的具体实现方式。

### 设计模式原则

#### S-Single Responsibility Principle 单一职责原则

- 一个程序只做一件事
- 如果功能过于复杂就拆分开，每个部分保持独立

#### O-OpenClosed Principle 开放封闭原则

- 对扩展开放，对修改封闭
- 增加需求时，扩展新代码，而非修改已有代码

#### L-Liskov Substitution Principle 里氏替换原则

- 子类能覆盖父类
- 父类能出现的地方子类就能出现

#### I-Interfack Segregation Principle 接口隔离原则

- 保持接口的单一独立
- 类似单一职责原则，这里更关注接口

#### D-Dependency Inversion Principle 依赖倒转原则

- 面向接口编程，依赖于抽象而不依赖具体
- 使用方只管据接口而不依赖于具体

### 创建型(Creational Patterns)

#### **工厂模式(Factory Pattern)**

工厂模式定义一个用于创建对象的接口，这个接口由子类决定实例化哪一个类。

该模式使一个类的实例化延迟到了子类。而子类可以重写接口方法以便创建的时候指定自己的对象类型。

当构造函数过多不方便管理，且需要创建的对象之间存在某些关联（有同一个父类、实现同一个接口等）时，不妨使用工厂模式。

工厂模式提供一种集中化、统一化的方式，避免了分散创建对象导致的代码重复、灵活性差的问题。

场景：

1.  JQuery 的`$()`就是一个工厂函数，它根据传入参数的不同创建元素或者去寻找上下文中的元素，创建成相应的 jQuery 对象

```js
class jQuery {
  constructor(selector) {
    super(selector);
  }
  add() {}
  // 此处省略若干API
}
window.$ = function(selector) {
  return new jQuery(selector);
};
```

2. React.createElement

```js
class Vnode (tag,attrs,children){
  //...
}
React.createElement=function(tag,attrs,children){
  return new Vnode(tag,attrs,children)
}
```

3. Vue 异步组件

在大型应用中，我们可能需要将应用分割成小一些的代码块，并且只在需要的时候才从服务器加载一个模块。

为了简化，Vue 允许你以一个工厂函数的方式定义你的组件，这个工厂函数会异步解析你的组件定义。

Vue 只有在这个组件需要被渲染的时候才会触发该工厂函数，且会把结果缓存起来供未来重渲染。

```js
Vue.component('async-example', function(resolve, reject) {
  setTimeout(function() {
    // 向 `resolve` 回调传递组件定义
    resolve({
      template: '<div>I am async!</div>',
    });
  }, 1000);
});
```

#### **单例模式(Singleton Pattern)**

一个类只有一个实例，并提供一个访问它的全局访问点

当需要一个对象去贯穿整个系统执行某些任务时，单例模式就派上了用场。

除此之外的场景尽量避免单例模式的使用，因为单例模式会引入全局状态，而一个健康的系统应该避免引入过多的全局状态。

场景：

1. Jquery 的`$`

```js
if (window.jQuery != null) {
  return window.jQuery;
} else {
  //初始化
}
```

2. 登录框/购物车

```js
class LoginForm {
  constructor() {
    this.state = 'hide';
  }
  show() {
    if (this.state === 'show') {
      alert('已经显示');
      return;
    }
    this.state = 'show';
    console.log('登录框显示成功');
  }
  hide() {
    if (this.state === 'hide') {
      alert('已经隐藏');
      return;
    }
    this.state = 'hide';
    console.log('登录框隐藏成功');
  }
}
LoginForm.getInstance = (function() {
  let instance;
  return function() {
    if (!instance) {
      instance = new LoginForm();
    }
    return instance;
  };
})();
let obj1 = LoginForm.getInstance();
obj1.show();
let obj2 = LoginForm.getInstance();
obj2.hide();
console.log(obj1 === obj2);
```

3. vuex 和 redux 中的 store

#### 原型模式

原型模式（prototype）是指用原型实例指向创建对象的种类，并且通过拷贝这些原型创建新的对象。

原型模式，就是创建一个共享的原型，通过拷贝这个原型来创建新的类，用于创建重复的对象，带来性能上的提升。

场景：

1. Object.create()

```js
```

#### 抽象工厂模式

#### 建造者模式

### 结构型(Structural Patterns)

#### **适配器模式**

将一个类的接口转化为另外一个接口，以满足用户需求，使类之间接口不兼容问题通过适配器得以解决。
场景：

1. 整合第三方 SDK
2. 封装旧接口

```js
// 自己封装的ajax， 使用方式如下
ajax({
  url: '/getData',
  type: 'Post',
  dataType: 'json',
  data: {
    test: 111,
  },
}).done(function() {});
// 因为历史原因，代码中全都是：
// $.ajax({....})
// 做一层适配器
var $ = {
  ajax: function(options) {
    return ajax(options);
  },
};
```

3. Vue 中的 compute

```html
<template>
  <div id="example">
    <p>Original message: "{{ message }}"</p>
    <!-- Hello -->
    <p>Computed reversed message: "{{ reversedMessage }}"</p>
    <!-- olleH -->
  </div>
</template>
<script type="text/javascript">
  export default {
    name: 'demo',
    data() {
      return {
        message: 'Hello',
      };
    },
    computed: {
      reversedMessage: function() {
        return this.message
          .split('')
          .reverse()
          .join('');
      },
    },
  };
</script>
```

#### **装饰器模式**

动态地给某个对象添加一些额外的职责，，是一种实现继承的替代方案

在不改变原对象的基础上，通过对其进行包装扩展，使原有对象可以满足用户的更复杂需求，而不会影响从这个类中派生的其他对象
场景：

1. ES7 decorators

2. core-decorators

#### **代理模式(Proxy Pattern)**

为一个对象提供一个代用品或占位符，以便控制对它的访问

当访问一个对象本身的代价太高（比如太占内存、初始化时间太长等）或者需要增加额外的逻辑又不修改对象本身时便可以使用代理

代理模式可以解决以下的问题：

增加对一个对象的访问控制
当访问一个对象的过程中需要增加额外的逻辑

要实现代理模式需要三部分：

Real Subject：真实对象
Proxy：代理对象
Subject 接口：Real Subject 和 Proxy 都需要实现的接口，这样 Proxy 才能被当成 Real Subject 的“替身”使用

场景：

1. HTML 事件代理
2. ES6 proxy
3. jQuery.proxy()

适配器模式：提供一个不同的接口（如不同版本的插头）
代理模式：提供一摸一样的接口

装饰器模式：扩展功能，原有功能不变且可直接使用
代理模式：显示原有功能，但是经过限制之后

#### **外观模式(Facade Pattern)**

为子系统的一组接口提供一个一致的界面，定义了一个高层接口，这个接口使子系统更加容易使用

外观设计模式就是把多个子系统中复杂逻辑进行抽象，从而提供一个更统一、更简洁、更易用的 API

JQuery 就把复杂的原生 DOM 操作进行了抽象和封装，并消除了浏览器之间的兼容问题，从而提供了一个更高级更易用的版本

场景：

1. 兼容浏览器事件绑定

```js
// 绑定事件
function addEvent(element, event, handler) {
  if (element.addEventListener) {
    element.addEventListener(event, handler, false);
  } else if (element.attachEvent) {
    element.attachEvent('on' + event, handler);
  } else {
    element['on' + event] = fn;
  }
}
// 取消绑定
function removeEvent(element, event, handler) {
  if (element.removeEventListener) {
    element.removeEventListener(event, handler, false);
  } else if (element.detachEvent) {
    element.detachEvent('on' + event, handler);
  } else {
    element['on' + event] = null;
  }
}
```

2. 封装接口

```js
let myEvent = {
  // ...
  stop: (e) => {
    e.stopPropagation();
    e.preventDefault();
  },
};
```

#### 桥接模式

桥接模式（Bridge）将抽象部分与它的实现部分分离，使它们都可以独立地变化。

```js
class Color {
  constructor(name) {
    this.name = name;
  }
}
class Shape {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }
  draw() {
    console.log(`${this.color.name} ${this.name}`);
  }
}
//测试
let red = new Color('red');
let yellow = new Color('yellow');
let circle = new Shape('circle', red);
circle.draw();
let triangle = new Shape('triangle', yellow);
triangle.draw();
```

#### 组合模式

将对象组合成树形结构，以表示“整体-部分”的层次结构。

通过对象的多态表现，使得用户对单个对象和组合对象的使用具有一致性。

```js
class TrainOrder {
  create() {
    console.log('创建火车票订单');
  }
}
class HotelOrder {
  create() {
    console.log('创建酒店订单');
  }
}

class TotalOrder {
  constructor() {
    this.orderList = [];
  }
  addOrder(order) {
    this.orderList.push(order);
    return this;
  }
  create() {
    this.orderList.forEach((item) => {
      item.create();
    });
    return this;
  }
}
// 可以在购票网站买车票同时也订房间
let train = new TrainOrder();
let hotel = new HotelOrder();
let total = new TotalOrder();
total
  .addOrder(train)
  .addOrder(hotel)
  .create();
```

#### 享元模式

运用共享技术有效地支持大量细粒度对象的复用。系统只使用少量的对象，而这些对象都很相似，状态变化很小，可以实现对象的多次复用。由于享元模式要求能够共享的对象必须是细粒度对象，因此它又称为轻量级模式，它是一种对象结构型模式

### 行为型(Behavioral Patterns)

#### **观察者模式**

被观察对象（subject）维护一组观察者（observer），当被观察对象状态改变时，通过调用观察者的某个方法将这些变化通知到观察者。

定义了一种一对多的关系，让多个观察者对象同时监听某一个主题对象，这个主题对象的状态发生变化时就会通知所有的观察者对象，使它们能够自动更新自己，当一个对象的改变需要同时改变其它对象，并且它不知道具体有多少对象需要改变的时候，就应该考虑使用观察者模式。

观察者模式中 Subject 对象一般需要实现以下 API：

subscribe(): 接收一个观察者 observer 对象，使其订阅自己
unsubscribe(): 接收一个观察者 observer 对象，使其取消订阅自己
fire(): 触发事件，通知到所有观察者

场景：

1. DOM 事件

```js
document.body.addEventListener('click', function() {
  console.log('hello world!');
});
document.body.click();
```

2. jQuery.callback

3. nodeJS 自定义事件

4. nodeJS 处理 http 请求，多进程通信

5. Vue 和 React 组件生命周期触发

6. Vue 的 watch

#### 迭代器模式

迭代器模式解决了以下问题：

提供一致的遍历各种数据结构的方式，而不用了解数据的内部结构
提供遍历容器（集合）的能力而无需改变容器的接口

#### 策略模式

定义一系列的算法，把它们一个个封装起来，并且使它们可以互相替换

对象有某个行为，但是在不同的场景中，该行为有不同的实现算法

策略模式有以下优势：

方便在运行时切换算法和策略
代码更简洁，避免使用大量的条件判断
关注分离，每个 strategy 类控制自己的算法逻辑，strategy 和其使用者之间也相互独立

场景：

1. 登录鉴权

鉴权算法取决于用户的登录方式是手机、邮箱或者第三方的微信登录等等，而且登录方式也只有在运行时才能获取，获取到登录方式后再动态的配置鉴权策略。

所有这些策略应该实现统一的接口，或者说有统一的行为模式。Node 生态里著名的鉴权库 Passport.js API 的设计就应用了策略模式。

```js
//passport.js
/**
 * 登录控制器
 */
function LoginController() {
  this.strategy = undefined;
  this.setStrategy = function(strategy) {
    this.strategy = strategy;
    this.login = this.strategy.login;
  };
}
/**
 * 用户名、密码登录策略
 */
function LocalStragegy() {
  this.login = ({ username, password }) => {
    console.log(username, password);
    // authenticating with username and password...
  };
}
/**
 * 手机号、验证码登录策略
 */
function PhoneStragety() {
  this.login = ({ phone, verifyCode }) => {
    console.log(phone, verifyCode);
    // authenticating with hone and verifyCode...
  };
}
/**
 * 第三方社交登录策略
 */
function SocialStragety() {
  this.login = ({ id, secret }) => {
    console.log(id, secret);
    // authenticating with id and secret...
  };
}
const loginController = new LoginController();
// 调用用户名、密码登录接口，使用LocalStrategy
app.use('/login/local', function(req, res) {
  loginController.setStrategy(new LocalStragegy());
  loginController.login(req.body);
});
// 调用手机、验证码登录接口，使用PhoneStrategy
app.use('/login/phone', function(req, res) {
  loginController.setStrategy(new PhoneStragety());
  loginController.login(req.body);
});
// 调用社交登录接口，使用SocialStrategy
app.use('/login/social', function(req, res) {
  loginController.setStrategy(new SocialStragety());
  loginController.login(req.body);
});
```

#### 模板方法模式

#### 职责链模式

#### 命令模式

#### 备忘录模式

#### 状态模式

#### 访问者模式

访问者模式是一种将算法与对象结构分离的设计模式，通俗点讲就是：访问者模式让我们能够在不改变一个对象结构的前提下能够给该对象增加新的逻辑，新增的逻辑保存在一个独立的访问者对象中。访问者模式常用于拓展一些第三方的库和工具。

访问者模式的实现有以下几个要素：

Visitor Object：访问者对象，拥有一个 visit() 方法
Receiving Object：接收对象，拥有一个 accept() 方法
visit(receivingObj)：用于 Visitor 接收一个 Receiving Object
accept(visitor)：用于 Receving Object 接收一个 Visitor，并通过调用 Visitor 的 visit() 为其提供获取 Receiving Object 数据的能力

#### 中介者模式

在中介者模式中，中介者（Mediator）包装了一系列对象相互作用的方式，使得这些对象不必直接相互作用，而是由中介者协调它们之间的交互，从而使它们可以松散偶合。当某些对象之间的作用发生改变时，不会立即影响其他的一些对象之间的作用，保证这些作用可以彼此独立的变化。

中介者模式和观察者模式有一定的相似性，都是一对多的关系，也都是集中式通信，不同的是中介者模式是处理同级对象之间的交互，而观察者模式是处理 Observer 和 Subject 之间的交互。中介者模式有些像婚恋中介，相亲对象刚开始并不能直接交流，而是要通过中介去筛选匹配再决定谁和谁见面。中介者模式比较常见的应用比如聊天室，聊天室里面的人之间并不能直接对话，而是通过聊天室这一媒介进行转发。

#### 解释器模式

## **基本规范**

1. 一个函数作用域中所有的变量声明应该尽量提到函数首部，用一个 var 声明，不允许出现两个连续的 var 声明，声明时如果变量没有值，应该给该变量赋值对应类型的初始值，便于他人阅读代码时，能够一目了然的知道变量对应的类型值。

2. 代码中出现地址、时间等字符串时需要使用常量代替。

3. 在进行比较的时候，尽量使用'===', '!=='代替'==', '!='。

4. 不要在内置对象的原型上添加方法，如 Array, Date。

5. switch 语句必须带有 default 分支。

6. for 循环必须使用大括号。

7. if 语句必须使用大括号。
   F
