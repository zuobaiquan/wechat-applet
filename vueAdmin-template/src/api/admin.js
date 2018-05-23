import request from '@/utils/request'
export function getAdminList(params,account='') {
  return request({
    url: account==''?`/api/user/admin/list`:`/api/user/admin/list?content.account=${account}`,
    method: 'get',
    params
  })
}
export function addAdmin(params) {
  return request({
    url: '/api/user/admin',
    method: 'post',
    data:JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
}
export function editAdmin(params) {
  return request({
    url: '/api/user/admin',
    method: 'put',
    data:JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
}
export function deleteAdmin(id) {
  return request({
    url: `/api/user/admin/${id}`,
    method: 'delete'
  })
}
