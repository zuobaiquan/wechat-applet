import request from '@/utils/request'
export function getCouponList(params) {
  return request({
    url: '/api/coupon',
    method: 'get',
    params
  })
}
