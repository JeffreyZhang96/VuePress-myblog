## <big>mimall</big>

## **项目基础架构**

### 跨域-CORS

需后台设置

`Access-Control-Allow-Credentials:true`：允许携带`Cookie`
`Access-Control-Allow-Origin:http://localhost:8080`

### 跨域-JSONP

安装`jsonp`插件

```js
mounted(){
  let url="...";
  jsonp(url,(err,res)=>{
    let result = res;
    this.data = result;
  })
}
```

### 接口代理 proxy

最简单、最安全、不知道后端接口对应的是哪个服务，因为用代理抹平了

本地开发环境 vue.config.js

```js
module.exports = {
  devServer: {
    host: "localhost",
    port: 8080,
    proxy: {
      "/api": {
        target: "http://mall-pre.springboot.cn",
        changeOrigin: true,
        pathRewrite: {
          "/api": ""
        }
      }
    }
  },
  // publicPath:'/app',
  // outputDir:'dist',
  // indexPath:'index2.html',
  // lintOnSave:false,
  productionSourceMap: true,
  chainWebpack: config => {
    config.plugins.delete("prefetch");
  }
};
```

在 XHR 请求里是没有的，是一个 JS 返回

### 接口梳理

1. 熟悉文档、查看原型、读懂需求
2. 了解前端设计稿-设计前端业务架构
3. 了解后台接口文档-制定相关对接规范
4. 协调资源
5. 搭建前端架构

### 目录结构设置

大图片放在`public`里面，小图片放在`assets`里。小图片 webpack 编译成 base64 减少请求

util 存放工具函数，金额的格式化，文字的转换。

store vux

router.js

### 基本插件

vue-lazyload

node-sass sass-loader

vue-awesome-swiper

vue-axios 将 axios 绑定到 vue 实例上，减少 import

按需加载 Element-UI

vue-cookie

### 路由封装

```js
//router.js
import Vue from "vue";
import Router from "vue-router";
import Home from "./pages/home";
import Index from "./pages/index";
Vue.use(Router);
export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      redirect: "/index",
      children: [
        {
          path: "/index",
          name: "index",
          component: Index
        },
        {
          path: "/product/:id",
          name: "product",
          component: () => import("./pages/product.vue")
        },
        {
          path: "/detail/:id",
          name: "detail",
          component: () => import("./pages/detail.vue")
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./pages/login.vue")
    },
    {
      path: "/cart",
      name: "cart",
      component: () => import("./pages/cart.vue")
    },
    {
      path: "/order",
      name: "order",
      component: () => import("./pages/order.vue"),
      children: [
        {
          path: "list",
          name: "order-list",
          component: () => import("./pages/orderList.vue")
        },
        {
          path: "confirm",
          name: "order-confirm",
          component: () => import("./pages/orderConfirm.vue")
        },
        {
          path: "pay",
          name: "order-pay",
          component: () => import("./pages/orderPay.vue")
        },
        {
          path: "alipay",
          name: "alipay",
          component: () => import("./pages/alipay.vue")
        }
      ]
    }
  ]
});
```

### Storage 封装

1. Storage 本身有 API，但是只是简单的 key/value 形式
2. Storage 只储存字符串，需要手工转化成 json 对象
3. Storage 只能一次性清空，不能单个清空

```js
const STORAGE_KEY = "mall";
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
  // 获取某一个模块下面的属性user下面的userName getItem(userName,user)
  getItem(key, module_name) {
    if (module_name) {
      let val = this.getItem(module_name);
      if (val) return val[key];
    }
    return this.getStorage()[key];
  },
  getStorage() {
    return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || "{}");
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
  }
};
```

### 接口错误拦截

1. 统一报错
2. 未登录统一拦截
3. 请求值、返回值统一处理

```js
// 根据前端的跨域方式做调整 /a/b : /api/a/b => /a/b
axios.defaults.baseURL = "/api";
//超时设置
axios.defaults.timeout = 8000;
// 接口错误拦截
axios.interceptors.response.use(
  function(response) {
    let res = response.data; //获取接口的返回值
    if (res.status == 0) {
      return res.data;
    } else if (res.status == 10) {
      //main.js用vuerouter尽享跳转没有用，因为挂载在vue实例上
      window.location.href = "/##/login";
      return Promise.reject(res);
    } else {
      Message.warning(res.msg);
      return Promise.reject(res);
    }
  },
  error => {
    let res = error.response;
    Message.error(res.data.message);
    return Promise.reject(error);
  }
);
```

### 接口环境设置

