//app.js
var network = require('./utils/network.js')
App({
  onLaunch: function () {
    this.login();
  },
  login:function(cb){
    var that = this;
      //调用登录接口
       if(!!wx.getStorageSync('token')) return;

      wx.login({
        success: function (res1) {
          var code = res1.code;
          wx.getUserInfo({
            success: function (res) {
              res.code = code;
              network.baseRequest('/api/login',res,'post',function(data){
                wx.setStorageSync('token',data.data.data.token);
                wx.setStorageSync('userBean',data.data.data.userBean);
                that.globalData.userInfo = data.data.data.userBean;
                typeof cb == 'function' && cb(data.data.data.userBean);
              });
            },
            fail(err){
              wx.showModal({
                title: '提示',
                content: JSON.stringify(err),
                success: function(res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
            }
          })
        }
      })
  },
  getUserInfo(cb){
    let userBean = wx.getStorageSync('userBean');
    if(userBean){
      typeof cb == 'function' && cb(userBean);
    }else{
      console.log(this.globalData.userInfo)
        this.login(cb);
    }
  },
  // 设置globalData数据的方法
  setGlData(key,data){
      this.globalData[key] = data;
  },
  //获取globalData数据的方法
  getGlData(key){
    return this.globalData[key];
  },
  globalData:{
    userInfo:null, //保持用户信息
    comment:null ,//保存评论信息用于更新数据
    sendTopic: false, //标志是否发话题,用于是否要重新获取数据
    circleDetailCoverUrl: null
  }
});
