import request from '@/utils/request'
export function getVegetableList(params,id) {
  return request({
    url: `/api/garden/item?gardenArea.garden.id=${id}`,
    method: 'get',
    params
  })
}
export function addVegetable(params) {
  return request({
    url: '/api/user/admin',
    method: 'post',
    data:JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
}
export function editVegetable(params) {
  return request({
    url: '/api/user/admin',
    method: 'put',
    data:JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
}
export function deleteVegetable(id) {
  return request({
    url: `/api/user/admin/${id}`,
    method: 'delete'
  })
}

export function getAreaList(params) {
  return request({
    url: `/api/garden/area`,
    method: 'get',
    params
  })
}
export function addArea(params) {
  return request({
    url: '/api/garden/area',
    method: 'post',
    data:JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
}
export function editArea(params) {
  return request({
    url: '/api/garden/area',
    method: 'put',
    data:JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
}
export function deleteArea(id) {
  return request({
    url: `/api/garden/area/${id}`,
    method: 'delete'
  })
}

//gardenItemlist

export function getGardenItemlist(params) {
  return request({
    url: `api/garden/item?gardenArea.garden.id=1`,
    method: 'get',
    params
  })
}
export function addGardenItem(params) {
  return request({
    url: 'api/garden/item',
    method: 'post',
    data:JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
}
export function editGardenItem(params) {
  return request({
    url: 'api/garden/item',
    method: 'put',
    data:JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
}
export function deleteGardenItem(id) {
  return request({
    url: `api/garden/item/${id}`,
    method: 'delete'
  })
}