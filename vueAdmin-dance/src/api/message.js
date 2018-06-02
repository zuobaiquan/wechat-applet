import request from '@/utils/request'
export function addMessage(params) {
  return request({
    url: '/api/message',
    method: 'post',
    data:JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
}
