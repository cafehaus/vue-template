// localStorage 和 sessionStorage 封装

// 数据存储（注意此方式存储经过了 JSON 解析，会还原原数据类型）
export function storage(type, key, val) {
  // 不支持/无痕模式/禁用了缓存（safari 禁用缓存会报 SecurityError: Dom Exception 18）
  try {
    window[type].setItem('test-storage', 'test')
    window[type].removeItem('test-storage')
  } catch (err) {
    alert('您开启了无痕模式或禁用了缓存，为了能享受更好的服务，请更改您的设置。')
    return
  }

  if (typeof val === 'undefined') { // 读取
    try {
      return JSON.parse(window[type].getItem(key))
    } catch (r) {
      return window[type].getItem(key)
    }
  } else if (val === null || val === '') { // 删除
    return window[type].removeItem(key)
  } else { // 写入
    // 当本地存储满了，再往里面写数据，将会触发 error
    try {
      return window[type].setItem(key, JSON.stringify(val))
    } catch (e) {
      if (type === 'sessionStorage') {
        removeStoragesByKeyIncludes('/', type) // 删除接口的缓存
      } else {
        removeStoragesExcludeKeys('token|mobile|username', type)
      }
      return window[type].setItem(key, JSON.stringify(val))
    }
  }
}

// 本地存储-localStorage
export function store(key, val) {
  return storage('localStorage', key, val)
}

// 本地存储-sessionStorage，可用于页面间传参
export function session(key, val) {
  return storage('sessionStorage', key, val)
}

// 删除 key 值中包含所给字符的缓存
export function removeStoragesByKeyIncludes(str, type) {
  const storage = window[type || 'sessionStorage']
  let len = storage.length
  let key

  // 如果不支持本地缓存，很可能是启用了『无痕模式』
  if (!storage) {
    alert('为了能享受更好的服务，请关闭浏览器的无痕模式！')
    return
  }

  while (len) {
    len--
    key = storage.key(len)
    if (key.indexOf(str) !== -1) {
      storage.removeItem(key)
    }
  }
}

// 删除除了所给 key 值的缓存，参数格式：'key1|key2|key3'
export function removeStoragesExcludeKeys(keys, type) {
  keys = keys.split('|')
  const storage = window[type || 'localStorage']
  let len = storage.length
  let key

  // 如果不支持本地缓存，很可能是启用了『无痕模式』
  if (!storage) {
    alert('为了能享受更好的服务，请关闭浏览器的无痕模式！')
    return
  }

  while (len) {
    len--
    key = storage.key(len)
    if (keys.indexOf(key) === -1) {
      storage.removeItem(key)
    }
  }
}