1. 开发上线的不同阶段，需要不同的配置
2. 不同的跨域方式，配置不同
3. 打包的时候统一注入环境参数，统一管理环境，输出不同的版本包

```json
  "scripts": {
    "serve": "vue-cli-service serve --model=development",
    "test": "vue-cli-service serve --model=test",
    "build": "vue-cli-service build --model=production",
    "lint": "vue-cli-service lint"
  }
```

```js
//env.js
let baseURL;
//process.env NodeJS全局模块
switch (process.env.NODE_ENV) {
  case "development":
    baseURL = "http://dev-mall-pre.springboot.cn/api";
    break;
  case "test":
    baseURL = "http://test-mall-pre.springboot.cn/api";
    break;
  case "prev":
    baseURL = "http://prev-mall-pre.springboot.cn/api";
    break;
  case "prod":
    baseURL = "http://mall-pre.springboot.cn/api";
    break;
  default:
    baseURL = "http://mall-pre.springboot.cn/api";
    break;
}
export default {
  baseURL
};
```

```js
//main.js
// 根据环境变量获取不同的请求地址
import env from "./env";
axios.defaults.baseURL = env.baseURL;
```

### Mock 设置

1. 开发阶段，为了高效率，需要提前 Mock
2. 减少代码冗余、灵活插拔
3. 减少沟通、减少接口联调时间

方案：

1. 本地创建 json
2. easy-mock 平台
3. 集成 Mock API Mockjs

```js
//mock/api.js
import Mock from "mockjs";
Mock.mock("/api/user/login", {
  status: 0,
  data: {
    "id|10001-11000": 0,
    username: "@cname",
    email: "admin@51purse.com",
    phone: null,
    role: 0,
    createTime: 1479048325000,
    updateTime: 1479048325000
  }
});
```

```js
//main.js
// mock开关
const mock = false;
if (mock) {
  require("./mock/api");
}
```

### 页面结构

八个页面：

登录->产品首页(轮播图、菜单、导航、banner 位、活动位、商品列表)->产品站->产品详情

购物车->订单确认->订单支付->订单列表

页面布局开发、页面样式、接口对接、接口的对接、页面的交互以及 banner、菜单、商品列表根据分类

### Vuex 集成

```js
import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import actions from "./action";
Vue.use(Vuex);
const state = {
  username: "", //登录用0
  cartCount: 0 //购物车商品数量
};
export default new Vuex.Store({
  state,
  mutations,
  actions
});
```

#### Vuex 异步请求数据通过 computed 计算属性值

一开始尝试使用赋值给 data 的方法，后来发现重新发起异步请求数据后无法更新新数据。

因为 data 属性只是在组件实例化时赋值一次，依赖发生变化时不会更新，想要使用 data 来获取 computed 同样的效果可以对 data 的字段进行 watch。

使用 Vuex 管理数据时，在组件内使用 dispatch 分发事件后，获取回来的数据要自动更新到该组件内，需要使用 computed 来计算更新。

而计算属性是基于它的依赖缓存的。计算属性在它的相关依赖发生改变时会重新取值，所以当 ajax 请求回来的数据发生变化时，计算属性的值会进行更新，相关的模板引用也会重新渲染。

相比较而言使用 computed 更方便，如下是在实际应用中要不断更新的字段，`return this.$store.state.username`是由 ajax 重新获取的数据。

```js
    computed:{
      username(){
        return this.$store.state.username;
      },
      cartCount(){
        return this.$store.state.cartCount;
      }
      ...mapState(['username','cartCount'])
    },
```

### 产品站页面

#### 组件吸顶实现

```html
<template>
  <div class="nav-bar" :class="{'is_fixed':isFixed}">
    <div class="container">
      <div class="pro-title">
        {{title}}
      </div>
      <div class="pro-param">
        <a href="javascript:;">概述</a><span>|</span>
        <a href="javascript:;">参数</a><span>|</span>
        <a href="javascript:;">用户评价</a>
        <slot name="buy"></slot>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "nav-bar",
    props: {
      title: String
    },
    data() {
      return {
        isFixed: false
      };
    },
    mounted() {
      window.addEventListener("scroll", this.initHeight);
    },
    methods: {
      initHeight() {
        let scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
        this.isFixed = scrollTop > 152 ? true : false;
      }
    },
    //其它页面滚动也会加载，浪费资源，销毁
    destroyed() {
      window.removeEventListener("scroll", this.initHeight, false);
    }
  };
</script>
<style lang="scss">
  @import "./../assets/scss/config.scss";
  @import "./../assets/scss/mixin.scss";
  .nav-bar {
    height: 70px;
    line-height: 70px;
    border-top: 1px solid $colorH;
    background-color: $colorG;
    z-index: 10;
    &.is_fixed {
      position: fixed;
      top: 0;
      width: 100%;
      box-shadow: 0 5px 5px $colorE;
    }
    .container {
      @include flex();
      .pro-title {
        font-size: $fontH;
        color: $colorB;
        font-weight: bold;
      }
      .pro-param {
        font-size: $fontJ;
        span {
          margin: 0 10px;
        }
        a {
          color: $colorC;
        }
      }
    }
  }
</style>
```

