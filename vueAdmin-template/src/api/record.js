import request from '@/utils/request'
export function getRecordList(params,searchObj) {
  let apiUrl='';
  switch (searchObj.type) {
    //只搜索状态
    case -1:
      apiUrl=`/api/order?sort=createTime,desc`
      break;
    //只搜索状态
    case 0:
      apiUrl=`/api/order?payStatus=${searchObj.searchStatus}&sort=createTime,desc`
      break;
    //只搜索类型
    case 1:
      apiUrl=`/api/order?status=${searchObj.searchSelect}&sort=createTime,desc`
      break;
    case 2:
      apiUrl=`/api/order?status=${searchObj.searchSelect}&payStatus=${searchObj.searchStatus}&sort=createTime,desc`
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
