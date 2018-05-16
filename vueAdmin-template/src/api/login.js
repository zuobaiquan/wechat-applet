import request from '@/utils/request'
import qs from 'qs'
export function login(account, password) {
  return request({
    url: '/api/loginByPassword',
    method: 'post',
    data: qs.stringify({
      account,
      password
    }),
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
