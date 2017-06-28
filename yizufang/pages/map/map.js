Page({
  data: {
    latitude: '',
    longitude: '',
    scale: 13,
    windowHeight:0
  },

  onLoad () {
    var that=this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.info(res);
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude
        })
        //that.mapCtx.moveToLocation()
      }
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          'windowHeight': res.windowHeight-50
        });
      }
    })
  },
  
  
})
