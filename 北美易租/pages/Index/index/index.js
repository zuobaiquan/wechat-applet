const apiRequest = require('../../../utils/apiRequest.js');

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
        showTips:false,
        tipsInfo:'收藏成功',
        swiperList: [{
            num: 888,
            title: "华盛顿大学",
            url: '../images/middle-img1.jpg'
        }, {
            num: 999,
            title: "西雅图",
            url: '../images/middle-img2.jpg'
        }, {
            num: 666,
            title: "西雅图2",
            url: '../images/middle-img2.jpg'
        }],
        houseList: [{
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
        }],
        rentMate: [{
            url: 'http://p1.qzone.la/Upload/20160402/20160402165345391387.gif',
            isCollect: 0,
            nickname: '小明',
            city: '西雅图',
            price: '1000 USD/月',
            startTime: '2017-06-01',
            endTime: '2018-06-01',
            req: '没有任何要求'
        }, {
            url: 'http://p1.qzone.la/Upload/20160402/20160402165345391387.gif',
            isCollect: 1,
            nickname: '大明',
            city: '西雅图22',
            price: '1200 USD/月',
            startTime: '2017-06-12',
            endTime: '2018-06-18',
            req: '有任何要求'
        }],
        roomMate: [{
            url: 'http://p1.qzone.la/Upload/20160402/20160402165345391387.gif',
            isCollect: 1,
            nickname: '小明',
            city: '西雅图',
            sex: '本人女,希望室友性别女',
            price: '1000 USD/月',
            startTime: '2017-06-01',
            req: '我喜欢猫的，希望x喜欢猫'
        }, {
            url: 'http://p1.qzone.la/Upload/20160402/20160402165345391387.gif',
            isCollect: 1,
            nickname: '大明',
            city: '西雅图22',
            sex: '本人男,希望室友性别男',
            price: '1200 USD/月',
            startTime: '2017-06-12',
            endTime: '2018-06-18',
            req: '有任何要求'
        }, {
            url: 'http://p1.qzone.la/Upload/20160402/20160402165345391387.gif',
            isCollect: 1,
            nickname: '大明',
            city: '西雅图22',
            sex: '本人男,希望室友性别男',
            price: '1200 USD/月',
            startTime: '2017-06-12',
            endTime: '2018-06-18',
            req: '有任何要求'
        }],
        // 页面配置
        winWidth: 0,
        winHeight: 0,
        // tab切换
        currentTab: 0,
        curLatitude:'',
        curLongitude:''  
    },
    onLoad() {
        var that=this;
        wx.getLocation({
          type: 'wgs84',
          success: function (res) {
            // console.info(res);
            that.setData({
              curLatitude: res.latitude,
              curLongitude: res.longitude
            });
            let params = {
              cityid: 1,
              research: "",
              longitude: that.data.curLatitude,
              latitude: that.data.curLongitude,
              page: 1,
              size:10
            }
            apiRequest.post('/pub/homePage/houses-resource/', params)
              .then(function (res) {
                console.log(res.data);
                return res.data;
            })
          }
        })
        that.setData({
            winWidth: '100%',
            winHeight: that.data.houseList.length * 366 + 26
        });
    },
    bindChange: function(e) {
        var that = this;
        var index = parseInt(e.detail.current);
        this.tabHeight(that, index);
        sourseSwiperIndex = index;
    },
    swichNav: function(e) {
        var that = this;
        var index = parseInt(e.target.dataset.current);
        this.tabHeight(that, index);
        sourseSwiperIndex = index;
    },
    tabHeight: function(that, index) {
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
    handelCollect(e){
      var _that=this;
      let collectTag = parseInt(e.target.dataset.iscollect);
      var _tips ='取消成功';
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
    selectPlace: function() {
        wx.navigateTo({
            url: '../selcity/selcity'
        })
    },
    selectKeyword: function() {
        wx.navigateTo({
            url: '../searchbox/searchbox'
        })
    },
    searchMap: function() {
        wx.navigateTo({
            url: '../map/map'
        })
    },
    detailHouse() {
        wx.navigateTo({
            url: '../../Mycenter/housedetail/housedetail'
        })
    },
    detailRent() {
        wx.navigateTo({
            url: '../../Community/rentdetail/rentdetail?type=2&look=false'
        })
    },
    detailRoom() {
        wx.navigateTo({
            url: '../../Community/rentdetail/rentdetail?type=3&look=false'
        })
    },
    handleLoadMore: function() {
        //console.log('load more');
        this.setData({
            isLoading: true
        })
        setTimeout((function() {
            this.setData({
                houseList: this.data.houseList.concat(houseList),
                isLoading: false,
            });
            this.tabHeight(this, sourseSwiperIndex);
            //console.log('houseList', this.data.houseList);
        }).bind(this), 2000)
    },
    handleRefresh: function() {
        //console.log('pull down');
        this.setData({
            isRefreshing: true
        })
        setTimeout((function() {
            this.setData({
                houseList: houseList,
                isRefreshing: false
            });
            this.tabHeight(this, sourseSwiperIndex);
        }).bind(this), 2000)
    },
})
