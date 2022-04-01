// VeeValidate locale
export const formatFileSize = size => {
  const units = ['Byte', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const threshold = 1024
  size = Number(size) * threshold
  const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(threshold))
  return `${(size / Math.pow(threshold, i)).toFixed(2) * 1} ${units[i]}`
}

const messages = {
  after: (field, [target]) => ` ${field}必须在${target}之后`,
  alpha_dash: field => ` ${field}能够包含字母数字字符，包括破折号、下划线`,
  alpha_num: field => `${field} 只能包含字母数字字符`,
  alpha_spaces: field => ` ${field} 只能包含字母字符，包括空格`,
  alpha: field => ` ${field} 只能包含字母字符`,
  before: (field, [target]) => ` ${field} 必须在${target} 之前`,
  between: (field, [min, max]) => ` ${field} 必须在${min} ${max}之间`,
  confirmed: (field, [confirmedField]) => ` 两次输入的${confirmedField}不一致`,
  date_between: (field, [min, max]) => ` ${field}必须在${min}和${max}之间`,
  date_format: (field, [format]) => ` ${field}必须在在${format}格式中`,
  decimal: (field, [decimals = '*'] = []) => ` ${field} 必须是数字的而且能够保留${decimals === '*' ? '' : decimals} 位小数`,
  digits: (field, [length]) => ` ${field} 必须是数字，且精确到 ${length}数`,
  dimensions: (field, [width, height]) => ` ${field}必须是 ${width} 像素到 ${height} 像素`,
  email: field => `${field}格式不正确`,
  mobile: field => `${field}格式不正确`,
  tel: field => `${field}格式不正确`,
  phone: field => `${field}格式不正确`,
  password: field => `${field}格式错误(数字或字母，6-20位)`,
  repassword: field => `${field}格式不正确`,
  ext: field => ` ${field} 必须是有效的文件`,
  image: field => ` ${field} 必须是图片`,
  in: field => ` ${field} 必须是一个有效值`,
  ip: field => ` ${field} 必须是一个有效的地址`,
  max: (field, [length]) => ` ${field} 不能大于${length}字符`,
  max_value: (field, [max]) => ` ${field} 必须小于或等于${max}`,
  mimes: field => ` ${field} 必须是有效的文件类型`,
  min: (field, [length]) => ` ${field} 必须至少有 ${length} 字符`,
  min_value: (field, [min]) => ` ${field} 必须大于或等于${min}`,
  not_in: field => ` ${field}必须是一个有效值`,
  numeric: field => `${field}只能包含数字`,
  regex: field => ` ${field} 格式无效`,
  required: field => `请输入${field}`,
  size: (field, [size]) => ` ${field} 必须小于 ${formatFileSize(size)}`,
  url: field => ` ${field}不是有效的url`,
  nameCn: field => `${field}必须包含中文`,
  nameEn: field => `${field}必须包含英文`,
  number: field => ` ${field}必须大于0`,
  idCard: field => ` ${field}格式不正确`,
}

const locale = {
  name: 'zh_CN',
  messages,
  attributes: {
    email: '邮箱',
    mobile: '手机号',
    tel: '电话号码',
    phone: '电话号码',
    password: '密码',
    repassword: '确认密码',
    name: '账号',
    idCard: '身份证号',
  },
}

export default { [locale.name]: locale }
