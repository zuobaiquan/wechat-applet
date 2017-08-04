const apiRequest = require('../../../utils/apiRequest.js');
const APP = getApp();
Page({
  data: {
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
              interestlen:res.data.data.length
            });
            wx.hideLoading()
          })
      }
    })
    //获取全局变量这里重启会无效，报错,修改为getStorage获取token
    wx.getStorage({
      key: 'yzw-token',
      success: function (res) {
        apiRequest.postByToken('api/community/follow-list', null, res.data).then(function (res) {
          that.setData({ 'myattentionList': res.data.data.list })
        })
      },
      fail: function () {
        // 
      }
    })
    
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
  listDetail(e){
    wx.navigateTo({
      url: '../communitydetail/communitydetail'
    });
  }

})
