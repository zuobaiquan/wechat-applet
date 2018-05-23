import request from '@/utils/request'
export function getUserList(params) {
  return request({
    url: '/api/user',
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
export function deleteBanner(id) {
  return request({
    url: `/api/banner/${id}`,
    method: 'delete'
  })
}
