import MyHome from '@/layout/my-home/my-home'
import wrap from '@/views/home/home'
import demo from './modules/demo/index'
export const frameInRoutes = [
  {
    path: '/',
    redirect: { path: '/homes/imjohn' }
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      auth: false,
      title: 'Login - 登录'
    },
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      auth: false,
      title: 'register - 注册'
    },
    component: () => import('@/views/register/register.vue')
  }
]
export const getRouters = [
  {
    path: '',
    component: MyHome,
    children: [
      {
        path: '/homes/:id',
        meta: {
          auth: false,
          title: '首页'
        },
        component: wrap
      },
      ...demo
    ]
  },
  {
    path: '*',
    component: MyHome,
    children: [
      {
        path: '',
        meta: {
          auth: false,
          title: 'error'
        },
        component: () => import('@/views/demo/error/error')
      }
    ]
  }
]

export default [...frameInRoutes, ...getRouters]
