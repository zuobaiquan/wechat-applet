import request from '@/utils/request'
export function getAdminList(params) {
  return request({
    url: '/api/user/admin/list',
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
