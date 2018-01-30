// 创建应用程序对象
const apiRequest = require('./utils/apiRequest.js');
var setUserToken;
App({
  // ========== 全局数据对象（整个应用程序共享） ==========
  globalData: {},

  // ========== 生命周期方法 ==========

  // onLaunch () {
  //   // 应用程序启动时触发一次
  //   console.log('App Launch')
  // },

  // onShow () {
  //   // 当应用程序进入前台显示状态时触发
  //   console.log('App Show')
  // },

  // onHide () {
  //   // 当应用程序进入后台状态时触发
  //   console.log('App Hide')
  // }

  // ...
  onLaunch: function () {
    var that = this;
    setUserToken=function(){
      var setToken = function () {
        wx.getUserInfo({
          withCredentials: true,
          success: function (res) {
            //console.log('getUserInfo', res);
            var userInfo = {
              portraitUrl: res.userInfo.avatarUrl,
              nickname: res.userInfo.nickName,
              gender: res.userInfo.gender,
              clientType: 1
            };
            wx.login({
              success: function (res1) {
                //console.log('wx-login', res1);
                apiRequest.post('pub/weixin/getInfoByCode', {
                  code: res1.code
                }).then(function (res2) {
                  //console.log('getInfoByCode', res2.data);
                  if (res2.data.data.unionid!=null){
                    userInfo.wechatId = res2.data.data.unionid;
                  }
                  else{
                    userInfo.wechatId = res2.data.data.openid;
                  }
                  apiRequest.postJson('pub/account/loginPlatform', userInfo).then(function (res3) {
                    console.log('loginPlatform', res3.data);
                    that.globalData.token = res3.data.data.token;
                    //console.log('globalData', that.globalData.token);
                    wx.setStorage({
                      key: "yzw-token",
                      data: that.globalData.token
                    })
                  })
                })
              }
            })
          }
        })
      }
      wx.getStorage({
        key: "yzw-token",
        success: function (res) {
          //console.log('yzw-token', res.data);
          if (!res.data) {
            setToken();
          }
        },
        fail: function (res) {
          setToken();
        }
      })
    }
    setUserToken();
    that.globalData.setUserToken = setUserToken;
  }

})