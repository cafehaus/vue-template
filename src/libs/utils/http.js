import axios from 'axios'
import { Message } from 'view-design'
import { apiUrl } from '@/config'
import { cookie } from './cookie'
import { session } from './storage'
import { toLogin, logout } from './user'
export let xhrs = []

// 请求超时时限单位毫秒
axios.defaults.timeout = 30000

// 请求出错后重试的次数
axios.defaults.retry = 1

// 请求出错后重试的间隙
axios.defaults.retryDelay = 1000

axios.defaults.baseURL = apiUrl
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'

// axios 默认是发送请求的时候不会带上 cookie 的，需要通过设置 withCredentials: true 来解决
// 后端设置 Access-Control-Allow-Credentials: true 且 Access-Control-Allow-Origin 不能为 *
// axios.defaults.withCredentials = true

let pendingXhrs = [] // 声明一个数组用于存储每个 ajax 请求的取消函数和标识
let removePending = (config, type) => {
  for (let n in pendingXhrs) {
    if (pendingXhrs[n].flag === config.method + ':' + config.url) { // 当前请求在数组中时执行函数体
      type !== 'response' && pendingXhrs[n].abort() // 执行取消操作
      pendingXhrs.splice(n, 1) // 把这条记录从数组中移除
    }
  }
}

// 请求失败
let onfail = err => {
  let errmsg = err.message.toLocaleLowerCase()
  let isTimeout = errmsg.includes('timeout')
  let isCancel = errmsg.includes('cancel')
  let isAbort = errmsg.includes('abort')
  if (isAbort || isCancel) return

  // 提示并上报请求失败信息
  Message.destroy()
  Message.error({
    content: isTimeout ? '请求超时，请检查网络后重试！' : `请求异常[${errmsg}]请稍后重试！`,
    duration: 3,
  })
}

// 添加请求拦截器
const CancelToken = axios.CancelToken
axios.interceptors.request.use(config => {
  // 请求头添加登录验证
  config.headers.Token = cookie('token')

  // 在一个 ajax 发送前取消前一个重复请求
  if (config.abortPrev) {
    removePending(config)
    config.cancelToken = new CancelToken(c => {
      // 这里的 ajax 标识我是用请求地址和请求方式拼接的字符串
      pendingXhrs.push({
        flag: config.method + ':' + config.url,
        abort: c,
      })
    })
  }

  return config
}, error => {
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(res => {
  let config = res.config

  // 在一个 ajax 响应后再执行一下取消操作，把已经完成的请求从 pending 中移除
  if (config.abortPrev) {
    removePending(res.config, 'response')
  }

  return res
}, error => {
  // 如果是主动取消了请求
  if (axios.isCancel(error)) {
    error.message = 'abort'
  }

  // 请求超时的之后，抛出 error.code = ECONNABORTED 的错误..错误信息是 timeout of xxx ms exceeded
  if (error.code === 'ECONNABORTED' && error.message && error.message.includes('timeout')) {
    let config = error.config
    config.__retryCount = config.__retryCount || 0
    config.retry = config.retry || 1 // 兼容某些版本上取不到默认值

    if (config.__retryCount >= config.retry) {
      onfail(error)
      return Promise.reject(error)
    }

    // Increase the retry count
    config.__retryCount += 1

    // Create new promise to handle exponential backoff
    let backoff = new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, config.retryDelay || 1)
    })

    return backoff.then(() => {
      return axios(config)
    })
  } else {
    onfail(error)
    return Promise.reject(error)
  }
})

// Ajax 请求封装
export function ajax(opts) {
  return new Promise((resolve, reject) => {
    let cachekey = opts.cachekey
    let cacheData = cachekey ? session(cachekey) : null

    // 如果有缓存则使用缓存数据
    if (cacheData) {
      resolve(cacheData)
      return
    }

    const handle = res => {
      // 不作处理，直接返回原生数据
      if (opts.notHandle) {
        resolve(res)
      }

      // 请求主动取消等情况会返回空数据
      if (!res || !res.data) {
        opts.error && opts.error(res)
        console.warn('数据格式异常', res)
        resolve(res || {})
        return
      }

      let data = res.data || {}

      // 未登录且无不检查登录配置，则清除登录态并转到登录页
      let notLoin = [401, 10000004].includes(+data.code) || ['没有登录', '用户未登录'].includes(data.message)
      if (notLoin && !opts.notCheckLogin) {
        logout()
        // login()
        toLogin()
        return
      }

      // 处理二进进制流数据
      let responseType = opts.responseType || opts.dataType
      if (responseType === 'arraybuffer') {
        data = 'data:image/png;base64,' + btoa(
          new Uint8Array(data).reduce((d, byte) => d + String.fromCharCode(byte), ''),
        )
      }

      // 有缓存配置且数据请求成功，则缓存数据
      if (opts.cachekey && data.success) {
        session(opts.cachekey, data)
      }

      resolve(data)
    }

    const xhr = axios({
      ...opts,
      url: opts.url,
      method: opts.method || opts.type || 'get',

      // 将被添加到 url 前面，除非 url 是绝对的
      // baseURL: apiUrl,

      // 与请求一起发送的 URL 参数，必须是纯对象或 URLSearchParams 对象
      params: opts.params,

      // 作为请求主体发送的数据，仅适用于请求方法 PUT、POST 和 PATCH
      data: opts.data,

      // 服务器将响应的数据类型，包括：arraybuffer、blob、document、json、text、stream
      responseType: opts.responseType || opts.dataType || 'json',

      // headers
      headers: opts.headers || { 'content-type': 'application/json' },

      // 文件上传进度回调
      onUploadProgress: opts.onUploadProgress,

      // withCredentials: opts.withCredentials || true, // 带 cookie 请求

      // 指定请求超时之前的毫秒数
      timeout: opts.timeout || axios.defaults.timeout,
    }).then(handle).catch(r => {
      opts.error && opts.error(r)
      console.warn(r)
      reject(r)
    })

    xhrs.push(xhr)
  })
}

// 封装 get 请求
export function get(url, params = {}, opts = {}) {
  return ajax.call(this, {
    ...opts,
    url,
    params,
    method: 'get',
  })
}

// 封装 put 请求
export function put(url, data = {}, opts = {}) {
  return ajax.call(this, {
    ...opts,
    url,
    data,
    method: 'put',
  })
}

// 封装 delete 请求
export function del(url, params = {}, opts = {}) {
  return ajax.call(this, {
    ...opts,
    url,
    params,
    method: 'delete',
  })
}

// 封装 post 请求
export function post(url, data = {}, opts = {}) {
  return ajax.call(this, {
    ...opts,
    url,
    data,
    method: 'post',
    headers: opts.headers || { 'content-type': 'application/json;charset=utf-8' },
  })
}

// 文件上传-支持批量上传，参数示例：{file: file|fileList}
export function upload(url, data = {}, opts = {}) {
  let fd = new FormData()

  // 将参数与文件添加到 formData 对象中
  for (let [key, val] of Object.entries(data)) {
    if (key === 'file') {
      if (Array.isArray(val)) {
        val.forEach(item => fd.append(item.name, item))
      } else {
        fd.append(val.name, val)
      }
    } else {
      fd.append(key, val)
    }
  }

  return ajax.call(this, {
    ...opts,
    url,
    data: fd,
    method: 'post',
    headers: opts.headers || { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
  })
}
