const apiRequest = require('../../../utils/apiRequest.js');
var userLocation, curLocation, selectLocation, param, location = {},mapSearchHistroy=[];
const APP = getApp();
var reqestToMap = function(that) {
  wx.getStorage({
    key: 'yzw-token',
    success: function (res) {
      console.log(param);
      //console.log(res.data);
      apiRequest.postByToken('api/map/getInfoByMap', param, res.data).then(function (res) {
        var list = res.data.data;
        for (var i = 0, len = list.length; i < len; i++) {
          list[i].index = i;
          if (list[i].type) {
            list[i].iconPath = '../images/WechatIMG11.png';
            list[i].width=25;
            list[i].height=25;
          }
          list[i].callout = {
            content: list[i].type ? "[社区]"+list[i].communityNameCn : list[i].symbol + list[i].rentAmount,
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
    },
    fail: function () {
      apiRequest.post('pub/map/getInfoByMap', param).then(function (res) {
        var list = res.data.data;
        for (var i = 0, len = list.length; i < len; i++) {
          list[i].index = i;
          if (list[i].type) {
            //list[i].iconPath = list[i].portraitUrl;
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
      })
    }
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
            if (location.selectLocation) {
              // 取selectLocation
              param = {
                search: '',
                cityId: location.selectLocation.cityId,
                longitude: location.selectLocation.longitude,
                latitude: location.selectLocation.latitude
              };
              that.setData({
                longitude: location.selectLocation.longitude,
                latitude: location.selectLocation.latitude
              });
            } else {
              param = {
                search: '',
                cityId: location.userLocation.id,
                longitude: location.curLocation.longitude,
                latitude: location.curLocation.latitude
              };
              that.setData({
                longitude: location.curLocation.longitude,
                latitude: location.curLocation.latitude
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
            windowHeight: res.windowHeight * 0.6,
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
      that.setData({
          markers: this.data.markers
      });
    },
    detailHouse(e) {
      var houseId = e.currentTarget.dataset.id;
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
      var setHistroy=function(data){
        that.setData({'searchHistory':data});
        wx.setStorage({
          key: "mapSearchHistroy",
          data:data
        })
      }
      if(searchContent){
        wx.getStorage({
          key:'mapSearchHistroy',
          success:function(res){
            mapSearchHistroy=res.data;
            if(mapSearchHistroy.length>4){
                mapSearchHistroy=mapSearchHistroy.slice(0,4);
            }
            var flag=false;
            //过滤掉搜索历史相同的关键字
            mapSearchHistroy.map((item,index)=>{
              if (item === searchContent){
                flag = true;
              }
            })
            if (!flag){
                mapSearchHistroy=[searchContent].concat(mapSearchHistroy);
                setHistroy(mapSearchHistroy);
            }
          },
          fail:function(res){
              mapSearchHistroy=[searchContent];
              setHistroy(mapSearchHistroy);
          }
        })
      }
      this.hideHistory();
      reqestToMap(that);
    },
    //收藏和取消收藏
    handelCollect(e) {
      var _that = this;
      const collectTag = parseInt(e.target.dataset.iscollect),
        idTag = parseInt(e.target.dataset.id),
        //0：房源，1：社区
        typeTag = parseInt(e.target.dataset.type);
      var _tips, params;
      collectTag == 0 ? _tips = '收藏成功' : _tips = '取消成功';
      wx.getStorage({
        key: 'yzw-token',
        success: function (res) {
          if (typeTag==0){
            params = {
              contentType: typeTag,
              contentId: idTag,
              collectionFlag: collectTag == 0 ? 1 : 0
            }
            apiRequest.postByToken('api/account/collection/collection', params, res.data)
              .then(function (res) {
                _that.data.markers.forEach((item) => {
                  if (item.id == idTag) {
                    item.isCollected = params.collectionFlag;
                    _that.setData({
                      markers: _that.data.markers
                    });
                    return;
                  }
                })
              })
          }
          if (typeTag == 1) {
            params = {
              communityId: idTag,
              followFlag: collectTag
            }
            //这里收藏目前调用是否关注社区的接口
            apiRequest.postByToken('api/community/follow', params , res.data)
              .then(function (res) {
                console.log(123456,res);
                _that.data.markers.forEach((item) => {
                  if (item.id == idTag) {
                    item.isFollowed = params.followFlag==0?1:0;
                    _that.setData({
                      markers: _that.data.markers
                    });
                    return;
                  }
                })
              })
          }
        }, fail: function () {
          wx.openSetting({
            success: (res) => {
              APP.globalData.setUserToken();
              _that.onLoad();
            }
          })
        }
      })
    },
    showHistory:function(e){
        var that=this;
        this.setData({'historyShow':true});
        wx.getStorage({
          key:'mapSearchHistroy',
          success:function(res){
            mapSearchHistroy=res.data;
            that.setData({'searchHistory':mapSearchHistroy});
          }
        })
    },
    hideHistory:function(e){
      this.setData({'historyShow':false});
    },
    cancelSearch:function(e){
      wx.navigateBack();
    },
    curGo:function(e){
      var that = this;
      if (e.currentTarget.dataset.text != undefined) {
        param.search = e.currentTarget.dataset.text;
      } else {
        param.search = '';
      }
      that.setData({ 'sarchText': param.search });
      reqestToMap(that);
    }
})
