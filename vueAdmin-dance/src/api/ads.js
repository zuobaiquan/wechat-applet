import request from '@/utils/request'
export function getAdsDetail(params) {
  return request({
    url: `/api/advert`,
    method: 'get',
    params
  })
}
export function editAds(params) {
  return request({
    url: '/api/advert',
    method: 'put',
    data:JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
}
