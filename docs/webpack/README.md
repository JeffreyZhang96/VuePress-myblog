## <big>webpack</big>

[关于 webpack 的面试题](https://www.cnblogs.com/gaoht/p/11310365.html)

## **打包构建的好处**

- 体积更小（Tree-Shaking、压缩、合并），加载更快
- 编译高级语言或语法（TS，ES6+，模块化，scss）
- 兼容性和错误检查（Polyfill、postcss、eslint）
- 统一、高效的开发环境
- 统一的构建流程和产出标准
- 集成公司构建规范（提测、上线等）

## **webpack.config.js**

webpack.config.js 是 webpack 的默认打包配置文件。也可以`npx webpack --config 配置文件名`手动设置

```js
/**
 * Wepack配置接口
 */
const path = require("path");

module.exports = {
  // 打包模式
  mode: "production",
  // 入口
  entry: "./index.js",
  // 出口
  output: {
    filename: "bundle.js",
    // path 后必须是一个绝对位置
    path: path.resolve(__dirname, "bundle")
  }
};
```

其中`entry: "./index.js"`是一个简写，

```js
entry: {
  main: "./index.js";
}
```

### module

各个源码文件，webpack 中一切皆模块

### chunk

多模块合并成的，如 entry、import()、splitChunk

chunk 表示一个文件，默认情况下 webpack 的输入是一个入口文件，输出也是一个文件，这个文件就是一个 chunk，chunkId 就是产出时给每个文件一个唯一标识 id，chunkHash 就是文件内容的 md5 值，name 就是在 entry 中指定的 key 值。

```js
module.exports = {
  entry: {
    collection: "./src/main.js" // collection为chunk的名字，chunk的入口文件是main.js
  },
  output: {
    path: "./dist/js",
    filename: "[name].[chunkHash].js" // 输出到dist/js目录下，以collection+chunk内容的md5值作为输出的文件名
  }
};
```

### bundle

最终输出文件

### mode

打包模式，有生产环境与发布环境两种，默认是发布环境。

- production
  - 代码被压缩为一行
- development
  - 代码不被压缩

当没有显示制定时会输出下面内容：

> WARNING in configuration
>
> The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
> You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/

### 多入口

```js
entry:{
    main: 'a/index.js',
    sub: 'b/main.js'
}
// 多个入口是不可打包为同一个JS的，
output: {
    filename: '[name].js'
}
```

### 为打包出的 JS 加前缀

比如静态资源都放在 CDN 上，那么希望打包出 srcipt 的 src 是一个 http 地址
可这样做：

```
output: {
    publicPath: 'http://cdn.cn'
    filename: '[name].js'
}
```

### devtool

devtool 就是去配置 sourcemap，方便调试，能准确定位到代码错误

- cheap
  - 定位到行，不定位到列（提示性能）
- module
  - 把依赖模块中的代码一并做映射
- eval
  - 使用 eval 形式做 sourcemap 映射
- inline
  - 行内的映射关系

最好的配置：

```js
// 开发时
devtool: 'cheap-module-eval-source-map',
// 线上环境：
devtool: 'cheap-module-source-map'
```

## **webpack 的构建流程**

Webpack 的运行流程是一个串行的过程，从启动到结束会依次执行以下流程：

1. 初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数；

2. 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；

3. 确定入口：根据配置中的 entry 找出所有的入口文件；

4. 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；

5. 完成模块编译：在经过第 4 步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系

6. 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；

7. 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。

在以上过程中，Webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。

## **production**

1. 自动开启代码压缩
2. Vue React 等会自动删掉调试代码（如开发环境的 warning）
3. 启动 tree shaking[tree shaking](https://www.webpackjs.com/guides/tree-shaking/)（ES6 Module 才能生效，CommonJS 不行

## **loader**

```js
module.exports = {
  entry: path.join(srcPath, "index"),
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: ["babel-loader"],
        include: srcPath,
        exclude: /node_modules/
      },
      // {
      //     test: /\.vue$/,
      //     loader: ['vue-loader'],
      //     include: srcPath
      // },
      // {
      //     test: /\.css$/,
      //     // loader 的执行顺序是：从后往前（知识点）
      //     loader: ['style-loader', 'css-loader']
      // },
      {
        test: /\.css$/,
        // loader 的执行顺序是：从后往前
        loader: ["style-loader", "css-loader", "postcss-loader"] // 加了 postcss
      },
      {
        test: /\.less$/,
        // 增加 'less-loader' ，注意顺序
        loader: ["style-loader", "css-loader", "less-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(srcPath, "index.html"),
      filename: "index.html"
    })
  ]
};
```

file-loader：把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件

url-loader：和 file-loader 类似，但是能在文件很小的情况下以 base64 的方式把文件内容注入到代码中去

source-map-loader：加载额外的 Source Map 文件，以方便断点调试

image-loader：加载并且压缩图片文件

babel-loader：把 ES6 转换成 ES5

css-loader：加载 CSS，支持模块化、压缩、文件导入等特性

style-loader：把 CSS 代码注入到 JavaScript 中，通过 DOM 操作去加载 CSS。

eslint-loader：通过 ESLint 检查 JavaScript 代码

## **plugins**

[webpack 中文文档|plugins](https://www.webpackjs.com/plugins/)

### loader 和 plugin 的区别

1. 不同的作用

Loader 是模块转换器。Webpack 将一切文件视为模块，但是 webpack 原生是只能解析 js 文件，如果想将其他文件也打包的话，就会用到 loader。 所以 Loader 的作用是让 webpack 拥有了加载和解析非 JavaScript 文件的能力。

Plugin 是扩展插件。Plugin 可以扩展 webpack 的功能，让 webpack 具有更多的灵活性。 在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。

2. 不同的用法

Loader 在 module.rules 中配置，也就是说他作为模块的解析规则而存在。 类型为数组，每一项都是一个 Object，里面描述了对于什么类型的文件（test），使用什么加载(loader)和使用的参数（options）

Plugin 在 plugins 中单独配置。 类型为数组，每一项是一个 plugin 的实例，参数都通过构造函数传入。

## webpack 的热更新

webpack 的热更新又称热替换（Hot Module Replacement），缩写为 HMR。 这个机制可以做到不用刷新浏览器而将新变更的模块替换掉旧的模块。

原理：

首先要知道 server 端和 client 端都做了处理工作

1. 第一步，在 webpack 的 watch 模式下，文件系统中某一个文件发生修改，webpack 监听到文件变化，根据配置文件对模块重新编译打包，并将打包后的代码通过简单的 JavaScript 对象保存在内存中。

2. 第二步是 webpack-dev-server 和 webpack 之间的接口交互，而在这一步，主要是 dev-server 的中间件 webpack-dev-middleware 和 webpack 之间的交互，webpack-dev-middleware 调用 webpack 暴露的 API 对代码变化进行监控，并且告诉 webpack，将代码打包到内存中。

3. 第三步是 webpack-dev-server 对文件变化的一个监控，这一步不同于第一步，并不是监控代码变化重新打包。当我们在配置文件中配置了 devServer.watchContentBase 为 true 的时候，Server 会监听这些配置文件夹中静态文件的变化，变化后会通知浏览器端对应用进行 live reload。注意，这儿是浏览器刷新，和 HMR 是两个概念。

4. 第四步也是 webpack-dev-server 代码的工作，该步骤主要是通过 sockjs（webpack-dev-server 的依赖）在浏览器端和服务端之间建立一个 websocket 长连接，将 webpack 编译打包的各个阶段的状态信息告知浏览器端，同时也包括第三步中 Server 监听静态文件变化的信息。浏览器端根据这些 socket 消息进行不同的操作。当然服务端传递的最主要信息还是新模块的 hash 值，后面的步骤根据这一 hash 值来进行模块热替换。
5. webpack-dev-server/client 端并不能够请求更新的代码，也不会执行热更模块操作，而把这些工作又交回给了 webpack，webpack/hot/dev-server 的工作就是根据 webpack-dev-server/client 传给它的信息以及 dev-server 的配置决定是刷新浏览器呢还是进行模块热更新。当然如果仅仅是刷新浏览器，也就没有后面那些步骤了。

6. HotModuleReplacement.runtime 是客户端 HMR 的中枢，它接收到上一步传递给他的新模块的 hash 值，它通过 JsonpMainTemplate.runtime 向 server 端发送 Ajax 请求，服务端返回一个 json，该 json 包含了所有要更新的模块的 hash 值，获取到更新列表后，该模块再次通过 jsonp 请求，获取到最新的模块代码。这就是上图中 7、8、9 步骤。

7. 而第 10 步是决定 HMR 成功与否的关键步骤，在该步骤中，HotModulePlugin 将会对新旧模块进行对比，决定是否更新模块，在决定更新模块后，检查模块之间的依赖关系，更新模块的同时更新模块间的依赖引用。

8. 最后一步，当 HMR 失败后，回退到 live reload 操作，也就是进行浏览器刷新来获取最新打包代码。

## **sourcemap**

Source map 就是一个信息文件，里面储存着位置信息。也就是说，转换后的代码的每一个位置，所对应的转换前的位置。

源文件

```js
function sayHello(name) {
  if (name.length > 2) {
    name = name.substr(0, 1) + "...";
  }
  console.log("hello,", name);
}
```

压缩后

```js
function sayHello(name) {
  if (name.length > 2) {
    name = name.substr(0, 1) + "...";
  }
  console.log("hello,", name);
}
sayHello("世界");
sayHello("第三世界的人们");
```

map 文件

```js
{"version":3,"sources":["log.js","main.js"],"names":["sayHello","name","length","substr","console","log"],"mappings":"AAAA,SAASA,SAASC,MACd,GAAIA,KAAKC,OAAS,EAAG,CACjBD,KAAOA,KAAKE,OAAO,EAAG,GAAK,MAE/BC,QAAQC,IAAI,SAAUJ,MCJ1BD,SAAS,MACTA,SAAS"}
```

#### sourcemap 如何映射源文件？

TODO

## **webpack 性能优化**

- 对于 Webpack4，打包项目使用 production 模式，这样会自动开启代码压缩
- 使用 ES6 模块来开启 tree shaking，这个技术可以移除没有使用的代码
- 优化图片，对于小图可以使用 base64 的方式写入文件中
- 按照路由拆分代码，实现按需加载
- 给打包出来的文件名添加 hash，js 文件如果有内容更新，hash 就会更新，浏览器请求路径变化所以更新缓存，如果 js 内容不变，hash 不变，直接用缓存，