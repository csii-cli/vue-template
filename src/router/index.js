import Vue from 'vue'
import VueRouter from 'vue-router'

// 路由数据
import routes from './routers'

Vue.use(VueRouter)

// import RegisteredAccount from '../views/home/RegisteredAccount/index'
// 解决重复点击菜单报错 Uncaught (in promise) NavigationDuplicated{_name: "NavigationDuplicated", name: "NavigationDuplicated"}
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

// 导出路由 在 main.js 里使用
const router = new VueRouter({
  // mode: 'history',
  mode: 'hash',
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
/**
 * 路由拦截
 * 权限验证
 */
router.beforeEach(async (to, from, next) => {
  const token = sessionStorage.getItem('SESSION_ID')
  // 首次登录
  if (token) {
    if (to.path === '/login') {
      next({
        path: '/homes/imjohn'
      })
    } else {
      next()
    }
  } else {
    // 登录拦截,验证当前路由所有的匹配中是否需要有登录验证的
    if (to.matched.some((r) => r.meta.auth)) {
      // 没有登录的时候跳转到首页
      next({
        path: '/login'
      })
    } else {
      // 不需要身份校验 直接通过
      next()
    }
  }
})

export default router
