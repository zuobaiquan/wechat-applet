var network = require('../../utils/network.js')
var util = require('../../utils/util');
var app = getApp();
Page({
    data:{
        add:false,
        list:[],
        uid:null,
        imgw:165,
        paddpx:20
    },
    onLoad(params){
        this.setData({
            uid:params.uid-0
        })
    },
    onShow(){
        const that = this;
        let sysInfo = util.getSystemInfoSync();
        network.baseRequest('/api/tag/hasClothes/',{uid:this.data.uid},'GET',function(res){
            let list = res.data && res.data.data;
            let imgw = Math.floor((sysInfo.screenWidth - 3*that.data.paddpx)/2);
            list && list.forEach((v,k)=>{
                v.coverUrl = util.scaleImg(v.coverUrl,{w:Math.floor(sysInfo.pixelRatio*sysInfo.screenWidth/2),m:'fill'})
            })
            that.setData({
                list:list,
                imgw:imgw
            })
        })
    },
    //去详情
    goDetail(e){
        let id = e.currentTarget.dataset.id;
        let title = e.currentTarget.dataset.type;
        wx.navigateTo({
            url:`../wardrobeDetail/index?id=${id}&title=${title}&uid=${this.data.uid}`
        });
    },
    leave(){
        wx.navigateTo({
            url:`../circleDetail/index?type=leave&uid=${this.data.uid}`
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