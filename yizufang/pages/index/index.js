
const wechat = require('../../utils/wechat.js')

Page({
  data: {
    swiperList: [{ num: 888, title: "华盛顿大学", url: '../../images/index/middle-img1.jpg' }, { num: 999, title: "西雅图", url: '../../images/index/middle-img2.jpg' }, { num: 666, title: "西雅图2", url: '../../images/index/middle-img2.jpg' }],
    houseList: [{ title: 'U-District附近三层别墅', url: '../../images/index/houselist1.png', price: "999 USD/月", type: '独栋别墅', addr: 'Seattle，WA', detail: '4卧 2卫浴' }, { title: '首页房源标题2', url:'../../images/index/houseno-img.png', price: "2199999 USD/天", type: '联排别墅', addr: 'Seattle，WA', detail: '3卧 1卫浴' }],
    rentMate: [{ url: 'http://p1.qzone.la/Upload/20160402/20160402165345391387.gif', nickname: '小明', city: '西雅图', price: '1000 USD/月', startTime: '2017-06-01', endTime: '2018-06-01', req: '没有任何要求' }, { url: 'http://p1.qzone.la/Upload/20160402/20160402165345391387.gif', nickname: '大明',  city: '西雅图22', price: '1200 USD/月', startTime: '2017-06-12', endTime: '2018-06-18', req: '有任何要求' }],
    roomMate: [{ url: 'http://p1.qzone.la/Upload/20160402/20160402165345391387.gif', nickname: '小明', city: '西雅图', sex: '本人女,希望室友性别女', price: '1000 USD/月', startTime: '2017-06-01', req: '我喜欢猫的，希望x喜欢猫' }, { url: 'http://p1.qzone.la/Upload/20160402/20160402165345391387.gif', nickname: '大明', city: '西雅图22', sex: '本人男,希望室友性别男', price: '1200 USD/月', startTime: '2017-06-12', endTime: '2018-06-18', req: '有任何要求' }],
    // 页面配置  
    winWidth: 0,
    winHeight: 0,
    // tab切换 
    currentTab: 0  
  },
  onLoad () {
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

  selectPlace: function (event) {
    wx.navigateTo({
      url: '../selcity/selcity'
    })
  },
  selectKeyword: function (event){
    wx.navigateTo({
      url: '../searchbox/searchbox'
    })
  }


})





