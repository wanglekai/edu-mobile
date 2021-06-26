import axios from 'axios'
import store from '@/store'

const request = axios.create({
  baseURL: 'http://edufront.lagou.com'
})

// 设置请求拦截器进行接口鉴权
request.interceptors.request.use(config => {
  // 读取 store 中存储的 user 数据
  const { user } = store.state
  // user 中存在 access_token，则设置给请求头的 Authorization 字段
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token
  }
  return config
})
// 通过响应拦截器刷新 Token

let isRefreshing = false
// 存储刷新时等待的请求
let requests = []

request.interceptors.response.use(response => {
  return response
}, async error => {
  // 有响应内容 ，并且是错误类型，才做拦截
  if (error.response) {
    // 检测状态码是否为 401
    if (error.response.status === 401) {
      // 检测是否存在用户的登录信息
      if (!store.state.user) {
        // 如果不存在，结束即可
        return Promise.reject(error)
      }
      // 发送请求前检测，是否已经存在刷新 token 的请求了
      if (isRefreshing) {
        return requests.push(() => {
          // error.config 指的是失败请求的配置对象
          request(error.config)
        })
      }
      isRefreshing = true
      // 发送请求，尝试刷新 token
      const { data } = await request({
        method: 'POST',
        url: '/front/user/refresh_token',
        data: new window.URLSearchParams({
          refreshtoken: store.state.user.refresh_token
        }).toString()
      })
      if (data.state !== 1) {
        // 刷新 token 失败
        store.commit('setUser', null)
        return Promise.reject(error)
      }
      // 刷新 token 成功
      store.commit('setUser', data.content)

      // 将 requests 中的所有请求重新发送
      requests.forEach(callback => callback())
      requests = []
      isRefreshing = false
      return request(error.config)
    }
  }
  return Promise.reject(error)
})

export default request
