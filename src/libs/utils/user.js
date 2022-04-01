import store from '@/store'
import router from '@/router'
import { cookie } from './cookie'

// 用户是否登录
export function isLogin() {
  return !!cookie('username') && !!cookie('token')
}

// 导航到登录页
export function toLogin(redirect, type = 'push', callback = null) {
  store.commit('app/setLoginCallback', callback)
  router[type]({
    name: 'login',
    query: redirect ? { redirect: redirect } : {},
  })
}

// 弹窗登录
export function login(callback = null) {
  store.commit('app/setShowLogin', true)
  store.commit('app/setLoginCallback', callback)
}

// 设置登录态：默认保存30天
export function setLogin({ token, username, expires = 30 }) {
  let opts = { expires } // 天
  cookie('token', token, opts)
  cookie('username', username, opts)
  store.commit('app/upLoginState') // 更新登录态
}

// 退出登录
export function logout(callback = () => {}) {
  clearLogin()
  callback()
}

// 清除登录态
export function clearLogin() {
  cookie('token', '')
  cookie('username', '')
  store.commit('app/upLoginState')
}
