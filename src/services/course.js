import request from '../utils/request'

// 获取指定的广告列表
export const getAllAds = spaceKeys => {
  return request({
    method: 'GET',
    url: `/front/ad/getAllAds?spaceKeys=${spaceKeys}`
  })
}
// 分页查询课程信息
export const getQueryCourses = data => {
  return request({
    method: 'POST',
    url: '/boss/course/getQueryCourses',
    data
  })
}
