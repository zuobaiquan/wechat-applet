import request from '@/utils/request'
export function getRecordList(params,searchObj) {
  let apiUrl='';
  switch (searchObj.type) {
    //全局搜索
    case -1:
      apiUrl=`/api/order?orderType=0&sort=createTime,desc`
      break;
    //只搜索状态
    case 0:
      apiUrl=`/api/order?orderType=0&payStatus=${searchObj.searchStatus}&sort=createTime,desc`
      break;
    //只搜索类型
    case 1:
      apiUrl=`/api/order?orderType=${searchObj.orderType}&sort=createTime,desc`
      break;
    //状态和类型
    case 2:
      apiUrl=`/api/order?orderType=${searchObj.orderType}&payStatus=${searchObj.searchStatus}&sort=createTime,desc`
      break;
    default:
  }
    //搜索编号和状态
  return request({
    url: apiUrl,
    method: 'get',
    params
  })
}

export function getCountMoney(params) {
  return request({
    url: '/api/order/countMoney',
    method: 'post',
    data:JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
}
