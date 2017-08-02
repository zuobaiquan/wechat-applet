const apiRequest = require('../../../utils/apiRequest.js');
const util = require('../../../utils/util.js');

Page({

  data: {
    showContract:false,
    detailType:1,
    bottomlen:'100rpx',
    islook:true,
    rentDatail: {},
    updateTime:''
  },

 
  onLoad(options) {
    var _that = this;
    if (options.hasOwnProperty('rentId')) {
      apiRequest.post('pub/homePage/soliciting-detail', { id: options.rentId })
        .then(function (res) {
          _that.setData({
            rentDatail: res.data.data,
            updateTime: util.pubTime(res.data.data.updateTime)
          });
          console.log(1111, _that.data.rentDatail);
        })
    }
    if (options.hasOwnProperty('roomId')) {
      apiRequest.post('pub/homePage/richmod-detail', { id: options.roomId })
        .then(function (res) {
          _that.setData({
            rentDatail: res.data.data,
            updateTime: util.pubTime(res.data.data.updateTime)
          });
          console.log(1111, _that.data.rentDatail);
        })
    }
    if (options.hasOwnProperty('look')){
      this.setData({
        islook: options.look,
        showContract: true,
      });
    }
    var detailType = options.type;
    this.setData({
      detailType: detailType
    });
    if (detailType==3){
      wx.setNavigationBarTitle({
        title: '找室友'
      })
    }
  },
  
  getContract(){
    this.setData({
      showContract:true,
      bottomlen: '30rpx',
    }); 
  },
  captureSave(){
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
  sharePublic(){
    
  }

  
})