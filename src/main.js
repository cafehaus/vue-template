import Vue from 'vue'
import './styles/iview.less'
import './styles/main.styl'
import App from './App'
import { sync } from 'vuex-router-sync' // vuex里可以获取到路由信息
import store from './store'
import router from './router'
import filters from './filters'
import { assets } from './config'
import * as utils from './libs/utils'
import * as api from './api'
import './libs/iview'
import './libs/validator'

Vue.config.productionTip = false // 关闭开发环境提示

sync(store, router)
filters(Vue) // 注册全局过滤器
Vue.prototype.$u = utils
Vue.prototype.$api = api
Vue.prototype.$assets = assets

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
