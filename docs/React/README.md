
[新手学习 react 迷惑的点(一)](https://segmentfault.com/a/1190000020268043)

[新手学习 react 迷惑的点(二)](https://segmentfault.com/a/1190000020280965)

## **组件**

### 创建组件的方式

1、无状态函数式组件

创建纯展示组件，只负责根据传入的`props`来展示，不涉及到要`state`状态的操作，是一个只带有一个`render`方法的组件类。

2、组件是通过**React.createClass**创建的（ES5）

3、React.Component

在 es6 中直接通过 class 关键字来创建

组件其实就是一个构造器,每次使用组件都相当于在实例化组件

react 的组件必须使用 render 函数来创建组件的虚拟 dom 结构

组件需要使用 ReactDOM.render 方法将其挂载在某一个节点上

组件的首字母必须大写

`React.Component`是以 ES6 的形式来创建`react`的组件的，是 React 目前极为推荐的创建有状态组件的方式，相对于 `React.createClass`可以更好实现代码复用。将上面`React.createClass`的形式改为`React.Component`形式如下：

```
class Greeting extends React.Component{
   constructor (props) {
       super(props);
       this.state={
            work_list: []
        }

        this.Enter=this.Enter.bind(this); //绑定this
    }
    render() {
        return (
            <div>
                <input type="text" ref="myWork" placeholder="What need to be done?" onKeyUp={this.Enter}/>

                <ul>
                    {
                        this.state.work_list.map(function (textValue) {
                            return <li key={textValue}>{textValue}</li>;
                        })
                    }
                </ul>

            </div>
        );
    }
    Enter(event) {
        var works = this.state.work_list;
        var work = this.refs.myWork.value;
        if (event.keyCode == 13) {
            works.push(work);
            this.setState({work_list: works});
            this.refs.myWork.value = "";
        }


    }
}

```

### 关于 this

`React.createClass`创建的组件，其每一个成员函数的`this`都有`React`自动绑定，任何时候使用，直接使用`this.method`即可，函数中的`this`会被正确设置

`React.Component`创建的组件，其成员函数不会自动绑定`this`，需要手动绑定，否则`this`不能获取当前组件实例对象

### React.Component 三种手动绑定 this 的方法

1.在构造函数中绑定

```
 constructor(props) {
       super(props);
       this.Enter = this.Enter.bind(this);
  }
```

2.使用 bind 绑定

```
    <div onKeyUp={this.Enter.bind(this)}></div>
```

3.使用 arrow function 绑定

```
    <div onKeyUp={(event)=>this.Enter(event)}></div>
```

### 我们在实际应用中应该选择哪种方法来创建组件呢？

- 只要有可能，尽量使用无状态组件创建形式
- 否则（如需要 state、生命周期方法等），使用`React.Component`这种 es6 形式创建组件

无状态组件与有状态的组件的区别为？

没有状态，没有生命周期，只是简单的接受 props 渲染生成 DOM 结构

无状态组件非常简单，开销很低，如果可能的话尽量使用无状态组件。

无状态的函数创建的组件是无状态组件，它是一种只负责展示的纯组件

无状态组件可以使用纯函数来实现。

```
 const Slide = (props)=>{return (<div>.....</div>)}这就是无状态组件（函数方式定义组件）  可以简写为  const Slide = props =>(<div>......</div>)
```

### React 父子组件通信

父传子（组件嵌套浅）：父组件定义一个属性，子组件通过 this.props 接收。

子传父：父组件定义一个属性，并将一个回调函数赋值给定义的属性，然后子组件进行调用传过来的函数，并将参数传进去，在父组件的回调函数中即可获得子组件传过来的值。

（1）`this.props`

父组件传递消息到子组件

一般情况为：父组件中使用了子组件，然后子组件的 props 属性被父组件的 state 赋值，这样，我们在子组件中使用 this.props 就能获取到父组件用来赋值的 state,也就获取到了父组件要传递的信息。

（2）`context`：[浅谈 react context](https://segmentfault.com/a/1190000020217926)

（3）ref 链

（4）Redux

---

## **高阶组件**

### 高阶组件是什么？如何理解？

ES6 中的 class 只是语法糖，本质还是原型继承。能够更好的进行说明，我们将不会修改组件的代码。而是通过提供一些能够包裹组件的组件，并通过一些额外的功能来增强组件。这样的组件我们称之为高阶组件（Higher-Order Component）。

高阶组件（HOC）是 React 中对组件逻辑进行重用的高级技术。但高阶组件本身并不是 React API。它只是一种模式，这种模式是由 React 自身的组合性质必然产生的。

说到高阶组件，就先得说到高阶函数了，高阶函数是至少满足下列条件的函数：

1、接受一个或多个函数作为输入
2、输出一个函数

### 高阶组件定义

类比高阶函数的定义，高阶组件就是接受一个组件作为参数，在函数中对组件做一系列的处理，随后返回一个新的组件作为返回值。

### 高阶组件的缺点

高阶组件也有一系列的缺点，首先是被包裹组件的静态方法会消失，这其实也是很好理解的，我们将组件当做参数传入函数中，返回的已经不是原来的组件，而是一个新的组件，原来的静态方法自然就不存在了。如果需要保留，我们可以手动将原组件的方法拷贝给新的组件，或者使用 hoist-non-react-statics 之类的库来进行拷贝。

[浅谈 React 高阶组件](https://www.jb51.net/article/137272.htm)

### 使用过哪些高阶组件

1. withRouter 高阶组件，可以根据传入的组件生成一个新的组件，并且为新组件添加上 router 相关的 api。

2. connect 用于连接容器组件与 UI 组件，connect(mapStateToProps,mapDispatchToProps)(ui 组件)，当状态改变的时候，容器组件内部因为通过 store.subscribe 可以监听状态的改变，给 ui 组件传入新的属性，返回容器组件（智能组件），这个函数返回什么，ui 组件 props 上就会挂载什么，ui 组件的属性上就就会有改变状态的方法了，用的话通过 this.props.方法名。

## **虚拟 dom**

[从 React 历史的长河来聊如何理解虚拟 DOM|思否](https://segmentfault.com/a/1190000021431311)

### React 高性能的体现：虚拟 DOM

在 Web 开发中我们总需要将变化的数据实时反应到 UI 上，这时就需要对 DOM 进行操作。而复杂或频繁的 DOM 操作通常是性能瓶颈产生的原因（如何进行高性能的复杂 DOM 操作通常是衡量一个前端开发人员技能的重要指标）。

React 为此引入了虚拟 DOM（Virtual DOM）的机制：在浏览器端用 Javascript 实现了一套 DOM API。基于 React 进行开发时所有的 DOM 构造都是通过虚拟 DOM 进行，每当数据变化时，React 都会重新构建整个 DOM 树，然后 React 将当前整个 DOM 树和上一次的 DOM 树进行对比，得到 DOM 结构的区别，然后仅仅将需要变化的部分进行实际的浏览器 DOM 更新。而且 React 能够批处理虚拟 DOM 的刷新，在一个事件循环（Event Loop）内的两次数据变化会被合并，例如你连续的先将节点内容从 A-B,B-A，React 会认为 A 变成 B，然后又从 B 变成 A UI 不发生任何变化，而如果通过手动控制，这种逻辑通常是极其复杂的。

尽管每一次都需要构造完整的虚拟 DOM 树，但是因为虚拟 DOM 是内存数据，性能是极高的，部而对实际 DOM 进行操作的仅仅是 Diff 分，因而能达到提高性能的目的。这样，在保证性能的同时，开发者将不再需要关注某个数据的变化如何更新到一个或多个具体的 DOM 元素，而只需要关心在任意一个数据状态下，整个界面是如何 Render 的。

### 为什么虚拟 dom 会提升代码性能？

虚拟 DOM 就是 JavaScript 对象，就是在没有真实渲染 DOM 之前做的操作。
真实 dom 的比对变成了虚拟 dom 的比对（js 对象的比对）
虚拟 dom 里面比对，涉及到 diff 算法。 key 值 （key 值相同 dom 可以直接进行复用）

### react 的 diff 算法实现流程

[diff 算法](https://www.jianshu.com/p/cdb4ad82df20)

1.DOM 结构发生改变-----直接卸载并重新 create
2.DOM 结构一样-----不会卸载,但是会 update 变化的内容 3.所有同一层级的子节点.他们都可以通过 key 来区分-----同时遵循 1.2 两点
（其实这个 key 的存在与否只会影响 diff 算法的复杂度,换言之,你不加 key 的情况下,diff 算法就会以暴力的方式去根据一二的策略更新,但是你加了 key,diff 算法会引入一些另外的操作）

React 会逐个对节点进行更新，转换到目标节点。而最后插入新的节点，涉及到的 DOM 操作非常多。diff 总共就是移动、删除、增加三个操作，而如果给每个节点唯一的标识（key），那么 React 优先采用移动的方式，能够找到正确的位置去插入新的节点

### diff 算法和 fiber 算法的区别

diff 算法是同步进行更新和比较，必须同步执行完一个操作再进行下一个操作,所耗时间比较长，JavaScript 是单线程的，一旦组件开始更新，主线程就一直被 React 控制，这个时候如果再次执行交互操作，就会卡顿。

React Fiber 重构这种方式，渲染过程采用切片的方式，每执行一会儿，就歇一会儿。如果有优先级更高的任务到来以后呢，就会先去执行，降低页面发生卡顿的可能性，使得 React 对动画等实时性要求较高的场景体验更好。

### 如何理解 React 中 key?

keys 是什么帮助 React 跟踪哪些项目已更改、添加或从列表中删除。

每个 keys 在兄弟元素之间是独一无二的。

keys 使处理列表时更加高效，因为 React 可以使用子元素上的 keys 快速知道元素是新的还是在比较树时才被移动。

keys 不仅使这个过程更有效率，而且没有 keys ，React 不知道哪个本地状态对应于移动中的哪个项目。

```
例如：数组循环出来三项，每一项前面有一个多选框，假设第一个多选框勾选了，然后我再动态添加新的元素，会发现新添加的元素就会被勾选了，这就是个问题！设置key值，这样的话就可以解决了。
```

### JSX 语法

在 vue 中，我们使用 render 函数来构建组件的 dom 结构性能较高，因为省去了查找和编译模板的过程，但是在 render 中利用 createElement 创建结构的时候代码可读性较低，较为复杂，此时可以利用 jsx 语法来在 render 中创建 dom，解决这个问题，但是前提是需要使用工具来编译 jsx

JSX 是一种语法，全称：javascript xml

JSX 语法不是必须使用的，但是因为使用了 JSX 语法之后会降低我们的开发难度，故而这样的语法又被成为语法糖。

react.js 中有 React 对象，帮助我们创建组件等功能

HTML 中所有的信息我们都可以用 JavaScript 对象来表示，但是用 JavaScript 写起来太长了，结构看起来又不清晰，用 XML 的方式写起来就方便很多了。

于是 React.js 就把 JavaScript 的语法扩展了一下，**让 JavaScript 语言能够支持这种直接在 JavaScript 代码里面编写类似 XML 标签结构的语法，这样写起来就方便很多了**。**编译的过程会把类似 XML 的 JSX 结构转换成 JavaScript 的对象结构**。

在不使用 JSX 的时候，需要使用 React.createElement 来创建组件的 dom 结构，但是这样的写法虽然不需要编译，但是维护和开发的难度很高，且可读性很差。

所谓的 JSX 其实就是 JavaScript 对象，所以使用 React 和 JSX 的时候一定要经过编译的过程:

> JSX 代码 — > 使用 react 构造组件，bable 进行编译—> JavaScript 对象 — `ReactDOM.render()函数进行渲染`—>真实 DOM 元素 —>插入页面

另：

- JSX 就是在 js 中使用的 xml，但是，这里的 xml 不是真正的 xml，只能借鉴了一些 xml 的语法，例如：

最外层必须有根节点、标签必须闭合

- jsx 借鉴 xml 的语法而不是 html 的语法原因：xml 要比 html 严谨，编译更方便

### webpack 中，是借助 loader 完成的 jsx 代码的转化，还是 babel?

在 vue 中，借助 webpack 提供的 vue-loader 来帮助我们做一些转化，让 vue 代码可以在浏览器中执行。
react 中没有 react-loader 来进行代码的转化，而是采用 babel 里面 babel-preset-react 来实现的。

### 调用 setState 之后，发生了什么？

```
constructor(props){
	super(props);
	this.state = {
		age:1
	}
}
```

通过调用 this.setState 去更新 this.state,不能直接操作 this.state，请把它当成不可变的。
调用 setState 更新 this.state,他不是马上就会生效的，他是异步的。所以不要认为调用完 setState 后可以立马获取到最新的值。

多个顺序执行的 setState 不是同步的一个接着一个的执行，会加入一个异步队列，然后最后一起执行，即批处理。

setState 是异步的，导致获取 dom 可能拿的还是之前的内容，所以我们需要在 setState 第二个参数（回调函数）中获取更新后的新的内容。

```
this.setState((prevState)=>({
	age:++prevState.age
}),()=>{
	console.log(this.state.age) //获取更新后的最新的值
});
```

### React 实现异步请求

redux 中间件

通常情况下，action 只是一个对象，不能包含异步操作

redux-thunk 中间件

redux-thunk 原理：

-可以接受一个返回函数的 actionCreators，如果这个 actionCreators 返回的是一个函数，就执行它，如果不是，就按照原来的 next（action）执行

-如果不安装 redux-thunk 中间件，actionCreators 只能返回一个对象

-安装了 redux-thunk 中间件之后，actionCreators 可以返回一个函数了，在这个函数里面可以写异步操作的代码

-redux 中间件，创建出来的 action 在到达 reducer 之间，增强了 dispatch 的派发功能

### refs 的作用业务场景？

通过 ref 对 dom、组件进行标记，在组件内部通过 this.refs 获取到之后，进行操作

```
<ul ref='content'><li>国内新闻</li></ul>
...
this.refs.content.style.display = this.state.isMenuShow?'block':'none'
```

ref 用于给组件做标记，例如获取图片的宽度与高度。

非受控组件，input 输入框，获取输入框中的数据，可以通过 ref 做标记。

```
 <input ref={el=>this.input = el}/>
```

### ref 是一个函数，为什么？

避免组件之间数据相互被引用，造成内存泄漏

```
class Test extends React.Component{
	componentDidMount(){
		console.log(this.el);
	}
	render(){
		//react在销毁组件的时候会帮助我们清空掉ref的相关引用，这样可以防止内存泄漏等一系列问题。
		return <div ref={el=>this.el=el}></div>
	}
}
```

### 受控组件与非受控组件的区别

受控组件与非受控组件是相对于表单而言。

受控组件： 受到数据的控制。组件的变化依靠数据的变化，数据变化了，页面也会跟着变化了。输入框受到数据的控制，数据只要不变化，input 框输什么都不行，一旦使用数据，从状态中直接获取。

```
 <input value={this.state.value}/>
```

非受控组件： 直接操作 dom，不做数据的绑定。通过 refs 来获取 dom 上的内容进行相关的操作。

```
<input ref={el=>this.el=el}/> //不需要react组件做管理
```

_数据驱动是 react 核心。_

### 实现监听滚动高度

```
class Test extends React.Component{
	constructor(props){
		super(props);
		this.handleWidowScroll = this.handleWidowScroll.bind(this);
	}
	handleWidowScroll(){
		this.setState({
			top:document.body.scrollTop
		})
	}
	componentDidMount(){//绑定监听事件
		window.addEventListener("scroll",this.handleWindowScroll);
	}
	componentWillUnmount(){//移除监听事件
		window.removeEventListener("scroll",this.handleWindowScroll);
	}
}
```

### React 中 data 为什么返回一个函数

为了防止组件与组件之间的数据共享，让作用域独立，data 是函数内部返回一个对象，让每个组件或者实例可以维护一份被返回对象的独立的拷贝。

## **路由**

### react-router4 的核心思想是什么？

路由也变成组件了，所以它是非常灵活的(NavLink Route)。 vue 中的路由需要单独的配置 vue-router。

### react-router 的两种模式是什么？

hashHistory ## 不需要后端服务器的配置
browserHistory / 需要后端服务器的配置 （后端人员不清楚路由重定向等相关的概念）

### hash 路由的实现原理

通过 onhashchange 事件监听路由的改变，一旦路由改变，这个事件就会被执行，就可以拿到更改后的哈希值，通过更改后的哈希值就可以让我们的页面进行一个关联，一旦路由发生改变了，整个页面状态就会发生改变，但是整个页面是没有发生任何 http 请求的，整个页面处于一种无刷新状态。

- hash 模式背后的原理是`onhashchange`事件，可以在`window`对象上监听这个事件：

```
window.onhashchange = function(event) {
    console.log(event.oldURL, event.newURL);
    let hash = loaction.hash  //通过location对象来获取hash地址
    console.log(hash)    // "##/notebooks/260827/list"  从##号开始
}
```

因为 hash 发生变化的 url 都会被浏览器记录下来，从而你会发现浏览器的前进后退都可以用 ，这样一来，尽管浏览器没有请求服务器，但是页面状态和 url 一一关联起来，后来人们给它起了一个霸气的名字叫**前端路由**，成为了单页应用标配。

_spa 单页应用：根据页面地址的不同来实现组件之间的切换，整个页面处于一种无刷新状态。_

### history 路由

随着 history api 的到来，前端路由开始进化了，前面的**hashchange，你只能改变##后面的 url 片段，而 history api 则给了前端完全的自由**

history api 可以分为两大部分：切换和修改 【切换路由/修改路由】

（1）切换历史状态

包括括`back、forward`、`go`三个方法，对应浏览器的前进，后退，跳转操作

```
history.go(-2);//后退两次
history.go(2);//前进两次
history.back(); //后退
hsitory.forward(); //前进
```

（2）修改历史状态

包括 了`pushState、replaceState`两个方法，这两个方法接收三个参数：stateObj，title，url。

### 两种模式的区别是什么？

在 hash 模式下，前端路由修改的是##中的信息，而浏览器请求时是不带它玩的，所以没有问题。但是在 history 下，你可以自由的修改 path，当刷新时，如果服务器中没有相应的响应或者资源，会分分钟刷出一个 404 来，需要后端人员去做一个配置。

## **生命周期**

### react 的生命周期函数

【初始化阶段】：

（1）getDefaultProps：实例化组件之后，组件的 getDefaultProps 钩子函数会执行

这个钩子函数的目的是为组件的实例挂载默认的属性

这个钩子函数只会执行一次，也就是说，只在第一次实例化的时候执行，创建出所有实例共享的默认属性，后面再实例化的时候，不会执行 getDefaultProps，直接使用已有的共享的默认属性

理论上来说，写成函数返回对象的方式，是为了防止实例共享，但是 react 专门为了让实例共享，只能让这个函数只执行一次

组件间共享默认属性会减少内存空间的浪费，而且也不需要担心某一个实例更改属性后其他的实例也会更改的问题，因为组件不能自己更改属性，而且默认属性的优先级低。

（2）getInitialState：为实例挂载初始状态，且每次实例化都会执行，也就是说，每一个组件实例都拥有自己独立的状态。

（3）componentWillMount：执行 componentWillMount，相当于 Vue 里的 created+beforeMount，这里是在渲染之前最后一次更改数据的机会，在这里更改的话是不会触发 render 的重新执行。

（4）**render**：渲染 dom

`render()`方法必须是一个纯函数，他不应该改变`state`，也不能直接和浏览器进行交互，应该将事件放在其他生命周期函数中。 如果`shouldComponentUpdate()`返回`false`，`render()`不会被调用。

（5）componentDidMount：相当于 Vue 里的 mounted,多用于操作真实 dom

【运行中阶段】

当组件 mount 到页面中之后，就进入了运行中阶段，在这里有 5 个钩子函数，但是这 5 个函数只有在数据（属性、状态）发送改变的时候才会执行

（1）componentWillReceiveProps(nextProps,nextState)

当父组件给子组件传入的属性改变的时候，子组件的这个函数才会执行。初始化 props 时候不会主动执行

当执行的时候，函数接收的参数是子组件接收到的新参数，这个时候，新参数还没有同步到 this.props 上,多用于判断新属性和原有属性的变化后更改组件的状态。

（2）接下来就会执行 shouldComponentUpdate(nextProps,nextState),这个函数的作用：当属性或状态发生改变后控制组件是否要更新，提高性能,返回 true 就更新，否则不更新，默认返回 true。

接收 nextProp、nextState，根据根据新属性状态和原属性状态作出对比、判断后控制是否更新

如果`shouldComponentUpdate()`返回`false`，`componentWillUpdate`,`render`和`componentDidUpdate`不会被调用。

（3）componentWillUpdate,在这里，组件马上就要重新 render 了，多做一些准备工作，千万千万，不要在这里修改状态，否则会死循环 相当于 Vue 中的 beforeUpdate

（4）render，重新渲染 dom

（5）componentDidUpdate，在这里，新的 dom 结构已经诞生了,相当于 Vue 里的 updated

【销毁阶段】

**当组件被销毁之前的一刹那，会触发 componentWillUnmount，临死前的挣扎**

相当于 Vue 里的 beforeDestroy，所以说一般会做一些善后的事情，例如使定时器无效，取消网络请求或清理在`componentDidMount`中创建的任何监听。

![](http://ww3.sinaimg.cn/large/006tNc79ly1g4lchd7rw9j30ka0lcdh1.jpg)

### React 中怎么样就算组件被销毁：

1. 当父组件从渲染这个子组件变成不渲染这个子组件的时候，子组件相当于被销毁
2. 调用 ReactDOM.unmountComponentAtNode(node) 方法来将某节点中的组件销毁

### 哪个生命周期里面发送 ajax?

AJAX 请求应该在 componentDidMount 生命周期事件中。

### 如何避免 ajax 数据重新获取？

将所有的数据存储在 redux 中进行管理，既可以解决该问题。

### 为什么不把请求数据的操作写在 componentWillMount 中而写在 componentDidMount 中？

（1）此钩子函数在 16 版本中会被频繁调用：15.X 版本用的是 diff 算法，不会被频繁调用，而 React 下一代调和算法 Fiber 会通过开始或停止渲染的方式优化应用性能，其会影响到 comonentWillMount 的触发次数，对于 componentWillMount 这个生命周期的调用次数就会变得不确定。React 可能会多次频繁调用 componentWillMount，如果我们将 ajax 请求放到 componentWillMount 函数中，那么显而易见就会被触发多次，自然也就不是好的选择。

（2）componentWillMount()将在 React 未来版本(官方说法 17.0)中被弃用。为了避免副作用和其他的订阅，官方都建议使用 componentDidMount()代替。这个方法是用于在服务器渲染上的唯一方法。

### componentWillReceiveProps 调用时机？

初始化父组件第一次将数据传递给子组件的时候不会去执行，只有属性 props 改变的时候，子组件的钩子函数才会触发执行。

### 受控组件与非受控组件的区别

受控组件：受到数据控制，例如表单元素，当输入框中的内容发生改变的时候，使其更改组件。数据驱动的理念，提倡内部的一些数据最好与组件的状态进行关联。

父组件可以将自己的属性传递给子组件，子组件通过 this.props 调用。

非受控组件；不会受到数据（state）的控制，由 DOM 本身进行管理，输入框的内容发生改变了，直接通过 ref 进行标记，然后直接获取使用即可。

## **Redux**

### 你会把数据统一放入到 redux 中管理，还是共享数据放在 redux 中管理？

把所有的数据放入到 redux 中管理。（props,state）
项目一旦有问题，可以直接定位问题点。
组件扩展的时候，后续涉及到传递的问题。本来的话，自己使用数据，但是后来公用，还需要考虑如何传递。

redux 中存储数据可以存储至少 5G 以上的数据。
目的就是方便数据统一，好管理。

### React 连接 Redux 用到什么？

react-redux 辅助工具

核心组件：Provider 提供者，属性上通过 store 将数据派给容器组件，connect 用于连接容器组件与 UI 组件。

引入 provider，哪个地方需要用到状态和属性，就包裹一下，并且一旦有状态改变，就会监听到，并且将最新的状态返回给 UI 组件。

```
ReactDOM.render(
    <Provider store = {store}>
        <Router>
            <App />
        </Router>
    </Provider>, document.getElementById('root'));
```

connect（）（UI 组件） ==》返回一个容器组件

这个方法参数是 state=>store.getState()

这个方法返回什么，UI 组件的属性上就是有什么

当状态改变的时候，容器组件就会监听状态的变化，并且把更新后的状态通过属性的方法传递给 UI 组件

因为容器组件已经帮助我们实现了 store.subscribe 方法的订阅，这时候就不需要 constructor 函数和监听函数，容器组件就会自动订阅状态的变化，UI 组件通过 this.props 来获取函数中返回的 state，这时候当我们对 state 进行操作的时候，状态就会改变，视图重新渲染，componentWillReceiveProps 这个钩子函数就会执行，实现了对状态改变的事实监听。

connect 中有两个参数，一个是映射状态到组件属性（mapStateToProps），一个是映射方法到组件属性（mapDispatchToProps），最终内部返回一个容器组件帮助我们做监听操作，一旦状态更改，UI 组件就会重新渲染。

connect(mapStateToProps,mapDispatchToProps)(ui 组件)

容器组件内部帮你做了 store.subscribe() 状态变化 ==> 容器组件监听状态改变了 ==> 通过属性的方式给 ui 组件传递

把`store.getState()`的状态转化为展示组件的`props`

当我们需要挂载很多方法的时候我们可以将之简写

首先我们引入 bindActionCreators

```
import {bindActionCreators} from "redux"
```

然后我们使用 bindActionCreators 将所有操作状态的方法全部取出来绑定到 UI 组件的属性上，使用的时候直接通过 this.props 取即可。

```
//actionCreators很纯粹了，需要创建action然后返回action即可！
//ui组件的属性上就就会有改变状态的方法了，用的话通过this.props.方法名
const mapDispatchToProps = dispatch=>{
    return bindActionCreators(actionsCreators,dispatch)
}
connect(mapStateToProps,mapDispatchToProps)(UI组件)
```

### Redux 的组成

redux 有四个组成部分：

store：用来存储数据

reducer：真正的来管理数据

actionCreator：创建 action，交由 reducer 处理

view： 用来使用数据，在这里，一般用 react 组件来充当

![](http://ww3.sinaimg.cn/large/006tNc79ly1g4lmr766buj30i90cgq3b.jpg)

### 什么时候用 redux？

如果你不知道是否需要 Redux，那就是不需要它

只有遇到 React 实在解决不了的问题，你才需要 Redux

简单说，如果你的 UI 层非常简单，没有很多互动，Redux 就是不必要的，用了反而增加复杂性。

- 用户的使用方式非常简单
- 用户之间没有协作
- 不需要与服务器大量交互，也没有使用 WebSocket
- 视图层（View）只从单一来源获取数据

**需要使用 redux 的项目**:

- 用户的使用方式复杂
- 不同身份的用户有不同的使用方式（比如普通用户和管理员）
- 多个用户之间可以协作
- 与服务器大量交互，或者使用了 WebSocket
- View 要从多个来源获取数据

从组件层面考虑，什么样子的需要 redux：

- 某个组件的状态，需要共享
- 某个状态需要在任何地方都可以拿到
- 一个组件需要改变全局状态
- 一个组件需要改变另一个组件的状态

redux 的设计思想：

1. Web 应用是一个状态机，视图与状态是一一对应的。

2. 所有的状态，保存在一个对象里面（唯一数据源）。

### Redux 的流程

Redux 的流程：

1. 创建 store：

   从 redux 工具中取出 createStore 去生成一个 store。

2. 创建一个 reducer，然后将其传入到 createStore 中辅助 store 的创建。

   reducer 是一个纯函数，接收当前状态和 action，返回一个状态，返回什么，store 的状态就是什么，需要注意的是，不能直接操作当前状态，而是需要返回一个新的状态。

   想要给 store 创建默认状态其实就是给 reducer 一个参数创建默认值。

3. 组件通过调用 store.getState 方法来使用 store 中的 state，挂载在了自己的状态上。

4. 组件产生用户操作，调用 actionCreator 的方法创建一个 action，利用 store.dispatch 方法传递给 reducer

5. reducer 对 action 上的标示性信息做出判断后对新状态进行处理，然后返回新状态，这个时候 store 的数据就会发生改变， reducer 返回什么状态，store.getState 就可以获取什么状态。

6. 我们可以在组件中，利用 store.subscribe 方法去订阅数据的变化，也就是可以传入一个函数，当数据变化的时候，传入的函数会执行，在这个函数中让组件去获取最新的状态。

### reducer 是一个纯函数？你对纯函数是怎么理解的？

reducer 是 state 最终格式的确定。它是一个纯函数，也就是说，只要传入参数相同，返回计算得到的下一个 state 就一定相同。没有特殊情况、没有副作用，没有 API 请求、没有变量修改，单纯执行计算。 reducer 对传入的 action 进行判断，然后返回一个通过判断后的 state，这就是 reducer 的全部职责

**Reducer 函数最重要的特征是，它是一个纯函数。也就是说，只要是同样的输入，必定得到同样的输出。**

纯函数是函数式编程的概念，必须遵守以下一些约束。

**不得改写参数**

**不能调用系统 I/O 的 API**

**不能调用 Date.now()或者 Math.random()等不纯的方法，因为每次会得到不一样的结果**

（1）只要是同样的输入，必定得到一个同样的输出。

（2）千万不能更改之前的状态，必须要返回一个新状态

（3）里面不能有不纯的操作，例如 Math.random(),new Date(),io 操作

### redux 中间件的原理是什么？如何理解？

通常情况下，action 只是一个对象，不能包含异步操作，这导致了很多创建 action 的逻辑只能写在组件中，代码量较多也不便于复用，同时对该部分代码测试的时候也比较困难，组件的业务逻辑也不清晰，使用中间件了之后，可以通过 actionCreator 异步编写 action，这样代码就会拆分到 actionCreator 中，可维护性大大提高，可以方便于测试、复用，同时 actionCreator 还集成了异步操作中不同的 action 派发机制，减少编码过程中的代码量。

redux 中间件就是指 action 到达 store 之间。store.dispatch(action)方法将 action 派发给了 store
并且我们的 action 只能是一个对象，需求的时候，就需要考虑到一些异步逻辑放在哪里去实现？
采用中间件之后，action 就可以是一个函数的形式了，并且会把函数式的 action 转成对象，在传递给 store.

**dispatch 一个 action 之后，到达 reducer 之前，进行一些额外的操作，就需要用到 middleware**。你可以利用 Redux middleware 来进行日志记录、创建崩溃报告、调用异步接口或者路由等等。

**换言之，redux 的中间件都是对 store.dispatch()的增强**

### redux 有哪些中间件？

**做异步的操作在 action 里面去实现！需要安装 redux 中间件** redux-thunk redux-saga (基于配置文件 es7 async await) redux-promise

### redux-thunk 原理

Redux-thunk 是一个 Redux 中间件，位于 Action 与 Strore 中间，简单的说，他就是对 store.dispatch 进行了一次升级，他通过改造 store.dispatch，可以使得 store.dispatch 可以接受函数作为参数。

可以看出来 redux-thunk 最重要的思想，就是可以接受一个返回函数的 action creator。如果这个 action creator 返回的是一个函数，就执行它，如果不是，就按照原来的 next(action)执行。 正因为这个 action creator 可以返回一个函数，那么就可以在这个函数中执行一些异步的操作。

## **React 项目相关**

### 项目中遇到哪些问题？如何解决？

**用于轮播图组件的远程数据已经请求回来了，并且也已经实例化完毕了。发现 navbar 能滑，但是滑不过去的现象**

原因：因为我们在 ComponentDidMount 中请求数据，这个操作是异步操作，不会阻止后续代码，所以我们一边执行请求数据的代码一边实例化，数据还在请求中的时候，实例化已经开始执行，等数据回来的时候实例化已经早就结束了。

方法一：放入在**componentDidUpdate**钩子函数里面

问题：当页面中的无关数据改变的时候同样会走这个钩子函数，那就会导致它重新执行。

所以我们给 Swiper 的实例化起一个别名

在 componentDidUpdate 这个函数中 if 语句判断它是否存在，如果不存在再去实例化，存在的话就不需要再去执行实例化操作。

```
//在这个钩子函数里面  就可以获取到因数据改变导致的虚拟dom重新渲染完成的真实dom结构了
    componentDidUpdate(){
        if(!this.swiper)this.initSwiper()  //数据可能还在请求当中，但是这个实例化操作已经完毕了。等后续数据来了，实例化提前早就结束了。
    }
```

方法二：会发现上面的方案会多写一个钩子函数，可不可以在 componentDidmount 里面实现此功能呢？

将实例化操作写在获取数据的回调函数里

```
componentDidMount(){
        //请求数据 更改navs
        this.props.getNavs(()=>{
            this.initSwiper()
        })
    }
```

在 store/home/actionCreators 文件中让 getNavs 接收这个回调函数，在数据请求结束后执行 callback 回调函数。

```
import {GET} from "../../modules/axios-utils"
import {GET_NAV_INFO} from "./const"
export default {
    getNavs(callback){
        return dispatch=>{
            GET({
                url:"/sk/navs"
            }).then(res=>{
                let navs = res.data.data.object_list
                dispatch({ type: GET_NAV_INFO,navs})
                callback && callback()
            })
        }
    }
}
```

我们跳转页面的时候它会多次请求数据,所以我们需要在 componentDidMount 这个钩子函数中判断 redux 里面 navs 是否存在，存在就不需要再发送请求了，这时候从别的页面再跳转回首页就不会重复请求数据，但是数据划不动，所以我们需要在函数中再次执行 Swiper 初始化操作。

```
let {navs} = this.props;
        if(navs){
            this.initSwiper()
            return false;
        }
```

### reducer 中的深拷贝与浅拷贝

我们进行改变状态操作时，componentWillReceiveProps()这个函数没有被触发，说明视图没有检测到状态的改变。这时候我们来到 reducer.js 这个文件中，查看执行添加操作的函数，我们通过

```
let new_state = {...prevState}
```

这句代码将 prevState 解构出来赋值给 new_stat，,我们往 new_state 中的 todos 数组 push 一个新内容，并没有返回新的状态，那是因为当我们对 new_state 这个数组进行操作的时候，会影响到之前的 prevState 中的 todos，因为 todos 是个引用类型，它和 new_state 中的 todos 指向同一块内存空间，所以当我们执行 push 操作的时候相当于更改了之前的状态。在 redux 中规定，千万不能对之前的状态进行任何操作，必须要返回一个新状态，内部以此为依据来判断到底有没有新的状态产生，根据之前状态与新状态的地址比较，更改之后的地址跟之前的地址是同一个的话，就说明没有产生新状态。所以即便我们操作的是 new_state 中的 todos，实际上我们更改的也是 prevState 中的 todos，所以不会有新的状态产生。

所以我们要使用深拷贝，拷贝出来一份一样的数组，并且这个新数组的引用地址和之前的引用地址完全不同。

```
ew_state.todos = new_state.todos.slice();
```
