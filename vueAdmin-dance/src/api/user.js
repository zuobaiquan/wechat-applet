import request from '@/utils/request'
// import { getToken } from '@/utils/auth'
export function getUserList(params,type) {
  return request({
    url: `/api/user/list?type=${type}`,
    method: 'get',
    params
  })
}
export function getUserWorks(params) {
  return request({
    url: `/api/user/getUserWorks`,
    method: 'get',
    params
  })
}
export function getUserInfo(params) {
  return request({
    url: `/api/user/find`,
    method: 'get',
    params
  })
}
