import request from '@/utils/request'
export function getBannerList(params) {
  return request({
    url: '/api/banner',
    method: 'get',
    params
  })
}
export function addNewBanner(params) {
  return request({
    url: '/api/banner',
    method: 'post',
    data:JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
}
export function editNewBanner(params) {
  return request({
    url: '/api/banner',
    method: 'put',
    data:JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
}
export function getProblemList(params) {
  return request({
    url: '/api/question',
    method: 'get',
    params
  })
}
export function getCategoryList(params) {
  return request({
    url: '/api/question/category',
    method: 'get',
    params
  })
}
