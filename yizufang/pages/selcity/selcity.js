
const wechat = require('../../utils/wechat.js')

Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    swiperAmList: [{ }, {  }, { }]
  },
  onLoad() {
    var that = this;
    that.setData({
      winWidth: 400,
      winHeight: 400
    });
  },
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },


})





