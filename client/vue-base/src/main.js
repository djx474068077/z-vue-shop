// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import store from './store'
import Axios from 'axios'
import VueAxios from 'vue-axios'
//懒加载插件
import VueLazyload from 'vue-lazyload'
//无限滚动插件
import VueInfiniteScroll from 'vue-infinite-scroll'
import {currency} from './util/currency'
import './assets/css/base.css'
import './assets/css/checkout.css'
import './assets/css/product.css'
Vue.use(VueInfiniteScroll)
Vue.use(VueLazyload, {
  loading: 'static/loading-svg/loading-bars.svg',
  try: 3
})
Vue.filter('currency', currency)
Vue.use(VueAxios, Axios)
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  mounted () {
    // this.checkLogin()
    // this.getCartCount()
  },
  methods: {
    // checkLogin () {
    //   this.$http.get('/users/checkLogin')
    //   .then(res => {
    //     res = res.data
    //     if (res.status === '0') {
    //       this.$store.commit('updateUserInfo', res.result)
    //     } else {
    //       if (this.$route.path !== '/') {
    //         this.$router.push('/')
    //       }
    //     }
    //   })
    // },
    // getCartCount () {
    //   this.$http.get('/users/getCartCount')
    //   .then(res => {
    //     res = res.data
    //     if (res.status === '0') {
    //       this.$store.commit('updateCartCount', res.result)
    //     }
    //   })
    // }
  }
})
