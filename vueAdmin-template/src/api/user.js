import request from '@/utils/request'
export function getUserList(params,searchObj) {
  let apiUrl='/api/user?userType=0';
  switch (searchObj.type) {
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
