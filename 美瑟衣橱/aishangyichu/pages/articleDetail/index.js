// var WxParse = require('../../wxParse/wxParse.js');
var util = require('../../utils/util');
/**
* WxParse.wxParse(bindName , type, data, target,imagePadding)
* 1.bindName绑定的数据名(必填)
* 2.type可以为html或者md(必填)
* 3.data为传入的具体数据(必填)
* 4.target为Page对象,一般为this(必填)
* 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
*/
Page({
  data: {
    title:''
  },
  onLoad: function () {

  },
  onShow: function (){
      // var data = util.getStorage('articleContent');
      // WxParse.wxParse('article', 'html',data, this,5);
      this.setData({
        title: util.getStorage('articleContent')
      });
      console.log(title)
  }
});