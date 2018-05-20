import request from '@/utils/request'
export function getBannerList(params) {
  return request({
    url: '/api/banner',
    method: 'get',
    params
  })
}
export function addNewBanner(params) {
  return request({
    url: '/api/banner',
    method: 'post',
    data:JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
}
export function editNewBanner(params) {
  return request({
    url: '/api/banner',
    method: 'put',
    data:JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
}
export function deleteBanner(id) {
  return request({
    url: `/api/banner/${id}`,
    method: 'delete'
  })
}
export function getCategoryList(params) {
  return request({
    url: '/api/question/category',
    method: 'get',
    params
  })
}
export function addCategory(params) {
  return request({
    url: '/api/question/category',
    method: 'post',
    data:JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
}
export function editCategory(params) {
  return request({
    url: '/api/question/category',
    method: 'put',
    data:JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
}
export function deleteCategory(id) {
  return request({
    url: `/api/question/category/${id}`,
    method: 'delete'
  })
}

export function getInfoArticle(params) {
  return request({
    url: '/api/article',
    method: 'get',
    params
  })
}
export function addInfoArticle(params) {
  return request({
    url: '/api/article',
    method: 'post',
    data:JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
}
export function editInfoArticle(params) {
  return request({
    url: '/api/article',
    method: 'put',
    data:JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
}
export function deleteInfoArticle(id) {
  return request({
    url: `/api/article/${id}`,
    method: 'delete'
  })
}



export function getProblemList(params,type=false,categoryId=-1) {
  return request({
    url: !type?`/api/question`:`/api/question?category.id=${categoryId}`,
    method: 'get',
    params
  })
}
export function addProblem(params) {
  return request({
    url: '/api/question',
    method: 'post',
    data:JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
}
export function editProblem(params) {
  return request({
    url: '/api/question',
    method: 'put',
    data:JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
}
export function deleteProblem(id) {
  return request({
    url: `/api/question/${id}`,
    method: 'delete'
  })
}
