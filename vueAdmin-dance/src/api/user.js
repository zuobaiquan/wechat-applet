import request from '@/utils/request'
// import { getToken } from '@/utils/auth'
export function getUserList(params,type) {
  return request({
    url: `/api/user/list?type=${type}`,
    method: 'get',
    params
  })
}
