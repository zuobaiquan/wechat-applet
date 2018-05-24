import request from '@/utils/request'
export function getVegetableList(params,searchObj) {
  let apiUrl='/api/garden/item?gardenArea.garden.id=1';
  switch (searchObj.type) {
    //只搜索状态
    case 0:
      apiUrl=`/api/garden/item?gardenArea.garden.id=1&status=${searchObj.status}`
      break;
    //只搜索编号
    case 1:
      apiUrl=`/api/garden/item?gardenArea.garden.id=1&sn=${searchObj.sn}`
      break;
    //只搜索分区
    case 2:
      apiUrl=`/api/garden/item?gardenArea.garden.id=1&gardenArea=${searchObj.gardenArea}`
      break;
    //搜索编号和状态
    case 3:
      apiUrl=`/api/garden/item?gardenArea.garden.id=1&sn=${searchObj.sn}&status=${searchObj.status}`
      break;
    //搜索编号和分区
    case 4:
      apiUrl=`/api/garden/item?gardenArea.garden.id=1&sn=${searchObj.sn}&gardenArea=${searchObj.gardenArea}`
      break;
    //搜索状态和分区
    case 5:
      apiUrl=`/api/garden/item?gardenArea.garden.id=1&status=${searchObj.status}&gardenArea=${searchObj.gardenArea}`
      break;
    //搜索状态和分区和编号
    case 6:
      apiUrl=`/api/garden/item?gardenArea.garden.id=1&status=${searchObj.status}&gardenArea=${searchObj.gardenArea}&sn=${searchObj.sn}`
      break;
    default:

  }
  return request({
    url: apiUrl,
    // url: `/api/garden/item?gardenArea.garden.id=${id}`,
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


export function getOrderList(params,searchObj) {
  let apiUrl='/api/order';
  console.log(searchObj);
  switch (searchObj.type) {
    //只搜索状态
    case 0:
      apiUrl=`/api/order?status=${searchObj.status}`
      break;
    //只搜索编号
    case 1:
      apiUrl=`/api/order?sn=${searchObj.sn}`
      break;
    //只搜索分区
    case 2:
      apiUrl=`/api/order?gardenArea=${searchObj.gardenArea}`
      break;
    //搜索编号和状态
    case 3:
      apiUrl=`/api/order?sn=${searchObj.sn}&status=${searchObj.status}`
      break;
    //搜索编号和分区
    case 4:
      apiUrl=`/api/order?sn=${searchObj.sn}&gardenArea=${searchObj.gardenArea}`
      break;
    //搜索状态和分区
    case 5:
      apiUrl=`/api/order?status=${searchObj.status}&gardenArea=${searchObj.gardenArea}`
      break;
    //搜索状态和分区和编号
    case 6:
      apiUrl=`/api/order?status=${searchObj.status}&gardenArea=${searchObj.gardenArea}&sn=${searchObj.sn}`
      break;
    default:
  }
  return request({
    url: apiUrl,
    // url: `/api/garden/item?gardenArea.garden.id=${id}`,
    method: 'get',
    params
  })
}

export function getInfo(params) {
  return request({
    url: `/api/garden?id=1`,
    method: 'get',
    params
  })
}

export function addInfo(params) {
  return request({
    url: `/api/garden`,
    method: 'post',
    data:JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
}

export function editInfo(params) {
  return request({
    url: `/api/garden`,
    method: 'put',
    data:JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
}
export function deleteInfo(id) {
  return request({
    url: `/api/garden/${id}`,
    method: 'delete'
  })
}

export function getReportList(params) {
  return request({
    url: `/api/report`,
    method: 'get',
    params
  })
}
export function getSaleList(params) {
  return request({
    url: `/api/bill`,
    method: 'get',
    params
  })
}


export function addReport(params) {
  return request({
    url: `/api/report`,
    method: 'post',
    data:JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
}
