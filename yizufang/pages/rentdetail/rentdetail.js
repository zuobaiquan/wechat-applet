// rentdetail.js
Page({

  data: {
    showContract:false,
    detailType:1,
    bottomlen:'100rpx',
    islook:true,
    rentDatail: { avator: 'http://img3.imgtn.bdimg.com/it/u=734972231,2892744574&fm=26&gp=0.jpg', sex: '女', matesex:'希望是女生', nickname: 'juliy1', tag: '求租', hitsNum: 170, city: '西雅图', price: '1000 USD/月', start: '2017-06-01', end: '2018-06-01', email:'test@gmail.com', req: '没有要求', tel: 2066580000,wechat:'xxxxx'},
  },

 
  onLoad(options) {
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