import request from '@/utils/request'
export function getActivityList(params,type) {
  return request({
    url: `/api/activity/list?type=${type}`,
    method: 'get',
    params
  })
}
export function addActivity(params) {
  return request({
    url: '/api/activity/create',
    method: 'post',
    data:JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
}
export function editActivity(params) {
  return request({
    url: '/api/activity/edit',
    method: 'post',
    data:JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
}
export function deleteActivity(params) {
  return request({
    url: `/api/activity/delete`,
    method: 'delete',
    params
  })
}
