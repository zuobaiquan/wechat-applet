//index.js
//获取应用实例
var app = getApp();
var comMethods=require('../../utils/util.js');
Page({
  data: {
    name: 'Hello',
    myidcard:'421123198002132312',
    arr: ['apple', 'orange'],
    arrData: [
      { name: 'apple', age: 10 },
      { name: 'orange', age: 20 }
    ]
  },
  changeInfo(){
    console.log(this.data.name);
    this.setData({
      name:'zuobaiquan'+Date.now(),
      myidcard: comMethods.rightIdcard(this.data.myidcard)
    });
  },
  aaa(){
    wx.navigateTo({
      url: '../news/news'
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
