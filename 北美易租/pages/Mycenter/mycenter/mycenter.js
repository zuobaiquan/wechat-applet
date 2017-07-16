
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
    showrentDetail: false
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

  touchStart(e){
    if (e.touches.length == 1) {
      this.setData({
        //设置触摸起始点水平方向位置
        startX: e.touches[0].clientX
      });
    }
  },

  touchMove(e){
    if (e.touches.length == 1) {
      //手指移动时水平方向位置
      var moveX = e.touches[0].clientX;
      //手指起始点位置与移动期间的差值
      var disX = this.data.startX - moveX;
      var delBtnWidth = this.data.delBtnWidth;
      var txtStyle = "";
      if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变
        txtStyle = "left:0px";
      } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离
        txtStyle = "left:-" + disX + "px";
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度
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
      //手指移动结束后水平位置
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      var disX = this.data.startX - endX;
      var delBtnWidth = this.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" : "left:0px";
      //获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index;
      this.data.chartlist[index].txtStyle = txtStyle;
      this.setData({
        chartlist: this.data.chartlist
      });
    }
  },

  //获取元素自适应后的实际宽度

  getEleWidth(w) {
    var real = 0;
    try {
      var res = wx.getSystemInfoSync().windowWidth;
      var scale = (750 / 2) / (w / 2);//以宽度750px设计稿做宽度的自适应
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





