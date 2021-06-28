import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import course from '@/views/course'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */'@/views/login')
  },
  {
    path: '/',
    name: 'course',
    component: course
  },
  {
    path: '/learn',
    name: 'learn',
    component: () => import(/* webpackChunkName: 'learn' */'@/views/learn'),
    meta: { requiresAuth: true }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: 'user' */'@/views/user'),
    meta: { requiresAuth: true }
  },
  {
    path: '/course-detail/:lessonId',
    name: 'course-detail',
    component: () => import(/* webpackChunkName: 'course-detail' */'@/views/course-detail'),
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: '/course-detail',
    redirect: '/'
  },
  {
    path: '/course-video/:sectionId',
    name: 'course-video',
    component: () => import(/* webpackChunkName: 'course-video' */'@/views/course/video'),
    props: true
  },
  {
    path: '/course-video',
    redirect: '/'
  },
  {
    path: '*',
    name: 'error-page',
    component: () => import(/* webpackChunkName: 'error-page' */'@/views/error-page')
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
