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
// 获取已购课程
export const getPurchaseCourse = () => {
  return request({
    method: 'GET',
    url: '/front/course/getPurchaseCourse'
  })
}
// 获取课程详情
export const getCourseById = params => {
  return request({
    method: 'GET',
    url: '/front/course/getCourseById',
    params
  })
}
// 获取课时章节
export const getSectionAndLesson = params => {
  return request({
    method: 'GET',
    url: '/front/course/session/getSectionAndLesson',
    params
  })
}
// 根据fileId获取阿里云对应的视频播放信息
export const videoPlayInfo = params => {
  return request({
    method: 'GET',
    url: '/front/course/media/videoPlayInfo',
    params
  })
}
