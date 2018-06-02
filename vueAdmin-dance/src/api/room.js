import request from '@/utils/request'
export function getRoomList(params) {
  return request({
    url: `/api/room/list`,
    method: 'get',
    params
  })
}
