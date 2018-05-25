import request from '@/utils/request'
export function getAdminList(params,account='') {
  return request({
    url: account==''?`/api/user?userType=1`:`/api/user?userType=1&account=${account}`,
    method: 'get',
    params
  })
}
export function addAdmin(params) {
  return request({
    url: '/api/user/admin?userType=1',
    method: 'post',
    data:JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
}
export function editAdmin(params) {
  return request({
    url: '/api/user/edit?userType=1',
    method: 'post',
    data:JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
}
