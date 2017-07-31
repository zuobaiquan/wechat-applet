Page({
    data: {
        latitude: '',
        longitude: '',
        scale: 13,
        windowHeight: 0,
        calloutColor: '#f47a20',
        markersBg: '#ffffff',
        showhouseInfo: false,
        houseList: [],
        markers: [],
        houseId: -1,
        calloutold: {
            bgColor: '#ffffff',
            color: '#f47a20'
        },
        calloutnew: {
            bgColor: '#f47a20',
            color: '#ffffff'
        }
    },

    onLoad() {
        if (wx.getSystemInfoSync().SDKVersion.slice(0,3) < 1.2) {
            wx.showModal({
                title: '提示',
                content: '您的微信不是最新版本，请更新至最新版本，否则此地图页面部分功能将无法全部显示',
                showCancel:false,
                success: function(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        }
        var that = this;
        this.setData({
            houseList: [{
                id: 0,
                title: 'U-District附近三层别墅',
                url: '../images/houselist1.png',
                price: "111 USD/天",
                type: '独栋别墅1',
                addr: 'Seattle，WA',
                detail: '1卧 1卫浴'
            }, {
                id: 1,
                title: 'U-District附近三层别墅',
                url: '../images/houselist1.png',
                price: "222 USD/月",
                type: '独栋别墅2',
                addr: 'Seattle，WA',
                detail: '2卧 2卫浴'
            }, {
                id: 2,
                title: 'U-District附近三层别墅',
                url: '../images/middle-img1.jpg',
                price: "333 USD/月",
                type: '独栋别墅3',
                addr: 'Seattle，WA',
                detail: '3卧 3卫浴'
            }, {
                id: 3,
                title: 'U-District附近三层别墅',
                url: '../images/houselist1.png',
                price: "444 USD/月",
                type: '独栋别墅4',
                addr: 'Seattle，WA',
                detail: '4卧 4卫浴'
            }, {
                id: 4,
                title: 'U-District附近三层别墅',
                url: '../images/middle-img1.jpg',
                price: "555 USD/月",
                type: '独栋别墅5',
                addr: 'Seattle，WA',
                detail: '5卧 5卫浴'
            }],
            markers: [{
                    id: 0,
                    latitude: 31.298886,
                    longitude: 120.568316,
                    iconPath:'../images/mapmarker1.png',
                    callout: {
                        content: '华盛顿大学',
                        bgColor: that.data.markersBg,
                        color: that.data.calloutColor,
                        padding: 4,
                        fontSize: '13',
                        borderRadius: 5,
                        display: 'ALWAYS'
                    }
                }, {
                    id: 1,
                    latitude: 31.315886,
                    longitude: 120.595316,
                    callout: {
                        content: '$3450',
                        bgColor: that.data.markersBg,
                        color: that.data.calloutColor,
                        padding: 4,
                        fontSize: '13',
                        borderRadius: 5,
                        display: 'ALWAYS'
                    }
                }, {
                    id: 2,
                    latitude: 31.284886,
                    longitude: 120.585316,
                    callout: {
                        content: '$3450',
                        bgColor: that.data.markersBg,
                        color: that.data.calloutColor,
                        padding: 4,
                        fontSize: '13',
                        borderRadius: 5,
                        display: 'ALWAYS'
                    }
                }, {
                    id: 3,
                    latitude: 31.268886,
                    longitude: 120.575316,
                    callout: {
                        content: '$3150',
                        bgColor: that.data.markersBg,
                        color: that.data.calloutColor,
                        padding: 4,
                        fontSize: '13',
                        borderRadius: 5,
                        display: 'ALWAYS'
                    }
                }, {
                    id: 4,
                    latitude: 31.298886,
                    longitude: 120.586312,
                    callout: {
                        content: '$1250',
                        bgColor: that.data.markersBg,
                        color: that.data.calloutColor,
                        padding: 4,
                        fontSize: '13',
                        borderRadius: 5,
                        display: 'ALWAYS'
                    }
                },
                // {
                //   id: 5, label: { color: '#f47a20', fontSize: '13', content: '我是华盛顿大学', x: '31.308886', y: '120.586312' }, iconPath:'../images/mapmarker1.png',height:24,width:34, latitude: 31.308886, longitude: 120.586312, title:'华盛顿大学'}
            ]
        })
        wx.getLocation({
            type: 'wgs84',
            success: function(res) {
                console.info(res);
                that.setData({
                    latitude: res.latitude,
                    longitude: res.longitude
                });
            }
        })
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    'windowHeight': res.windowHeight - 50
                });
            }
        })
    },
    onShow: function () {
      // 1.创建地图上下文，移动当前位置到地图中心
      this.mapCtx = wx.createMapContext("yzwMap");
      this.mapCtx.moveToLocation()
    },
    markertap: function(e) {
        var that = this;
        for (let x of that.data.markers) {
            if (x.id == e.markerId) {
                Object.assign(that.data.markers[x.id].callout, that.data.calloutnew);
            } else {
                Object.assign(that.data.markers[x.id].callout, that.data.calloutold);
            }
        }
        that.setData({
            houseId: e.markerId,
            markers: this.data.markers
        });
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    showhouseInfo: true,
                    'windowHeight': res.windowHeight - 230
                });
            }
        })
    },
    hiddenHouse() {
        var that = this;
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    showhouseInfo: false,
                    houseId: -1,
                    'windowHeight': res.windowHeight - 50
                });
            }
        });
        for (let x of that.data.markers) {
            Object.assign(that.data.markers[x.id].callout, that.data.calloutold);
        }
        that.setData({
            markers: this.data.markers
        });
    }
})
