import request from '@/utils/request'
export function getCardList(params) {
  return request({
    url: '/api/card',
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
