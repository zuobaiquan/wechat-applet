Page({
  data: {
    latitude: '',
    longitude: '',
    scale: 13,
    windowHeight:0,
    calloutColor: '#f47a20',
    markersBg: '#ffffff',
    showhouseInfo:false,
    houseList:[],
    markers:[],
    houseId:-1,
  },

  onLoad () {
    var that=this;
    this.setData({
      houseList: [{ id: 0, title: 'U-District附近三层别墅', url: '../images/houselist1.png', price: "111 USD/天", type: '独栋别墅1', addr: 'Seattle，WA', detail: '1卧 1卫浴' }, { id: 1, title: 'U-District附近三层别墅', url: '../images/houselist1.png', price: "222 USD/月", type: '独栋别墅2', addr: 'Seattle，WA', detail: '2卧 2卫浴' }, { id: 2, title: 'U-District附近三层别墅', url: '../images/middle-img1.jpg', price: "333 USD/月", type: '独栋别墅3', addr: 'Seattle，WA', detail: '3卧 3卫浴' }, { id: 3, title: 'U-District附近三层别墅', url: '../images/houselist1.png', price: "444 USD/月", type: '独栋别墅4', addr: 'Seattle，WA', detail: '4卧 4卫浴' }, { id: 4, title: 'U-District附近三层别墅', url: '../images/middle-img1.jpg', price: "555 USD/月", type: '独栋别墅5', addr: 'Seattle，WA', detail: '5卧 5卫浴' }],
      markers:[
        {
          id: 0, latitude: 31.298886, longitude: 120.568316,callout: { content: '$1450', bgColor: that.data.markersBg, color: that.data.calloutColor, padding: 4, fontSize: '13', borderRadius: 5, display: 'ALWAYS'}
      },
        {
          id: 1, latitude: 31.315886, longitude: 120.595316,callout: { content: '$3450', bgColor: that.data.markersBg, color: that.data.calloutColor, padding: 4, fontSize: '13', borderRadius: 5, display: 'ALWAYS'}
      },
        {
          id: 2, latitude: 31.284886, longitude: 120.585316,callout: { content: '$3450', bgColor: that.data.markersBg,color: that.data.calloutColor, padding: 4, fontSize: '13', borderRadius: 5, display: 'ALWAYS' }
      },
        {
          id: 3, latitude: 31.268886, longitude: 120.575316,callout: { content: '$3150', bgColor: that.data.markersBg, color: that.data.calloutColor, padding: 4, fontSize: '13', borderRadius: 5, display: 'ALWAYS' }
      },
        {
          id: 4, latitude: 31.298886,longitude: 120.586312,callout: { content: '$1250', bgColor: that.data.markersBg, color: that.data.calloutColor, padding: 4, fontSize: '13', borderRadius: 5, display: 'ALWAYS' }
      }]
    })
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.info(res);
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude  
        });
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
  markertap:function(e){
    var that = this;
    for (let x of that.data.markers) {
      if (x.id == e.markerId){
        that.data.markers[x.id].callout['bgColor'] = '#f47a20';
        that.data.markers[x.id].callout['color'] = '#ffffff';
      }
      else{
        that.data.markers[x.id].callout['bgColor'] = '#ffffff';
        that.data.markers[x.id].callout['color'] = '#f47a20';
      }
    }
    that.setData({
      houseId: e.markerId,
      markers: this.data.markers
    });
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          showhouseInfo: true,
          'windowHeight': res.windowHeight - 230
        });
      }
    })
  },
  hiddenHouse(){
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          showhouseInfo: false,
          houseId: -1,
          'windowHeight': res.windowHeight - 50
        });
      }
    });
    for (let x of that.data.markers) {
      that.data.markers[x.id].callout['bgColor'] = '#ffffff';
      that.data.markers[x.id].callout['color'] = '#f47a20';
    }
    that.setData({
      markers: this.data.markers
    });
  }
  
  
})