### vue-lazyload

图片懒加载，提高首屏的加载速度，提高用户体验减少带宽

### 全局组件

```js
//main.js
Vue.prototype.$message = Message;


//other.js
this.$message....
```

### Vue UI 组件库的按需加载

为了快速开发前端项目，经常会引入现成的 UI 组件库如 ElementUI、iView 等，但是他们的体积和他们所提供的功能一样，是很庞大的。 而通常情况下，我们仅仅需要少量的几个组件就足够了，但是我们却将庞大的组件库打包到我们的源码中，造成了不必要的开销。

不过很多组件库已经提供了现成的解决方案，如 Element 出品的 babel-plugin-component 和 AntDesign 出品的 babel-plugin-import 安装以上插件后，在.babelrc 配置中或 babel-loader 的参数中进行设置，即可实现组件按需加载了。

借助 `babel-plugin-component`插件，我们可以只引入需要的组件，以达到减小项目体积的目的。

将 .babelrc 修改为：

```json
{
  "presets": [["es2015", { "modules": false }]],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```

### 单页应用的按需加载

现在很多前端项目都是通过单页应用的方式开发的，但是随着业务的不断扩展，会面临一个严峻的问题——首次加载的代码量会越来越多，影响用户的体验。

通过 import()语句来控制加载时机，webpack 内置了对于 import()的解析，会将 import()中引入的模块作为一个新的入口在生成一个 chunk。 当代码执行到 import()语句时，会去加载 Chunk 对应生成的文件。import()会返回一个 Promise 对象，所以为了让浏览器支持，需要事先注入 Promise polyfill;

## **商城首页**

### Nav-Header 组件

