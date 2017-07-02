
const wechat = require('../../../utils/wechat.js')

Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    //社区
    communityListlen:0,
    // 房源
    houseListlen:0,
    //求租
    rentMatelen: 0,
    //找室友
    roomMatelen:0,
    // tab切换  
    currentTab:2,
    communityList:['西雅图','华盛顿大学','其他相关社区'],
    // communityList: [],
    // houseList: [{ title: 'U-District附近三层别墅', url: '../../images/index/houselist1.png', price: "999 USD/月", type: '独栋别墅', addr: 'Seattle，WA', detail: '4卧 2卫浴' }, { title: '首页房源标题2', url: '../../images/index/houseno-img.png', price: "2199999 USD/天", type: '联排别墅', addr: 'Seattle，WA', detail: '3卧 1卫浴' }],
    houseList:[],
    rentMate: [{ url: 'http://p1.qzone.la/Upload/20160402/20160402165345391387.gif', nickname: '小明', city: '西雅图', price: '1000 USD/月', startTime: '2017-06-01', endTime: '2018-06-01', req: '没有任何要求' }, { url: 'http://p1.qzone.la/Upload/20160402/20160402165345391387.gif', nickname: '大明', city: '西雅图22', price: '1200 USD/月', startTime: '2017-06-12', endTime: '2018-06-18', req: '有任何要求' }],
    // rentMate:[],
    roomMate: [{ url: 'http://p1.qzone.la/Upload/20160402/20160402165345391387.gif', nickname: '小明', city: '西雅图', sex: '本人女,希望室友性别女', price: '1000 USD/月', startTime: '2017-06-01', req: '我喜欢猫的，希望x喜欢猫' }, { url: 'http://p1.qzone.la/Upload/20160402/20160402165345391387.gif', nickname: '大明', city: '西雅图22', sex: '本人男,希望室友性别男', price: '1200 USD/月', startTime: '2017-06-12', endTime: '2018-06-18', req: '有任何要求' }],
    // roomMate: []
  },
  onLoad() {
    communityListlen
    var communityListlen = this.data.communityList.length;
    var houseListlen = this.data.houseList.length;
    var rentMatelen = this.data.rentMate.length;
    var roomMatelen = this.data.roomMate.length;
    var that = this;
    console.log("houseListlen",houseListlen);
    that.setData({
      winWidth: 400,
      winHeight: 400,
      communityListlen: communityListlen,
      houseListlen:houseListlen,
      rentMatelen: rentMatelen,
      roomMatelen: roomMatelen,
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
  changeText:function(e){
    this.setData({
      searchcon: e.detail.value
    });
  },
  clearText:function(e){
    this.setData({
      searchcon: ""
    });
  },
  cancelSearch:function(e){
    console.log(2222);
    wx.reLaunch({
      url: '../index/index'
    })
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





