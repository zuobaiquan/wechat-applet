// pages/Mycenter/addhouse/addhouse.js
Page({

  data: {
  
  },

  onLoad: function (options) {
  
  },
  addHouseImg(){
    wx.navigateTo({
      url: '../addhouseimg/addhouseimg'
    });
  },
  addBaseinfo(){
    wx.navigateTo({
      url: '../addnew/addnew'
    });
  }

  
})