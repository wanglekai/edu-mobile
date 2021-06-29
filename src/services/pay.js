import request from '../utils/request'

// 创建订单
const saveOrder = data => {
  return request({
    method: 'POST',
    url: '/front/order/saveOrder',
    data
  })
}
// 获取支付方式
const getPayInfo = params => {
  return request({
    method: 'GET',
    url: '/front/pay/getPayInfo',
    params
  })
}
// 创建订单(发起支付)
const createOrder = data => {
  return request({
    method: 'POST',
    url: '/front/pay/saveOrder',
    data
  })
}
// 微信支付回调
const wxCallBack = () => {
  return request({
    method: 'POST',
    url: '/front/pay/wxCallback'
  })
}
// 支付宝支付回调
const zfbCallBack = () => {
  return request({
    method: 'POST',
    url: '/front/pay/zfbCallback'
  })
}
// 查询订单(支付结果)
const getPayResult = params => {
  return request({
    method: 'GET',
    url: '/front/pay/getPayResult',
    headers: { 'content-type': 'application/json' },
    params
  })
}

export {
  saveOrder,
  getPayInfo,
  createOrder,
  wxCallBack,
  zfbCallBack,
  getPayResult
}
