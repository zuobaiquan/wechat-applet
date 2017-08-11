const apiRequest = require('../../../utils/apiRequest.js');
const util = require('../../../utils/util.js');
const APP = getApp();
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.min.js');
import { configApi } from '../../../utils/constant';
var qqmapsdk,sourseSwiperIndex, getHourselist, getRentlist, getRoommatelist, refreshData;
Page({
  data: {
    isLoading: false,
    isRefreshing: false,
    showTips: false,
    tipsInfo: '收藏成功',
    swiperList: [],
    houseList: [],
    rentMate: [],
    roomMate: [],
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    curLatitude: '',
    curLongitude: '',
    cityId: 0,
    showCurcity: ''
  },
  onLoad(options) {
    wx.showLoading({
      title: '数据加载中',
    })
    var selectLocation, userLocation;

    var that = this;

    var getLocationCallback = function (res) {
      that.setData({
        cityId: res.data.data.id
      });
      let params2 = {
        cityId: res.data.data.id,
        longitude: res.data.data.longitude,
        latitude: res.data.data.latitude
      }
      wx.setStorage({
        key: "userLocation",
        data: res.data.data
      })
      wx.getStorage({
        key: 'userLocation',
        success: function (res) {
          userLocation = res.data;
          that.setData({
            'userLocation': userLocation
          })
          if (selectLocation) {
            that.setData({
              showCurcity: util.handelStr(selectLocation.cityName, 3)
            })
          }
          else {
            that.setData({
              showCurcity: util.handelStr(userLocation.nameCn, 3)
            })
          }
        }
      })
      wx.getStorage({
        key: 'yzw-token',
        success: function (res) {
          apiRequest.postByToken('api/homePage/banner', params2, res.data)
            .then(function (res) {
              that.setData({
                swiperList: res.data.data
              });
            })
        },
        fail: function () {
          apiRequest.post('pub/homePage/banner', params2)
            .then(function (res) {
              that.setData({
                swiperList: res.data.data
              });
            })
        }
      })
    }
    wx.getStorage({
      key: 'selectLocation',
      success: function (res) {
        selectLocation = res.data;
        if (selectLocation) {
          that.setData({
            'selectLocation': selectLocation
          })
        }
      }
    })
    getHourselist = function (page, size, _that) {
      var params={};
      var getHouseDataByToken=function(){
        wx.getStorage({
          key: 'yzw-token',
          success: function (res) {
            //console.log(res.data);
            apiRequest.postByToken('api/homePage/houses-resource', params, res.data)
              .then(function (res) {
                _that.setData({
                  houseList: res.data.data.list,
                  winHeight: res.data.data.list.length * 366 + 26
                });
              })
          },
          fail: function () {
            apiRequest.post('pub/homePage/houses-resource', params)
              .then(function (res) {
                _that.setData({
                  houseList: res.data.data.list,
                  winHeight: res.data.data.list.length * 366 + 26
                });
              })
          }
        })
      }
      wx.getStorage({
        key: 'selectLocation',
        success: function (res) {
          params = {
            cityId: res.data.cityId,
            page: page,
            size: size
          }
          getHouseDataByToken();
        },
        fail:function(err){
          params = {
            cityId: _that.data.cityId,
            latitude: _that.data.curLatitude,
            longitude: _that.data.curLongitude,
            page: page,
            size: size
          }
          getHouseDataByToken();
        }
      })
    }
    getRentlist = function (page, size, _that) {
      var params = {};
      var getRentDataByToken = function () {
        wx.getStorage({
          key: 'yzw-token',
          success: function (res) {
            apiRequest.postByToken('api/homePage/soliciting', params, res.data)
              .then(function (res) {
                _that.setData({
                  rentMate: res.data.data.list,
                  winHeight: res.data.data.list.length * 366 + 26
                });
              })
          },
          fail: function () {
            apiRequest.post('pub/homePage/soliciting', params)
              .then(function (res) {
                _that.setData({
                  rentMate: res.data.data.list,
                  winHeight: res.data.data.list.length * 366 + 26
                });
              })
          }
        })
      }
      wx.getStorage({
        key: 'selectLocation',
        success: function (res) {
          params = {
            cityId: res.data.cityId,
            page: page,
            size: size
          }
          getRentDataByToken();
        },
        fail: function (err) {
          params = {
            cityId: _that.data.cityId,
            page: page,
            size: size
          }
          getRentDataByToken();
        }
      })
    }
    getRoommatelist = function (page, size, _that) {
      var params = {};
      var getRoomDataByToken = function () {
        wx.getStorage({
          key: 'yzw-token',
          success: function (res) {
            apiRequest.postByToken('api/homePage/richmod-list', params, res.data)
              .then(function (res) {
                _that.setData({
                  roomMate: res.data.data.list,
                  winHeight: res.data.data.list.length * 366 + 26
                });
              })
          },
          fail: function () {
            apiRequest.post('pub/homePage/richmod-list', params)
              .then(function (res) {
                _that.setData({
                  roomMate: res.data.data.list,
                  winHeight: res.data.data.list.length * 366 + 26
                });
              })
          }
        })
      }
      wx.getStorage({
        key: 'selectLocation',
        success: function (res) {
          params = {
            cityId: res.data.cityId,
            page: page,
            size: size
          }
          getRoomDataByToken();
        },
        fail: function (err) {
          params = {
            cityId: _that.data.cityId,
            page: page,
            size: size
          }
          getRoomDataByToken();
        }
      })
    }

    refreshData=function(){
      if (options.hasOwnProperty('seltype')) {
        wx.getStorage({
          key: 'selectLocation',
          success: function (res) {
            let params1 = {
              countryName: res.data.countryName,
              latitude: res.data.latitude,
              longitude: res.data.longitude
            }
            apiRequest.post('pub/homePage/local-city', params1)
              .then(function (res) {
                getLocationCallback(res);
                getRentlist(1, 5, that);
                getRoommatelist(1, 5, that);
                getHourselist(1, 5, that);
                wx.hideLoading()
              })
          }
        })
      }
      else {
        wx.getLocation({
          type: 'wgs84',
          success: function (res) {
            that.setData({
              curLatitude: res.latitude,
              curLongitude: res.longitude
            });
            wx.setStorage({
              key: "curLocation",
              data: res
            })
            qqmapsdk = new QQMapWX({
              key: configApi.QQMapWX_KEY
            });
            qqmapsdk.reverseGeocoder({
              location: {
                latitude: that.data.curLatitude,
                longitude: that.data.curLongitude
              },
              success: function (res) {
                let params1 = {
                  countryName: res.result.address_component.nation,
                  latitude: that.data.curLatitude,
                  longitude: that.data.curLongitude
                }
                apiRequest.post('pub/homePage/local-city', params1)
                  .then(function (res) {
                    getLocationCallback(res);
                    getRentlist(1, 5, that);
                    getRoommatelist(1, 5, that);
                    getHourselist(1, 5, that);
                    wx.hideLoading()
                  })
              }
            })
          },
          fail: function (err) {
            apiRequest.post('pub/homePage/getDefaultCity', {})
              .then(function (res) {
                getLocationCallback(res);
                getRentlist(1, 5, that);
                getRoommatelist(1, 5, that);
                getHourselist(1, 5, that);
                wx.hideLoading()
              })
          }
        })
      }
    }
    refreshData()
    
  },
  bindChange: function (e) {
    var that = this;
    var index = parseInt(e.detail.current);
    this.tabHeight(that, index);
    sourseSwiperIndex = index;
  },
  swichNav: function (e) {
    var that = this;
    var index = parseInt(e.target.dataset.current);
    this.tabHeight(that, index);
    sourseSwiperIndex = index;
  },
  tabHeight(that, index) {
    if (index == 1) {
      var wsiperLen = that.data.rentMate.length * 366 + 26;
    } else if (index == 2) {
      var wsiperLen = that.data.roomMate.length * 366 + 26;
    } else {
      var wsiperLen = that.data.houseList.length * 366 + 26;
    }
    that.setData({
      currentTab: index,
      winHeight: wsiperLen
    })
  },
  handelCollect(e) {
    var _that = this;
    const [collectTag, idTag, typeTag, isbanner] = [parseInt(e.target.dataset.iscollect), parseInt(e.target.dataset.id), parseInt(e.target.dataset.type), parseInt(e.target.dataset.isbanner)];
    const params={
      contentType: typeTag,
      contentId: idTag,
      collectionFlag: collectTag==0?1:0
    }
    var _tips;
    collectTag == 0 ? _tips = '收藏成功' : _tips = '取消成功';
    wx.getStorage({
      key: 'yzw-token',
      success: function (res) {
        var changeList=function(){
          if (typeTag == 0) {
            setTimeout(function () {
              _that.setData({
                showTips: false,
                houseList: _that.data.houseList
              });
            }, 1000)
          }
          if (typeTag == 1) {
            setTimeout(function () {
              _that.setData({
                showTips: false,
                rentMate: _that.data.rentMate
              });
            }, 1000)
          }
          if (typeTag == 2) {
            setTimeout(function () {
              _that.setData({
                showTips: false,
                roomMate: _that.data.roomMate
              });
            }, 1000)
          }
        }
        var collectFun = function (listData,itemname,namelist) {
          console.log(listData, itemname, namelist);
          if (isbanner == 0) {
            console.log(listData, itemname, namelist, params.collectionFlag);
            listData.forEach((item) => {
              if (item.id == idTag) {
                item.isCollected = params.collectionFlag;
                //居然不识别参数！！！
                changeList();
                _that.data.swiperList.forEach((item) => {
                  if (item[itemname]) {
                    if (item[itemname].id == idTag) {
                      item[itemname].isCollected = params.collectionFlag;
                      _that.setData({
                        swiperList: _that.data.swiperList
                      });
                      return;
                    }
                  }
                })
              }
            })
          }
          //如果是轮播图的
          if (isbanner == 1) {
            _that.data.swiperList.forEach((item) => {
              if (item[itemname]) {
                if (item[itemname].id == idTag) {
                  item[itemname].isCollected = params.collectionFlag;
                  setTimeout(function () {
                    _that.setData({
                      showTips: false,
                      swiperList: _that.data.swiperList
                    });
                  }, 1000)
                  listData.forEach((item) => {
                    if (item.id == idTag) {
                      item.isCollected = params.collectionFlag;
                      //居然不识别参数！！！
                      changeList();
                    }
                  })
                  return;
                }
              }
            })
          }
        }
        apiRequest.postByToken('api/account/collection/collection', params, res.data)
          .then(function (res) {
            _that.setData({
              showTips: true,
              tipsInfo: _tips,
            });
            //根据类型来局部list刷新 iscollect收藏 
            //如果是房源收藏
            if (typeTag == 0) {
              collectFun(_that.data.houseList, "house", "houseList");
            }
            if (typeTag == 1) {
              collectFun(_that.data.rentMate, "lookForHouse", "rentMate");
            }
            if (typeTag == 2) {
              collectFun(_that.data.roomMate, "lookForRoommate", "roomMate");
            }
          })
      },fail:function(){
        wx.openSetting({
          success: (res) => {
            APP.globalData.setUserToken();
            _that.onLoad();
          }
        })
      }
    })
  },
  selectPlace: function () {
    wx.navigateTo({
      url: '../selcity/selcity'
    })
  },
  selectKeyword: function () {
    wx.navigateTo({
      url: '../searchbox/searchbox'
    })
  },
  searchMap: function () {
    wx.navigateTo({
      url: '../map/map'
    })
  },
  detailHouse(e) {
    var houseId = e.currentTarget.dataset.houseid;
    wx.navigateTo({
      url: `../../Mycenter/housedetail/housedetail?houseId=${houseId}`
    })
  },
  detailRent(e) {
    var rentId = e.currentTarget.dataset.rentid;
    wx.navigateTo({
      url: `../../Community/rentdetail/rentdetail?type=2&look=false&rentId=${rentId}`
    })
  },
  detailRoom(e) {
    var roomId = e.currentTarget.dataset.roomid;
    wx.navigateTo({
      url: `../../Community/rentdetail/rentdetail?type=3&look=false&roomId=${roomId}`
    })
  },
  handleLoadMore: function () {
    // //console.log('load more');
    // this.setData({
    //   isLoading: true
    // })
    // setTimeout((function () {
    //   this.setData({
    //     houseList: this.data.houseList.concat(houseList),
    //     isLoading: false,
    //   });
    //   this.tabHeight(this, sourseSwiperIndex);
    //   //console.log('houseList', this.data.houseList);
    // }).bind(this), 2000)
  },
  handleRefresh: function () {
    console.log('pull down');
    this.setData({
      isRefreshing: true
    })
    refreshData();
    setTimeout((function () {
      this.setData({
        isRefreshing: false
      })
    }).bind(this), 2000)
  }
})
