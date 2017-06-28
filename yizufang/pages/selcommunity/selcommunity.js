
const wechat = require('../../utils/wechat.js')

Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    cityList: [
      { "name": "热门城市", "child": [{ cityname: '西雅图', 'statename': '华盛顿州' }, { cityname: '洛杉矶', 'statename': '加利福尼亚州' }, { cityname: '旧金山', 'statename': '加利福尼亚州' }, { cityname: '芝加哥', 'statename': '伊利诺伊州' }, { cityname: '纽约', 'statename': '纽约州' }] }, 
    { "name": "A", "child": [{ cityname: 'A美国城市名1', 'statename': '华盛顿州' }, { cityname: 'A美国城市名1', 'statename': '所在州' }, { cityname: 'A美国城市名1', 'statename': '所在州' }, { cityname: '芝加哥', 'statename': '所在州' }, { cityname: 'A美国城市名1', 'statename': '所在州' }] },
    { "name": "   B", "child": [{ cityname: 'B美国城市名1', 'statename': '华盛顿州' }, { cityname: 'B美国城市名1', 'statename': '所在州' }, { cityname: 'B美国城市名1', 'statename': '所在州' }, { cityname: '芝加哥', 'statename': '所在州' }, { cityname: 'B美国城市名1', 'statename': '所在州' }] },
    { "name": "C", "child": [{ cityname: 'C美国城市名1', 'statename': '华盛顿州' }, { cityname: 'C美国城市名1', 'statename': '所在州' }, { cityname: 'C美国城市名1', 'statename': '所在州' }, { cityname: '芝加哥', 'statename': '所在州' }, { cityname: 'C美国城市名1', 'statename': '所在州' }] },
    { "name": "D", "child": [{ cityname: 'D美国城市名1', 'statename': '华盛顿州' }, { cityname: 'D美国城市名1', 'statename': '所在州' }, { cityname: 'D美国城市名1', 'statename': '所在州' }, { cityname: '芝加哥', 'statename': '所在州' }, { cityname: 'D美国城市名1', 'statename': '所在州' }] },
    { "name": "E", "child": [{ cityname: 'E美国城市名1', 'statename': '华盛顿州' }, { cityname: 'E美国城市名1', 'statename': '所在州' }, { cityname: 'E美国城市名1', 'statename': '所在州' }, { cityname: '芝加哥', 'statename': '所在州' }, { cityname: 'E美国城市名1', 'statename': '所在州' }] },
    { "name": "F", "child": [{ cityname: 'F美国城市名1', 'statename': '华盛顿州' }, { cityname: 'F美国城市名1', 'statename': '所在州' }, { cityname: 'F美国城市名1', 'statename': '所在州' }, { cityname: '芝加哥', 'statename': '所在州' }, { cityname: 'F美国城市名1', 'statename': '所在州' }] },
    { "name": "G", "child": [{ cityname: 'G美国城市名1', 'statename': '华盛顿州' }, { cityname: 'G美国城市名1', 'statename': '所在州' }, { cityname: 'G美国城市名1', 'statename': '所在州' }, { cityname: '芝加哥', 'statename': '所在州' }, { cityname: 'G美国城市名1', 'statename': '所在州' }] },
    { "name": "H", "child": [{ cityname: 'H美国城市名1', 'statename': '华盛顿州' }, { cityname: 'H美国城市名1', 'statename': '所在州' }, { cityname: 'H美国城市名1', 'statename': '所在州' }, { cityname: '芝加哥', 'statename': '所在州' }, { cityname: 'H美国城市名1', 'statename': '所在州' }] },
    { "name": "I", "child": [{ cityname: 'I美国城市名1', 'statename': '华盛顿州' }, { cityname: 'I美国城市名1', 'statename': '所在州' }, { cityname: 'I美国城市名1', 'statename': '所在州' }, { cityname: '芝加哥', 'statename': '所在州' }, { cityname: 'I美国城市名1', 'statename': '所在州' }] },
    { "name": "J", "child": [{ cityname: 'J美国城市名1', 'statename': '华盛顿州' }, { cityname: 'J美国城市名1', 'statename': '所在州' }, { cityname: 'J美国城市名1', 'statename': '所在州' }, { cityname: '芝加哥', 'statename': '所在州' }, { cityname: 'J美国城市名1', 'statename': '所在州' }] },
    { "name": "K", "child": [{ cityname: 'K美国城市名1', 'statename': '华盛顿州' }, { cityname: 'K美国城市名1', 'statename': '所在州' }, { cityname: 'K美国城市名1', 'statename': '所在州' }, { cityname: '芝加哥', 'statename': '所在州' }, { cityname: 'K美国城市名1', 'statename': '所在州' }] },
    { "name": "M", "child": [{ cityname: 'M美国城市名1', 'statename': '华盛顿州' }, { cityname: 'M美国城市名1', 'statename': '所在州' }, { cityname: 'M美国城市名1', 'statename': '所在州' }, { cityname: '芝加哥', 'statename': '所在州' }, { cityname: 'M美国城市名1', 'statename': '所在州' }] }]
  },
  onLoad(options) {
    var that = this;
    that.setData({
      winWidth: 400,
      winHeight: 3200,
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
  wxSortPickerViewTemTagTap:function(e) {
    var that = this;
    var temData = that.data.wxSortPickerData;
    temData.wxSortPickerViewtoView = e.target.dataset.tag;
    that.setData({
      wxSortPickerData: temData
    })

  }


})





