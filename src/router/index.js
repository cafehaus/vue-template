import Vue from 'vue'
import VueRouter from 'vue-router'
import { LoadingBar } from 'view-design'
import { isLogin, toLogin } from '@/libs/utils'
import routes from './routes'

Vue.use(VueRouter)

// 创建路由实例
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => (savedPosition || { x: 0, y: 0 }),
  routes,
})

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  LoadingBar.start()

  // 登录权限控制
  if (!to.meta.noNeedAuth && !isLogin()) {
    toLogin(to.fullPath)
    return
  }

  // 已登录访问登录页则跳转到首页
  if (isLogin() && to.name === 'login') {
    next({ name: 'home' })
    return
  }

  // 如果未匹配到路由(routes.js里定义了404页面，所以不需要这里处理了)
  // if (!to.matched.length) {
  //   console.log('未匹配到路由:', from, to)
  //   from.path ? next(from.path) : next('/') // 如果能匹配到当前路由，则转到当前路由，否则转到首页
  //   return
  // }

  next()
})

// 全局后置钩子
router.afterEach(to => {
  LoadingBar.finish()
  if (to.meta.title) document.title = to.meta.title
  // window.scrollTo(0, 0)
})

export default router
