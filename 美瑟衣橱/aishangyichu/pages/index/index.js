var app = getApp();
var network = require('../../utils/network');
var util = require('../../utils/util');
Page({
  data:{
    id:'',
    circleList:[],
    articleList:[],
    imgw:'',
    paddpx:20,
    checkSuccess:false,
    getData:false
  },
  onLoad(){

  },
  onShow(){
    const that = this;
    let timer = null,token = wx.getStorageSync('token');
    let sysInfo = util.getSystemInfoSync();
    console.log(sysInfo);
    if(that.data.circleList.length == 0){
      util.showToast({title:'加载中...',duration:10000})
    }
    let imgw = Math.floor((sysInfo.screenWidth - 3*that.data.paddpx)/2);
    that.setData({
      imgw:imgw
    })
    function getUserinfo() {
      token = wx.getStorageSync('token');
      if(!token){
        setTimeout(getUserinfo,100)
      }else{
        wx.hideToast();
        app.getUserInfo(res => {
          that.setData({id:res.id});
          network.baseRequest(`/api/common/getWxAppStatus`,'','GET',res => {
            console.log(res);
            if(!res.data.data.checkSuccess){
              network.baseRequest(`/api/article/`,'','GET',res => {
                console.log('文章列表',res);
                that.setData({articleList:res.data.data.content});
              })
            }else{
              network.baseRequest(`/api/circle/user`,'','GET',res => {
                var list = res.data.data.map( item => {
                  item.coverUrl = util.scaleImg(item.coverUrl,{m:'fill',w:Math.floor(sysInfo.pixelRatio*sysInfo.screenWidth/2)});
                  return item;
                });
                that.setData({
                  circleList:list,
                });
              })
            }
            that.setData({checkSuccess:res.data.data.checkSuccess,getData:true});
          });
        });
      }
    }
    getUserinfo();
  },
  //跳转圈子详情
  goCircleDetail(event){
    var id = event.currentTarget.dataset.id;
    var content = event.currentTarget.dataset.content;
    var title = event.currentTarget.dataset.title;
    var coverUrl = event.currentTarget.dataset.coverurl;
    app.setGlData('circleDetailCoverUrl',coverUrl);
    wx.navigateTo({
      url:`../circleDetail/index?content=${content}&id=${id}&title=${title}`
    })
  },
  //跳转文章详情
  goArticleDetail(e){
    var content = e.currentTarget.dataset.content;
    // content = content.replace(/\n/g,'');
    // var reg=/<script[^>]*>.*(?=<\/script>)<\/script>/gi;
    // var regStyle = /<style[^>]*>.*(?=<\/style)<\/script>/gi;
    // console.log(content);
    // content = content.replace(reg,'');
    // console.log(content);
    // content = content.replace(regStyle,'');
    // console.log(content);
    util.setStorage('articleContent',content);
      wx.navigateTo({
        url:'../articleDetail/index'
      })
  },
  //创建圈子
  createCircle(){
    wx.navigateTo({
      url:'../createCircle/index'
    })
  },
  //发现圈子
  findCircle(){
    wx.navigateTo({
      url:'../findCircle/index'
    })
  },
  //文章详情
  // gotoArticleDetail(event){
  //   wx.navigateTo({
  //     url:'../articleDetail/index'
  //   })
  // }
});
