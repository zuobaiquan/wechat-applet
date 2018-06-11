import request from '@/utils/request'
export function getCouponList(params) {
  return request({
    url: '/api/coupon?isDelete=false',
    method: 'get',
    params
  })
}
export function addCoupon(params) {
  return request({
    url: '/api/coupon',
    method: 'post',
    data:JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
}
export function editCoupon(params) {
  return request({
    url: '/api/coupon',
    method: 'put',
    data:JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
}
export function deleteCoupon(id) {
  return request({
    url: `/api/coupon/${id}`,
    method: 'delete'
  })
}
