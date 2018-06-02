import request from '@/utils/request'
export function getBannerList(params,type) {
  return request({
    url: `/api/banner?type=${type}`,
    method: 'get',
    params
  })
}
export function addBanner(params) {
  return request({
    url: '/api/banner/add',
    method: 'post',
    data:JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
}
export function editBanner(params) {
  return request({
    url: '/api/banner/edit',
    method: 'post',
    data:JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
}
export function deleteBanner(params) {
  return request({
    url: `/api/banner/delete`,
    method: 'delete',
    params
  })
}
