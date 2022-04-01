// 全局过滤器
// 默认一个参数 {{ row | myFilter }}  两个参数 {{ row | myFilter('two') }}

import dayjs from 'dayjs'
import { fixDate } from '@/libs/utils/util'

export const filters = {
  fmtDate(time, fmt = 'YYYY-MM-DD HH:mm:ss') {
    if (!time) return time
    time = fixDate(time) // 格式化时间为苹果系统可兼容的格式
    return dayjs(time).format(fmt)
  },
}

export default Vue => {
  Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
  })
}
