import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */'@/views/login/index')
  },
  {
    path: '/',
    name: 'course',
    component: () => import(/* webpackChunkName: 'course' */'@/views/course/index')
  },
  {
    path: '/learn',
    name: 'learn',
    component: () => import(/* webpackChunkName: 'learn' */'@/views/learn/index'),
    meta: { requiresAuth: true }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: 'user' */'@/views/user/index'),
    meta: { requiresAuth: true }
  },
  {
    path: '*',
    name: 'error-page',
    component: () => import(/* webpackChunkName: 'error-page' */'@/views/error-page/index')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // 检查当前路由是否需要认证
  const isAuth = to.matched.some(record => record.meta.requiresAuth)
  // 当不需要认证 或 需要认证并且有已登录的用户， 直接进入
  if (!isAuth || (isAuth && store.state.user)) return next()
  // 否则 重定向到登录页
  return next({
    name: 'login',
    query: {
      // 将本次路由的 fullPath 传递给 login 页面
      redirect: to.fullPath
    }
  })
})

export default router
