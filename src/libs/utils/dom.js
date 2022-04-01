// 元素在视图内
export function isInViewport(el, offset = 0) {
  if (!el) return false
  const box = el.getBoundingClientRect()
  const top = box.top >= 0
  const left = box.left >= 0
  const bottom = box.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset
  const right = box.right <= (window.innerWidth || document.documentElement.clientWidth) + offset
  return top && left && bottom && right
}

// 滚动条距离底部的像素
export function scrollBottom(elem) {
  const scrollY = elem.scrollTop // 注意 safari 兼容性
  const viewportHeight = elem.clientHeight
  const pageHeight = elem.scrollHeight
  return pageHeight - viewportHeight - scrollY
}

// 已滚动到底
export function bottomVisible(elem, distance = 0) {
  const scrollY = elem.scrollTop // 注意 safari 兼容性
  const viewportHeight = elem.clientHeight
  const pageHeight = elem.scrollHeight
  return viewportHeight + scrollY - pageHeight >= distance || pageHeight < viewportHeight
}

// 页面垂直平滑滚动到指定滚动高度 by zhangxinxu(.com)
export function scrollSmoothTo(position) {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback, element) {
      return setTimeout(callback, 17)
    }
  }

  // 当前滚动高度
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop

  // 滚动 step 方法
  const step = function() {
    // 距离目标滚动距离
    const distance = position - scrollTop

    // 目标滚动位置
    scrollTop = scrollTop + distance / 5
    if (Math.abs(distance) < 1) {
      window.scrollTo(0, position)
    } else {
      window.scrollTo(0, scrollTop)
      requestAnimationFrame(step)
    }
  }

  step()
}
