//index.js
//获取应用实例
const apiRequest = require('../../../utils/apiRequest.js');
var app = getApp()
var cityList = [], schoolList = [],getCommunityData;
Page({
  data: {
    currentTab: 0,
    isShowToast: false,
    lettercity: [],
    letterschool: [],
    scrollIntoId: 'A'
  },

  onLoad(options) {
    this.setData({
      currentTab: options.type
    })
    wx.showLoading({
      title: '数据加载中',
    })
    
    var that=this;
    getCommunityData = function (page,size,listdata,currentTab){
      let params = {
        type: currentTab,
        page: 1,
        size: 100
      }
      apiRequest.post('pub/community/getCommunityListWithType', params)
        .then(function (res) {
          var resCommnunity = res.data.data.list;
          if (listdata.length===0){
            resCommnunity.forEach((itemres) => {
              var flag = true;
              listdata.forEach((itemcity, j) => {
                if (itemcity.name == itemres.prefix) {
                  flag = false;
                  listdata[j].child.push({
                    id: itemres.id,
                    cityname: itemres.nameCn,
                    cityname_en: itemres.nameEn,
                    picture: itemres.portraitUrl
                  });
                }
              })
              if (flag) {
                if (currentTab == 0) {
                  that.data.lettercity.push(itemres.prefix);
                }
                if (currentTab == 1) {
                  that.data.letterschool.push(itemres.prefix);
                }
                listdata.push({
                  name: itemres.prefix,
                  child: [{
                    id: itemres.id,
                    cityname: itemres.nameCn,
                    cityname_en: itemres.nameEn,
                    picture: itemres.portraitUrl
                  }]
                });
              }
            })
          }
          if (currentTab==0){
            that.setData({
              cityList: listdata,
              lettercity: that.data.lettercity,
              scrollIntoId: that.data.lettercity[0]
            })
          }
          if (currentTab == 1) {
            that.setData({
              schoolList: listdata,
              letterschool: that.data.letterschool,
              scrollIntoId: that.data.letterschool[0]
            })
          }
          console.log(that.data.cityList, that.data.schoolList);
          wx.hideLoading()
        })
    }
    getCommunityData(1, 100, cityList,0);
    getCommunityData(1, 100, schoolList,1);
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
  communityDetail(e) {
    const [id, name] = [e.currentTarget.dataset.id, e.currentTarget.dataset.name];
    wx.navigateTo({
      url: `../communitydetail/communitydetail?communityId=${id}&communityName=${name}`
    });
  },
  search: function (e) {
    var that=this;
    var searchContent = e.detail.value;
    var searchResult = [{
      name:'',
      child:[]
    }];
    searchResult.shift();
    if (searchContent!="") {
      var getsearchRes = function (tablist) {
        for (var i = 0, len = tablist.length; i < len; i++) {
          var getResult = function (i) {
            searchResult[i] = {
              child: []
            };
            searchResult[i].name = tablist[i].name;
            var tempdata = tablist[i].child;
            for (var j = 0; j < tempdata.length; j++) {
              if (tempdata[j].cityname.indexOf(searchContent) > -1 || tempdata[j].cityname_en.indexOf(searchContent) > -1) {
                searchResult[i].child.push({
                  cityname: tempdata[j].cityname,
                  picture: tempdata[j].picture
                });
              }
            }
          }
          getResult(i);
        }
        return searchResult;
      }
      if(that.data.currentTab==0){
        this.setData({
          cityList: getsearchRes(cityList)
        })
      }
      if(that.data.currentTab == 1) {
        this.setData({
          schoolList: getsearchRes(schoolList)
        })
      }
    } else {
      if (this.data.currentTab == 0) {
        this.setData({
          cityList: cityList
        })
      }
      if (this.data.currentTab == 1) {
        this.setData({
          schoolList: schoolList
        })
      }
    }

  },

})

