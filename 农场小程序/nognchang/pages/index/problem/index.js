// pages/index/problem.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toggleShow1:false,
    toggleShow2:false,
    toggleShow3:false,
    toggleShow4:false,
    toggleShow5:false,
    toggleShow6:false,
    toggleShow7:false,
    toggleShow8:false,
    toggleShow9:false,
    toggleShow10:false,
    toggleShow11:false,
    toggleShow12:false
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
