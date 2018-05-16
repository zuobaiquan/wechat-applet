Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000
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
