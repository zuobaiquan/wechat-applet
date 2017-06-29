Page({
  data: {
    latitude: '',
    longitude: '',
    scale: 12,
    windowHeight:0,
    // map:{
    //   markers: [],
    //   hasMarkers: false//解决方案  
    // },
    // markers: [{
    //   latitude: 23.099994,
    //   longitude: 113.324520,
    //   name: 'T.I.T 创意园',
    //   desc: '我现在的位置'
    // }],
    // covers: [{
    //   latitude: 31.298886,
    //   longitude: 120.585316,
    //   iconPath: '../../images/index/icon-collect.png',
    //   rotate: 10
    // }, {
    //     latitude: 31.298883,
    //   longitude: 120.585311,
    //   iconPath: '../../images/index/mylocation.png',
    //   rotate: 90
    // }]
    

    
    markers: [{
      title:'这是我住的房子',
      id: 1,
      latitude: 31.298886,
      longitude: 120.585316,
      callout: { content: '$1450', bgColor: '#ddd', color: '#f47a20', padding: 5, fontSize: '13', borderRadius: 5, display: 'ALWAYS'}
    }, {
      title: '这是aaa住的房子呵呵',
      id: 1,
      latitude: 31.293831,
      longitude: 120.589312,
    }],
  },

  onLoad () {
    var that=this;
    
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.info(res);
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude,
          // 'map.markers': [{
          //   latitude: res.latitude,
          //   longitude: res.longitude,
          //   name: 'titile',
          //   desc: 'jjjdjdjdjdjjd'
          // }],
          // 'map.hasMarkers': true//解决方案    
        });
        //console.log(that.data.map.markers);  
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
    console.log(e);
  }
  
  
})
