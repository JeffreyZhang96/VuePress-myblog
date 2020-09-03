---
title: 算法
---

## **数据结构**

### 数组

优点：

1. 构建简单
2. 在 O(1)的时间里根据数组的下标查询某个元素

缺点：

1. 构建时必须分配一段连续的空间
2. 查询某元素是否存在时需要遍历整个数组，耗费 O(n)的时间
3. 删除和添加某个元素的时候，耗费 O(n)

### 链表

优点：

1. 灵活地分配内存空间
2. 能在 O(1)时间内删除或者添加元素（前提知道前一个元素）

缺点：

1. 查询元素需要 O(n)时间

长度未知，需要频繁地删除添加数据，用链表

长度已知，不需要频繁地删除添加数据，用数组

解题技巧：

1. 利用快慢指针（有时候需要用到三个指针、例如链表的翻转、寻找倒数第 K 个元素、寻找中间位置的元素、判断链表是否有环）
2. 构建一个虚假的链表头，一般用在要返回新的链表的题目中，例如合并两个排序列表，将链表的奇偶数按原定顺序分离，前半奇后半偶。减少了创建新链表的第一个元素时，多写一条 ifelse 语句

### 栈

只关心上一次的操作，处理完上一次的操作后，能在 O(1)时间内查找到更前一次的操作

### 二叉树

#### 满二叉树

除最后一层无任何子节点外，每一层上的所有结点都有两个子结点的二叉树

#### 完全二叉树

除最后一层其它各层的结点数都达到最大个数，最后一层所有的结点都连续集中在最左边、、

## **算法**

### 递归

```js
function fn(n){
  //第一步：判断输入或者状态是否非法(完整性检查Sanity Check)
  if(input/state is invaild){
    return;
  }
  //第二步：判断递归是否应当结束
  if(match condition){
    return some value;
  }
  //第三步：缩小问题规模
  result1 = fn(n1)
  result2 = fn(n2)
  //第四步：整合结果
  return combine(result1,result2)
}
```

### 回溯

```js
//第一步：判断输入或者状态是否非法？
if(input/state is invalid){
  return;
}
//第二步：判断当前情况是否已经满足条件，如是，将当前结果保存并返回
if(match condition){
  return some value;
}
//遍历所有可能出现的情况，并进行递归
for(all possible case){
  //第三步：尝试下一步的可能性
  solution.push(case)
  //递归
  result = fn(m)
  //第四步：回溯到上一步，回溯的方法就是取消前一步进行的尝试
  solution.pop(case)
}
```

### 动态规划

1. 其本质是利用申请的空间来记录每个暴力搜索的计算结果，下次要用结果的时候直接使用，而不再进行重复的递归过程
2. 动态规划规定每一种递归状态的计算顺序，依次计算

暴力递归题目可以优化成动态规划方法的大体过程

1. 实现暴力递归方法
2. 在暴力搜索方法的函数中看看哪些参数可以代表递归过程
3. 找到代表递归过程的参数之后,记忆化搜索的方法非常容易实现
4. 通过分析记忆化搜索的依赖路径,进而实现动态规划
5. 根据记忆化搜索方法改出动态规划方法,进而看看是否能化简,如果能化简,还能实现时间复杂度更低的动态规划方法

动态规划方法的关键点

1. 最优化原理,也就是最优子结构性质。这指的是最优化策略具有这样的性质,不论过去状态和决策如何,对前面的决策所形成的状态而言,余下的诸决策必须构成最优策略。简单来说就是一个最优化策略的子策略总是最优的,如果一个问题满足最优化原理就称其具有最优子结构性质
2. 无后效性。指的是某状态下决策的收益,只与状态和决策相关,与到达该状态的方式无关
3. 子问题的重疊性,动态规划将原来具有指数级时间复杂度的暴力搜索算法改进成了具有多项式时间复杂度的算法。其中的关键在于解决冗余,这是动态规划算法的根本目的。

重要属性

- 最优子结构 Optimal Substructure
  - 状态转移方程 f(n)
- 重叠子问题 Overlapping Sub-problems

### 二分搜索 Binary Search

定义：

二分搜索也称折半搜索，是一种在有序数组中查找某一特定元素的搜索算法

运用前提：

- 数组必须是排好序的
- 输入并不一定是数组，也可能是给定一个区间的起始和终止的位置

优点：

- 二分搜索也称对数搜索，其时间复杂度为 O(logn)，是一种非常高效的搜索

缺点：

- 要求带查找的数组或区间是排好序的
- 若要求对数组进行动态地删除和插入操作并完成查找，平均复杂度会变为 O(n)
- 采取自平衡的二叉查找树
  - 可在 O(nlogn)的时间内用给定的数据构建出一个二叉查找树
  - 可在 O(logn)的时间内对数据进行搜索
  - 可在 O(logn)的时间内完成删除和插入的操作

当输入的数组或区间是有序的，且不会常变动，要求从中找出一个满足条件的元素，采用二分搜索

基本解题模板

- 递归
  - 优点是简洁
  - 缺点是执行消耗大
- 非递归

### 贪婪 Greedy

定义：
贪婪是一种在每一步选中都采取在当前状态下最好或最优的选择，从而希望导致结果是最好或最优的算法

优点

- 对于一些问题，贪婪算法非常的直观有效

缺点

- 往往，它得到的结果不一定是正确的
- 贪婪算法容易过早地做出决定，从而没有办法达到最优解

运用前提

- 只有当那些局部最优策略能产生全局最优策略的时候

### 复杂度计算

当递归函数的时间执行函数满足如下的关系式时，可以利用公式法：

`T(n)=a*T(n/b)+f(n)`

`O(n^logba)`

## **数学方法**

### 水壶问题 jz365

有两个容量分别为 x 升 和 y 升 的水壶以及无限多的水。请判断能否通过使用这两个水壶，从而可以得到恰好 z 升 的水？
如果可以，最后请用以上水壶中的一或两个来盛放取得的 z 升 水。

> gcd

```js
var canMeasureWater = function(x, y, z) {
  if (z === 0) return true;
  if (x + y < z) return false;
  const gcd = (a, b) => (0 === b ? a : gcd(b, a % b));
  return z % gcd(x, y) === 0 ? true : false;
};
```

### 求 1+2+...+n jz64

求 1+2+...+n ，要求不能使用乘除法、for、while、if、else、switch、case 等关键字及条件判断语句（A?B:C）

> &&短路

```js
var sumNums = function(n) {
  return n && sumNums(n - 1) + n;
};
```

> 对数

```js
var sumNums = function(n) {
  return Math.exp(Math.log(n) + Math.log(n + 1) - Math.log(2));
};
```

> \*\* >>

```js
var sumNums = function(n) {
  return (n ** 2 + n) >> 1;
};
```

## **位运算**

### 二进制中 1 的个数 jz15

```js
var hammingWeight = function(n) {
  let count = 0;
  let flag = 1;
  let times = 0;
  while (times++ < 32) {
    if (flag & n) {
      ++count;
    }
    flag <<= 1;
  }
  return count;
};
```

```js
var hammingWeight = function(n) {
  let res = 0;
  while (n) {
    if (n & 1) {
      res++;
    }
    n >>>= 1;
  }
  return res;
};
```

```js
var hammingWeight = function(n) {
  let count = 0;
  while (n) {
    n = n & (n - 1);
    ++count;
  }
  return count;
};
```

优于第一个因为不需要循环 32 次

### 数值的整数次方 jz16

> BS

```js
var myPow = function(x, n) {
  const isNegative = n < 0;
  const result = absMyPow(x, Math.abs(n));
  return isNegative ? 1 / result : result;
};
function absMyPow(base, exponent) {
  if (exponent === 0) {
    return 1;
  }
  if (exponent === 1) {
    return base;
  }
  const subResult = absMyPow(base, Math.floor(exponent / 2));
  return exponent % 2 ? subResult * subResult * base : subResult * subResult;
}
```

> 快速幂

```js
var myPow = function(x, n) {
  let absn = Math.abs(n);
  let result = 1;
  while (absn) {
    if (absn & 1) {
      result = result * x;
    }
    x = x * x;
    absn >>= 1;
  }
  return n < 0 ? 1 / result : result;
};
```

### 打印从 1 到最大的 n 位数 js17

> 快速幂

```js
var printNumbers = function(n) {
  let max = 1;
  let base = 10;
  while (n) {
    if (n & 1) {
      max *= base;
    }
    base *= base;
    n = Math.floor(n / 2);
  }
  return Array.from({ length: max - 1 }, (item, index) => index + 1);
};
```

### 交换数字 msjd16.01

```js
var swapNumbers = function(numbers) {
  numbers[0] = numbers[0] ^ numbers[1];
  numbers[1] = numbers[0] ^ numbers[1];
  numbers[0] = numbers[0] ^ numbers[1];
  return numbers;
};
```

### 最大数值 msjd16.07

编写一个方法，找出两个数字 a 和 b 中最大的那一个。不得使用 if-else 或其他比较运算符

```js
var maximum = function(a, b) {
  let c = a - b;
  let as = sign(a);
  let bs = sign(b);
  let cs = sign(c);
  let difab = as ^ bs;
  let sameab = flip(difab);
  let returnA = difab * as + sameab * cs;
  let returnB = flip(returnA);
  return a * returnA + b * returnB;
};

var sign = function(num) {
  return flip((num >> 31) & 1);
};
var flip = function(num) {
  return num ^ 1;
};
```

### 不用加减乘除做加法 jz65 msjd17.01

```js
var add = function(a, b) {
  return b ? add(a ^ b, (a & b) << 1) : a;
};
```

## **字符串**

### 替换空格 jz05

> 内置 API

```js
function replaceSpace(str) {
  return str.split(' ').join('%20');
  //return encodeURIComponent(str);//会把%解码
  //return str.replace(/\s/g,"%20");
}
```

### 表示数值的字符串 jz18

请实现一个函数用来判断字符串是否表示数值（包括整数和小数）。
例如，字符串"+100","5e2","-123","3.1416"和"-1E-16"都表示数值。
但是"12e","1a3.14","1.2.3","+-5"和"12e+4.3"都不是。

```js
var isNumber = function(s) {
  return new RegExp(
    /^\s*[+-]?((\d+(\.\d*)?)|\.\d+)([e][+-]?\d+)?\s*$/,
    'g'
  ).test(s);
};
```

### 第一个只出现一次的字符 jz50

在字符串 s 中找出第一个只出现一次的字符。如果没有，返回一个单空格。

> hash

```js
var firstUniqChar = function(s) {
  let arr = s.split('');
  let map = {};
  for (let item of arr) {
    if (map[item]) {
      map[item]++;
    } else {
      map[item] = 1;
    }
  }
  for (let key in map) {
    if (map[key] === 1) {
      return key;
    }
  }
  return ' ';
};
```

```js
//Init module if you need
let map = {};
function Init() {
  // write code here
  map = {};
}
//Insert one char from stringstream
function Insert(ch) {
  // write code here
  map[ch] = map[ch] ? map[ch] + 1 : 1;
}
//return the first appearence once char in current stringstream
function FirstAppearingOnce() {
  // write code here
  for (const i in map) 0{
    if (map[i] === 1) {
      return i;
    }
  }
  return "##";
}
```

### 翻转单词顺序 jz58-I

> API

```js
var reverseWords = function(s) {
  return s
    .trim()
    .split(/\s+/)
    .reverse()
    .join(' ');
};
```

### 左旋转字符串 jz58-II

字符串的左旋转操作是把字符串前面的若干个字符转移到字符串的尾部。请定义一个函数实现字符串左旋转操作的功能。比如，输入字符串"abcdefg"和数字 2，该函数将返回左旋转两位得到的结果"cdefgab"。

> API

