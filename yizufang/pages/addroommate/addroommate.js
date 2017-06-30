// pages/addroommate/addroommate.js
const util = require('../../utils/util.js');
console.log(util);
Page({
  data: {
    currentMatesex:1,
    currentSex:1,
    dateStart: util.formatDate(new Date()),
    // rentPrice:{
    //   letter:['USD','CAD'],
    //   unit:['月','天']
    // },
    // rentData: '您期望的租金',
  },
  onLoad: function (options) {
    
  },
  selMatesex(e){
    this.setData({
      currentMatesex: e.currentTarget.dataset.sex
    });
  },
  selSex(e) {
    this.setData({
      currentSex: e.currentTarget.dataset.sex
    });
  },
  bindDateChange(e){
    this.setData({
      dateStart: e.detail.value
    })
  },
  // bindrentChange(e){
  //   this.setData({
  //     rentData: e.detail.value
  //   })
  // }
  saveResultLook(){
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
  }
})