// 接口列表
import { http } from '@/libs/utils'

// ====================================================================== 用户

// 用户-登录|post
export const login = (params) => http.post('user/login', params)

// 退出登录|get
export const logout = params => http.get('user/loginout', params)

// 注册|post
export const register = params => http.post('user/user/register', params)

// 获取图片验证码|get
export const getImgCode = params => http.get('user/imgValidate', params)

// 验证图片验证码并发送短信|post
export const verifyImgCode = params => http.post('user/imgValidate', params)

// ====================================================================== 首页

// 首页-数据统计|post
export const getHomeData = (params) => http.post('home/data', params)

// ====================================================================== 客户管理
// 客户管理-收入|post
export const getIncomeList = (params) => http.post('income/order/list', params)
