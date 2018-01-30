const apiRequest = require('../../../utils/apiRequest.js');
Page({
  data: {
    communityListlen: -1,
    houseListlen:-1,
    rentMatelen: -1,
    roomMatelen: -1,
    currentTab:2,
    communityList:[],
    houseList:[],
    rentMate: [],
    roomMate: [],
    searchcon:'',
    curLocation:{}
  },
  onLoad() {
  },
  getCommunity(page, size, _that) {
    const params1 = {
      research: _that.data.searchcon,
      page:page,
      size:size
    }
    apiRequest.post('pub/community/community-list', params1 )
      .then(function (res) {
        _that.setData({
          communityList: res.data.data.list,
          communityListlen: res.data.data.list.length
        });
      })
  },
  getHourselist(page, size, _that) {
    let params2 = {
      research: _that.data.searchcon,
      page: page,
      size: size
    }
    apiRequest.post('pub/homePage/houses-resource', params2)
      .then(function (res) {
        _that.setData({
          houseList: res.data.data.list,
          houseListlen: res.data.data.list.length
        });
      })
  },
  getRentlist(page, size, _that) {
    let params3 = {
      research: _that.data.searchcon,
      page: page,
      size: size
    }
    apiRequest.post('pub/homePage/soliciting', params3)
      .then(function (res) {
        _that.setData({
          rentMate: res.data.data.list,
          rentMatelen: res.data.data.list.length
        });
      })
  },
  getRoommatelist(page, size, _that) {
    let params4 = {
      research: _that.data.searchcon,
      page: page,
      size: size
    }
    apiRequest.post('pub/homePage/richmod-list', params4)
      .then(function (res) {
        _that.setData({
          roomMate: res.data.data.list,
          roomMatelen: res.data.data.list.length
        });
      })
  },
  
  changeText:function(e){
    var _that=this;
    _that.setData({
      searchcon: e.detail.value
    });
    const index = parseInt(_that.data.currentTab);
    _that.curTablist(index, _that);
  },
  curTablist(curtab, _that) {
    switch (curtab) {
      case 1:
        _that.getCommunity(1, 5, _that); break;
      case 2:
        _that.getHourselist(1, 5, _that); break;
      case 3:
        _that.getRentlist(1, 5, _that); break;
      case 4:
        _that.getRoommatelist(1, 5, _that); break;
    }
  },
  selectedTab: function (e) {
    const index = parseInt(e.currentTarget.dataset.current);
    var _that = this;
    if (_that.data.currentTab === index) {
      return false;
    } else {
      _that.setData({
        currentTab: index
      })
    }
    if (_that.data.searchcon!=""){
      this.curTablist(this.data.currentTab, this);
    }
  },
  clearText:function(e){
    this.setData({
      searchcon: "",
      communityListlen: -1,
      houseListlen: -1,
      rentMatelen: -1,
      roomMatelen: -1,
      communityList: [],
      houseList: [],
      rentMate: [],
      roomMate: []
    });
  },
  cancelSearch:function(e){
    wx.reLaunch({
      url: '../index/index'
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
})





