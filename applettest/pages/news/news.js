// pages/news/news.js
var app=getApp();
var com = require('../../utils/common');
Page({
  data:{
    msg:"默认数据"
  },
  fnUserState(){
    this.setData({
      msg:com.echoHello('zuobaiquan')
    });
  },
  fnUserState2(){
    this.setData({
      msg: com.echoBye('jame')
    });
  },
  change(){
    this.setData({
      msg:app.a
    });
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
    console.log(com);
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})