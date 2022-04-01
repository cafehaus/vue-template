import { cookie, isLogin } from '@/libs/utils'

export default {
  upLoginState(state) {
    state.isLogin = isLogin()
    state.username = cookie('username')
  },
  setShowLogin(state, payload) {
    state.showLogin = payload
  },
  setLoginCallback(state, payload) {
    state.loginCallback = payload
  },
}
