const apiRequest = require('../../../utils/apiRequest.js');
const APP = getApp();
var refreshData;
Page({
  data: {
    isLoading: false,
    isRefreshing: false,
    issearch:false,
    attentionlen:0,
    interestlen:0,
    searchList: [],
    myinterestList:[]
  },

  onLoad(){
    wx.showLoading({
      title: '数据加载中',
    })
    var interestlen = this.data.myinterestList.length;
    var that = this;
    refreshData=function(){
      wx.getStorage({
        key: 'userLocation',
        success: function (res) {
          const params = {
            cityId: res.data.id,
            longitude: res.data.longitude,
            latitude: res.data.latitude
          }
          apiRequest.post('pub/community/getMyInterestedCommunityList', params)
            .then(function (res) {
              that.setData({
                myinterestList: res.data.data,
                interestlen: res.data.data.length
              });
              wx.hideLoading()
            })
        },
        fail:function(){
          
        }
      })
      //获取全局变量这里重启会无效，报错,修改为getStorage获取token
      wx.getStorage({
        key: 'yzw-token',
        success: function (res) {
          apiRequest.postByToken('api/community/follow-list', {page:1,size:5}, res.data).then(function (res) {
            that.setData({ 'myattentionList': res.data.data.list })
          })
        },
        fail: function () {
          // POST /pub/community/community-list
          apiRequest.post('pub/community/community-list', null).then(function (res) {
            that.setData({ 'myattentionList': res.data.data.list })
          })
        }
      })
    }
    refreshData();
    
  },
  selCommunity:function(e){
    var index = e.currentTarget.dataset.current;
    wx.navigateTo({
      url: `../selcommunity/selcommunity?type=${index}`
    });
  },
  searchChange(e) {
    var that=this;
    if (e.detail.value!=""){
      apiRequest.post('pub/community/community-list', { research: e.detail.value,page: 1,size: 10})
        .then(function (res) {
          that.setData({
            searchList:res.data.data.list,
            issearch: true
          });
        })
    }
    if (e.detail.value == "") {
      this.setData({
        issearch: false
      });
    }
  },
  communityDetail(e){
    const id = e.currentTarget.dataset.id,
      name = e.currentTarget.dataset.name;
    wx.navigateTo({
      url: `../communitydetail/communitydetail?communityId=${id}&communityName=${name}`
    });
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
  },

})
