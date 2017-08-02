const apiRequest = require('../../../utils/apiRequest.js');
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
import {
  configApi
} from '../../../utils/constant';
var houseList = [{
  title: 'U-District附近三层别墅',
  isCollect: 1,
  url: '../images/houselist1.png',
  price: "999 USD/月",
  type: '独栋别墅',
  addr: 'Seattle，WA',
  detail: '4卧 2卫浴'
}, {
  title: '首页房源标题2',
  isCollect: 0,
  url: '../images/houseno-img.png',
  price: "2199999 USD/天",
  type: '联排别墅',
  addr: 'Seattle，WA',
  detail: '3卧 1卫浴'
}];
var sourseSwiperIndex;
Page({
  data: {
    isLoading: false,
    isRefreshing: false,
    showTips: false,
    tipsInfo: '收藏成功',
    swiperList: [],
    houseList: [],
    rentMate:[],
    roomMate:[],
    winWidth: 0,
    winHeight: 0,
    // tab切换
    currentTab: 0,
    curLatitude: '',
    curLongitude: '',
    cityId: 0
  },

  onLoad() {
    wx.showLoading({
      title: '加载中',
    })
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
      apiRequest.post('pub/homePage/banner', params2)
        .then(function (res) {
          that.setData({
            swiperList: res.data.data
          });
        })
    }
    var getHourselist=function(page,size,_that){
      let params = {
        cityId: _that.data.cityId,
        research:'',
        latitude: _that.data.curLatitude,
        longitude: _that.data.curLongitude,
        page:page,
        size:size
      }
      apiRequest.post('pub/homePage/houses-resource', params)
        .then(function (res) {
          that.setData({
            houseList: res.data.data.list
          });
        })
    }
    var getRentlist = function (page, size, _that) {
      let params = {
        cityId: _that.data.cityId,
        research: '',
        page: page,
        size: size
      }
      apiRequest.post('pub/homePage/soliciting', params)
        .then(function (res) {
          that.setData({
            rentMate: res.data.data.list
          });
        })
    }
    var getRoommatelist = function (page, size, _that) {
      let params = {
        cityId: _that.data.cityId,
        research: '',
        page: page,
        size: size
      }
      apiRequest.post('pub/homePage/richmod-list', params)
        .then(function (res) {
          that.setData({
            roomMate: res.data.data.list
          });
        })
    }
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        that.setData({
          curLatitude: res.latitude,
          curLongitude: res.longitude
        });
        // 实例化API核心类
        qqmapsdk = new QQMapWX({
          key: configApi.QQMapWX_KEY
        });
        //逆地址解析
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
                getHourselist(1, 5, that);
                getRentlist(1, 5, that);
                getRoommatelist(1, 5, that);
                wx.hideLoading()
              })
          }
        })
        
      },
      fail: function (err) {
        apiRequest.post('pub/homePage/getDefaultCity', {})
          .then(function (res) {
            getLocationCallback(res);
            getHourselist(1, 5, that);
            getRentlist(1, 5, that);
            getRoommatelist(1, 5, that);
            wx.hideLoading()
          })
      },
      complete(){
        
      }
    })
    
    that.setData({
      winWidth: '100%',
      winHeight: that.data.houseList.length * 366 + 26
    });
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
    if(index == 1) {
      var wsiperLen = that.data.rentMate.length * 366 + 26;
    }else if (index == 2) {
      var wsiperLen = that.data.roomMate.length * 366 + 26;
    }else {
      var wsiperLen = that.data.houseList.length * 366 + 26;
    }
    that.setData({
      currentTab: index,
      winHeight: wsiperLen
    })
  },
  handelCollect(e) {
    var _that = this;
    let collectTag = parseInt(e.target.dataset.iscollect);
    var _tips = '取消成功';
    if (collectTag == 0) {
      var _tips = '收藏成功';
    }
    _that.setData({
      showTips: true,
      tipsInfo: _tips,
    });
    setTimeout(function () {
      _that.setData({
        showTips: false,
      });
    }, 2000)
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
    //console.log('pull down');
    // this.setData({
    //   isRefreshing: true
    // })
    // setTimeout((function () {
    //   this.setData({
    //     houseList: houseList,
    //     isRefreshing: false
    //   });
    //   this.tabHeight(this, sourseSwiperIndex);
    // }).bind(this), 2000)
  },
})