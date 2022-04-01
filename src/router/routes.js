// 静态路由表
import { menu } from '@/router/menu'

export default [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/layout'),
    redirect: 'home',
    children: [
      ...menu,
    ],
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
      noNeedAuth: true,
      showFooter: true,
    },
    component: () => import('@/views/login/login'),
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      title: '注册',
      showFooter: true,
      noNeedAuth: true,
    },
    component: () => import('@/views/login/register'),
  },
  {
    path: '/*',
    name: '404',
    meta: {
      title: '404-页面不存在',
      noNeedAuth: true,
    },
    component: () => import('@/views/layout/404'),
  },
]
