var network = require('../../utils/network');
var util = require('../../utils/util');
var app = getApp();
Page({
    data:{
        imageList:[],
        sum:9,
        count:9,
        circleId:'',
        cancelPopup:false,
        content:''
    },
    onLoad(params){
        this.setData({circleId:params.id})
        wx.setNavigationBarTitle({
            title:params.title
        })
    },
    //选择图片
    selectImage(){
        var that = this;
        wx.chooseImage({
            count: that.data.count, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var tempFilePaths = res.tempFilePaths;
                var list = that.data.imageList.concat(tempFilePaths);
                var sum = that.data.sum - list.length;
                that.setData({
                    imageList:list,
                    count:sum
                });
                console.log(list,that.data.count);
            }
        })
    },
    //删除
    delete(event){
        var index = event.currentTarget.dataset.index;
        var imageList = this.data.imageList;
        imageList.splice(index,1);
        var sum = this.data.sum - imageList.length;
        this.setData({
            imageList:imageList,
            count:sum
        });
        console.log(imageList,this.data.count)
    },
    //发布
    submit(e){
        var content = e.detail.value.content;
        if(!content){
            util.showInfo('请输入这一刻的想法');
            return;
        }else if(this.data.imageList.length<=0){
            util.showInfo('请选择图片');
            return;
        }
        network.showLoading('发布中...','loading',1000000);
        network.patchUploadImage(this.data.imageList, res => {
            network.baseRequest('/api/topic/',{content:content,photos:res,circleId:this.data.circleId},'PUT', res => {
                if(res.statusCode == 200){
                    app.setGlData('sendTopic',true);
                    network.hiddenLoading();
                    network.back();
                }
            })
        })
    },
    //取消
    cancel(){
        this.setData({cancelPopup:true});
    },
    cancelCancel(){
        this.setData({cancelPopup:false});
    },
    cancelConfirm(){
        network.back();
    },
    //stop辅助函数
    stop(){
        return '';
    }
});