```js
var reverseLeftWords = function(s, n) {
  let arr = s.split('');
  while (n--) {
    arr.push(arr.shift());
  }
  return arr.join('');
};
var reverseLeftWords = function(s, n) {
  return s.substring(n) + s.substring(0, n);
};
var reverseLeftWords = function(s, n) {
  return (s + s).substring(n, n + s.length);
};
```

> for 循环

```js
var reverseLeftWords = function(s, n) {
  let res = '';
  for (let i = n; i < s.length; i++) {
    res += s.charAt(i);
  }
  for (let i = 0; i < n; i++) {
    res += s.charAt(i);
  }
  return res;
};
var reverseLeftWords = function(s, n) {
  let res = '';
  for (let i = n; i < n + s.length; i++) {
    res += s.charAt(i % s.length);
  }
  return res;
};
```

### 无重复字符的最长字串 lc03

> 滑动窗口

时间复杂度：O(n^2)

空间复杂度：O(n)

```js
var lengthOfLongestSubstring = function(s) {
  let arr = [],
    max = 0;
  for (let item of s) {
    let index = arr.indexOf(item);
    arr.push(item);
    if (index !== -1) {
      arr = arr.slice(index + 1);
    }
    max = Math.max(max, arr.length);
  }
  return max;
};
```

> Map

```js
var lengthOfLongestSubstring = function(s) {
  let map = new Map(),
    max = 0;
  for (let i = 0, j = 0; j < s.length; j++) {
    if (map.has(s[j])) {
      i = Math.max(map.get(s[j]) + 1, i);
    }
    max = Math.max(max, j - i + 1);
    map.set(s[j], j);
  }
  return max;
};
```

### 罗马数字转整数 lc13

> hash

```js
var romanToInt = function(s) {
  let char = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  let arr = s.split('');
  let result = char[arr[0]];
  for (let i = 1; i < arr.length; i++) {
    result +=
      char[arr[i - 1]] < char[arr[i]]
        ? char[arr[i]] - 2 * char[arr[i - 1]]
        : char[arr[i]];
  }
  return result;
};
```

### 最长公共前缀 lc14

```js
var longestCommonPrefix = function(strs) {
  if (!strs.length) return '';
  let res = strs[0];
  for (let i = 1; i < strs.length; i++) {
    for (let j = 0; j < res.length; j++) {
      if (j == strs[i].length || res[j] !== strs[i][j]) {
        res = res.slice(0, j);
        break;
      }
    }
  }
  return res;
};
```

### 有效的括号 lc20

> stack

```js
var isValid = function(s) {
  let stack = [];
  let obj = {
    '(': ')',
    '[': ']',
    '{': '}',
  };
  for (let i of s) {
    if (obj[i]) {
      stack.push(i);
    } else {
      if (obj[stack.pop()] !== i) return false;
    }
  }
  return stack.length ? false : true;
};
```

> RegExp

```js
var isValid = function(s) {
  let reg = /\(\)|\[\]|\{\}/g;
  while (s.match(reg)) {
    s = s.replace(reg, '');
  }
  return s ? false : true;
};
```

### 括号生成 lc22

```jsk
var generateParenthesis = function (n) {
  let res = [];
  function help(cur, left, right) {
    if (left + right == 2 * n) {
      res.push(cur);
    }
    if (left < n) {
      help(cur + "(", left + 1, right);
    }
    if (right < left) {
      help(cur + ")", left, right + 1);
    }
  }
  help("", 0, 0);
  return res;
};
```

### 简化路径 lc71

> 栈

```js
var simplifyPath = function(path) {
  const stack = [];
  const pathArr = path.split('/');
  for (let item of pathArr) {
    if (item === '' || item === '.') {
      continue;
    } else if (item === '..') {
      stack.pop();
    } else {
      stack.push(item);
    }
  }
  return '/' + stack.join('/');
};
```

### 解码方法 lc91

> Recursion

```js
var numDecodings = function(s) {
  if (s[0] == '0') return 0;
  let arr = s.split('');
  return decode(arr, arr.length - 1);
};
var decode = function(arr, n) {
  if (n <= 0) {
    return 1;
  }
  let res = 0;
  let cur = arr[n];
  let pre = arr[n - 1];
  if (cur !== '0') {
    res = decode(arr, n - 1);
  }
  if (pre == '1' || (pre == '2' && cur <= '6')) {
    res += decode(arr, n - 2);
  }
  return res;
};
```

### 验证回文串 lc125

> API

```js
var isPalindrome = function(s) {
  let temp = s.replace(/\W/g, '').toLowerCase();
  return (
    temp ===
    temp
      .split('')
      .reverse()
      .join('')
  );
};
```

> 双指针

```js
var isPalindrome = function(s) {
  let temp = s.replace(/\W/g, '').toLowerCase();
  let left = 0;
  let right = temp.length - 1;
  while (left < right) {
    if (temp[left] != temp[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
};
```

### 比较版本号 lc165

```js
var compareVersion = function(version1, version2) {
  let arr1 = version1.split('.');
  let arr2 = version2.split('.');
  let length = Math.max(arr1.length, arr2.length);
  while (arr1.length !== length) {
    arr1.push(0);
  }
  while (arr2.length !== length) {
    arr2.push(0);
  }
  for (let i = 0; i < length; i++) {
    if (+arr1[i] < +arr2[i]) {
      return -1;
    }
    if (+arr1[i] > +arr2[i]) {
      return 1;
    }
  }
  return 0;
};
```

### 字符串解码 lc394

```js
const decodeString = (s) => {
  let numStack = [];
  let strStack = [];
  let num = 0;
  let result = '';
  for (const char of s) {
    if (!isNaN(char)) {
      num = num * 10 + Number(char);
    } else if (char === '[') {
      strStack.push(result);
      result = '';
      numStack.push(num);
      num = 0;
    } else if (char === ']') {
      let repeatTimes = numStack.pop();
      result = strStack.pop() + result.repeat(repeatTimes);
    } else {
      result += char;
    }
  }
  return result;
};
```

### 字符串相加 lc415

> [padStart](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/padStart)

```js
var addStrings = function(num1, num2) {
  let num1Len = num1.length;
  let num2Len = num2.length;
  if (num1Len > num2Len) {
    num2 = num2.padStart(num1Len, '0');
  } else {
    num1 = num1.padStart(num2Len, '0');
  }
  let res = '';
  let temp = 0;
  for (let i = num1.length - 1; i >= 0; i--) {
    let sum = Number(num1[i]) + Number(num2[i]) + temp;
    if (sum >= 10) {
      temp = 1;
      res = (sum % 10) + res;
    } else {
      temp = 0;
      res = sum + res;
    }
  }
  if (temp) res = '1' + res;
  return res;
};
```

### 拼写单词 lc1160

```js
var countCharacters = function(words, chars) {
  let charsMap = new Map();
  let res = 0;
  for (let char of chars) {
    charsMap.set(char, charsMap.has(char) ? charsMap.get(char) + 1 : 1);
  }
  for (let word of words) {
    let wordsMap = new Map();
    let spell = true;
    for (let char of word) {
      wordsMap.set(char, wordsMap.has(char) ? wordsMap.get(char) + 1 : 1);
    }
    for (let char of word) {
      if (
        wordsMap.get(char) > charsMap.get(char) ||
        charsMap.get(char) === undefined
      ) {
        spell = false;
        break;
      }
    }
    if (spell) {
      res += word.length;
    }
  }
  return res;
};
```

### 删除字符串中的所有相邻重复项 lc1047

> stack

```js
var removeDuplicates = function(S) {
  let stack = [];
  for (char of S) {
    let pre = stack.pop();
    if (pre !== char) {
      stack.push(pre);
      stack.push(char);
    }
  }
  return stack.join('');
};
```

### 字符串的最大公因子 lc1071

> gcd

```js
var gcdOfStrings = function(str1, str2) {
  if (str1 + str2 !== str2 + str1) return '';
  const gcd = (a, b) => (0 === b ? a : gcd(b, a % b));
  return str1.substr(0, gcd(str1.length, str2.length));
};
```

### 删除字符串中的所有相邻重复项 II lc1209

> stack

```js
var removeDuplicates = function(s, k) {
  let stack = [];
  for (let char of s) {
    let pre = stack.pop();
    if (!pre || pre[0] !== char) {
      stack.push(pre);
      stack.push(char);
    } else if (pre.length < k - 1) {
      stack.push(pre + char);
    }
  }
  return stack.join('');
};
```

### 字符串压缩 msjd01.06

> RegExp

```js
var compressString = function(S) {
  let resArr = S.match(/([A-z])\1*/g);
  let result = '';
  if (resArr) {
    resArr.forEach((item) => {
      result += item[0] + item.length;
    });
  }
  return result.length < S.length ? result : S;
};
```

## **数组**

### 数组扁平化

递归法：

```js
function flatten(arr) {
  let res = [];
  arr.forEach((item) => {
    if (Array.isArray(item)) {
      res = res.concat(flatten(item));
    } else {
      res.push(item);
    }
  });
  return res;
}
```

```js
function flatten(arr) {
  return arr.reduce((pre, cur) => {
    pre.concat(Array.isArray(cur) ? flatten(cur) : cur);
  }, []);
}
```

传入层数：

```js
function flat(arr, num = 1) {
  return num > 0
    ? arr.reduce(
        (pre, cur) => pre.concat(Array.isArray(cur) ? flat(cur, num - 1) : cur),
        []
      )
    : arr.slice();
}
```

非递归：

```js
function flatten(arr) {
  let res = [];
  let stack = arr.slice();
  while (stack.length !== 0) {
    let val = stack.shift();
    if (Array.isArray(val)) {
      stack.unshift(...val);
    } else {
      res.push(val);
    }
  }
  return res;
}
```

