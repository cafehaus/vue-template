// 常用函数
// export * as default from './util'

// 空函数
export function noop() {}

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
export function isUndef(v) {
  return v === undefined || v === null
}

export function isDef(v) {
  return v !== undefined && v !== null
}

export function isString(v) {
  return typeof v === 'string'
}

export function isFunction(v) {
  return typeof v === 'function'
}

export function isNumber(v) {
  const type = typeof v
  return (type === 'number' || type === 'string') && !isNaN(v - parseFloat(v))
}

export function type(v) {
  return Object.prototype.toString.call(v)
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
export function isObject(obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
export function isPlainObject(obj) {
  return type(obj) === '[object Object]'
}

export function hasOwnProperty(obj, val) {
  return Object.prototype.hasOwnProperty.call(obj, val)
}

export function isEmptyObject(obj) {
  return !Object.keys(obj).length
}

export function isRegExp(v) {
  return type(v) === '[object RegExp]'
}

export function isDate(v) {
  return type(v) === '[object Date]'
}

/**
 * Convert a value to a string that is actually rendered.
 */
export function toString(v) {
  return v === null ? '' : typeof v === 'object' ? JSON.stringify(v, null, 2) : String(v)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
export function toNumber(v) {
  let n = parseFloat(v)
  return isNaN(n) ? v : n
}

/**
 * Remove an item from an array
 */
export function remove(arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Convert an Array-like object to a real Array.
 */
export function toArray(list, start) {
  start = start || 0
  let i = list.length - start
  let ret = new Array(i)
  while (i--) {
    ret[i] = list[i + start]
  }
  return ret
}

// 格式化时间为苹果系统可兼容的格式：格林尼治时间（以Z结尾，如2021-11-15T11:21:15.053Z）不能用“/”作分隔符；兼容 iOS，不用转换
export function fixDate(date) {
  if (typeof date === 'string' && !/Z$/i.test(date)) {
    return date.replace(/-/g, '/').replace(/(\+\d{2})(\d{2})$/, '$1:$2')
  }
  return date
}

// 时间格式化
// format(new Date(), 'yyyy-M-d h:m:s.S')      => 2006-7-2 8:9:4.18
// format(new Date(), 'yyyy-MM-dd hh:mm:ss.S') => 2006-07-02 08:09:04.423
// format(new Date(), 'yyyy-MM-dd hh:mm:ss')   => 2006-07-02 08:09:04
export function formatDate(date = new Date(), fmt = 'yyyy-MM-dd') {
  if (!date) return date
  date = fixDate(date)
  const time = new Date(date)
  if (!isDate(time)) return date
  let o = {
    'M+': time.getMonth() + 1, // 月
    'd+': time.getDate(), // 日
    'h+': time.getHours(), // 小时
    'm+': time.getMinutes(), // 分
    's+': time.getSeconds(), // 秒
    'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
    S: time.getMilliseconds(), // 毫秒
  }

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length))
  }

  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }

  return fmt
}

// 获取当前时间
export function getTime(fmt = 'yyyy-MM-dd hh:mm:ss') {
  return formatDate(new Date(), fmt)
}

// 时间对象数组转字符串
export function formatDates(dates, separator = ',') {
  if (!Array.isArray(dates)) return dates
  return dates.filter(date => date).map(date => formatDate(date)).join(separator)
}

// 高亮关键字
export function highlight(text, keyword = '') {
  if (typeof text !== 'string' || !keyword) return text
  const reg = new RegExp(`${keyword}+`, 'gi')
  return reg.test(text) ? text.replace(reg, '<span class="highlight">$&</span>') : text
}

// 获取文件扩展名
export function getFileExtension(fileName) {
  // return fileName.substring(fileName.lastIndexOf('.') + 1)
  return fileName.lastIndexOf('.') === -1 ? '' : fileName.split('.').pop()
}

// 生成随机字符串
export function randomString(len = 32) {
  let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  let maxPos = chars.length
  let res = ''
  for (let i = 0; i < len; i++) {
    res += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return res
}

// 深拷贝
export function deepClone(to, obj) {
  // 如果没有目录对象参数
  if (!obj) {
    obj = to
    to = {}
  }

  for (const k in obj) {
    if (hasOwnProperty(obj, k)) {
      if (isObject(obj[k])) {
        to[k] = Array.isArray(obj[k]) ? [] : {}
        deepClone(to[k], obj[k])
      } else {
        to[k] = obj[k]
      }
    }
  }
  return to
}

// 浅拷贝
export function clone(to, obj) {
  // 如果没有目录对象参数
  if (!obj) {
    obj = to
    to = {}
  }

  for (const k in obj) {
    if (hasOwnProperty(obj, k)) {
      to[k] = obj[k]
    }
  }
  return to
}

// 拷贝对象
export function cloneObject(obj) {
  if (!obj) return {}
  return JSON.parse(JSON.stringify(obj))
}

/**
 * Merge an Array of Objects into a single Object.
 */
export function toObject(arr) {
  let res = {}
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      clone(res, arr[i])
    }
  }
  return res
}

