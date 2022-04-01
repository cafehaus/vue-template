// VeeValidate 校验插件配置

import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
import locale from './validator-locale'
const idCardReg = /^[1-9]\d{7}((0\d)|bai(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
Validator.localize(locale)

Validator.extend('mobile', {
  getMessage: field => field + '格式不正确！',
  validate: value => /^1[3-9]\d{9}$/.test(value),
})
Validator.extend('tel', {
  getMessage: field => field + '格式不正确！',
  validate: value => /^(([0+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-\d{3,})?$/.test(value),
})
Validator.extend('phone', {
  getMessage: field => field + '格式不正确！',
  validate: value => /(^(([0+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-\d{3,})?$)|(^1[3-9]\d{9}$)/.test(value),
})
Validator.extend('password', {
  getMessage: field => field + '格式不正确！(数字或字母，6-20位)',
  validate: value => /^[0-9A-Za-z]{6,20}$/.test(value),
})
Validator.extend('nameCn', {
  getMessage: field => field + '必须包含中文',
  validate: value => /[\u4E00-\u9FA5\uF900-\uFA2D]/.test(value),
})
Validator.extend('nameEn', {
  getMessage: field => field + '必须包含字母',
  validate: value => /[a-zA-Z]+/.test(value),
})
Validator.extend('number', {
  getMessage: field => field + '大于0',
  validate: value => value > 0,
})
Validator.extend('idCard', {
  getMessage: field => field + '格式不正确',
  validate: value => idCardReg.test(value),
})

Vue.use(VeeValidate, {
  fieldsBagName: 'vfields',
  events: 'blur',
  // inject: true,
  locale: 'zh_CN',
})
