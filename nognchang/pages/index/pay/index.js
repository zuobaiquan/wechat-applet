Page({
  data: {
    yearList: ['1年', '2年', '3年'],
    index: 0
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
  yearChosen(e){
    this.setData({
      index: e.detail.value
    })
  }

})