/**
 * Ensure a function is called only once.
 */
export function once(fn) {
  let called = false
  return function() {
    if (!called) {
      called = true
      fn.apply(this, arguments)
    }
  }
}

// 生成唯一标识符
export function uuid(len = 32) {
  let hex = '0123456789abcdef'
  let res = ''
  for (let index = 0; index < len; index++) {
    res += hex.charAt(Math.ceil(1e8 * Math.random()) % hex.length)
  }
  return res
}

// 正则千位分隔符
export function milliFormat(num) {
  return num && num.toString()
    .replace(/\d+/, function(s) {
      return s.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
    })
}

// 将对象中的 null 值转成空字符串
export function replaceNull(o) {
  if (!isObject(o)) return o
  for (let [k, v] of Object.entries(o)) {
    if (v === null) {
      o[k] = ''
    } else if (typeof v === 'object') {
      replaceNull(v)
    }
  }
}

// 将 JSON 对象中的 null 值转成空字符串
export function replaceJsonNull(o) {
  return JSON.parse(JSON.stringify(o, (k, v) => v === null ? '' : v))
}

// 防抖函数，默认 300 毫秒
export function debounce(fn, delay = 300) {
  let timer
  return function() {
    let args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args) // this 指向vue
    }, delay)
  }
}

/**
 * @description 下载 excel 文件
 * @param blobData 二进制的数据  请求接口后后台返回的数据
 * @param fileName 导出的文件名
 * @param isNameAddTime 导出文件名是否加上时间标识
 * @param fileType 导出的文件类型 默认为 xlsx
 * @param callback 导出成功之后的回调函数
 */
export const downloadExportFile = (blobData, fileName, isNameAddTime = false, fileType = 'xlsx', callback) => {
  if (isNameAddTime) {
    fileName = fileName + formatDate(new Date(), 'yyyyMMddhhmmss') + '.' + fileType
  } else {
    fileName = fileName + '.' + fileType
  }

  if (window.navigator.msSaveOrOpenBlob) {
    // IE浏览器下
    navigator.msSaveBlob(blobData, fileName)
  } else {
    let link = document.createElement('a')
    link.href = window.URL.createObjectURL(blobData)
    link.download = fileName
    link.click()
    window.URL.revokeObjectURL(link.href)
  }
  if (callback) {
    callback()
  }
}

export const compressImage = (file, success, error) => {
  // 图片小于1M不压缩
  if (file.size < Math.pow(1024, 2)) {
    return success(file)
  }

  const name = file.name // 文件名
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = e => {
    const src = e.target.result

    const img = new Image()
    img.src = src
    img.onload = e => {
      const w = img.width / 1.5
      const h = img.height / 1.5
      const quality = 0.7 // 默认图片质量为0.92
      // 生成canvas
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      // 创建属性节点
      const anw = document.createAttribute('width')
      anw.nodeValue = w
      const anh = document.createAttribute('height')
      anh.nodeValue = h
      canvas.setAttributeNode(anw)
      canvas.setAttributeNode(anh)

      // 铺底色 PNG转JPEG时透明区域会变黑色
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, w, h)

      ctx.drawImage(img, 0, 0, w, h)
      // quality值越小，所绘制出的图像越模糊
      const base64 = canvas.toDataURL('image/jpeg', quality) // 图片格式jpeg或webp可以选0-1质量区间

      // 去掉url的头，并转换为byte
      const bytes = window.atob(base64.split(',')[1])
      // 处理异常,将ascii码小于0的转换为大于0
      const ab = new ArrayBuffer(bytes.length)
      const ia = new Uint8Array(ab)
      for (let i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i)
      }
      let newFile = new File([ab], name, { type: 'image/jpeg' })
      // file = new File([ab], name, { type: 'image/jpeg' })
      success(newFile)
    }
    img.onerror = e => {
      error(e)
    }
  }
  reader.onerror = e => {
    error(e)
  }
}

// 根据环境获取对应的网址
export const getWebsite = (subdomain, domain = 'xxx.com') => {
  let url = 'https://www.xxx.com'
  let sub = location.hostname.split('.')[0].split('-')[0]
  switch (sub) {
    case '192': // 开发
    case 'localhost':
    case 'dev':
      url = `http://dev-${subdomain}.${domain}`
      break
    case 'test': // 测试环境
      url = `https://test-${subdomain}.${domain}`
      break
    default: // 线上环境
      url = `https://${subdomain}.${domain}`
  }
  return url
}
