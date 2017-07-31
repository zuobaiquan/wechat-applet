//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    currentTab: 1,
    isShowToast: false,
    letterlist: ['AA','A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    scrollIntoId: 'AA',
    cityList: [
      { "name": "AA", "child": [{ cityname: '西雅图', 'statename': '华盛顿州' }, { cityname: '洛杉矶', 'statename': '加利福尼亚州' }, { cityname: '旧金山', 'statename': '加利福尼亚州' }, { cityname: '芝加哥', 'statename': '伊利诺伊州' }, { cityname: '纽约', 'statename': '纽约州' }] },
      { "name": "A", "child": [{ cityname: 'A美国城市名1', 'statename': '华盛顿州' }, { cityname: 'A美国城市名1', 'statename': '所在州' }, { cityname: 'A美国城市名1', 'statename': '所在州' }, { cityname: '芝加哥', 'statename': '所在州' }, { cityname: 'A美国城市名1', 'statename': '所在州' }] },
      { "name": "B", "child": [{ cityname: 'B美国城市名1', 'statename': '华盛顿州' }, { cityname: 'B美国城市名1', 'statename': '所在州' }, { cityname: 'B美国城市名1', 'statename': '所在州' }, { cityname: '芝加哥', 'statename': '所在州' }, { cityname: 'B美国城市名1', 'statename': '所在州' }] },
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
  letterSelstart: function (e) {
    var letter = e.target.dataset.id;
    this.setData({
      scrollIntoId: letter,
      isShowToast: true,
    })
    var that = this;
    setTimeout(function () {
      that.setData({
        isShowToast: false
      });
    }, 800);
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

