export const inBrowser = typeof window !== 'undefined'
export const dpr = window.devicePixelRatio || 1
export const ua = window.navigator.userAgent.toLowerCase()
export const isWeixin = /MicroMessenger/i.test(ua)
export const isWeixinMP = /miniProgram/i.test(ua) || window.__wxjs_environment === 'miniprogram'
export const isApp = /kjhaoyun/i.test(ua)
export const isAndroid = ua.indexOf('android') > 0
export const isIOS = /iphone|ipad|ipod|ios/.test(ua)
export const isIE = /msie|trident/.test(ua)
export const isIE9 = ua.indexOf('msie 9.0') > 0
export const isEdge = ua.indexOf('edge/') > 0
export const isChrome = /chrome\/\d+/.test(ua) && !isEdge
export const isAndroidApp = isApp && isAndroid
export const isIOSApp = isApp && isIOS
export const language = window.navigator.language || window.navigator.userLanguage || ''
export const lang = language.slice(0, 2) // 获取浏览器语言前两位
export let screen = {
  width: window.screen.width,
  height: window.screen.height,
}

// 如果物理像素与实际像素相等，说明返回的值可能有误（比如某些三星手机）
if (screen.width === document.documentElement.clientWidth) {
  screen.width *= dpr
  screen.height *= dpr
}
