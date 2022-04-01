// iView组件配置和按需引入
import Vue from 'vue'
import {
  LoadingBar,
  Message,
  Notice,
  Spin,
  BackTop,
  Icon,

  Menu,
  Submenu,
  MenuItem,

  Modal,
  Poptip,

  Button,
  Form,
  FormItem,
  Input,
  InputNumber,
  DatePicker,
  Select,
  Option,

  Table,
  Page,
} from 'view-design'

Vue.component('BackTop', BackTop)
Vue.component('Icon', Icon)
Vue.component('Menu', Menu)
Vue.component('Submenu', Submenu)
Vue.component('MenuItem', MenuItem)
Vue.component('Modal', Modal)
Vue.component('Poptip', Poptip)
Vue.component('Button', Button)
Vue.component('Form', Form)
Vue.component('FormItem', FormItem)
Vue.component('Input', Input)
Vue.component('InputNumber', InputNumber)
Vue.component('DatePicker', DatePicker)
Vue.component('Select', Select)
Vue.component('Option', Option)
Vue.component('Table', Table)
Vue.component('Page', Page)

// Message.config({ top: 80 })
LoadingBar.config({ color: '#19be6b' })
Vue.prototype.$Loading = LoadingBar
Vue.prototype.$Message = Message
Vue.prototype.$Modal = Modal
Vue.prototype.$Notice = Notice
Vue.prototype.$Spin = Spin
