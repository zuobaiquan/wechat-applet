
const wechat = require('../../utils/wechat.js')

Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    cityList: [{ "name": "热门城市", "child": [{ cityname: '西雅图', 'statename': '华盛顿州' }, { cityname: '洛杉矶', 'statename': '加利福尼亚州' }, { cityname: '旧金山', 'statename': '加利福尼亚州' }, { cityname: '芝加哥', 'statename': '伊利诺伊州' }, { cityname: '纽约', 'statename': '纽约州' }] }, { "name": "A", "child": [{ cityname: 'A美国城市名1', 'statename': '华盛顿州' }, { cityname: 'A美国城市名1', 'statename': '所在州' }, { cityname: 'A美国城市名1', 'statename': '所在州' }, { cityname: '芝加哥', 'statename': '所在州' }, { cityname: 'A美国城市名1', 'statename': '所在州' }] }]
  },
  onLoad(options) {
    var that = this;
    that.setData({
      winWidth: 400,
      winHeight: 600,
      currentTab: options.type,
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