```js
<template>
  <div class="header">
    <div class="nav-topbar">
      <div class="container">
        <div class="topbar-menu">
          <a href="javascript:;">小米商城</a>
          <a href="javascript:;">MUI</a>
          <a href="javascript:;">云服务</a>
          <a href="javascript:;">协议规则</a>
        </div>
        <div class="topbar-user">
          <a href="javascript:;" v-if="username">{{username}}</a>
          <a href="javascript:;" v-if="!username" @click="login">登录</a>
          <a href="javascript:;" v-if="username" @click="logout">退出</a>
          <a href="/##/order/list" v-if="username">我的订单</a>
          <a href="javascript:;" class="my-cart" @click="goToCart"><span class="icon-cart"></span>购物车({{cartCount}})</a>
        </div>
      </div>
    </div>
    <div class="nav-header">
      <div class="container">
        <div class="header-logo">
          <a href="/##/index"></a>
        </div>
        <div class="header-menu">
          <div class="item-menu">
            <span>小米手机</span>
            <div class="children">
              <ul>
                <li class="product" v-for="(item,index) in phoneList" :key="index">
                  <a v-bind:href="'/##/product/'+item.id" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="item.mainImage" :alt="item.subtitle">
                    </div>
                    <div class="pro-name">{{item.name}}</div>
                    <div class="pro-price">{{item.price | currency}}</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="item-menu">
            <span>RedMi红米</span>
          </div>
          <div class="item-menu">
            <span>电视</span>
            <div class="children">
              <ul>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-1.jpg'" alt="">
                    </div>
                    <div class="pro-name">小米壁画电视 65英寸</div>
                    <div class="pro-price">6999元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-2.jpg'" alt="">
                    </div>
                    <div class="pro-name">小米全面屏电视E55A</div>
                    <div class="pro-price">1999元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-3.png'" alt="">
                    </div>
                    <div class="pro-name">小米电视4A 32英寸</div>
                    <div class="pro-price">699元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-4.jpg'" alt="">
                    </div>
                    <div class="pro-name">小米电视4A 55英寸</div>
                    <div class="pro-price">1799元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-5.jpg'" alt="">
                    </div>
                    <div class="pro-name">小米电视4A 65英寸</div>
                    <div class="pro-price">2699元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-6.png'" alt="">
                    </div>
                    <div class="pro-name">查看全部</div>
                    <div class="pro-price">查看全部</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="header-search">
          <div class="wrapper">
            <input type="text" name="keyword">
            <a href="javascript:;"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  export default{
    name:'nav-header',
    data(){
      return {
        phoneList:[]
      }
    },
    computed:{
      /*username(){
        return this.$store.state.username;
      },
      cartCount(){
        return this.$store.state.cartCount;
      }*/
      ...mapState(['username','cartCount'])
    },
    filters:{
      currency(val){
        if(!val)return '0.00';
        return '￥' + val.toFixed(2) + '元';
      }
    },
    mounted(){
      this.getProductList();
      let params = this.$route.params;
      if(params && params.from == 'login'){
        this.getCartCount();
      }
    },
    methods:{
      login(){
        this.$router.push('/login');
      },
      getProductList(){
        this.axios.get('/products',{
          params:{
            categoryId:'100012',
            pageSize:6
          }
        }).then((res)=>{
          this.phoneList = res.list;
        })
      },
      getCartCount(){
        this.axios.get('/carts/products/sum').then((res=0)=>{
          this.$store.dispatch('saveCartCount',res);
        })
      },
      logout(){
        this.axios.post('/user/logout').then(()=>{
          this.$message.success('退出成功');
          this.$cookie.set('userId','',{expires:'-1'});
          this.$store.dispatch('saveUserName','');
          this.$store.dispatch('saveCartCount','0');
        })
      },
      goToCart(){
        this.$router.push('/cart');
      }
    }
  }
</script>
<style lang="scss">
  @import './../assets/scss/base.scss';
  @import './../assets/scss/mixin.scss';
  @import './../assets/scss/config.scss';
  .header{
    .nav-topbar{
      height:39px;
      line-height:39px;
      background-color:##333333;
      color:##B0B0B0;
      .container{
        @include flex();
        a{
          display:inline-block;
          color:##B0B0B0;
          margin-right:17px;
        }
        .my-cart{
          width:110px;
          background-color:##FF6600;
          text-align:center;
          color:##ffffff;
          margin-right:0;
          .icon-cart{
            @include bgImg(16px,12px,'/imgs/icon-cart-checked.png');
            margin-right:4px;
          }
        }
      }
    }
    .nav-header{
      .container{
        position:relative;
        height:112px;
        @include flex();
        .header-menu{
          display:inline-block;
          width:643px;
          padding-left:209px;
          .item-menu{
            display:inline-block;
            color:##333333;
            font-weight:bold;
            font-size:16px;
            line-height:112px;
            margin-right:20px;
            span{
              cursor:pointer;
            }
            &:hover{
              color:$colorA;
              .children{
                height:220px;
                opacity:1;
              }
            }
            .children{
              position:absolute;
              top:112px;
              left:0;
              width:1226px;
              height:0;
              opacity:0;
              overflow:hidden;
              border-top:1px solid ##E5E5E5;
              box-shadow:0px 7px 6px 0px rgba(0, 0, 0, 0.11);
              z-index: 10;
              transition:all .5s;
              background-color: ##ffffff;
              .product{
                position:relative;
                float:left;
                width:16.6%;
                height:220px;
                font-size:12px;
                line-height:12px;
                text-align: center;
                a{
                  display:inline-block;
                }
                img{
                  width:auto;
                  height:111px;
                  margin-top:26px;
                }
                .pro-img{
                  height:137px;
                }
                .pro-name{
                  font-weight:bold;
                  margin-top:19px;
                  margin-bottom:8px;
                  color:$colorB;
                }
                .pro-price{
                  color:$colorA;
                }
                &:before{
                  content:' ';
                  position:absolute;
                  top:28px;
                  right:0;
                  border-left:1px solid $colorF;
                  height:100px;
                  width:1px;
                }
                &:last-child:before{
                  display:none;
                }
              }
            }
          }
        }
        .header-search{
          width:319px;
          .wrapper{
            height:50px;
            border:1px solid ##E0E0E0;
            display:flex;
            align-items:center;
            input{
              border:none;
              box-sizing: border-box;
              border-right:1px solid ##E0E0E0;
              width:264px;
              height:50px;
              padding-left:14px;
            }
            a{
              @include bgImg(18px,18px,'/imgs/icon-search.png');
              margin-left:17px;
            }
          }
        }
      }
    }
  }
</style>
```

## **登录页面**

## **Vuex 集成**

## **产品站页面**

## **商品详情页面**

## **购物车页面**

## **ElementUI 集成**

## **订单确认页面**

## **订单结算**

## **订单列表**

## **上线部署**

## **总结**
