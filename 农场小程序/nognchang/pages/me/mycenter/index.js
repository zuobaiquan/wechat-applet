// pages/me/mycenter/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  tapTel(){
    wx.makePhoneCall({
      phoneNumber: '15671559817'
    })
  },
  tapAddress(){
    wx.navigateTo({
      url: `../addresslist/index`
    });
  },
  tapRecord(){
    wx.navigateTo({
      url: `../myrecord/index`
    });
  },
  tapMyinfo(){
    wx.navigateTo({
      url: `../myinfo/index`
    });
  }
})
