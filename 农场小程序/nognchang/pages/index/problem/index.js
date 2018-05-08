// pages/index/problem.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toggleShow1:false,
    toggleShow2:false
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  toggleDetail(e){
    let flag=e.currentTarget.dataset.flag;
    if(flag==1){
      this.setData({
        toggleShow1:!this.data.toggleShow1
      })
    }
    if(flag==2){
      this.setData({
        toggleShow2:!this.data.toggleShow2
      })
    }
  }
})
