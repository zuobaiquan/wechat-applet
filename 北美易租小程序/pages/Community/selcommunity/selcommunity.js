//index.js
//获取应用实例
const apiRequest = require('../../../utils/apiRequest.js');
var app = getApp()

Page({
  data: {
    currentTab: 0,
    isShowToast: false,
    letterlist: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    scrollIntoId: 'A',
    cityList: [],
    schoolList:[]
  },

  onLoad(options) {
    this.setData({
      currentTab: options.type
    })
    wx.showLoading({
      title: '数据加载中',
    })
    
    var that=this;
    var getCommunityData = function (page,size,listdata,currentTab){
      let params = {
        type: currentTab,
        page: 1,
        size: 100
      }
      apiRequest.post('pub/community/getCommunityListWithType', params)
        .then(function (res) {
          var resCommnunity = res.data.data.list;
          resCommnunity.forEach((itemres) => {
            var flag = true;
            listdata.forEach((itemcity, j) => {
              if (itemcity.name == itemres.prefix) {
                flag = false;
                listdata[j].child.push({
                  cityname: itemres.nameCn,
                  cityname_en: itemres.nameEn,
                  picture: itemres.portraitUrl
                });
              }
            })
            if (flag) {
              listdata.push({
                name: itemres.prefix,
                child: [{
                  cityname: itemres.nameCn,
                  cityname_en: itemres.nameEn,
                  picture: itemres.portraitUrl
                }]
              });
            }
          })
          if (currentTab==0){
            that.setData({
              cityList: listdata
            })
          }
          if (currentTab == 1) {
            that.setData({
              schoolList: listdata
            })
          }
          wx.hideLoading()
        })
    }
    getCommunityData(1, 100, that.data.cityList,0);
    getCommunityData(1, 100, that.data.schoolList,1);
  },
  letterSelstart: function (e) {
    var letter = e.target.dataset.id
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
    var that=this;
    var searchContent = e.detail.value;
    var searchResult = [{
      name:'',
      child:[]
    }];
    searchResult.shift();
    if (searchContent) {
      for (var i = 0, len = that.data.cityList.length; i < len; i++) {
        console.log(that.data.cityList[i]);
        searchResult.push({
          name:that.data.cityList[i].name
        });
        var tempdata = that.data.cityList[i].child;
        for (var j = 0; j < tempdata.length;j++){
          if (tempdata[j].cityname.indexOf(searchContent) > -1 || tempdata[j].cityname_en.indexOf(searchContent) > -1) {
            searchResult[i].child.push({
              cityname: tempdata[j].nameCn,
              picture: tempdata[j].portraitUrl
            });
          }
        }  
        
      }
      this.setData({
        'cityList': searchResult
      })
    } else {
      this.setData({
        'cityList': that.data.cityList
      })
    }

  },

})

