var network = require('../../utils/network.js');
var util = require('../../utils/util')
Page({
  data:{
      logoLocalUrl:'',
      filePath:[],
      title:'',
      content:''
    },
  //选择图片
  camera(){
      var that = this;
      wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['camera','album'], // 可以指定来源是相册还是相机，默认二者都有
            
          success: function (res) {
              network.patchUploadImage(res.tempFilePaths,function(path){
                  that.setData({
                      coverUrl: path[0],
                      logoLocalUrl:util.scaleImg(path[0],{h:130,w:142,m:'fill'})
                  })
              })
          }
      })
  },
  //保存input框内容
  blur(event){
      var type = event.currentTarget.dataset.type;
      var value = event.detail.value;
      console.log(type,value);
      switch(type){
          case 'title':
              this.setData({title:value});
          break;
          case 'content':
              this.setData({content:value});
          break;
      }
  },
    formSubmit(e){
        let  that = this;
        let  obj = e.detail.value;
        if(!!!obj.coverUrl){
            util.showInfo('圈子封面图片不能为空！！')
        }else if(!!!obj.title){
            util.showInfo('圈子名称不能是空！！');
        }else if(!!!obj.content){
            util.showInfo('圈子简介不能为空！！')
        }else{
            util.showToast({title:'正在创建...',duration:60000});
            network.baseRequest('/api/circle/',obj,'PUT',res=>{
                if(res.statusCode=='200'){
                    wx.hideToast();
                    network.back();
                }
            })
        }

  }
});