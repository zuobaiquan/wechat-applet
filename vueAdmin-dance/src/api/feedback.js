import request from '@/utils/request'
export function getFeedbackList(params) {
  return request({
    url: `/api/feedback`,
    method: 'get',
    params
  })
}
