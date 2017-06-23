// Douban API 操作
const wechat = require('../../utils/wechat.js')

Page({
  data: {
    
  },
  onLoad () {
    var info=wechat.getUserInfo();
    console.log(info);
  }
})





