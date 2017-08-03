import {
    configApi
} from './constant';
function get(url, params) {
    return new Promise((resolve, reject) => {
        wx.request({
            url: `${configApi.API_URL}/${url}`,
            data: Object.assign({}, params),
            method: 'get',
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: resolve,
            fail: reject
        })
    })
}

function post(url, params) {
    return new Promise((resolve, reject) => {
        wx.request({
            url: `${configApi.API_URL}/${url}`,
            data: Object.assign({}, params),
            method: 'post',
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: resolve,
            fail: reject
        })
    })
}

function postByToken(url, params, token) {
    return new Promise((resolve, reject) => {
        wx.request({
            url: `${configApi.API_URL}/${url}`,
            data: Object.assign({}, params),
            method: 'post',
            header: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Auth-Token': token
            },
            success: resolve,
            fail: reject
        })
    })
}

function postJson(url, params) {
    return new Promise((resolve, reject) => {
        wx.request({
            url: `${configApi.API_URL}/${url}`,
            data: JSON.stringify(params),
            method: 'post',
            header: {
                'Content-Type': 'application/json'
            },
            success: resolve,
            fail: reject
        })
    })
}
module.exports = {get,
    post,
    postJson,
    postByToken
}
