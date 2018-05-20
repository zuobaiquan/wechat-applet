const network = require('../../../utils/network.js');
const util = require('../../../utils/util.js');
Page({
  data: {
    imgUrls: [],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000
  },
  onLoad: function () {
    var that=this;
    util.showToast({title:'加载中...',duration:10000})
    network.baseRequest('/api/banner',{'page':0,'size':5},'get',function(data){
      that.setData({
        imgUrls: data.data.content
      });
      wx.hideToast();
    });
  },
  tapPerson(){
    wx.navigateTo({
      url: `../../me/mycenter/index`
    });
  },
  problemDetail(e){
    wx.navigateTo({
      url: `../problem/index`
    });
  },
  tapStory(){
    wx.navigateTo({
      url: `../story/index`
    });
  },
  tapChoose(){
    wx.navigateTo({
      url: `../choose/index`
    });
  },
  tapDetail(){
    wx.navigateTo({
      url: `../detail/index`
    });
  }
})
