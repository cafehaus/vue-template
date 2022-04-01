import packageInfo from '../package'

export const { version } = packageInfo
export const source = 1 // 请求来源：1-web 2-IOS 3-安卓 4-微信
export const isProd = process.env.NODE_ENV === 'production'
export const isOnline = location.hostname === 'www.xxx.com'
export const assets = 'https://static.xxx.com/' // 在线静态资源路径
export let env = 'pro'
export let apiUrl = '/api/'

// 根据域名设置接口地址
switch (location.hostname.split('.')[0]) {
  case '192': // 局域网
  case 'localhost':
    env = 'dev'
    apiUrl = '/api-dev'
    break
  case 'dev-www': // 开发环境
    env = 'dev'
    apiUrl = '/api-dev'
    // apiUrl = 'http://dev-www.xxx.com/api/'
    break
  case 'test-www': // 测试环境
    env = 'test'
    apiUrl = '/api-test'
    // apiUrl = 'https://test-www.xxx.com/api/'
    break
}
