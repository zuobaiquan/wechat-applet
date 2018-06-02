import request from '@/utils/request'
export function getCategoryList(params) {
  return request({
    url: '/api/dance',
    method: 'get',
    params
  })
}
export function addCategory(params) {
  return request({
    url: '/api/dance/edit',
    method: 'post',
    data:JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
}
export function editCategory(params) {
  return request({
    url: '/api/dance/edit',
    method: 'post',
    data:JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
}
export function deleteCategory(params) {
  return request({
    url: `/api/dance/delete`,
    method: 'delete',
    params
  })
}
