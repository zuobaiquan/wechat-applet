const apiRequest = require('../../../utils/apiRequest.js');
const util = require('../../../utils/util.js');
const APP = getApp();
var freshinfoData, freshcollectData;
Page({
  data: {
    isLoading: false,
    isRefreshing: false,
    delBtnWidth: 182,
    myinfoData:[],
    mycollectData:[],
    //设置是候点击了我的收藏的标记，减少服务器请求
    isClickcollect:0,
    // tab切换 
    currentTab: 0,
    showrentDetail: false,
    showTips: false,
  },
  onLoad(){
    wx.showLoading({
      title: '数据加载中',
    })
    var that=this;
    this.initEleWidth();
    freshinfoData=function(){
      var params1 = {
        page: 1,
        size: 5
      }
      wx.getStorage({
        key: 'yzw-token',
        success: function (res) {
          apiRequest.postByToken('api/me/myPublish', params1, res.data)
            .then(function (res) {
              that.setData({
                myinfoData: res.data.data.list
              });
              wx.hideLoading()
            })
        },
        fail: function () {
          wx.openSetting({
            success: (res) => {
              APP.globalData.setUserToken();
            },
            complete: () => {
              that.onLoad();
            }
          })
        }
      })
    }
    freshinfoData();
    
  },
  selectedTab(e) {
    var that = this;
    var index = e.currentTarget.dataset.current;
    if (that.data.isClickcollect == 0 && index==1){
      freshcollectData=function(){
        var params2 = {
          page: 1,
          size: 5
        }
        wx.showLoading({
          title: '数据加载中',
        })
        wx.getStorage({
          key: 'yzw-token',
          success: function (res) {
            apiRequest.postByToken('api/me/myCollection', params2, res.data)
              .then(function (res) {
                that.setData({
                  mycollectData: res.data.data.list
                });
                wx.hideLoading()
              })
          },
          fail: function () {
            console.log(5678);
          }
        })
      }
      freshcollectData();
    }
    
    if (that.data.currentTab === index) {
      return false;
    } else {
      that.setData({
        currentTab: index,
        isClickcollect:1
      })
    }
  },
  showrentDetail() {
    this.setData({
      showrentDetail: !this.data.showrentDetail
    });
  },
  hiderentDetail() {
    this.setData({
      showrentDetail: false
    });
  },
  sendInfo(e) {
    var index = e.currentTarget.dataset.currenttype, url = '';
    index = parseInt(index);
    switch (index) {
      case 1: url = '../addhouse/addhouse'; break;
      case 2: url = '../addhouse/addhouse'; break;
      case 3: url = '../addhouse/addhouse'; break;
      default: console.log('错误');
    }
    this.setData({
      showrentDetail: false
    });
    wx.navigateTo({
      url: url
    })
  },
  detailHouse(e) {
    var houseId = e.currentTarget.dataset.houseid;
    wx.navigateTo({
      url: `../../Mycenter/housedetail/housedetail?houseId=${houseId}`
    })
  },
  detailRentroom(e) {
    const [id,type] = [e.currentTarget.dataset.id, e.currentTarget.dataset.listtype];
    if(type==2){
      wx.navigateTo({
        url: `../../Community/rentdetail/rentdetail?type=2&look=false&rentId=${id}`
      })
    }
    if(type==3){
      wx.navigateTo({
        url: `../../Community/rentdetail/rentdetail?type=3&look=false&roomId=${id}`
      })
    }
  },
  handelCollect(e) {
    var _that = this;
    _that.setData({
      showTips: true,
      tipsInfo: "取消成功",
    });
    setTimeout(function () {
      _that.setData({
        showTips: false,
      });
    }, 2000)
  },
  touchStart(e){
    if (e.touches.length == 1) {
      this.setData({
        startX: e.touches[0].clientX
      });
    }
  },
  touchMove(e){
    if (e.touches.length == 1) {
      var moveX = e.touches[0].clientX;
      var disX = this.data.startX - moveX;
      var delBtnWidth = this.data.delBtnWidth;
      var txtStyle = "";
      if (disX == 0 || disX < 0) {
        txtStyle = "left:0px";
      } else if (disX > 0) {
        txtStyle = "left:-" + disX + "px";
        if (disX >= delBtnWidth) {
          txtStyle = "left:-" + delBtnWidth + "px";
        }
      }
      var index = e.currentTarget.dataset.index;
      this.data.myinfoData[index].txtStyle = txtStyle;
      this.setData({
        chartlist: this.data.chartlist
      });
    }
  },
  touchEnd(e) {
    if (e.changedTouches.length == 1) {
      var endX = e.changedTouches[0].clientX;
      var disX = this.data.startX - endX;
      var delBtnWidth = this.data.delBtnWidth;
      var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" : "left:0px";
      var index = e.currentTarget.dataset.index;
      this.data.myinfoData[index].txtStyle = txtStyle;
      this.setData({
        myinfoData: this.data.myinfoData
      });
    }
  },

  getEleWidth(w) {
    var real = 0;
    try {
      var res = wx.getSystemInfoSync().windowWidth;
      var scale = (750 / 2) / (w / 2);
      real = Math.floor(res / scale);
      return real;
    } catch (e) {
      return false;
    }
  },
  initEleWidth() {
    var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
    this.setData({
      delBtnWidth: delBtnWidth
    });
  },

  //点击删除按钮事件
  delItem(e) {
    var that=this;
    const [index, id, listtype] = [e.target.dataset.index, e.target.dataset.id, parseInt(e.target.dataset.listtype)];
    var myinfoData = that.data.myinfoData;
    var modalTitle="";
    switch (listtype) {
      case 1: modalTitle = '您确定要彻底删除此房源消息吗？'; break;
      case 2: modalTitle = '您确定要彻底删除此室友消息吗？'; break;
      case 3: modalTitle = '您确定要彻底删除此求租消息吗？'; break;
      default: console.log('错误');
    }
    wx.showModal({
      title: '确定',
      confirmText: '删除',
      confirmColor: "#f47a20",
      cancelColor: '#4b474c',
      content: modalTitle,
      success: function (res) {
        if (res.confirm) {
          const paramsdel={
            type: listtype,
            id:id
          }
          wx.getStorage({
            key: 'yzw-token',
            success: function (res) {
              console.log(paramsdel);
              apiRequest.postByToken('api/me/deletePublish', paramsdel, res.data)
                .then(function (res) {
                  that.data.myinfoData.splice(index, 1);
                  that.setData({
                    myinfoData: that.data.myinfoData
                  });
                })
            },
            fail: function () {
              console.log(5678);
            }
          })
          
        } else if (res.cancel) {
          //用户取消删除，删除按钮隐藏
          var txtStyle = "left:0px";
          that.data.myinfoData[index].txtStyle = txtStyle;
          that.setData({
            myinfoData: that.data.myinfoData
          });
        }
      }
    })
  },
  detailHouse(e) {
    var houseId = e.currentTarget.dataset.houseid;
    wx.navigateTo({
      url: `../../Mycenter/housedetail/housedetail?houseId=${houseId}`
    })
  },
  detailRent(e) {
    var rentId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../rentdetail/rentdetail?rentId=${rentId}`
    })
  },
  detailRoom(e) {
    var roomId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../rentdetail/rentdetail?roomId=${roomId}`
    })
  },
  handelCollect(e) {
    var _that = this;
    const [collectTag, idTag, typeTag,index] = [parseInt(e.target.dataset.iscollect), parseInt(e.target.dataset.id), parseInt(e.target.dataset.type)];
    const params = {
      contentType: typeTag -1,
      contentId: idTag,
      collectionFlag: 0
    }
    wx.getStorage({
      key: 'yzw-token',
      success: function (res) {
        apiRequest.postByToken('api/account/collection/collection', params, res.data)
          .then(function (res) {
            _that.setData({
              showTips: true,
              tipsInfo: '取消成功',
            });
            setTimeout(function () {
              _that.data.mycollectData.splice(index,1);
              _that.setData({
                showTips: false,
                mycollectData: _that.data.mycollectData
              });
            }, 1000)
          })
      }, fail: function () {
        console.log("错误");
      }
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
    if (this.data.currentTab==0){
      freshinfoData();
    }
    if (this.data.currentTab == 1) {
      freshcollectData();
    }
    //refreshData();
    setTimeout((function () {
      this.setData({
        isRefreshing: false
      })
    }).bind(this), 2000)
  }
})





