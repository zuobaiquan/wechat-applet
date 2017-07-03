
const wechat = require('../../../utils/wechat.js')
var app = getApp()

Page({
  data: {
    currentTab: 1
  },

  onLoad(options) {
    
  },
  
  selectedTab: function (e) {
    var index = e.currentTarget.dataset.current;
    var that = this;
    if (this.data.currentTab === index) {
      return false;
    } else {
      that.setData({
        currentTab: index
      })
    }


  },

})

