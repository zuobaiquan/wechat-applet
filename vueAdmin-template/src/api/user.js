import request from '@/utils/request'
// import { getToken } from '@/utils/auth'
export function getUserList(params,searchObj) {
  let apiUrl='/api/user?userType=0';
  switch (searchObj.type) {
    case -1:
      apiUrl=`/api/user?userType=0&withBill=1`
      break;
    //只搜索状态
    case 0:
      apiUrl=`/api/user?userType=0&id=${searchObj.id}`
      break;
    //只搜索编号
    case 1:
      apiUrl=`/api/user?userType=0&nickName=${searchObj.nickName}`
      break;
    //只搜索分区
    case 2:
      apiUrl=`/api/user?userType=0&id=${searchObj.id}&nickName=${searchObj.nickName}`
      break;
    default:
  }
  return request({
    url: apiUrl,
    method: 'get',
    params
  })
}
export function getAddress(userId) {
  return request({
    url: `/api/address?userId=${userId}&isDefault=true`,
    method: 'get'
  })
}
export function getUserBill(userId) {
  return request({
    url: `/api/bill?user.id=${userId}`,
    method: 'get'
  })
}
export function bindVegatable(params) {
  return request({
    url: '/api/bill/bind',
    method: 'post',
    data:JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
}
