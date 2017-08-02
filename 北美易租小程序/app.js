// 创建应用程序对象
App({
  // ========== 全局数据对象（整个应用程序共享） ==========
  // globalData: {},

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
    // wx.getUserInfo({
    //   withCredentials: true,
    //   success: function (res) {
    //     //console.log(123456, res);
    //   }
    // })
    wx.login({
      success: function (res) {
        console.log(111, res);
        
        // if (res.code) {
        //   //发起网络请求
        //   wx.request({
        //     url: 'https://test.com/onLogin',
        //     data: {
        //       code: res.code
        //     }
        //   })
        // } else {
        //   console.log('获取用户登录态失败！' + res.errMsg)
        // }
      }
    });
  },
  
})
