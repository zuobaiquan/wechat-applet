
// 七牛相关参数
import { configApi } from '../../../utils/constant';

Page({
  data: {
    houseImg:["http://oowi4z51w.bkt.clouddn.com/81ovivuer8qb334xbrlqe61or",
      "http://oowi4z51w.bkt.clouddn.com/enyr344yhblsbop890ey7gb9",
      "http://oowi4z51w.bkt.clouddn.com/xq8puz5czg525c36zc2l0udi"]
  },
  onLoad: function (options) {

  },
  deleteItemimg(e){
    const index = e.currentTarget.dataset.index;
    this.data.houseImg.splice(index,1);
    this.setData({
      houseImg: this.data.houseImg
    });
  },
  addmoreImg(){
    var that = this;
    wx.showActionSheet({
      itemList: ['使用相机拍照', '从相册中选择'],
      itemColor: "#007aff",
      success: function (res) {
        if(!res.cancel){
          if (res.tapIndex == 0) {
            that.chooseWxImage('camera')
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('album')
          }
        }
      }
    })
  },
//多张图片上传
  uploadEach(filePaths, successUp, failUp, i, length) {
    var that=this;
    var fileName = Math.random().toString(36).substr(2);
    wx.uploadFile({
      url: configApi.IMAGE_UPLOAD.uploadUrl,
      filePath: filePaths[i],
      name: 'file',
      formData: {
        'token': configApi.IMAGE_UPLOAD.token,
        key: fileName
      },
      success: (res) => {
        var dataString = res.data;
        var dataObject = JSON.parse(dataString);
        var imageUrl = configApi.IMAGE_UPLOAD.baselink + dataObject.key;
        that.data.houseImg.push(imageUrl);
        successUp++;
      },
      fail: (res) => {
        failUp++;
      },
      complete: () => {
        i++;
        if (i == length) {
          console.log(this.data.imageUrl);
          if (failUp!=0){
            wx.showToast({
              title: '上传成功',
              //title: successUp + '张上传成功,' + failUp + '张上传失败',
              icon: 'success',
              duration: 1000
            });
          }
          else{
            wx.showToast({
              title: '上传成功',
              icon: 'success',
              duration: 1000
            });
          }
          this.setData({
            houseImg: that.data.houseImg
          });
        }
        else {
          this.uploadEach(filePaths, successUp, failUp, i, length);
        }
      },
    });
  },

  chooseWxImage: function (type) {
    var that = this;
    wx.chooseImage({
      count: 9 - that.data.houseImg.length,
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        var successUp = 0; //成功个数
        var failUp = 0; //失败个数
        var length = res.tempFilePaths.length; //总共个数
        var i = 0; //第几个
        that.uploadEach(res.tempFilePaths, successUp, failUp, i, length);
      }
    })
  }

})
