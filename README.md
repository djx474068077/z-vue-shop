# new-shop-vue
vue全家桶+nodejs+mongodb商城
# someet-shop
vue2.0商城项目
开发步骤

第一天上午
- 在github上面新建git项目
- 克隆到本地

`git clone git@github.com:maxwelldu/someet-shop.git`

- 新建dev分支，新建api分支
```
master分支是线上稳定版本，可以随时发布
dev分支是开发分支，是指可以随时运行进行测试的较稳定的版本
功能分支：开发一个功能从dev切出一个分支
```
`cd someet-shop`
`git checkout -b dev`
`git checkout -b api`

- 新建server目录（API项目）
`mkdir api`

- 将之前写的API项目拷贝过来(连node_modules一起拷贝，如果没拷贝过来yarn或者npm i)

- 启动mongodb数据库(确保C:\data\db有此目录, 如果没有这个目录，自己新建一下；或者用--dbpath去指定)
`mongod`

- 导入测试数据(将resource目录拷贝到项目的根目录，为了方便导入的时候写相对路径)
`mongoimport -d=xshop -c=users ./resource/dumall-users`
`mongoimport -d=xshop -c=goods ./resource/dumall-goods`
进行mongo命令行查看
`mongo`
使用 xshop这个数据库
`use xshop`
查看用户数据
`db.users.find()`
查看商品数据
`db.goods.find()`

- 配置package.json中的script,让其用pm2启动API项目
`"dev": 'pm2 start ./bin/www'`
`npm run dev`

- postman导入测试json

- 开始测试API是否OK

- 提交代码，并合并到dev分支
`git status`
`git add .`
`git commit -am '完成api项目的搭建'`
`git checkout dev`
`git merge api`

## 继续从dev分支检出client_init分支
`git checkout -b client_init`

## 新建client目录（制作前端）
`mkdir client`

## 初始化项目
`cd client && vue init webpack .`

## 安装项目依赖
`npm i -S axios vue-axios vuex vue-lazyload vue-infinite-scroll`

## 安装项目所需要的所有依赖
`yarn` or `npm i`

## 修改proxyTable

## 关闭eslint检查工具
config/index.js
`  useEslint: false,`

## 测试API是否可用

## 提交并合并到dev分支
`git status`
`git add .`
`git commit -am '项目初始化'`
`git checkout dev`
`git merge client_init`

删除helloworld.vue
新建pages, 里面新建一个GoodsList.vue Cart.vue Address.vue OrderConfirm.vue OrderSuccess.vue

```
<template lang="html">

</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
```

配置路由：
import GoodsList from '@/pages/GoodsList'
import Cart from '@/pages/Cart'
import Address from '@/pages/Address'
import OrderConfirm from '@/pages/OrderConfirm'
import OrderSuccess from '@/pages/OrderSuccess'

{
      path: '/',
      name: 'GoodsList',
      component: GoodsList
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/address',
      name: 'Address',
      component: Address
    },
    {
      path: '/orderConfirm',
      name: 'OrderConfirm',
      component: OrderConfirm
    },
    {
      path: '/orderSuccess',
      name: 'OrderSuccess',
      component: OrderSuccess
    }

修改App.vue
保留以下内容：
```
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
```

store/index.js
```
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nickName: '',
    cartCount: 0
  },
  mutations: {
    updateUserInfo (state, nickName) {
      state.nickName = nickName
    },
    updateCartCount (state, cartCount) {
      state.cartCount += cartCount
    },
    clearCartCount(state) {
      state.cartCount = 0
    }
  }
})
```

解压assets.tar放入src/assets中
解压static.tar放入static中
在main.js当中引入css
```
import './assets/css/base.css'
import './assets/css/checkout.css'
import './assets/css/product.css
```
在main.js中引入vue-lazyload vue-infinite-scroll
```

import VueLazyload from 'vue-lazyload'
import VueInfiniteScroll from 'vue-infinite-scroll'
Vue.use(VueInfiniteScroll);
Vue.use(VueLazyload, {
  loading: 'static/loading-svg/loading-bars.svg',
  try: 3
})
```

在main.js当中去请求api,存储用户名
```
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyload from 'vue-lazyload'
import VueInfiniteScroll from 'vue-infinite-scroll'

import './assets/css/base.css'
import './assets/css/checkout.css'
import './assets/css/product.css'

Vue.use(VueInfiniteScroll)
Vue.use(VueLazyload, {
  loading: 'static/loading-svg/loading-bars.svg',
  try: 3
})
Vue.use(VueAxios, Axios)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  mounted () {
    this.checkLogin()
    this.getCartCount()
  },
  methods: {
    checkLogin () {
      this.$http.get('/user/checkLogin')
      .then(res => {
        res = res.data
        if (res.status === 0) {
          this.$store.commit('updateUserInfo', res.result)
        } else {
          if (this.$route.path !== '/') {
            this.$router.push('/')
          }
        }
      })
    },
    getCartCount () {
      this.$http.get('/user/getCartCount')
      .then(res => {
        res = res.data
        if (res.status === 0) {
          this.$store.commit('updateCartCount', res.result)
        }
      })
    }
  }
})
```
