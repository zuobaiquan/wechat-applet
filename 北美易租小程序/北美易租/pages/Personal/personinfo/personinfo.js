// pages/addroommate/addroommate.js
const util = require('../../../utils/util.js');
Page({
  data: {
    nowType: 2,
    priceLet: ['USD', 'CAD'],
    priceUnit: ['月', '天'],
    letter: 'USD',
    unit: '月',
    rentpValue: [],
    currentMatesex: 1,
    currentSex: 1,
    dateStart: util.formatDate(new Date()),
    dateEnd: util.formatDate(new Date()),
    showrentDetail: false
  },
  onLoad: function (options) {
    
  },
  selMatesex(e) {
    this.setData({
      currentMatesex: e.currentTarget.dataset.sex
    });
  },
  selSex(e) {
    this.setData({
      currentSex: e.currentTarget.dataset.sex
    });
  },
  bindDateCgstart(e) {
    this.setData({
      dateStart: e.detail.value
    })
  },
  bindDateCgend(e) {
    this.setData({
      dateEnd: e.detail.value
    })
  },
  bindChange: function (e) {
    this.setData({
      rentpValue: e.detail.value
    })
  },
  selrentConfirm() {
    var val1 = this.data.rentpValue[0], val2 = this.data.rentpValue[1];
    this.setData({
      letter: this.data.priceLet[val1] || this.data.priceLet[0],
      unit: this.data.priceUnit[val2] || this.data.priceUnit[0],
      showrentDetail: false
    })
  },
  selrentCancel() {
    this.setData({
      showrentDetail: false
    });
  },
  /**
  * 验证表单
  */
  verifyEmail(e) {
    util.verifyForm.isEmail(e.detail.value);
  },
  verifyPrice(e) {
    util.verifyForm.isEmpty(e.detail.value, "租金不能为空");
  }


  ,
  saveResultLook() {
    wx.navigateTo({
      url: '../rentdetail/rentdetail?type=3&look=true'
    })
    // wx.showModal({
    //   title: '确定',
    //   confirmText: '发送',
    //   confirmColor: "#f47a20",
    //   cancelColor: '#4b474c',
    //   content: "发送到以下社区： 华盛顿大学",
    //   success: function (res) {
    //     if (res.confirm) {
    //       console.log('用户点击取消')
    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // })
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
})