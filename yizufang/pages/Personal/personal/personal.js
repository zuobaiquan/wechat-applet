
Page({
  data: {
    isBindmail:false
  },
  onLoad() {
    console.log(11);
  },
  feedBack(){
    wx.navigateTo({
      url: '../feedback/feedback'
    })
  },
  bindEmail(){
    wx.navigateTo({
      url: '../bindmail/bindmail'
    })
  }
})
