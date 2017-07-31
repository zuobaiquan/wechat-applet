
Page({
  data: {
    delBtnWidth: 182,
    chartlist: [
      { txtStyle: '', type: 1,status:1, avator: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2406161785,701397900&fm=5', title: 'UW附近2b1b整套出租', url: '../images/houselist1.png', price: "999 USD/月", typename: '独栋别墅', addr: 'Seattle，WA', detail: '4卧 2卫浴' },
      { txtStyle: '', type: 1, status: 0, avator: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2406161785,701397900&fm=5', title: '哈哈哈近2b1b整套出租', url: '../images/houselist1.png', price: "888 USD/月", typename: '独栋别墅', addr: 'Seattle，WA', detail: '2卧 2卫浴' },
      { txtStyle: '', type: 1, status: 1, avator: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2406161785,701397900&fm=5', title: '哈哈哈近2b1b整套出租', url: '../images/houselist1.png', price: "888 USD/月", typename: '独栋别墅', addr: 'Seattle，WA', detail: '2卧 2卫浴' },
      { txtStyle: '', type: 2, status: 0, city: '西雅图0', sex: '本人女希望室友性别女0', price: "600 USD/月", startTime: '2017-06-01', req: '我喜欢猫的，希望x喜欢猫' },
      { txtStyle: '', type: 2, status: 1, city: '西雅图1', sex: '本人女希望室友性别女1', price: "600 USD/月", startTime: '2017-06-01', req: '我喜欢猫的，希望x喜欢猫' },
      { txtStyle: '', type: 3, status: 1, city: '西雅图1', price: "600 USD/月", startTime: '2017-06-01', endTime: '2017-12-01', req: '我喜欢猫的，希望x喜欢猫' }
     ],
    collectList:[
      { type: 1, status: 1, avator: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2406161785,701397900&fm=5', title: 'UW附近2b1b整套出租', url: '../images/houselist1.png', price: "999 USD/月", typename: '独栋别墅', addr: 'Seattle，WA', detail: '4卧 2卫浴' },
      { type: 1, status: 1, avator: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2406161785,701397900&fm=5', title: '哈哈哈近2b1b整套出租', url: '../images/houselist1.png', price: "888 USD/月", typename: '独栋别墅', addr: 'Seattle，WA', detail: '2卧 2卫浴' },
      { type: 2, status: 1, city: '西雅图0', sex: '本人女希望室友性别女0', price: "600 USD/月", startTime: '2017-06-01', req: '我喜欢猫的，希望x喜欢猫' }
    ],
    // tab切换 
    currentTab: 0,
    showrentDetail: false,
    showTips: false,
  },
  onLoad(){
    this.initEleWidth();
  },
  selectedTab(e) {
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
  showrentDetail() {
    this.setData({
      showrentDetail: !this.data.showrentDetail
    });
  },
  hiderentDetail() {
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
    this.setData({
      showrentDetail: false
    });
    wx.navigateTo({
      url: url
    })
  },
  detailHouse() {
    wx.navigateTo({
      url: '../../Mycenter/housedetail/housedetail'
    })
  },
  detailRentroom(e){
    const listtype = parseInt(e.currentTarget.dataset.listtype);
    console.log(e,listtype);;
    if (listtype==3){
      wx.navigateTo({
        url: '../../Community/rentdetail/rentdetail?type=2&look=false'
      })
    }
    if (listtype == 2) {
      wx.navigateTo({
        url: '../../Community/rentdetail/rentdetail?type=3&look=false'
      })
    }
  },
  handelCollect(e) {
    var _that = this;
    _that.setData({
      showTips: true,
      tipsInfo: "取消成功",
    });
    setTimeout(function () {
      _that.setData({
        showTips: false,
      });
    }, 2000)
  },
  touchStart(e){
    if (e.touches.length == 1) {
      this.setData({
        startX: e.touches[0].clientX
      });
    }
  },
  touchMove(e){
    if (e.touches.length == 1) {
      var moveX = e.touches[0].clientX;
      var disX = this.data.startX - moveX;
      var delBtnWidth = this.data.delBtnWidth;
      var txtStyle = "";
      if (disX == 0 || disX < 0) {
        txtStyle = "left:0px";
      } else if (disX > 0) {
        txtStyle = "left:-" + disX + "px";
        if (disX >= delBtnWidth) {
          txtStyle = "left:-" + delBtnWidth + "px";
        }
      }
      var index = e.currentTarget.dataset.index;
      this.data.chartlist[index].txtStyle = txtStyle;
      this.setData({
        chartlist: this.data.chartlist
      });
    }
  },
  touchEnd(e) {
    if (e.changedTouches.length == 1) {
      var endX = e.changedTouches[0].clientX;
      var disX = this.data.startX - endX;
      var delBtnWidth = this.data.delBtnWidth;
      var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" : "left:0px";
      var index = e.currentTarget.dataset.index;
      this.data.chartlist[index].txtStyle = txtStyle;
      this.setData({
        chartlist: this.data.chartlist
      });
    }
  },

  getEleWidth(w) {
    var real = 0;
    try {
      var res = wx.getSystemInfoSync().windowWidth;
      var scale = (750 / 2) / (w / 2);
      real = Math.floor(res / scale);
      return real;
    } catch (e) {
      return false;
    }

  },

  initEleWidth() {
    var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
    this.setData({
      delBtnWidth: delBtnWidth
    });
  },

  //点击删除按钮事件
  delItem(e) {
    var that=this;
    const index = e.target.dataset.index;
    const listtype = parseInt(e.target.dataset.listtype);
    var chartlist = that.data.chartlist;
    var modalTitle="";
    switch (listtype) {
      case 1: modalTitle = '您确定要彻底删除此房源消息吗？'; break;
      case 2: modalTitle = '您确定要彻底删除此室友消息吗？'; break;
      case 3: modalTitle = '您确定要彻底删除此求租消息吗？'; break;
      default: console.log('错误');
    }
    wx.showModal({
      title: '确定',
      confirmText: '删除',
      confirmColor: "#f47a20",
      cancelColor: '#4b474c',
      content: modalTitle,
      success: function (res) {
        if (res.confirm) {
          chartlist.splice(index, 1);
          that.setData({
            chartlist: chartlist
          });
        } else if (res.cancel) {
          //用户取消删除，删除按钮隐藏
          var txtStyle = "left:0px";
          that.data.chartlist[index].txtStyle = txtStyle;
          that.setData({
            chartlist: that.data.chartlist
          });
        }
      }
    })




    
  },
})





