const apiRequest = require('../../../utils/apiRequest.js');
const util = require('../../../utils/util.js');
Page({

  data: {
    houseDatail:{},
    showContract: false,
    detailType: 1,
    bottomlen: '100rpx',
    islook: false,
    updateTime: ''
  },


  onLoad(options) {
    var _that=this;
    if (options.hasOwnProperty('houseId')) {
      wx.getStorage({
        key: 'yzw-token',
        success: function (res) {
          //console.log(res.data);
          apiRequest.postByToken('api/homePage/houses-detail', { housesId: options.houseId }, res.data)
            .then(function (res) {
              _that.setData({
                houseDatail: res.data.data,
                updateTime: util.pubTime(res.data.data.updateTime)
              });
            })
        },
        fail: function () {
          apiRequest.post('pub/homePage/houses-detail', { housesId: options.houseId })
            .then(function (res) {
              _that.setData({
                houseDatail: res.data.data,
                updateTime: util.pubTime(res.data.data.updateTime)
              });
            })
        }
      })
    }
    if (options.hasOwnProperty('look')) {
      this.setData({
        islook: options.look,
        showContract: true,
      });
    }
    var detailType = options.type;
    this.setData({
      detailType: detailType
    });
    if (detailType == 3) {
      wx.setNavigationBarTitle({
        title: '找室友'
      })
    }
  },
  getContract() {
    this.setData({
      showContract: true,
      bottomlen: '30rpx',
    });
  },
  captureSave() {
    wx.canvasToTempFilePath({
      canvasId: 'target',
      success: function success(res) {
        wx.saveFile({
          tempFilePath: res.tempFilePath,
          success: function success(res) {
            console.log('saved::' + res.savedFilePath);
          },
          complete: function fail(e) {
            console.log(e.errMsg);
          }
        });
      },
      complete: function complete(e) {
        console.log(e.errMsg);
      }
    });
  },
  sharePublic() {

  }


})