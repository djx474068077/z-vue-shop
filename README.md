# new-shop-vue
vueȫ��Ͱ+nodejs+mongodb�̳�
# someet-shop
vue2.0�̳���Ŀ
��������

��һ������
- ��github�����½�git��Ŀ
- ��¡������

`git clone git@github.com:maxwelldu/someet-shop.git`

- �½�dev��֧���½�api��֧
```
master��֧�������ȶ��汾��������ʱ����
dev��֧�ǿ�����֧����ָ������ʱ���н��в��ԵĽ��ȶ��İ汾
���ܷ�֧������һ�����ܴ�dev�г�һ����֧
```
`cd someet-shop`
`git checkout -b dev`
`git checkout -b api`

- �½�serverĿ¼��API��Ŀ��
`mkdir api`

- ��֮ǰд��API��Ŀ��������(��node_modulesһ�𿽱������û��������yarn����npm i)

- ����mongodb���ݿ�(ȷ��C:\data\db�д�Ŀ¼, ���û�����Ŀ¼���Լ��½�һ�£�������--dbpathȥָ��)
`mongod`

- �����������(��resourceĿ¼��������Ŀ�ĸ�Ŀ¼��Ϊ�˷��㵼���ʱ��д���·��)
`mongoimport -d=xshop -c=users ./resource/dumall-users`
`mongoimport -d=xshop -c=goods ./resource/dumall-goods`
����mongo�����в鿴
`mongo`
ʹ�� xshop������ݿ�
`use xshop`
�鿴�û�����
`db.users.find()`
�鿴��Ʒ����
`db.goods.find()`

- ����package.json�е�script,������pm2����API��Ŀ
`"dev": 'pm2 start ./bin/www'`
`npm run dev`

- postman�������json

- ��ʼ����API�Ƿ�OK

- �ύ���룬���ϲ���dev��֧
`git status`
`git add .`
`git commit -am '���api��Ŀ�Ĵ'`
`git checkout dev`
`git merge api`

## ������dev��֧���client_init��֧
`git checkout -b client_init`

## �½�clientĿ¼������ǰ�ˣ�
`mkdir client`

## ��ʼ����Ŀ
`cd client && vue init webpack .`

## ��װ��Ŀ����
`npm i -S axios vue-axios vuex vue-lazyload vue-infinite-scroll`

## ��װ��Ŀ����Ҫ����������
`yarn` or `npm i`

## �޸�proxyTable

## �ر�eslint��鹤��
config/index.js
`  useEslint: false,`

## ����API�Ƿ����

## �ύ���ϲ���dev��֧
`git status`
`git add .`
`git commit -am '��Ŀ��ʼ��'`
`git checkout dev`
`git merge client_init`

ɾ��helloworld.vue
�½�pages, �����½�һ��GoodsList.vue Cart.vue Address.vue OrderConfirm.vue OrderSuccess.vue

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

����·�ɣ�
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

�޸�App.vue
�����������ݣ�
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

��ѹassets.tar����src/assets��
��ѹstatic.tar����static��
��main.js��������css
```
import './assets/css/base.css'
import './assets/css/checkout.css'
import './assets/css/product.css
```
��main.js������vue-lazyload vue-infinite-scroll
```

import VueLazyload from 'vue-lazyload'
import VueInfiniteScroll from 'vue-infinite-scroll'
Vue.use(VueInfiniteScroll);
Vue.use(VueLazyload, {
  loading: 'static/loading-svg/loading-bars.svg',
  try: 3
})
```

��main.js����ȥ����api,�洢�û���
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
