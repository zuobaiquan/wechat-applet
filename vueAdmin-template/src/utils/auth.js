import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}
export function getName() {
  return Cookies.get("account")
}
export function getAvator() {
  return Cookies.get("avator")
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
export function setName(name) {
  return Cookies.set("account", name)
}
export function setAvator(avator) {
  return Cookies.set("avator", avator)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function removeAvator() {
  return Cookies.remove("avator")
}
