Page({
  data: {
    noAddress:false
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
  tapDelete(){
    wx.showModal({
      content: '確认要删除该地址？',
      cancelColor:'#999999',
      confirmColor:'#333333',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  newAddress(){
    wx.navigateTo({
      url: `../newaddress/index`
    });
  }
})
