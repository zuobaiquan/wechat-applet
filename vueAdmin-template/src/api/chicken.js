import request from '@/utils/request'
export function getConfigCover(params) {
  return request({
    url: '/api/config',
    method: 'get',
    params
  })
}
export function addConfigCover(params) {
  return request({
    url: '/api/config',
    method: 'post',
    data:JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
}
export function editConfigCover(params) {
  return request({
    url: '/api/config',
    method: 'put',
    data:JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
}
export function deleteConfigCover(id) {
  return request({
    url: `/api/config/${id}`,
    method: 'delete'
  })
}
