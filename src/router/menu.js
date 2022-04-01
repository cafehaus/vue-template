// 菜单路由
export const menu = [
  {
    path: 'home',
    name: 'home',
    component: () => import('@/views/home/home'),
    meta: {
      title: '首页',
      showSider: true,
    },
  },
  {
    path: 'customer',
    name: 'customer',
    component: () => import('@/views/customer/customer'),
    meta: {
      title: '我的客户',
      showSider: true,
    },
  },
  {
    path: 'account',
    name: 'account',
    component: () => import('@/views/account/account'),
    meta: {
      title: '个人中心',
      showSider: true,
    },
  },
]
