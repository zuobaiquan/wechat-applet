import request from '@/utils/request'
export function getCardList(params) {
  return request({
    url: '/api/card',
    method: 'get',
    params
  })
}
export function getCardRecordList(params,searchObj) {
  let apiUrl='/api/cardRecord?cardType=0';
  console.log(searchObj);
  switch (searchObj.type) {
    //只搜索卡号
    case 0:
      apiUrl=`/api/cardRecord?cardNo=${searchObj.cardNo}&cardType=0`
      break;
    //只搜索卡类型
    case 1:
      apiUrl=`/api/cardRecord?cardType=${searchObj.cardType}`
      break;
    //只搜索状态
    case 2:
      apiUrl=`/api/cardRecord?status=${searchObj.status}&cardType=0`
      break;
    //搜索卡号和类型
    case 3:
      apiUrl=`/api/cardRecord?cardNo=${searchObj.cardNo}&cardType=${searchObj.cardType}`
      break;
    //搜索卡号和状态
    case 4:
      apiUrl=`/api/cardRecord?cardNo=${searchObj.cardNo}&status=${searchObj.status}&cardType=0`
      break;
    //搜索类型和状态
    case 5:
      apiUrl=`/api/cardRecord?cardType=${searchObj.cardType}&status=${searchObj.status}`
      break;
    //都搜索
    case 6:
      apiUrl=`/api/cardRecord?cardNo=${searchObj.cardNo}&cardType=${searchObj.cardType}&status=${searchObj.status}`
      break;
    default:

  }
  return request({
    url: apiUrl,
    method: 'get',
    params
  })

}
export function getCardbyId(id) {
  return request({
    url: `/api/card?id=${id}`,
    method: 'get',
    params:{'page':0,'size':5}
  })
}
export function addCard(params) {
  return request({
    url: '/api/card',
    method: 'post',
    data:JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
}
export function editCard(params) {
  return request({
    url: '/api/card',
    method: 'put',
    data:JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
}
export function delsetCard(id) {
  return request({
    url: `/api/card/${id}`,
    method: 'delete'
  })
}
