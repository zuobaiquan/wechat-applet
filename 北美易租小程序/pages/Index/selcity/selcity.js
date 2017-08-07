//index.js
//获取应用实例
var app = getApp();
const apiRequest = require('../../../utils/apiRequest.js');
var countryList;
Page({
  data: {
    currentTab: 1,
    isShowToast: false,
    // countryList:[{nameCn:'美国'},{nameCn:'中国'},{nameCn:'迦南达'},{nameCn:'越南'},{nameCn:'北极'},{nameCn:'英国'},{nameCn:'新加坡'}]
  },
  onLoad() {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowWidth)
        that.setData({
          'windowWidth': res.windowWidth
        })
      }
    })
    var getCityByCountry = function (index, countryId) {
      apiRequest.post('pub/homePage/country-cityList', {
        countryId: countryId
      }).then(function (res) {
        countryList[index].cityList = res.data.data;
        that.setData({
          'countryList': countryList
        });
      })
    }
    apiRequest.post('pub/homePage/country', null).then(function (res) {
      countryList = res.data.data;
      for (var i = 0, list = res.data.data, len = list.length; i < list.length; i++) {
        getCityByCountry(i, list[i].id);
      }
    })
  },
  letterSelstart: function (e) {
    var letter = e.target.dataset.id;
    this.setData({
      scrollIntoId: letter,
      isShowToast: true,
    })
    var that = this;
    setTimeout(function () {
      that.setData({
        isShowToast: false
      });
    }, 800);
  },
  selectedTab: function (e) {
    var index = e.currentTarget.dataset.current;
    var that = this;
    if (this.data.currentTab === index) {
      return false;
    } else {
      that.setData({
        currentTab: index
      })
    }


  },
  search: function (e) {
    var searchContent = e.detail.value;
    var searchResult = [];
    if (searchContent) {
      for (var i = 0, len = countryList.length; i < len; i++) {
        var getResult = function (i, name) {
          searchResult[i] = {
            cityList: {}
          };
          searchResult[i].cityList[name] = [];
          searchResult[i].nameCn = countryList[i].nameCn;
          for (var j = 0, list = countryList[i].cityList[name], length = list.length; j < length; j++) {
            if (list[j].nameCn.indexOf(searchContent) > -1 || list[j].nameEn.indexOf(searchContent) > -1) {
              searchResult[i].cityList[name].push(list[j]);
            }
          }
        }
        getResult(i, 'hotCityList');
        getResult(i, 'orderCityList');
      }
      this.setData({
        'countryList': searchResult
      })
    } else {
      this.setData({
        'countryList': countryList
      })
    }

  },
  selectCity: function (e) {
    var locationInfo = e.currentTarget.dataset.current.split(',');
    wx.setStorage({
      key: "selectLocation",
      data: {
        countryId: locationInfo[0],
        countryName: locationInfo[1],
        cityId: locationInfo[2],
        cityName: locationInfo[3],
        longitude: locationInfo[4],
        latitude: locationInfo[5]
      }
    })
    wx.getStorage({
      key: 'selectLocation',
      success: function (res) {
        wx.reLaunch({
          url: '../index/index?seltype=1'
        });
      }
    })
    
  }
})