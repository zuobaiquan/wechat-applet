// pages/roomlist/roomlist.js
Page({

  data: {
    houseList: [{ status: 1, title: 'U-District附近三层别墅', url: '../images/houselist1.png', price: "999 USD/月", type: '独栋别墅', addr: 'Seattle，WA', detail: '4卧 2卫浴' }, { status: 1, title: '首页房源标题2', url: '../images/houseno-img.png', price: "2199999 USD/天", type: '联排别墅', addr: 'Seattle，WA', detail: '3卧 1卫浴' }, { status: 0, title: '房源标题4', url: '../images/houselist1.png', price: "2009 USD/天", type: '联排别墅', addr: 'Seattle，WA', detail: '3卧 1卫浴' }],
    roomMate: [{ url: 'http://p1.qzone.la/Upload/20160402/20160402165345391387.gif', nickname: '小明', city: '西雅图', sex: '本人女,希望室友性别女', price: '1000 USD/月', startTime: '2017-06-01', req: '我喜欢猫的，希望x喜欢猫' }, { url: 'http://p1.qzone.la/Upload/20160402/20160402165345391387.gif', nickname: '大明', city: '西雅图22', sex: '本人男,希望室友性别男', price: '1200 USD/月', startTime: '2017-06-12', endTime: '2018-06-18', req: '有任何要求' }],
  },

  onLoad: function (options) {

  },
  addroomMate(){
    wx.navigateTo({
      url: '../addroommate/addroommate'
    })
  }


})