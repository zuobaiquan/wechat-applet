
Page({
  data: {
    chartlist: [
       { type: 1,status:1, avator: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2406161785,701397900&fm=5', title: 'UW附近2b1b整套出租', url: '../images/houselist1.png', price: "999 USD/月", typename: '独栋别墅', addr: 'Seattle，WA', detail: '4卧 2卫浴' },
       { type: 1, status: 0, avator: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2406161785,701397900&fm=5', title: '哈哈哈近2b1b整套出租', url: '../images/houselist1.png', price: "888 USD/月", typename: '独栋别墅', addr: 'Seattle，WA', detail: '2卧 2卫浴' },
       { type: 1, status: 1, avator: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2406161785,701397900&fm=5', title: '哈哈哈近2b1b整套出租', url: '../images/houselist1.png', price: "888 USD/月", typename: '独栋别墅', addr: 'Seattle，WA', detail: '2卧 2卫浴' },
       { type: 2, status: 0, city: '西雅图0', sex: '本人女希望室友性别女0', price: "600 USD/月", startTime: '2017-06-01', req: '我喜欢猫的，希望x喜欢猫' },
       { type: 2, status: 1, city: '西雅图1', sex: '本人女希望室友性别女1', price: "600 USD/月", startTime: '2017-06-01', req: '我喜欢猫的，希望x喜欢猫' }
     ],
    // 页面配置  
    winWidth: 0,
    winHeight: 0,
    // tab切换 
    currentTab: 0,
    showrentDetail: false
  },
  onLoad() {
    var that = this;
    that.setData({
      winWidth: '100%',
      winHeight: that.data.chartlist.length*366
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

  showrentDetail: function () {
    this.setData({
      showrentDetail: !this.data.showrentDetail
    });
  },
  hiderentDetail: function () {
    this.setData({
      showrentDetail: false
    });
  },
  sendInfo(e) {
    var index = e.currentTarget.dataset.currenttype, url = '';
    index = parseInt(index);
    switch (index) {
      case 1: url = '../addhouse/addhouse'; break;
      case 2: url = '../addhouse/addhouse'; break;
      case 3: url = '../addhouse/addhouse'; break;
      default: console.log('错误');
    }
    wx.navigateTo({
      url: url
    })
  },
})





