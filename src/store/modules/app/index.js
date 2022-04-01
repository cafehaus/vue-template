// 全局状态模块
import { cookie, isLogin } from '@/libs/utils'
import mutations from './mutations'
import actions from './actions'

const state = {
  isLogin: isLogin(),
  username: cookie('username'),
  showLogin: false, // 显示登录弹框
  loginCallback: null, // 登录回调
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
}
