var network = require('../../utils/network.js');
var util = require('../../utils/util');
var app = getApp();
Page({
    data:{
        add:false,
        list:[],
        imgw:165,
        paddpx:20,
        checkSuccess: false,
        getData: false
    },
    onShow(){
        const that = this;
        let sysInfo = util.getSystemInfoSync();
        util.setStorage('imgSrcArr',[]);
        network.baseRequest('/api/tag/hasClothes',{},'GET',function(res){
            let list = res.data && res.data.data;
            let imgw = Math.floor((sysInfo.screenWidth - 3*that.data.paddpx)/2);
            list && list.forEach((v,k)=>{
                 v.coverUrl = util.scaleImg(v.coverUrl,{w:Math.floor(sysInfo.pixelRatio*sysInfo.screenWidth/2),m:'fill'})
                // v.coverUrl = util.cutImg(v.coverUrl,{h:imgw,w:imgw})
            })
            that.setData({
                list:list,
                imgw:imgw
            })
            network.baseRequest(`/api/common/getWxAppStatus`, '', 'GET', res => {
              console.log('测试',res);
              that.setData({ checkSuccess: res.data.data.checkSuccess, getData: true });
            });
        })
    },
    onLoad(){

    },
    //去详情
    goDetail(e){
        let id = e.currentTarget.dataset.id;
        let title = e.currentTarget.dataset.type;
        wx.navigateTo({
            url:`../wardrobeDetail/index?id=${id}&title=${title}`
        });
    },
    leave(){
        app.getUserInfo(res => {
            wx.navigateTo({
                url:`../circleDetail/index?type=leave&uid=${res.id}`
            });
        });
    },
    camera(){
        const that = this;
        wx.chooseImage({
            count: 9, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['camera','album'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                wx.showLoading({
                    title: '上传中'
                })
               network.patchUploadImage(res.tempFilePaths,function(allFile){
                   util.setStorage('imgSrcArr',allFile);
                   wx.hideLoading();
                   wx.navigateTo({
                       url: '../selectTags/index'
                   })
               })
            }
        })
    }
});