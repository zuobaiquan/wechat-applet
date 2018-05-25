import request from '@/utils/request'
export function uploadFile(params) {
  return request({
    url: '/api/oss',
    method: 'post',
    params
  })
}
