const apiRequest = require('../../../utils/apiRequest.js');
var userLocation, curLocation, selectLocation, param, location = {};
var reqestToMap = function(that) {
    apiRequest.post('pub/map/getInfoByMap', param).then(function(res) {
        var list = res.data.data;
        for (var i = 0, len = list.length; i < len; i++) {
            list[i].index = i;
            if (list[i].type) {
                list[i].iconPath = list[i].portraitUrl;
            }
            list[i].callout = {
                content: list[i].type ? list[i].communityNameCn : list[i].symbol + list[i].rentAmount,
                bgColor: that.data.markersBg,
                color: that.data.calloutColor,
                padding: 10,
                fontSize: '13',
                borderRadius: 5,
                display: 'ALWAYS'
            }
        }
        that.setData({
            'markers': list
        });
        console.log('markers', list);
    })
}
Page({
    data: {
        latitude: '',
        longitude: '',
        scale: 8,
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
        var that = this;
        console.log('ppppp+++++');
        if (wx.getSystemInfoSync().SDKVersion.slice(0, 3) < 1.2) {
            wx.showModal({
                title: '提示',
                content: '您的微信不是最新版本，请更新至最新版本，否则此地图页面部分功能将无法全部显示',
                showCancel: false,
                success: function(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        }
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    'windowHeight': res.windowHeight - 50
                });
            }
        })
        var getMap = function(location) {
            if (location.selectLocation && location.userLocation.id != location.selectLocation.cityId) {
                // 取selectLocation
                param = {
                    search: '',
                    cityId: location.selectLocation.cityId,
                    longitude: '',
                    latitude: ''
                };
                that.setData({
                    "longitude": location.selectLocation.longitude
                });
                that.setData({
                    "latitude": location.selectLocation.latitude
                });
            } else {
                param = {
                    search: '',
                    cityId: location.userLocation.id,
                    longitude: location.curLocation.longitude,
                    latitude: location.curLocation.latitude
                };
                that.setData({
                    "longitude": location.curLocation.longitude
                });
                that.setData({
                    "latitude": location.curLocation.latitude
                });
            }
            reqestToMap(that);
        }
        wx.getStorage({
            key: 'curLocation',
            success: function(res) {
                location.curLocation = res.data;
                wx.getStorage({
                    key: 'userLocation',
                    success: function(res2) {
                        location.userLocation = res2.data;
                        wx.getStorage({
                            key: 'selectLocation',
                            success: function(res3) {
                                location.selectLocation = res3.data;
                                getMap(location);
                            },
                            fail: function(err) {
                                getMap(location);
                            }
                        })
                    }
                })
            }
        })


    },
    onShow: function() {
        // 1.创建地图上下文，移动当前位置到地图中心
        this.mapCtx = wx.createMapContext("yzwMap");
        this.mapCtx.moveToLocation()
    },
    markertap: function(e) {
        var that = this;
        for (let x of that.data.markers) {
            if (x.id == e.markerId) {
                Object.assign(that.data.markers[x.index].callout, that.data.calloutnew);
            } else {
                Object.assign(that.data.markers[x.index].callout, that.data.calloutold);
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
                    'windowHeight': res.windowHeight * 0.6,
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
        // for (let x of that.data.markers) {
        //     Object.assign(that.data.markers[x.id].callout, that.data.calloutold);
        // }
        that.setData({
            markers: this.data.markers
        });
    },
    detailHouse(e) {
        var houseId = e.currentTarget.dataset.houseid;
        var type = e.currentTarget.dataset.type;
        if (type) {
            wx.navigateTo({
                url: `../../Community/communitydetail/communitydetail?communityId=${houseId}`
            })
        } else {
            wx.navigateTo({
                url: `../../Mycenter/housedetail/housedetail?houseId=${houseId}`
            })
        }

    },
    search: function(e) {
        var searchContent = e.detail.value;
        param.search = searchContent;
        var that = this;
        reqestToMap(that);
    }
})