[数组拍平（扁平化） flat 方法实现](https://juejin.im/post/5dff18a4e51d455804256d31##heading-11)

### n 数之和

```js
```

### 数组中的重复数字 jz03

> hashmap

```js
var findRepeatNumber = function(nums) {
  var a = [];
  for (var i = 0; i < nums.length; i++) {
    if (a[nums[i]]) return nums[i];
    a[nums[i]] = 1;
  }
};
```

> 排序

```js
var findRepeatNumber = function(nums) {
  nums.sort();
  for (var i = 1; i < nums.length; i++) {
    if (nums[i] === nums[i - 1]) return nums[i];
  }
};
```

> 原地交换

```js
var findRepeatNumber = function(nums) {
  const length = nums.length;
  for (let i = 0; i < length; ++i) {
    while ((num = nums[i]) !== i) {
      if (num === nums[num]) {
        return num;
      }
      [nums[i], nums[num]] = [nums[num], nums[i]];
    }
  }
};
```

### 二维数组中的查找 jz04

在一个 n \* m 的二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

> 规律

```js
var findNumberIn2DArray = function(matrix, target) {
  if (matrix.length == 0) return false;
  let x = 0;
  let y = matrix.length - 1;
  while (x < matrix[0].length && y >= 0) {
    if (matrix[y][x] > target) {
      y--;
    } else if (matrix[y][x] < target) {
      x++;
    } else {
      return true;
    }
  }
  return false;
};
```

### 旋转数组的最小数字 jz11

> min()

```js
var minArray = function(numbers) {
  const length = numbers.length;
  if (!length) {
    return null;
  }

  return Math.min(...numbers);
};
```

> BS

```js
var minArray = function(numbers) {
  let left = 0,
    right = numbers.length - 1,
    mid;
  while (left < right) {
    mid = Math.floor((left + right) / 2);
    if (numbers[right] > numbers[mid]) {
      // 右侧为递增 排除之
      right = mid;
    } else if (numbers[right] < numbers[mid]) {
      // 右侧一定有最小值
      left = mid + 1;
    } else right--; // 去重
  }
  return numbers[left];
};
```

### 矩阵中的路径 jz12 lc79

> Backtracking

```js
var exist = function(board, word) {
  if (!board) return false;
  if (!word) return true;
  let lenx = board.length;
  let leny = board[0].length;
  let num = 0;

  let findPath = (i, j, num) => {
    if (i < 0 || i >= lenx || j < 0 || j >= leny || board[i][j] != word[num]) {
      return false;
    }
    if (num == word.length - 1) return true;
    let tmp = board[i][j];
    board[i][j] = '-';
    let res =
      findPath(i + 1, j, num + 1) ||
      findPath(i - 1, j, num + 1) ||
      findPath(i, j + 1, num + 1) ||
      findPath(i, j - 1, num + 1);
    board[i][j] = tmp;
    return res;
  };

  for (let i = 0; i < lenx; i++) {
    for (let j = 0; j < leny; j++) {
      if (findPath(i, j, num)) return true;
    }
  }
  return false;
};
```

### 机器人的运动范围 jz13

地上有一个 m 行 n 列的方格，从坐标 [0,0] 到坐标 [m-1,n-1] 。一个机器人从坐标 [0, 0] 的格子开始移动，它每次可以向左、右、上、下移动一格（不能移动到方格外），也不能进入行坐标和列坐标的数位之和大于 k 的格子。例如，当 k 为 18 时，机器人能够进入方格 [35, 37] ，因为 3+5+3+7=18。但它不能进入方格 [35, 38]，因为 3+5+3+8=19。请问该机器人能够到达多少个格子？

DFS

```js
function bitSum(n) {
  let res = 0;
  while (n) {
    res += n % 10;
    n = Math.floor(n / 10);
  }
  return res;
}
var movingCount = function(m, n, k) {
  let res = 0;
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const visited = {};
  dfs(0, 0);
  return res;
  function dfs(x, y) {
    visited[`${x}-${y}`] = true;
    if (bitSum(x) + bitSum(y) > k) {
      return;
    }
    ++res;
    for (const direction of directions) {
      const newX = x + direction[0];
      const newY = y + direction[1];
      if (
        !visited[`${newX}-${newY}`] &&
        newX >= 0 &&
        newY >= y &&
        newX < m &&
        newY < n
      ) {
        dfs(newX, newY);
      }
    }
  }
};
```

BFS

```js
var movingCount = function(m, n, k) {
  let res = 0;
  const directions = [
    [1, 0],
    [0, 1],
  ];
  const queue = [[0, 0]];
  const visited = {
    '0-0': true,
  }; // 标记 (x,y) 是否被访问过
  while (queue.length) {
    const [x, y] = queue.shift();
    //  (x, y) 的数位之和不符合要求
    // 题目要求节点每次只能走1格，所以无法从当前坐标继续出发
    if (bitSum(x) + bitSum(y) > k) {
      continue;
    }
    ++res;
    for (const direction of directions) {
      const newx = direction[0] + x;
      const newy = direction[1] + y;
      if (
        !visited[`${newx}-${newy}`] &&
        newx >= 0 &&
        newy >= 0 &&
        newx < m &&
        newy < n
      ) {
        queue.push([newx, newy]);
        visited[`${newx}-${newy}`] = true;
      }
    }
  }
  return res;
};
```

### 剪绳子 jz14-I

动态规划

```js
var cuttingRope = function(n) {
  const dp = new Array(n + 1).fill(1);

  for (let i = 3; i <= n; ++i) {
    for (let j = 1; j < i; ++j) {
      dp[i] = Math.max(dp[i], j * (i - j), j * dp[i - j]);
    }
  }

  return dp[n];
};
```

贪心

```js
var cuttingRope = function(n) {
  if (n <= 3) return n - 1;
  const a = Math.floor(n / 3);
  const b = n % 3;
  if (b === 0) return Math.pow(3, a);
  if (b === 1) return Math.pow(3, a - 1) * 4;
  return Math.pow(3, a) * 2;
};
```

### 剪绳子 II jz14-II

```js
var cuttingRope = function(n) {
  if (n <= 3) return n - 1;
  let res = 1;
  while (n > 4) {
    n -= 3;
    res = (res * 3) % (1e9 + 7);
  }
  return (n * res) % (1e9 + 7);
};
```

### 调整数组顺序使奇数位于偶数前面 jz21

> 双数组

```js
var exchange = function(nums) {
  const odd = [];
  const even = [];
  nums.forEach((item) => {
    item % 2 ? odd.push(item) : even.push(item);
  });
  return odd.concat(even);
};
```

> 双指针

```js
var exchange = function(nums) {
  const length = nums.length;
  if (!length) {
    return [];
  }
  let i = 0,
    j = length - 1;
  while (i < j) {
    while (i < length && nums[i] % 2) ++i;
    while (j >= 0 && nums[j] % 2 === 0) --j;
    if (i < j) {
      [nums[i], nums[j]] = [nums[j], nums[i]];
      ++i;
      --j;
    }
  }
  return nums;
};
```

> API

```js
var exchange = function(nums) {
  return nums.sort((a, b) => (a % 2 == 0 ? 1 : -1));
};
```

### 顺时针打印矩阵 jz29

```js
var spiralOrder = function(matrix) {
  const m = matrix.length;
  if (!m) {
    return [];
  }
  const n = matrix[0].length;
  if (!n) {
    return [];
  }
  const results = [];
  let i = 0,
    j = 0;
  while (i <= m - i - 1 && j <= n - j - 1) {
    for (let col = j; col <= n - j - 1; ++col) {
      results.push(matrix[i][col]);
    }

    for (let row = i + 1; row <= m - i - 1; ++row) {
      results.push(matrix[row][n - j - 1]);
    }
    if (i < m - i - 1 && j < n - j - 1) {
      for (let col = n - j - 2; col > j; --col) {
        results.push(matrix[m - i - 1][col]);
      }
      for (let row = m - i - 1; row > i; --row) {
        results.push(matrix[row][j]);
      }
    }
    i++;
    j++;
  }
  return results;
};
```

### 序列化二叉树 jz37

```js
var arr = [];
var serialize = function(root) {
  if (root == null) {
    arr.push(null);
  } else {
    arr.push(root.val);
    serialize(root.left);
    serialize(root.right);
  }
};
var deserialize = function(data) {
  var node = null;
  if (arr.length < 1) {
    return null;
  }
  var number = arr.shift();
  if (typeof number == 'number') {
    node = new TreeNode(number);
    node.left = deserialize(arr);
    node.right = deserialize(arr);
  }
  return node;
};
```

### 数组中出现次数超过一半的数字 jz39 lc169

> 排序

```js
var majorityElement = function(nums) {
  return nums.sort((a, b) => a - b)[Math.floor(nums.length / 2)];
};
```

> hashmap

```js
var majorityElement = function(nums) {
  let map = {};
  let len = nums.length;
  for (let item of nums) {
    if (map[item]) {
      map[item] += 1;
    } else {
      map[item] = 1;
    }
    if (map[item] > len / 2) {
      return item;
    }
  }
};
//ES6
var majorityElement = function(nums) {
  let map = new Map();
  let len = nums.length;
  for (let item of nums) {
    if (map.has(item)) {
      map.set(item, map.get(item) + 1);
    } else {
      map.set(item, 1);
    }
    if (map.get(item) > len / 2) {
      return item;
    }
  }
};
```

> 摩尔投票法

O(N) O(1)

```js
var majorityElement = function(nums) {
  let count = 1;
  let majority = nums[0];
  for (let i = 1; i < nums.length; i++) {
    if (count == 0) {
      majority = nums[i];
    }
    nums[i] === majority ? count++ : count--;
  }
  return majority;
};
```

### 最小的 k 个数 jz40

输入整数数组 arr ，找出其中最小的 k 个数。例如，输入 4、5、1、6、2、7、3、8 这 8 个数字，则最小的 4 个数字是 1、2、3、4。

> sort()

```js
var getLeastNumbers = function(arr, k) {
  arr.sort((a, b) => a - b);
  return arr.slice(0, k);
};
```

> 快排

```js
function partiton(arr, start, end) {
  const k = arr[start];
  let left = start + 1,
    right = end;
  while (1) {
    while (left <= end && arr[left] <= k) ++left;
    while (right >= start + 1 && arr[right] >= k) --right;

    if (left >= right) {
      break;
    }

    [arr[left], arr[right]] = [arr[right], arr[left]];
    ++left;
    --right;
  }
  [arr[right], arr[start]] = [arr[start], arr[right]];
  return right;
}
var getLeastNumbers = function(arr, k) {
  const length = arr.length;
  if (k >= length) return arr;
  let left = 0,
    right = length - 1;
  let index = partiton(arr, left, right);
  while (index !== k) {
    if (index < k) {
      left = index + 1;
      index = partiton(arr, left, right);
    } else if (index > k) {
      right = index - 1;
      index = partiton(arr, left, right);
    }
  }

  return arr.slice(0, k);
};
```

### 连续子数组的最大和 jz42

> 滑动窗口

```js
var maxSubArray = function(nums) {
  const len = nums.length;
  if (len <= 0) {
    return 0;
  }
  let sum = nums[0],
    maxSum = nums[0];
  for (let i = 1; i < len; i++) {
    sum = sum > 0 ? sum + nums[i] : nums[i];
    maxSum = sum > maxSum ? sum : maxSum;
  }
  return maxSum;
};
```

> dp

```js
```

### 在排序数组中查找数字 I jz53-I

统计一个数字在排序数组中出现的次数。

> BS

```js
var search = function(nums, target) {
  let left = 0,
    right = nums.length - 1;
  while (left <= right) {
    let mid = (right + left) >> 1;
    let temp = nums[mid];
    if (target > temp) {
      left = mid + 1;
    } else if (target < temp) {
      right = mid - 1;
    } else {
      if (nums[left] !== target) {
        left = left + 1;
      } else if (nums[right] !== target) {
        right = right - 1;
      } else {
        return right - left + 1;
      }
    }
  }
  return 0;
};
```

### 0~n-1 中缺失的数字 jz53-II

> BS

```js
var missingNumber = function(nums) {
  if (nums.length - 1 === nums[nums.length - 1]) return nums.length;
  let left = 0,
    right = nums.length - 1;
  while (left <= right) {
    let mid = (left + right) >> 1;
    mid === nums[mid] ? (left = mid + 1) : (right = mid - 1);
  }
  return left;
};
```

### 数组中数字出现的次数 jz56-I lc260

### 数组中数字出现的次数 II jz56-II lc137

> <<

```js
var singleNumber = function(nums) {
  let bit;
  let result = 0;
  for (let j = 0; j < 32; j++) {
    let cnt = 0;
    bit = 1 << j;
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] & bit) cnt++;
    }
    if (cnt % 3 !== 0) result = result | bit;
  }
  return result;
};
```

### 和为 S 的两个数字 jz57

输入一个递增排序的数组和一个数字 S，在数组中查找两个数，使得他们的和正好是 S，如果有多对数字的和等于 S，输出两个数的乘积最小的。

> 双指针

```js
var twoSum = function(nums, target) {
  let left = 0,
    right = nums.length - 1;
  let ans = [];
  while (left <= right) {
    if (nums[left] + nums[right] === target) {
      return [nums[left], nums[right]];
    } else if (nums[left] + nums[right] < target) {
      ++left;
    } else {
      --right;
    }
  }
};
```

### 和为 S 的连续正数序列 jz57-II

> 滑动窗口

```js
var findContinuousSequence = function(target) {
  let res = [];
  let temp = [];
  let sum = 0;
  for (let i = 1; i < target / 2 + 1; i++) {
    temp.push(i);
    sum = sum + i;
    while (sum > target) {
      sum -= temp[0];
      temp.shift();
    }
    if (sum === target) {
      res.push([...temp]);
    }
  }
  return res;
};
```

### 滑动窗口的最大值 jz59I

> API

```js
var maxSlidingWindow = function(nums, k) {
  let result = [];
  if (!nums.length) return [];
  for (let i = 0; i + k <= nums.length; i++) {
    let arr = nums.slice(i, i + k);
    result.push(Math.max(...arr));
  }
  return result;
};
```

> queue

### n 个骰子的点数 jz60

> 递归

```js
var twoSum = function(n) {
  if (n < 1) {
    return [];
  }
  const res = [0, 1, 1, 1, 1, 1, 1];
  for (let i = 1; i < n; i++) {
    for (let j = 6 * n; j > 0; j--) {
      res[j] = res
        .slice(Math.max(0, j - 6), j)
        .reduce((acc, cur) => acc + cur, 0);
    }
  }
  return res
    .slice(1)
    .map((num) => num / Math.pow(6, n))
    .filter(Boolean);
};
```

> 迭代

```js
var twoSum = function(n) {
  function diceCnt(n) {
    if (n === 1) {
      return [0, 1, 1, 1, 1, 1, 1];
    }
    cnts = diceCnt(n - 1);
    for (let i = 6 * n; i > 0; i--) {
      cnts[i] = cnts
        .slice(Math.max(i - 6, 0), i)
        .reduce((acc, cur) => acc + cur, 0);
    }
    return cnts;
  }
  return diceCnt(n)
    .map((num) => num / Math.pow(6, n))
    .filter(Boolean);
};
```

### 扑克牌中的顺子 jz61

```js
var isStraight = function(nums) {
  nums.sort((a, b) => a - b);
  let king = nums.lastIndexOf(0) + 1;
  let remain = nums.slice(king);
  let gap = 0;
  for (let i = 1; i < remain.length; i++) {
    if (remain[i] !== remain[i - 1]) {
      gap += remain[i] - remain[i - 1];
    } else {
      return false;
    }
  }
  return gap <= king + 4 ? true : false;
};
```

### 圆圈中最后剩下的数字（约瑟夫环） jz62

```js
var lastRemaining = function(n, m) {
  let arr = [];
  for (let i = 0; i < n; i++) arr[i] = i;
  let i = 0;
  while (arr.length > 1) {
    i = (i + m - 1) % arr.length;
    arr.splice(i, 1);
  }
  return arr[0];
};
```

```js
var lastRemaining = function(n, m) {
  let res = 0;
  for (let i = 2; i <= n; i++) {
    res = (res + m) % i;
  }
  return res;
};
```

### 构建乘积数组 jz66

给定一个数组 A[0,1,...,n-1],请构建一个数组 B[0,1,...,n-1],其中 B 中的元素 B[i]=A[0]_A[1]_...*A[i-1]*A[i+1]*...*A[n-1]。不能使用除法。

```js
var constructArr = function (a) {
    let len = a.length;
    let left = 1;
    let res = [];
    for (let i = 0; i < len; i++) {
        res[i] = left;
        left = left * a[i];
    }
    let right = 1;
    for (let j = len - 1; j >= 0; j--) {
        res[j] = res[j] * right;
        right = right * a[j]
    }
    return res;
};
}
```

### 两数之和 lc01

给定一个整数数组 nums  和一个目标值 target，请你在该数组中找出和为目标值的那两个整数，并返回他们的数组下标。你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

> hash

O(n)

```js
var twoSum = function(nums, target) {
  let map = new Map();
  for (let i = 0; i < nums.length; i++) {
    let value = nums[i];
    let diff = target - value;
    if (map.has(diff)) {
      return [map.get(diff), i];
    } else {
      map.set(value, i);
    }
  }
};
```

```js
var twoSum = function(nums, target) {
  var temp = [];
  for (var i = 0; i < nums.length; i++) {
    var dif = target - nums[i];
    if (temp[dif] != undefined) {
      return [temp[dif], i];
    }
    temp[nums[i]] = i;
  }
};
```

### 盛最多水的容器 lc11

> 双指针

```js
var maxArea = function(height) {
  let left = 0;
  let right = height.length - 1;
  let max = 0;
  while (left < right) {
    max = Math.max(max, Math.min(height[left], height[right]) * (right - left));
    height[left] < height[right] ? left++ : right--;
  }
  return max;
};
```

### 三数之和 lc15

给你一个包含 n 个整数的数组  nums，判断  nums  中是否存在三个元素 a，b，c ，使得  a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。

```js
var threeSum = function(nums) {
  let ans = [];
  const len = nums.length;
  if (nums == null || len < 3) return ans;
  nums.sort((a, b) => a - b);
  for (let i = 0; i < len - 2; i++) {
    if (nums[i] > 0) break;
    if (i > 0 && nums[i] == nums[i - 1]) continue;
    let L = i + 1;
    let R = len - 1;
    while (L < R) {
      const sum = nums[i] + nums[L] + nums[R];
      if (sum == 0) {
        ans.push([nums[i], nums[L], nums[R]]);
        while (L < R && nums[L] == nums[L + 1]) L++;
        while (L < R && nums[R] == nums[R - 1]) R--;
        L++;
        R--;
      } else if (sum < 0) L++;
      else if (sum > 0) R--;
    }
  }
  return ans;
};
```

### 四数之和 lc

给定一个包含 n 个整数的数组 nums 和一个目标值 target，判断 nums 中是否存在四个元素 a，b，c 和 d ，使得 a + b + c + d 的值与 target 相等？找出所有满足条件且不重复的四元组

```js
var fourSum = function(nums, target) {
  let ans = [];
  const len = nums.length;
  nums.sort((a, b) => a - b);
  for (let j = 0; j < len - 3; j++) {
    if (nums[j] === nums[j - 1]) continue;
    for (let i = j + 1; i < len - 2; i++) {
      if (i > j + 1 && nums[i] == nums[i - 1]) continue;
      let L = i + 1;
      let R = len - 1;
      while (L < R) {
        const sum = nums[j] + nums[i] + nums[L] + nums[R];
        if (target == sum) {
          ans.push([nums[j], nums[i], nums[L], nums[R]]);
          while (L < R && nums[L] == nums[L + 1]) L++;
          while (L < R && nums[R] == nums[R - 1]) R--;
          L++;
          R--;
        }
        if (sum < target) L++;
        if (sum > target) R--;
      }
    }
  }
  return ans;
};
```

### 搜索旋转排序数组 lc33

> BS

```js
var search = function(nums, target) {
  return binarySearch(nums, target, 0, nums.length - 1);
};
var binarySearch = function(nums, target, start, end) {
  if (start > end) return -1;
  let mid = start + Math.floor(end - start);
  if (nums[mid] === target) return mid;
  if (nums[start] <= nums[mid]) {
    if (nums[start] <= target && target < nums[mid]) {
      return binarySearch(nums, target, start, mid - 1);
    } else {
      return binarySearch(nums, target, mid + 1, end);
    }
  } else {
    if (nums[mid] < target && target <= nums[end]) {
      return binarySearch(nums, target, mid + 1, end);
    } else {
      return binarySearch(nums, target, start, mid - 1);
    }
  }
};
```

### 在排序数组中查找元素的第一个和最后一个位置 lc34

> BS

```js
var searchRange = function(nums, target) {
  return [
    searchLB(nums, target, 0, nums.length - 1),
    searchHB(nums, target, 0, nums.length - 1),
  ];
};

var searchLB = function(nums, target, low, high) {
  if (low > high) return -1;
  let mid = (low + high) >> 1;
  if (nums[mid] == target && (mid == 0 || nums[mid - 1] < target)) {
    return mid;
  }
  if (nums[mid] >= target) {
    return searchLB(nums, target, low, mid - 1);
  } else {
    return searchLB(nums, target, mid + 1, high);
  }
  return -1;
};
var searchHB = function(nums, target, low, high) {
  if (low > high) return -1;
  let mid = (low + high) >> 1;
  if (
    nums[mid] == target &&
    (mid == nums.length - 1 || nums[mid + 1] > target)
  ) {
    return mid;
  }
  if (nums[mid] > target) {
    return searchHB(nums, target, low, mid - 1);
  } else {
    return searchHB(nums, target, mid + 1, high);
  }
  return -1;
};
```

> BS 优化

```js
var searchRange = function(nums, target) {
  let low = 0;
  let high = nums.length - 1;
  while (low <= high) {
    let mid = (low + high) >> 1;

    if (nums[mid] >= target) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  if (nums[low] !== target) return [-1, -1];
  let resut = [low];
  high = nums.length - 1;
  while (low <= high) {
    let mid = (low + high) >> 1;

    if (nums[mid] > target) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  resut[1] = low - 1;
  return resut;
};
```

### 组合总和 lc39

> Backtracking

```js
var combinationSum = function(candidates, target) {
  let n = candidates.length;
  let results = [];
  let solution = [];
  let backtrack = (solution, target, start) => {
    if (target < 0) {
      return;
    }
    if (target == 0) {
      results.push(solution.slice());
      return;
    }
    for (let i = start; i < n; i++) {
      solution.push(candidates[i]);
      backtrack(solution, target - candidates[i], i);
      solution.pop();
    }
  };
  backtrack(solution, target, 0);
  return results;
};
```

### 不同路径 lc62

```js
var uniquePaths = function(m, n) {
  var dp = new Array(m);
  for (var i = 0; i < n; i++) {
    dp[i] = new Array(m);
    dp[i][0] = 1;
  }
  for (var r = 0; r < m; r++) {
    dp[0][r] = 1;
  }
  for (var j = 1; j < n; j++) {
    for (var z = 1; z < m; z++) {
      dp[j][z] = dp[j - 1][z] + dp[j][z - 1];
    }
  }
  return dp[n - 1][m - 1];
};
//优化
var uniquePaths = function(m, n) {
  var pre = new Array(n).fill(1);
  var cur = new Array(n).fill(1);
  for (var i = 1; i < m; i++) {
    for (var r = 1; r < n; r++) {
      cur[r] = cur[r - 1] + pre[r];
    }
    pre = cur.slice(0);
  }
  return pre[n - 1];
};
var uniquePaths = function(m, n) {
  var cur = new Array(n).fill(1);
  for (var i = 1; i < m; i++) {
    for (var r = 1; r < n; r++) {
      cur[r] = cur[r - 1] + cur[r];
    }
  }
  return cur[n - 1];
};
```

### x 的平方根 lc69

```js
var mySqrt = function(x) {
  var left = 1;
  var right = (x >> 1) + 1;
  var mid;
  while (left <= right) {
    mid = (left + right) >> 1;
    if (mid * mid > x) {
      right = mid - 1;
    } else if (mid * mid < x) {
      left = mid + 1;
    } else {
      return mid;
    }
  }
  return right;
};
```

### 合并两个有序数组 lc88

```js
var merge = function(nums1, m, nums2, n) {
  let length = m + n;
  while (n > 0) {
    if (m <= 0) {
      nums1[--length] = nums2[--n];
      continue;
    }
    nums1[--length] = nums1[m - 1] >= nums2[n - 1] ? nums1[--m] : nums2[--n];
  }
};
```

### 将有序数组转换为二叉搜索树 lc108

一个高度平衡二叉树是指一个二叉树每个节点的左右两个子树的高度差的绝对值不超过 1。

```js
var sortedArrayToBST = function(nums) {
  if (!nums.length) return null;
  const mid = nums.length >> 1;
  const root = new TreeNode(nums[mid]);
  root.left = sortedArrayToBST(nums.slice(0, mid));
  root.right = sortedArrayToBST(nums.slice(mid + 1));
  return root;
};
```

### 买卖股票的最佳时机 lc121

> DP

```js
var maxProfit = function(prices) {
  let sell = 0;
  let buy = -prices[0];
  for (let i = 1; i < prices.length; i++) {
    sell = Math.max(sell, prices[i] + buy);
    buy = Math.max(buy, -prices[i]);
  }
  return sell;
};
```

### 只出现一次的数字 lc136

> ^

```js
var singleNumber = function(nums) {
  let result = 0;
  for (let num of nums) {
    result ^= num;
  }
  return result;
};
```

### LRU 缓存机制 lc146

> Array

```js
var LRUCache = function(capacity) {
  this.max = capacity;
  this.cache = {};
  this.keys = [];
};
LRUCache.prototype.get = function(key) {
  if (this.cache[key]) {
    remove(this.keys, key);
    this.keys.push(key);
    return this.cache[key];
  } else {
    return -1;
  }
};
LRUCache.prototype.put = function(key, value) {
  if (this.cache[key]) {
    this.cache[key] = value;
    remove(this.keys, key);
    this.keys.push(key);
  } else {
    this.keys.push(key);
    this.cache[key] = value;
    if (this.keys.length > this.max) {
      removeCache(this.cache, this.keys, this.keys[0]);
    }
  }
};
function remove(arr, key) {
  if (arr.length) {
    const index = arr.indexOf(key);
    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}
function removeCache(cache, keys, key) {
  cache[key] = null;
  remove(keys, key);
}
```

> Map

```js
var LRUCache = function(capacity) {
  this.max = capacity;
  this.cache = new Map();
};
LRUCache.prototype.get = function(key) {
  if (this.cache.has(key)) {
    let temp = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, temp);
    return temp;
  } else {
    return -1;
  }
};
LRUCache.prototype.put = function(key, value) {
  if (this.cache.has(key)) {
    this.cache.delete(key);
  } else if (this.cache.size >= this.max) {
    this.cache.delete(this.cache.keys().next().value);
  }
  this.cache.set(key, value);
};
```

> hash+双链表

### 打家劫舍 lc198

> dp

```js
var rob = function(nums) {
  let n = nums.length;
  if (n == 0) return 0;
  if (n == 1) return nums[0];
  let dp = [];
  dp[0] = nums[0];
  dp[1] = Math.max(nums[0], nums[1]);
  for (let i = 2; i < n; i++) {
    dp[i] = Math.max(dp[i - 1], nums[i] + dp[i - 2]);
  }
  return dp[n - 1];
};
```

### 长度最小的子数组 lc209

```js
var minSubArrayLen = function(s, nums) {
  const len = nums.length;
  let p = 0;
  let min = len + 1;
  let sum = 0;
  for (let i = 0; i < len; i++) {
    sum += nums[i];
    while (sum >= s) {
      sum -= nums[p];
      min = Math.min(i - p + 1, min);
      p++;
    }
  }
  return min == len + 1 ? 0 : min;
};
```

### 存在重复元素 lc217

> Set

```js
var containsDuplicate = function(nums) {
  return Array.from(new Set(nums)).length != nums.length;
};

var containsDuplicate = function(nums) {
  return [...new Set(nums)].length != nums.length;
};

var containsDuplicate = function(nums) {
  return new Set(nums).size != nums.length;
};
```

> hash

```js
var containsDuplicate = function(nums) {
  let set = new Set();
  for (let i = 0, len = nums.length; i < len; i++) {
    if (set.has(nums[i])) {
      return true;
    }
    set.add(nums[i]);
  }
  return false;
};
```

> sort

```js
var containsDuplicate = function(nums) {
  nums.sort((a, b) => a - b);
  for (let i = 1, len = nums.length; i < len; i++) {
    if (nums[i - 1] == nums[i]) {
      return true;
    }
  }
  return false;
};
```

### 有效的字母异位词 lc242

```js
var isAnagram = function(s, t) {
  if (s.length !== t.length) return false;
  let arr = new Array(26).fill(0);
  for (let i = 0; i < s.length; i++) {
    arr[s[i].charCodeAt() - 97]++;
  }
  for (let j = 0; j < t.length; j++) {
    if (--arr[t[j].charCodeAt() - 97] < 0) {
      return false;
    }
  }
  return true;
};
```

### 最长上升子序列 lc300

> DP

```js
var lengthOfLIS = function(nums) {
  let len = nums.length;
  if (!len) return 0;
  let dp = new Array(len).fill(1);
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j] && dp[j] + 1 > dp[i]) {
        dp[i] = dp[j] + 1;
      }
    }
  }
  return Math.max.apply(null, dp);
};
```

> BS

```js
var lengthOfLIS = function(nums) {
  let len = nums.length;
  if (len <= 1) return len;
  let res = [nums[0]];
  for (let i = 1; i < len; i++) {
    if (nums[i] > res[res.length - 1]) {
      res.push(nums[i]);
    } else {
      let left = 0,
        right = res.length - 1;
      while (left < right) {
        let mid = (left + right) >> 1;
        if (res[mid] < nums[i]) {
          left = mid + 1;
        } else {
          right = mid;
        }
      }
      res[left] = nums[i];
    }
  }
  return res.length;
};
```

### 两个数组的交集 lc349

> filter includes

```js
var intersection = function(nums1, nums2) {
  return [...new Set(nums1.filter((num) => nums2.includes(num)))];
};
```

> BS

O(nlogn)

```js
var intersection = function(nums1, nums2) {
  let res = new Set();
  nums2 = nums2.sort((a, b) => a - b);
  let binarySearch = (arr, val) => {
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
      let mid = (left + right) >> 1;
      if (arr[mid] === val) {
        return true;
      } else if (arr[mid] > val) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    return false;
  };
  for (let i = 0; i < nums1.length; i++) {
    if (binarySearch(nums2, nums1[i])) {
      res.add(nums1[i]);
    }
  }
  return [...res];
};
```

### 打乱数组 lc384

[数组乱序](https://juejin.im/post/5d004ad95188257c6b518056)

### 最长回文串 lc409

> hash

```js
var longestPalindrome = function(s) {
  let map = new Map();
  let res = 0;
  for (let char of s) {
    map.set(char, map.has(char) ? map.get(char) + 1 : 1);
  }
  for (let item of map.values()) {
    res += 2 * (item >> 1);
  }
  return s.length > res ? res + 1 : res;
};
```

### 岛屿的最大面积 lc695

> DFS

```js
var maxAreaOfIsland = function(grid) {
  let x = grid.length,
    y = grid[0].length;
  let max = 0;
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      if (grid[i][j] == 1) {
        max = Math.max(max, cntArea(grid, i, j, x, y));
      }
    }
  }
  return max;
};
let cntArea = (grid, i, j, x, y) => {
  if (i < 0 || i >= x || j < 0 || j >= y || grid[i][j] == 0) return 0;
  let cnt = 1;
  grid[i][j] = 0;
  cnt += cntArea(grid, i + 1, j, x, y);
  cnt += cntArea(grid, i - 1, j, x, y);
  cnt += cntArea(grid, i, j + 1, x, y);
  cnt += cntArea(grid, i, j - 1, x, y);
  return cnt;
};
```

### 二分查找 lc704

```js
var search = function(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  let mid;
  while (left <= right) {
    mid = (left + right) >> 1;
    if (nums[mid] > target) {
      right = mid - 1;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      return mid;
    }
  }
  return -1;
};
```

### 单词的压缩编码 lc820

> hashSet

```js
var minimumLengthEncoding = function(words) {
  let hashSet = new Set(words);
  for (let item of hashSet) {
    for (let i = 1; i < item.length; i++) {
      let target = item.slice(i);
      hashSet.has(target) && hashSet.delete(target);
    }
  }
  let result = 0;
  hashSet.forEach((item) => (result += item.length + 1));
  return result;
};
```

### 矩形重叠 lc836

```js
var isRectangleOverlap = function(rec1, rec2) {
  return !(
    rec1[2] <= rec2[0] ||
    rec1[3] <= rec2[1] ||
    rec1[0] >= rec2[2] ||
    rec1[1] >= rec2[3]
  );
};
```

```js
var isRectangleOverlap = function(rec1, rec2) {
  return (
    Math.min(rec1[2], rec2[2]) > Math.max(rec1[0], rec2[0]) &&
    Math.min(rec1[3], rec2[3]) > Math.max(rec1[1], rec2[1])
  );
};
```

### 卡牌分组 lc914

> map gcd

```js
var hasGroupsSizeX = function(deck) {
  let map = new Map();
  for (let n of deck) {
    map.set(n, map.has(n) ? map.get(n) + 1 : 1);
  }
  let arr = [...map.values()];
  let res = arr[0];
  return arr.every((i) => (res = gcd(res, i)) > 1);
};
let gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
```

### 使数组唯一的最小增量 lc945

给定整数数组 A，每次 move 操作将会选择任意 A[i]，并将其递增 1。

返回使 A 中的每个值都是唯一的最少操作次数。

> hash

超时

```js
var minIncrementForUnique = function(A) {
  let map = new Map();
  let res = 0;
  for (let i of A) {
    while (map.has(i)) {
      i++;
      res++;
    }
    map.set(i, true);
  }
  return res;
};
```

```js
var minIncrementForUnique = function(A) {
  let move = 0;
  A = A.sort((a, b) => a - b);
  for (let i = 1; i < A.length; i++) {
    if (A[i] <= A[i - 1]) {
      let n = A[i - 1] + 1 - A[i];
      A[i] += n;
      move += n;
    }
  }
  return move;
};
```

### 车的可用捕获量 lc999

```js
/**
 * @param {character[][]} board
 * @return {number}
 */
var numRookCaptures = function(board) {
  let rx, ry;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (board[i][j] === 'R') {
        rx = i;
        ry = j;
      }
    }
  }
  let dx = [1, 0, -1, 0];
  let dy = [0, 1, 0, -1];
  let res = 0;
  for (let k = 0; k < 4; k++) {
    let x = rx;
    let y = ry;
    while (true) {
      x += dx[k];
      y += dy[k];
      if (x < 0 || x >= 8 || y < 0 || y >= 8 || board[x][y] === 'B') {
        break;
      }
      if (board[x][y] === 'p') {
        res++;
        break;
      }
    }
  }
  return res;
};
```

### 旋转矩阵 msjd01.07

矩阵顺时针旋转 90 度

```js
var rotate = function(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = i + 1; j < matrix[0].length; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }
  matrix.forEach((row) => row.reverse());
};
```

## **栈**

### 两个栈实现队列 jz09

```js
var CQueue = function() {
  this.inStack = [];
  this.outStack = [];
};
CQueue.prototype.appendTail = function(value) {
  this.inStack.push(value);
};
CQueue.prototype.deleteHead = function() {
  const { inStack, outStack } = this;
  if (outStack.length) {
    return outStack.pop();
  } else {
    while (inStack.length) {
      outStack.push(inStack.pop());
    }
    return outStack.pop() || -1;
  }
};
```

### 包含 min 函数的栈 jz30

> 辅助栈

```js
var MinStack = function() {
  this.stack = [];
  this.minStack = [];
};
MinStack.prototype.push = function(x) {
  this.stack.push(x);
  if (
    this.minStack.length === 0 ||
    this.minStack[this.minStack.length - 1] >= x
  ) {
    this.minStack.push(x);
  }
};
MinStack.prototype.pop = function() {
  if (this.stack.pop() === this.minStack[this.minStack.length - 1])
    this.minStack.pop();
};
MinStack.prototype.top = function() {
  return this.stack[this.stack.length - 1];
};
MinStack.prototype.min = function() {
  return this.minStack[this.minStack.length - 1];
};
```

### 栈的压入、弹出序列 jz31

辅助栈

```js
var validateStackSequences = function(pushed, popped) {
  let stack = [];
  let idx = 0;
  for (let i = 0; i < pushed.length; i++) {
    stack.push(pushed[i]);
    while (stack.length && stack[stack.length - 1] == popped[idx]) {
      stack.pop();
      idx++;
    }
  }
  return stack.length == 0;
};
```

### 最小栈 lc155

```js
var MinStack = function() {
  this.items = [];
  this.min = null;
};
MinStack.prototype.push = function(x) {
  if (!this.items.length) this.min = x;
  this.min = Math.min(x, this.min);
  this.items.push(x);
};
MinStack.prototype.pop = function() {
  let num = this.items.pop();
  this.min = Math.min(...this.items);
  return num;
};
MinStack.prototype.top = function() {
  if (!this.items.length) return null;
  return this.items[this.items.length - 1];
};
MinStack.prototype.getMin = function() {
  return this.min;
};
```

```js
var MinStack = function() {
  this.stack = [];
  this.minStack = [];
};
MinStack.prototype.push = function(x) {
  this.stack.push(x);
  if (this.minStack[this.minStack.length - 1] >= x || !this.minStack.length) {
    this.minStack.push(x);
  }
};
MinStack.prototype.pop = function() {
  if (this.stack.pop() == this.minStack[this.minStack.length - 1]) {
    this.minStack.pop();
  }
};
MinStack.prototype.top = function() {
  return this.stack[this.stack.length - 1];
};
MinStack.prototype.getMin = function() {
  return this.minStack[this.minStack.length - 1];
};
```

### 每日温度 lc739

```js
var dailyTemperatures = function(T) {
  let { length } = T;
  let res = new Array(length).fill(0);
  let stack = [];
  for (let i = 0; i < length; i++) {
    while (stack.length && T[i] > T[stack[stack.length - 1]]) {
      let index = stack.pop();
      res[index] = i - index;
    }
    stack.push(i);
  }
  return res;
};
```

### 汉诺塔问题 msjd08.06

> Recursion

```js
var hanota = function(A, B, C) {
  return move(A, B, C, A.length);
};
var move = function(A, B, C, n) {
  if (n == 0) return;
  move(A, C, B, n - 1);
  C.push(A.pop());
  move(B, A, C, n - 1);
};
```

## **链表**

### 从尾到头打印链表 jz06

> 辅助栈

```js
function reverseList(head) {
  let res = [];
  while (head) {
    res.unshift(head.val);
    head = head.next;
  }
  return res;
}
```

> 反转链表

```js
var reverseList = function(head) {
  let pre = null;
  let node = head;
  let next = null;
  while (node) {
    next = node.next;
    node.next = pre;
    pre = node;
    node = next;
  }
  return pre;
};
```

### 删除链表的结点 jz18

```js
var deleteNode = function(head, val) {
  let pre = new ListNode(-1);
  pre.next = head;

  let node = pre;
  while (node.next) {
    if (node.next.val === val) {
      node.next = node.next.next;
      break;
    }
    node = node.next;
  }
  return pre.next;
};
```

递归

```js
var deleteNode = function(head, val) {
  if (head.val == val) {
    return head.next;
  }
  head.next = deleteNode(head.next, val);
  return head;
};
```

### 链表中倒数第 k 个节点 jz23

> 辅助数组

```js
var getKthFromEnd = function(head, k) {
  let res = [];
  while (head) {
    res.unshift(head);
    head = head.next;
  }
  return res[k - 1];
};
```

> 快慢指针

```js
var getKthFromEnd = function(head, k) {
  let fast = head,
    slow = head,
    i = 0;
  while (fast) {
    if (i >= k) {
      slow = slow.next;
    }
    fast = fast.next;
    i++;
  }·
  return i < k ? null : slow;
};
```

### 反转单向链表 jz24

> 迭代

```js
var reverseList = function(head) {
  let pre = null;
  let node = head;
  let next = null;
  while (node) {
    next = node.next;
    node.next = pre;
    pre = node;
    node = next;
  }
  return pre;
};
```

> 递归

```js
var reverseList = function(head) {
  if (!head || !head.next) return head;
  let res = reverseList(head.next);
  head.next.next = head;
  head.next = null;
  return res;
};
```

### 合并两个有序链表 jz26 lc21

> 递归

```js
var mergeTwoLists = function(l1, l2) {
  if (l1 === null) return l2;
  if (l2 === null) return l1;
  if (l1.val < l2.val) {
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeTwoLists(l1, l2.next);
    return l2;
  }
};
```

> 迭代

```js
var mergeTwoLists = function(l1, l2) {
  const prehead = new ListNode(-1);
  let prev = prehead;
  while (l1 != null && l2 != null) {
    if (l1.val <= l2.val) {
      prev.next = l1;
      l1 = l1.next;
    } else {
      prev.next = l2;
      l2 = l2.next;
    }
    prev = prev.next;
  }
  prev.next = l1 === null ? l2 : l1;
  return prehead.next;
};
```

### 两个链表的第一个公共节点 jz52

> hash

```js
var getIntersectionNode = function(headA, headB) {
  let hash = new Set();
  while (headA) {
    hash.add(headA);
    headA = headA.next;
  }
  while (headB) {
    if (hash.has(headB)) {
      return headB;
    }
    headB = headB.next;
  }
  return null;
};
```

> 双指针

```js
var getIntersectionNode = function(headA, headB) {
  let p1 = headA;
  let p2 = headB;
  while (p1 !== p2) {
    p1 = p1 == null ? headB : p1.next;
    p2 = p2 == null ? headA : p2.next;
  }
  return p1;
};
```

### 合并 K 个有序链表 lc23

> 归并排序

```js
var mergeKLists = function(lists) {
  return part(lists);
};

var part = function(lists) {
  switch (lists.length) {
    case 0:
      return null;
    case 1:
      return lists[0];
    case 2:
      return merge2List(lists[0], lists[1]);
    default:
      let mid = lists.length >> 1;
      return merge2List(part(lists.slice(0, mid)), part(lists.slice(mid)));
  }
};

var merge2List = function(phead1, phead2) {
  if (!phead1) {
    return phead2;
  } else if (!phead2) {
    return phead1;
  }
  let result = new ListNode(null);
  if (phead1.val <= phead2.val) {
    result = phead1;
    result.next = merge2List(phead1.next, phead2);
  } else {
    result = phead2;
    result.next = merge2List(phead1, phead2.next);
  }
  return result;
};
```

### 删除排序链表中的重复元素 lc83

```js
var deleteDuplicates = function(head) {
  let node = head;
  while (node && node.next) {
    if (node.val === node.next.val) {
      node.next = node.next.next;
    } else {
      node = node.next;
    }
  }
  return head;
};
```

### 分隔链表

```js
var partition = function(head, x) {
  const beforeHead = new ListNode(0);
  const afterHead = new ListNode(0);
  let before = beforeHead;
  let after = afterHead;
  while (head) {
    if (head.val >= x) {
      after.next = head;
      after = after.next;
    } else {
      before.next = head;
      before = before.next;
    }
    head = head.next;
  }
  after.next = null;
  before.next = afterHead.next;
  return beforeHead.next;
};
```

### 设计链表 lc707

```js
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
class MyLinkedList {
  constructor() {
    // 链表长度
    this.size = 0;
    // 虚拟头部
    this.head = null;
  }
  addAtHead(val) {
    let node = new Node(val);
    node.next = this.head;
    this.head = node;
    this.length++;
  }
  addAtTail(val) {
    let node = new Node(val);
    let cur = this.head;
    while (cur.next) {
      cur = cur.next;
    }
    cur.next = node;
    this.length++;
  }
  addAtIndex(index, val) {
    if (index <= this.length) {
      let node = new Node(val),
        current = this.head,
        previous,
        pos = 0;
      if (index <= 0) {
        this.head = node;
      } else {
        while (pos++ < index) {
          previous = current;
          current = current.next;
        }
        node.next = current;
        previous.next = node;
      }
      this.length++;
    } else {
    }
  }
  deleteAtIndex(index) {
    if (index > -1 && index < this.length) {
      let cur = this.head;
      let pre;
      let pos = 0;
      if (index === 0) {
        this.head = cur.next;
      } else {
        while (pos++ < index) {
          pre = current;
          cur = cur.next;
        }
        pre.next = current.next;
      }
      this.length--;
    }
  }

  get(index) {
    if (index > -1 && index < this.length) {
      let cur = this.head,
        pos = 0;
      while (pos++ < index) {
        cur = cur.next;
      }
      return cur.val;
    } else {
      return -1;
    }
  }
}
```

### 环形链表 lc141

> Array includes

空间复杂度最低

```js
var hasCycle = function(head) {
  let res = [];
  while (head != null) {
    if (res.includes(head)) {
      return true;
    } else {
      res.push(head);
    }
    head = head.next;
  }
  return false;
};
```

> hashMap

```js
var hasCycle = function(head) {
  let map = new Map();
  while (head != null) {
    if (map.get(head)) {
      return true;
    } else {
      map.set(head, true);
    }
    head = head.next;
  }
  return false;
};
```

> 快慢指针

```js
var hasCycle = function(head) {
  let slow = head;
  let fast = head;
  if (head == null) return false;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      return true;
    }
  }
  return false;
};
```

### 相交链表 lc160

方法一：

先遍历 headA 打上标记，再遍历 headB 寻找标记

```js
var getIntersectionNode = function(headA, headB) {
  while (headA) {
    headA.mark = ture;
    headA = headA.next;
  }
  while (headB) {
    if (headB.mark) {
      return headB;
    }
    headB = headB.next;
  }
};
```

方法二：
嵌套循环

```js
var getIntersectionNode = function(headA, headB) {
  while (headA) {
    var temp = headB;
    while (temp) {
      if (temp == headA) return headA;
      temp = temp.next;
    }
    headA = headA.next;
  }
};
```

## **树**

### 二叉树的先序，中序，后序遍历

> 递归

```js
var preorderTraversal = function(root, array = []) {
  if (root) {
    array.push(root.val);
    preorderTraversal(root.left, array);
    preorderTraversal(root.right, array);
  }
  return array;
};
var inorderTraversal = function(root, array = []) {
  if (root) {
    inorderTraversal(root.left, array);
    array.push(root.val);
    inorderTraversal(root.right, array);
  }
  return array;
};
var postorderTraversal = function(root, array = []) {
  if (root) {
    postorderTraversal(root.left, array);
    postorderTraversal(root.right, array);
    array.push(root.val);
  }
  return array;
};
```

> 非递归

```js
var preorderTraversal = function(root) {
  if (!root) return [];
  let stack = [root];
  let res = [];
  while (stack.length) {
    let item = stack.pop();
    res.push(item.val);
    if (item.right) stack.push(item.right);
    if (item.left) stack.push(item.left);
  }
  return res;
};
var inorderTraversal = function(root) {
  let stack = [];
  let res = [];
  while (stack.length > 0 || root) {
    if (root) {
      stack.push(root);
      root = root.left;
    } else {
      root = stack.pop();
      res.push(root.val);
      root = root.right;
    }
  }
  return res;
};
var postorderTraversal = function(root) {
  if (!root) return [];
  let stack = [root];
  let res = [];
  while (stack.length) {
    let item = stack.pop();
    res.push(item.val);
    if (item.left) stack.push(item.left);
    if (item.right) stack.push(item.right);
  }
  return res.reverse();
};
```

### 重建二叉树 jz07

输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。例如输入前序遍历序列{1,2,4,7,3,5,6,8}和中序遍历序列{4,7,2,1,5,3,8,6}，则重建二叉树并返回。

```js
var buildTree = function(preorder, inorder) {
  if (preorder == 0 || inorder == 0) return null;
  let index = inorder.indexOf(preorder[0]);
  let left = inorder.slice(0, index);
  let right = inorder.slice(index + 1);
  let node = new TreeNode(inorder[index]);
  node.left = buildTree(preorder.slice(1, index + 1), left);
  node.right = buildTree(preorder.slice(index + 1), right);
  return node;
};
```

```js
var buildTree = function(preorder, inorder) {
  if (!preorder.length || !inorder.length) {
    return null;
  }
  const rootVal = preorder[0];
  const node = new TreeNode(rootVal);
  let i = 0;
  for (; i < inorder.length; ++i) {
    if (inorder[i] === rootVal) {
      break;
    }
  }
  node.left = buildTree(preorder.slice(1, i + 1), inorder.slice(0, i));
  node.right = buildTree(preorder.slice(i + 1), inorder.slice(i + 1));
  return node;
};
```

### 树的子结构 jz26

递归

```js
var isSubStructure = function(A, B) {
  if (!A || !B) return false;
  return (
    isSubTree(A, B) || isSubStructure(A.left, B) || isSubStructure(A.right, B)
  );
};
var isSubTree = function(A, B) {
  if (!B) return true;
  if (!A) return false;
  if (A.val !== B.val) return false;
  return isSubTree(A.left, B.left) && isSubTree(A.right, B.right);
};
```

### 二叉树的镜像 jz27

> 递归

```js
var mirrorTree = function(root) {
  if (!root) return null;
  [root.left, root.right] = [mirrorTree(root.right), mirrorTree(root.left)];
  return root;
};
```

> 辅助栈

```js
var mirrorTree = function(root) {
  let stack = [root];
  while (stack.length) {
    let node = stack.pop();
    if (!node) continue;
    [node.left, node.right] = [node.right, node.left];
    stack.push(node.left, node.right);
  }
  return root;
};
```

### 对称二叉树 jz28

```js
var isSymmetric = function(root) {
  if (root == null) return true;
  return isSame(root.left, root.right);
};
var isSame = function(left, right) {
  if (left == null && right == null) return true;
  if (left == null || right == null || left.val !== right.val) {
    return false;
  }
  return isSame(left.left, right.right) && isSame(left.right, right.left);
};
```

### 从上到下打印二叉树 jz32-I

> 辅助队列

```js
var levelOrder = function(root) {
  if (!root) {
    return [];
  }
  const data = [];
  const queue = [root];
  while (queue.length) {
    const first = queue.shift();
    data.push(first.val);
    first.left && queue.push(first.left);
    first.right && queue.push(first.right);
  }
  return data;
};
```

### 从上到下打印二叉树 II jz32-II

> 辅助队列

```js
var levelOrder = function(root) {
  if (!root) return [];
  let queue = [root];
  let res = [];
  while (queue.length) {
    let length = queue.length;
    let layer = [];
    while (length--) {
      let node = queue.shift();
      layer.push(node.val);
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
    res.push(layer);
  }
  return res;
};
```

### 从上到下打印二叉树 III jz32-III

> 辅助队列

```js
var levelOrder = function(root) {
  if (!root) return [];
  let res = [];
  let queue = [root];
  let layer = 0;
  let seq = true;
  while (queue.length) {
    let len = queue.length;
    res[layer] = [];
    while (len--) {
      let item = queue.shift();
      if (seq) {
        res[layer].push(item.val);
      } else {
        res[layer].unshift(item.val);
      }
      if (item.left != null) queue.push(item.left);
      if (item.right != null) queue.push(item.right);
    }
    layer++;
    seq = !seq;
  }
  return res;
};
```

### 二叉搜索树的后序遍历序列 jz33

```js
function verifyPostorder(sequence) {
  const len = sequence.length;
  if (len < 3) return true;
  const root = sequence[len - 1];
  let cut = 0;
  while (cut < len - 1 && sequence[cut] < root) ++cut;
  for (let i = cut; i < len - 1; ++i) {
    if (sequence[i] < root) {
      return false;
    }
  }
  return (
    verifyPostorder(sequence.slice(0, cut)) &&
    verifyPostorder(sequence.slice(cut, len - cut - 1))
  );
}
```

### 二叉树中和为某一值的路径 jz34

输入一棵二叉树和一个整数，打印出二叉树中节点值的和为输入整数的所有路径。从树的根节点开始往下一直到叶节点所经过的节点形成一条路径。

> dfs

```js
var pathSum = function(root, sum) {
  let res = [];
  function dfs(root, path, sum) {
    if (!root) return;
    sum -= root.val;
    if (sum === 0 && !root.left && !root.right) {
      res.push([...path, root.val]);
    }
    path.push(root.val);
    dfs(root.left, path, sum);
    dfs(root.right, path, sum);
    path.pop();
  }
  dfs(root, [], sum);
  return res;
};
```

### 二叉搜索树的第 k 大节点 jz54

给定一棵二叉搜索树，请找出其中第 k 大的节点。

> 逆中序遍历

```js
var kthLargest = function(root, k) {
  let stack = [];
  let index = 0;
  while (stack.length || root) {
    if (root) {
      stack.push(root);
      root = root.right;
    } else {
      root = stack.pop();
      index++;
      if (index === k) {
        return root.val;
      }
      root = root.left;
    }
  }
  return null;
};
```

### 二叉树的深度 jz55-I

> 递归：

```js
var maxDepth = function(root) {
  if (!root) return 0;
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
};
```

### 平衡二叉树 jz55-II

```js
var isBalanced = function(root) {
  if (!root) return true;
  if (Math.abs(deep(root.left) - deep(root.right)) > 1) return false;
  return isBalanced(root.left) && isBalanced(root.right);
};
var deep = function(root) {
  if (!root) return 0;
  return Math.max(deep(root.left), deep(root.right)) + 1;
};
```

### 二叉搜索树的最近公共祖先 jz68-I lc235

> 递归

```js
var lowestCommonAncestor = function(root, p, q) {
  if (p.val > root.val && q.val > root.val) {
    return lowestCommonAncestor(root.right, p, q);
  } else if (p.val < root.val && q.val < root.val) {
    return lowestCommonAncestor(root.left, p, q);
  } else {
    return root;
  }
};
```

> 迭代

```js
var lowestCommonAncestor = function(root, p, q) {
  while (root != null) {
    if (p.val > root.val && q.val > root.val) {
      root = root.right;
    } else if (p.val < root.val && q.val < root.val) {
      root = root.left;
    } else {
      return root;
    }
  }
  return null;
};
```

### 二叉树的最近公共祖先 jz68-II lc236

### 二叉搜索树中的搜索 lc700

> 递归

```js
var searchBST = function(root, val) {
  if (!root) return null;
  if (root.val > val) {
    return searchBST(root.left, val);
  } else if (root.val < val) {
    return searchBST(root.right, val);
  } else {
    return root;
  }
};
```

> 迭代

```js
var searchBST = function(root, val) {
  while (root) {
    if (root.val === val) return root;
    else if (root.val > val) root = root.left;
    else root = root.right;
  }
  return null;
};
```

### 二叉搜索树的插入 lc 701

```js
var insertIntoBST = function(root, val) {
  if (root == null) return new TreeNode(val);
  if (val > root.val) {
    root.right = insertIntoBST(root.right, val);
  } else {
    root.left = insertIntoBST(root.left, val);
  }
  return root;
};
```

## **动态规划**

### 斐波那契数列 jz10-I

> 递归

```js
var fib = function(n) {
  return n < 2 ? n : fib(n - 1) + fib(n - 2);
};
```

> 递归(尾调用优化)

```js
var fib = function(n, n0 = 0, n1 = 1) {
  if (n == 0) return n0;
  if (n == 1) return n1;
  return fib(n - 1, n1, n0 + n1);
};
```

> 记忆化递归

```js
var fib = function(n) {
  let arr = [0, 1];
  for (let i = 2; i <= n; i++) {
    arr[i] = arr[i - 1] + arr[i - 2];
  }
  return arr[n];
};
```

> 动态规划

```js
var fib = function(n) {
  let a = 0,
    b = 1,
    sum;
  while (n--) {
    sum = a + b;
    a = b;
    b = sum;
  }
  return a;
};
```

> 动态规划（数组解构）

```js
var fib = function(n) {
  let a = 0,
    b = 1;
  while (n--) {
    [a, b] = [b, a + b];
  }
  return a;
};
```

### 青蛙跳台阶问题 jz10-II

> 递归

```js
var numWays = function(n) {
  if (n < 2) return 1;
  return numWays(n - 1) + numWays(n - 2);
};
```

> 记忆化递归

```js
var numWays = function(n) {
  let arr = [1, 1];
  for (let i = 2; i <= n; i++) {
    arr[i] = arr[i - 1] + arr[i - 2];
  }
  return arr[n];
};
```

> 动态规划

```js
var numWays = function(n) {
  let a = 1,
    b = 1,
    sum;
  while (n--) {
    sum = a + b;
    a = b;
    b = sum;
  }
  return a;
};
```

#### 变态跳台阶

跳台阶的问题是一个动态规划的问题，由于一次只能够跳 1 级或者 2 级，因此跳上 n 级台阶一共有两种方案，一种是从 n-1 跳上，一
种是从 n-2 级跳上，因此 f(n) = f(n-1) + f(n-2)。

和斐波那契数列类似，不过初始两项的值变为了 1 和 2，后面每项的值等于前面两项的和。

变态跳台阶的问题同上一个问题的思考方案是一样的，我们可以得到一个结论是，每一项的值都等于前面所有项的值的和。

f(1) = 1
f(2) = f(2-1) + f(2-2) //f(2-2) 表示 2 阶一次跳 2 阶的次数。
f(3) = f(3-1) + f(3-2) + f(3-3)
...
f(n) = f(n-1) + f(n-2) + f(n-3) + ... + f(n-(n-1)) + f(n-n)

再次总结可得

```
                 | 1       ,(n=0 )
   f(n) =        | 1       ,(n=1 )
                 | 2*f(n-1),(n>=2)
```

### 最小路径和 lc64

> 暴力递归

```js
var minPathSum = function(grid) {
  let x = grid.length - 1;
  let y = grid[0].length - 1;
  return calc(grid, x, y);
};
var calc = function(grid, i, j) {
  if (i == 0 && j == 0) return grid[0][0];
  if (i == 0) return grid[i][j] + calc(grid, 0, j - 1);
  if (j == 0) return grid[i][j] + calc(grid, i - 1, 0);
  return grid[i][j] + Math.min(calc(grid, i - 1, j), calc(grid, i, j - 1));
};
```

> 二维 dp

```js
var minPathSum = function(grid) {
  let x = grid.length;
  let y = grid[0].length;
  let dp = Array.from(new Array(x), () => new Array(y));
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      if (i != 0 && j !== 0) {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
      } else if (i != 0 && j == 0) {
        dp[i][j] = dp[i - 1][j] + grid[i][j];
      } else if (i == 0 && j != 0) {
        dp[i][j] = dp[i][j - 1] + grid[i][j];
      } else {
        dp[i][j] = grid[i][j];
      }
    }
  }
  return dp[x - 1][y - 1];
};
```

> 一维 dp

```js
var minPathSum = function(grid) {
  var dp = new Array(grid[0].length);
  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[0].length; j++) {
      if (i != 0 && j != 0) {
        dp[j] = Math.min(dp[j - 1], dp[j]) + grid[i][j];
      } else if (i == 0 && j != 0) {
        dp[j] = dp[j - 1] + grid[i][j];
      } else if (i != 0 && j == 0) {
        dp[j] = dp[j] + grid[i][j];
      } else if (i == 0 && j == 0) {
        dp[j] = grid[i][j];
      }
    }
  }
  return dp[grid[0].length - 1];
};
```

> O(1)dp

```js
var minPathSum = function(grid) {
  let x = grid.length;
  let y = grid[0].length;
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      if (i != 0 && j !== 0) {
        grid[i][j] = Math.min(grid[i - 1][j], grid[i][j - 1]) + grid[i][j];
      } else if (i != 0 && j == 0) {
        grid[i][j] = grid[i - 1][j] + grid[i][j];
      } else if (i == 0 && j != 0) {
        grid[i][j] = grid[i][j - 1] + grid[i][j];
      }
    }
  }
  return grid[x - 1][y - 1];
};
```

### 最长公共子序列 lc1143

```js
var longestCommonSubsequence = function(text1, text2) {
  let n = text1.length;
  let m = text2.length;
  let dp = Array.from(new Array(n + 1), () => new Array(m + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (text1[i - 1] == text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j]);
      }
    }
  }
  return dp[n][m];
};
```

## **排序**

[十大经典排序算法（动图演示）](https://www.cnblogs.com/onepixel/p/7674659.html)

[常见排序算法的最好、最坏、平均时间复杂度以及空间复杂度](https://blog.csdn.net/Big_Rotor/article/details/97971263)

![](/排序分类.png)

![](/排序复杂度.png)

### 冒泡排序

平均：O(n^2)
最好：O(n)，顺序排序，只需要进行 n-1 比较
最差：O(n^2)，逆序排序，需要进行 n(n-1)/2 次比较
空间：O(1)，两两交换

```js
function bubbleSort(nums) {
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = 0; j < nums.length - 1 - i; j++) {
      if (nums[j] > nums[j + 1]) {
        [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];
      }
    }
  }
  return nums;
}
```

### 选择排序

平均：O(n^2)
最好：O(n^2)
最差：O(n^2)
空间：O(1)，两两交换

```js
function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      minIndex = arr[j] < arr[minIndex] ? j : minIndex;
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }
  return arr;
}
```

### 插入排序

平均：O(n^2)
最好：O(n)，顺序排序，只需要进行 n-1 比较
最差：O(n^2)，逆序排序，需要进行 n(n-1)/2 次比较
空间：O(1)，两两交换

```js
var sortArray = function(nums) {
  for (let i = 1; i < nums.length; i++) {
    for (let j = i - 1; j >= 0 && nums[j] > nums[j + 1]; j--) {
      [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];
    }
  }
  return nums;
};
```

### 希尔排序

平均：O(n^1.3)
最好：O(n)，顺序排序，只需要进行 n-1 比较
最差：O(n^2)，逆序排序，需要进行 n(n-1)/2 次比较
空间：O(1)，两两交换

```js
function shellSort(nums) {
  for (
    let gap = Math.floor(nums.length / 2);
    gap > 0;
    gap = Math.floor(gap / 2)
  ) {
    for (let i = gap; i < nums.length; i++) {
      for (let j = i - gap; j >= 0 && nums[j] > nums[j + gap]; j -= gap) {
        [nums[j], nums[j + gap]] = [nums[j + gap], nums[j]];
      }
    }
  }
  return nums;
}
```

### 归并排序

平均：O(nlogn)

归并算法是一个不断递归的过程，假设数组的元素个数是 n

时间复杂度是 T(n)的函数：T(n)=2\*T(n/2)+O(n)

对于规模为 n 的问题，一共要进行 log(n)层的大小切分

每一层的合并复杂度都是 O(n)

所以整体的复杂度就是 O(nlogn)

空间：O(n)

由于合并 n 个元素需要分配一个大小为 n 的额外数组，合并完成之后，这个数组的空间就会被释放

```js
function mergeSort(nums) {
  let len = nums.length;
  if (len < 2) {
    return nums;
  }
  let mid = len >> 1;
  let left = nums.slice(0, mid);
  let right = nums.slice(mid);
  return merge(mergeSort(left), mergeSort(right));
}
function merge(left, right) {
  let res = [];
  while (left.length > 0 && right.length > 0) {
    left[0] < right[0] ? res.push(left.shift()) : res.push(right.shift());
  }
  return res.concat(left.length ? left : right);
}
```

### 快速排序

原理：

1. 从序列中挑出一个元素作为基准；

2. 分区操作,所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面（相同的数可以到任一边）。

3. 通过递归用这个方法将两个子序列排序

平均：O(nlogn)
最差：O(n^2) 待排序的序列为正序或者逆序，每次划分只得到一个比上一次划分少一个记录的子序列，注意另一个为空。类似冒泡
最好：O(nlogn) 每次对半分区

```js
var quickSort = function(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  var pivotIndex = Math.floor(arr.length / 2);
  var pivot = arr.splice(pivotIndex, 1);
  var left = [];
  var right = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat(pivot, quickSort(right));
};
console.log(quickSort(arr));
```

### 堆排序

堆排序利用了二叉堆的特性来做，二叉堆通常用数组表示，并且二叉堆是一颗完全二叉树（所有叶节点（最底层的节点）都是从左往右顺序排序，并且其他层的节点都是满的）。二叉堆又分为大根堆与小根堆。

- 大根堆是某个节点的所有子节点的值都比他小
- 小根堆是某个节点的所有子节点的值都比他大

堆排序的原理就是组成一个大根堆或者小根堆。以小根堆为例，某个节点的左边子节点索引是 `i * 2 + 1`，右边是 `i * 2 + 2`，父节点是 `(i - 1) /2`。

1. 首先遍历数组，判断该节点的父节点是否比他小，如果小就交换位置并继续判断，直到他的父节点比他大
2. 重新以上操作 1，直到数组首位是最大值
3. 然后将首位和末尾交换位置并将数组长度减一，表示数组末尾已是最大值，不需要再比较大小
4. 对比左右节点哪个大，然后记住大的节点的索引并且和父节点对比大小，如果子节点大就交换位置
5. 重复以上操作 3 - 4 直到整个数组都是大根堆。

以下是实现该算法的代码

```js
function heap(array) {
  checkArray(array);
  // 将最大值交换到首位
  for (let i = 0; i < array.length; i++) {
    heapInsert(array, i);
  }
  let size = array.length;
  // 交换首位和末尾
  swap(array, 0, --size);
  while (size > 0) {
    heapify(array, 0, size);
    swap(array, 0, --size);
  }
  return array;
}

function heapInsert(array, index) {
  // 如果当前节点比父节点大，就交换
  while (array[index] > array[parseInt((index - 1) / 2)]) {
    swap(array, index, parseInt((index - 1) / 2));
    // 将索引变成父节点
    index = parseInt((index - 1) / 2);
  }
}
function heapify(array, index, size) {
  let left = index * 2 + 1;
  while (left < size) {
    // 判断左右节点大小
    let largest =
      left + 1 < size && array[left] < array[left + 1] ? left + 1 : left;
    // 判断子节点和父节点大小
    largest = array[index] < array[largest] ? largest : index;
    if (largest === index) break;
    swap(array, index, largest);
    index = largest;
    left = index * 2 + 1;
  }
}
```

以上代码实现了小根堆，如果需要实现大根堆，只需要把节点对比反一下就好。

该算法的复杂度是 O(logN)

### 计数排序

### 基数排序

### 桶排序

### 乱序

[数组乱序](https://juejin.im/post/5d004ad95188257c6b518056)

## **正则表达式**

### 计算一篇英文文章中出现次数最多的单词及出现次数

> RegExp

```js
function counts(str) {
  let arr = str.split(/[,\.\s]/);
  //let arr = str.match(/\w+/g);
  let map = new Map();
  let ret = [[], 0];
  arr.forEach((word) => {
    if (word !== '') {
      if (map.has(word)) {
        map.set(word, map.get(word) + 1);
      } else {
        map.set(word, 1);
      }
    }
  });
  for (let [i, j] of map) {
    if (j > ret[1]) {
      ret[0] = [i];
      ret[1] = j;
    } else if (j === ret[1]) {
      ret[0].push(i);
    }
  }
  return ret;
}
```

### 获取 url 中的参数

1. 指定参数名称，返回该参数的值 或者 空字符串
2. 不指定参数名称，返回全部的参数对象 或者 {}
3. 如果存在多个同名参数，则返回数组

```js
function getUrlParam(sUrl, sKey) {
  var result = {};
  sUrl.replace(/\??(\w+)=(\w+)&?/g, function(a, k, v) {
    if (result[k]) {
      var t = result[k];
      result[k] = [].concat(t, v);
    } else {
      result[k] = v;
    }
  });
  if (sKey) {
    return result[sKey] || '';
  } else {
    return result;
  }
}
```

### 时间格式化输出

格式说明
对于 2014.09.05 13:14:20
yyyy: 年份，2014
yy: 年份，14
MM: 月份，补满两位，09
M: 月份, 9
dd: 日期，补满两位，05
d: 日期, 5
HH: 24 制小时，补满两位，13
H: 24 制小时，13
hh: 12 制小时，补满两位，01
h: 12 制小时，1
mm: 分钟，补满两位，14
m: 分钟，14
ss: 秒，补满两位，20
s: 秒，20
w: 星期，为 ['日', '一', '二', '三', '四', '五', '六'] 中的某一个

```js
function formatDate(t, str) {
  var obj = {
    yyyy: t.getFullYear(),
    yy: ('' + t.getFullYear()).slice(-2),
    M: t.getMonth() + 1,
    MM: ('0' + (t.getMonth() + 1)).slice(-2),
    d: t.getDate(),
    dd: ('0' + t.getDate()).slice(-2),
    H: t.getHours(),
    HH: ('0' + t.getHours()).slice(-2),
    h: t.getHours() % 12,
    hh: ('0' + (t.getHours() % 12)).slice(-2),
    m: t.getMinutes(),
    mm: ('0' + t.getMinutes()).slice(-2),
    s: t.getSeconds(),
    ss: ('0' + t.getSeconds()).slice(-2),
    w: ['日', '一', '二', '三', '四', '五', '六'][t.getDay()],
  };
  return str.replace(/([a-z]+)/gi, function(match) {
    return obj[match];
  });
}
//2014-09-05 13:14:20 星期五
formatDate(new Date(1409894060000), 'yyyy-MM-dd HH:mm:ss 星期w');
```

### 获取字符串的长度

如果第二个参数 bUnicode255For1 === true，则所有字符长度为 1
否则如果字符 Unicode 编码 > 255 则长度为 2

```js
function strLength(s, bUnicode255For1) {
  let len = s.length;
  if (bUnicode255For1) {
    return len;
  }
  for (let i = 0; i < len; i++) {
    if (s.charCodeAt(i) > 255) {
      len++;
    }
  }
  return len;
}
```

### 邮箱字符串判断

```js
function isAvailableEmail(sEmail) {
  var reg = /^(\w+\.?)+@\w+(\.\w+)+$/;
  // var reg = /^([\w+\.])+@\w+(\.\w+)+$/;
  return reg.test(sEmail);
}
```

### 颜色字符串转换

```js
function rgb2hex(sRGB) {
  return sRGB.replace(/^rgb\((\d+)\s*\,\s*(\d+)\s*\,\s*(\d+)\)$/g, function(
    a,
    r,
    g,
    b
  ) {
    if ((r, g, b >= 0 && r, g, b < 256)) return '##' + hex(r) + hex(g) + hex(b);
  });
}
function hex(n) {
  return n < 16 ? '0' + (+n).toString(16) : (+n).toString(16);
}
```

### 将字符串转换为驼峰格式

```js
function cssStyle2DomStyle(sName) {
  let arr = sName.split('-').filter((item) => item);
  if (arr.length < 2) return sName;
  return arr
    .slice(1)
    .reduce(
      (pre, cur) => pre + cur.charAt().toUpperCase() + cur.slice(1),
      arr[0]
    );
}
```

> Reg

```js
return sName.replace(/\-[a-z]/g, function(a, b) {
  return b == 0 ? a.replace('-', '') : a.replace('-', '').toUpperCase();
});
```

### 将浮点数点左边的数每三位添加一个逗号

```js
function format(number) {
  return number && number.replace(/(?!^)(?=(\d{3})+\.)/g, ',');
}
```
