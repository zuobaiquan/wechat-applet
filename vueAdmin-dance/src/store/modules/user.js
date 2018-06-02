import { login, logout, getInfo } from '@/api/login'
import { getToken,getAvator, setToken,setAvator, removeToken,removeAvator } from '@/utils/auth'
import { Message, MessageBox } from 'element-ui'
const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: getAvator(),
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const account = userInfo.account.trim()
      return new Promise((resolve, reject) => {
        login(account,userInfo.password).then(response => {
          const data = response.data
          setToken(data.token)
          setAvator(data.userBean.avatarUrl)
          commit('SET_TOKEN', data.token)
          commit('SET_NAME', data.account)
          commit('SET_AVATAR',data.userBean.avatarUrl)
          resolve()
        }).catch(error => {
          Message({
            message: "用户名或密码错误",
            type: 'error',
            duration: 5 * 1000
          })
          reject(error)
        })
      })
    },

    // // 获取用户信息
    // GetInfo({ commit, state }) {
    //   console.log(32,state)
    //   return new Promise((resolve, reject) => {
    //     getInfo(state.token).then(response => {
    //       const data = response.data
    //       if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
    //         commit('SET_ROLES', data.roles)
    //       } else {
    //         reject('getInfo: roles must be a non-null array !')
    //       }
    //       commit('SET_NAME', data.name)
    //       commit('SET_AVATAR', data.avatar)
    //       resolve(response)
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        commit('SET_NAME', '')
        commit('SET_AVATAR','')
        removeToken()
        removeAvator()
        location.reload()
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_NAME', '')
        commit('SET_AVATAR','')
        removeToken()
        location.reload()
      })
    }
  }
}

export default user
